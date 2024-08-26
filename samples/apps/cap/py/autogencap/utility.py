# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, as of August 24, 2024, before release v0.2.35.
# SPDX-License-Identifier: MIT
from autogencap.DebugLog import Error
from autogencap.proto.CAP_pb2 import Error as ErrorMsg
from autogencap.proto.CAP_pb2 import ErrorCode


def report_error_msg(msg: ErrorMsg, src: str):
    if msg is not None:
        err = ErrorMsg()
        err.ParseFromString(msg)
        if err.code != ErrorCode.EC_OK:
            Error(src, f"Error response: code[{err.code}] msg[{err.message}]")
