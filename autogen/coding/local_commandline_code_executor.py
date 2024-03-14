from hashlib import md5
import os
from pathlib import Path
import re
import sys
import uuid
import warnings
from typing import ClassVar, List, Union

from ..agentchat.agent import LLMAgent
from ..code_utils import TIMEOUT_MSG, WIN32, _cmd, execute_code
from .base import CodeBlock, CodeExecutor, CodeExtractor, CommandLineCodeResult
from .markdown_code_extractor import MarkdownCodeExtractor

from .utils import _get_file_name_from_content

import subprocess

__all__ = ("LocalCommandLineCodeExecutor",)


class LocalCommandLineCodeExecutor(CodeExecutor):
    SUPPORTED_LANGUAGES: ClassVar[List[str]] = ["bash", "shell", "sh", "pwsh", "powershell", "ps1", "python"]

    def __init__(
        self,
        timeout: int = 60,
        work_dir: Union[Path, str] = Path("."),
    ):
        """(Experimental) A code executor class that executes code through a local command line
        environment.

        **This will execute LLM generated code on the local machine.**

        Each code block is saved as a file and executed in a separate process in
        the working directory, and a unique file is generated and saved in the
        working directory for each code block.
        The code blocks are executed in the order they are received.
        Command line code is sanitized using regular expression match against a list of dangerous commands in order to prevent self-destructive
        commands from being executed which may potentially affect the users environment.
        Currently the only supported languages is Python and shell scripts.
        For Python code, use the language "python" for the code block.
        For shell scripts, use the language "bash", "shell", or "sh" for the code
        block.

        Args:
            timeout (int): The timeout for code execution. Default is 60.
            work_dir (str): The working directory for the code execution. If None,
                a default working directory will be used. The default working
                directory is the current directory ".".
        """

        if timeout < 1:
            raise ValueError("Timeout must be greater than or equal to 1.")

        if isinstance(work_dir, str):
            work_dir = Path(work_dir)

        if not work_dir.exists():
            raise ValueError(f"Working directory {work_dir} does not exist.")

        self._timeout = timeout
        self._work_dir: Path = work_dir

    @property
    def timeout(self) -> int:
        """(Experimental) The timeout for code execution."""
        return self._timeout

    @property
    def work_dir(self) -> Path:
        """(Experimental) The working directory for the code execution."""
        return self._work_dir

    @property
    def code_extractor(self) -> CodeExtractor:
        """(Experimental) Export a code extractor that can be used by an agent."""
        return MarkdownCodeExtractor()

    @staticmethod
    def sanitize_command(lang: str, code: str) -> None:
        """
        Sanitize the code block to prevent dangerous commands.
        This approach acknowledges that while Docker or similar
        containerization/sandboxing technologies provide a robust layer of security,
        not all users may have Docker installed or may choose not to use it.
        Therefore, having a baseline level of protection helps mitigate risks for users who,
        either out of choice or necessity, run code outside of a sandboxed environment.
        """
        dangerous_patterns = [
            (r"\brm\s+-rf\b", "Use of 'rm -rf' command is not allowed."),
            (r"\bmv\b.*?\s+/dev/null", "Moving files to /dev/null is not allowed."),
            (r"\bdd\b", "Use of 'dd' command is not allowed."),
            (r">\s*/dev/sd[a-z][1-9]?", "Overwriting disk blocks directly is not allowed."),
            (r":\(\)\{\s*:\|\:&\s*\};:", "Fork bombs are not allowed."),
        ]
        if lang in ["bash", "shell", "sh"]:
            for pattern, message in dangerous_patterns:
                if re.search(pattern, code):
                    raise ValueError(f"Potentially dangerous command detected: {message}")

    def execute_code_blocks(self, code_blocks: List[CodeBlock]) -> CommandLineCodeResult:
        """(Experimental) Execute the code blocks and return the result.

        Args:
            code_blocks (List[CodeBlock]): The code blocks to execute.

        Returns:
            CommandLineCodeResult: The result of the code execution."""
        logs_all = ""
        file_names = []
        for code_block in code_blocks:
            lang, code = code_block.language, code_block.code
            lang = lang.lower()

            LocalCommandLineCodeExecutor.sanitize_command(lang, code)

            if WIN32 and lang in ["sh", "shell"]:
                lang = "ps1"

            if lang not in self.SUPPORTED_LANGUAGES:
                # In case the language is not supported, we return an error message.
                exitcode = 1
                logs_all += "\n" + f"unknown language {lang}"
                break

            try:
                # Check if there is a filename comment
                filename = _get_file_name_from_content(code, self._work_dir)
            except ValueError:
                return CommandLineCodeResult(exit_code=1, output="Filename is not in the workspace")

            if filename is None:
                # create a file with an automatically generated name
                code_hash = md5(code.encode()).hexdigest()
                filename = f"tmp_code_{code_hash}.{'py' if lang.startswith('python') else lang}"

            written_file = (self._work_dir / filename).resolve()
            with written_file.open("w", encoding="utf-8") as f:
                f.write(code)
            file_names.append(written_file)

            program = sys.executable if lang.startswith("python") else _cmd(lang)
            cmd = [program, str(written_file.absolute())]

            try:
                result = subprocess.run(
                    cmd, cwd=self._work_dir, capture_output=True, text=True, timeout=float(self._timeout)
                )
            except subprocess.TimeoutExpired:
                logs_all += "\n" + TIMEOUT_MSG
                # Same exit code as the timeout command on linux.
                exitcode = 124
                break

            logs_all += result.stderr
            logs_all += result.stdout
            exitcode = result.returncode

            if exitcode != 0:
                break

        code_file = str(file_names[0]) if len(file_names) > 0 else None
        return CommandLineCodeResult(exit_code=exitcode, output=logs_all, code_file=code_file)

    def restart(self) -> None:
        """(Experimental) Restart the code executor."""
        warnings.warn("Restarting local command line code executor is not supported. No action is taken.")


