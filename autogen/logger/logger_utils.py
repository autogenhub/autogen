# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Portions derived from  https://github.com/microsoft/autogen are under the MIT License.
# SPDX-License-Identifier: MIT
import datetime
import inspect
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple, Union

__all__ = ("get_current_ts", "to_dict")


def get_current_ts() -> str:
    return datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S.%f")


def try_to_dict(
    obj: Union[int, float, str, bool, Dict[Any, Any], List[Any], Tuple[Any, ...], Any], ignore_callable: bool = False
) -> Any:
    """Attempts to convert to dictionary, ensuring that all values are JSON serializable"""
    try:
        result = to_dict(obj, ignore_callable=ignore_callable)  # Attempt conversion using to_dict

        # Validate if the result is JSON serializable by attempting to dump it
        json.dumps(result)  # This will throw a TypeError or OSError if not serializable
        return result

    except (TypeError, ValueError, OSError):  # Catch JSON serialization and OSError
        # Handle non-serializable types like PosixPath or objects with missing class definitions
        if isinstance(obj, Path):
            return None  # Skip the PosixPath (or convert it with str(obj))
        elif isinstance(obj, (list, tuple)):
            return [
                try_to_dict(item, ignore_callable=ignore_callable) for item in obj
            ]  # Recursively handle lists/tuples
        elif isinstance(obj, dict):
            return {
                key: try_to_dict(value, ignore_callable=ignore_callable) for key, value in obj.items()
            }  # Recursively handle dicts
        else:
            # Fallback to string representation for unrecognized or dynamic objects
            return None  # repr(obj)


def to_dict(
    obj: Union[int, float, str, bool, Dict[Any, Any], List[Any], Tuple[Any, ...], Any],
    exclude: Tuple[str, ...] = (),
    no_recursive: Tuple[Any, ...] = (),
    ignore_callable: bool = False,
    _depth: int = 0,
    _max_depth: int = 3,  # Maximum depth to extract for log
) -> Any:
    if _depth > _max_depth:
        return None  # Maximum depth reached, stop here

    try:
        if isinstance(obj, (int, float, str, bool)):
            return obj
        elif callable(obj):
            return None if ignore_callable else inspect.getsource(obj).strip()
        elif isinstance(obj, dict):
            return {
                str(k): (
                    to_dict(str(v), ignore_callable=ignore_callable, _depth=_depth + 1)
                    if isinstance(v, no_recursive)
                    else to_dict(v, exclude, no_recursive, ignore_callable, _depth=_depth + 1)
                )
                for k, v in obj.items()
                if k not in exclude
            }
        elif isinstance(obj, (list, tuple)):
            return [
                (
                    to_dict(str(v), ignore_callable=ignore_callable, _depth=_depth + 1)
                    if isinstance(v, no_recursive)
                    else to_dict(v, exclude, no_recursive, ignore_callable, _depth=_depth + 1)
                )
                for v in obj
            ]
        elif hasattr(obj, "__dict__"):
            return {
                str(k): (
                    to_dict(str(v), ignore_callable=ignore_callable, _depth=_depth + 1)
                    if isinstance(v, no_recursive)
                    else to_dict(v, exclude, no_recursive, ignore_callable=ignore_callable, _depth=_depth + 1)
                )
                for k, v in vars(obj).items()
                if k not in exclude
            }
        else:
            return obj
    except RecursionError:
        return f"RECURSION ERROR: {type(obj).__name__}"
