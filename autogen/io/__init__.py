# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, as of August 24, 2024, before release v0.2.35.
# SPDX-License-Identifier: MIT
from .base import InputStream, IOStream, OutputStream
from .console import IOConsole
from .websockets import IOWebsockets

# Set the default input/output stream to the console
IOStream.set_global_default(IOConsole())
IOStream.set_default(IOConsole())

__all__ = ("IOConsole", "IOStream", "InputStream", "OutputStream", "IOWebsockets")
