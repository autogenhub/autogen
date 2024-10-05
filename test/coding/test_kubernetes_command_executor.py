from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from autogen.coding.base import CodeBlock
from autogen.coding.kubernetes_commandline_code_executor import KubernetesCommandLineCodeExecutor

# Begin test cases


@patch("kubernetes.client.CoreV1Api")
@patch("kubernetes.config.load_kube_config")
def test_executor_initialization(mock_load_kube_config, mock_core_v1_api):
    # Mock Kubernetes configuration loading
    mock_load_kube_config.return_value = None
    # Mock the CoreV1Api client
    mock_core_v1_api.return_value = MagicMock()

    # Initialize the executor
    executor = KubernetesCommandLineCodeExecutor(image="python:3-slim", namespace="default", timeout=60)

    # Assertions
    assert executor.image == "python:3-slim"
    assert executor.namespace == "default"
    assert executor._timeout == 60
    assert executor.pod_name == "test-pod"  # Since we didn't provide a name
    assert executor._work_dir == Path("/workspace")


def test_execute_code_blocks():
    # Mock internal methods
    with patch.object(KubernetesCommandLineCodeExecutor, "_upload_file_to_pod") as mock_upload, patch.object(
        KubernetesCommandLineCodeExecutor, "_exec_command_with_exit_code"
    ) as mock_exec:

        # Setup mocks
        mock_upload.return_value = None
        mock_exec.return_value = (0, "Hello, Kubernetes Executor!\n")

        # Create code blocks
        code_blocks = [CodeBlock(language="python", code="print('Hello, Kubernetes Executor!')")]

        # Initialize the executor
        executor = KubernetesCommandLineCodeExecutor()

        # Execute the code blocks
        result = executor.execute_code_blocks(code_blocks)

        # Assertions
        assert result.exit_code == 0
        assert result.output == "Hello, Kubernetes Executor!\n"
        assert result.code_file.startswith("/workspace/tmp_code_")
        assert result.code_file.endswith(".python")

        # Ensure the upload and exec methods were called
        mock_upload.assert_called_once()
        mock_exec.assert_called_once()


def test_execute_code_blocks_with_error():
    # Mock internal methods
    with patch.object(KubernetesCommandLineCodeExecutor, "_upload_file_to_pod") as mock_upload, patch.object(
        KubernetesCommandLineCodeExecutor, "_exec_command_with_exit_code"
    ) as mock_exec:

        # Setup mocks
        mock_upload.return_value = None
        mock_exec.return_value = (1, "SyntaxError: invalid syntax\n")

        # Create code blocks with a syntax error
        code_blocks = [CodeBlock(language="python", code="print('Hello, World!'\n")]

        # Initialize the executor
        executor = KubernetesCommandLineCodeExecutor()

        # Execute the code blocks
        result = executor.execute_code_blocks(code_blocks)

        # Assertions
        assert result.exit_code == 1
        assert result.output == "SyntaxError: invalid syntax\n"
        assert result.code_file.startswith("/workspace/tmp_code_")
        assert result.code_file.endswith(".python")

        # Ensure the upload and exec methods were called
        mock_upload.assert_called_once()
        mock_exec.assert_called_once()


def test_unsupported_language():
    # Initialize the executor
    executor = KubernetesCommandLineCodeExecutor()

    # Create code blocks with an unsupported language
    code_blocks = [CodeBlock(language="ruby", code="puts 'Hello, World!'")]

    # Execute the code blocks
    result = executor.execute_code_blocks(code_blocks)

    # Assertions
    assert result.exit_code == 1
    assert "Unsupported language ruby" in result.output


def test_no_code_blocks():
    # Initialize the executor
    executor = KubernetesCommandLineCodeExecutor()

    # Execute with no code blocks
    with pytest.raises(ValueError) as excinfo:
        executor.execute_code_blocks([])

    # Assertions
    assert "No code blocks to execute." in str(excinfo.value)


def test_timeout_handling():
    # Mock internal methods
    with patch.object(KubernetesCommandLineCodeExecutor, "_upload_file_to_pod") as mock_upload, patch.object(
        KubernetesCommandLineCodeExecutor, "_exec_command_with_exit_code"
    ) as mock_exec:

        # Setup mocks to simulate a timeout exception
        mock_upload.return_value = None
        mock_exec.side_effect = Exception("Timeout occurred")

        # Create code blocks
        code_blocks = [CodeBlock(language="python", code="while True: pass")]

        # Initialize the executor with a short timeout
        executor = KubernetesCommandLineCodeExecutor(timeout=1)

        # Execute the code blocks
        result = executor.execute_code_blocks(code_blocks)

        # Assertions
        assert result.exit_code == 124  # Exit code for timeout in Unix
        assert "Timeout occurred" in result.output


def test_restart_executor():
    # Mock internal methods
    with patch.object(KubernetesCommandLineCodeExecutor, "stop") as mock_stop, patch.object(
        KubernetesCommandLineCodeExecutor, "__init__", return_value=None
    ) as mock_init:

        # Initialize the executor
        executor = KubernetesCommandLineCodeExecutor()

        # Call restart
        executor.restart()

        # Assertions
        mock_stop.assert_called_once()
        mock_init.assert_called_once()


def test_executor_context_manager():
    # Mock the stop method
    with patch.object(KubernetesCommandLineCodeExecutor, "stop") as mock_stop:
        # Use the executor as a context manager
        with KubernetesCommandLineCodeExecutor() as executor:
            assert executor is not None

        # Ensure stop was called upon exit
        mock_stop.assert_called_once()