# From stack overflow: https://stackoverflow.com/a/52087847/2214524
class _DeprecatedClassMeta(type):
    def __new__(cls, name, bases, classdict, *args, **kwargs):
        alias = classdict.get("_DeprecatedClassMeta__alias")

        if alias is not None:

            def new(cls, *args, **kwargs):
                alias = getattr(cls, "_DeprecatedClassMeta__alias")

                if alias is not None:
                    warnings.warn(
                        "{} has been renamed to {}, the alias will be "
                        "removed in the future".format(cls.__name__, alias.__name__),
                        DeprecationWarning,
                        stacklevel=2,
                    )

                return alias(*args, **kwargs)

            classdict["__new__"] = new
            classdict["_DeprecatedClassMeta__alias"] = alias

        fixed_bases = []

        for b in bases:
            alias = getattr(b, "_DeprecatedClassMeta__alias", None)

            if alias is not None:
                warnings.warn(
                    "{} has been renamed to {}, the alias will be "
                    "removed in the future".format(b.__name__, alias.__name__),
                    DeprecationWarning,
                    stacklevel=2,
                )

            # Avoid duplicate base classes.
            b = alias or b
            if b not in fixed_bases:
                fixed_bases.append(b)

        fixed_bases = tuple(fixed_bases)

        return super().__new__(cls, name, fixed_bases, classdict, *args, **kwargs)

    def __instancecheck__(cls, instance):
        return any(cls.__subclasscheck__(c) for c in {type(instance), instance.__class__})

    def __subclasscheck__(cls, subclass):
        if subclass is cls:
            return True
        else:
            return issubclass(subclass, getattr(cls, "_DeprecatedClassMeta__alias"))


class LocalCommandlineCodeExecutor(metaclass=_DeprecatedClassMeta):
    """LocalCommandlineCodeExecutor renamed to LocalCommandLineCodeExecutor"""

    _DeprecatedClassMeta__alias = LocalCommandLineCodeExecutor


class CommandlineCodeResult(metaclass=_DeprecatedClassMeta):
    """CommandlineCodeResult renamed to CommandLineCodeResult"""

    _DeprecatedClassMeta__alias = CommandLineCodeResult