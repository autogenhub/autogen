# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, as of August 24, 2024, before release v0.2.35.
# SPDX-License-Identifier: MIT
# Add autogencap to system path in case autogencap is not pip installed
# Since this library has not been published to PyPi, it is not easy to install using pip
import os
import sys

absparent = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
sys.path.append(absparent)
