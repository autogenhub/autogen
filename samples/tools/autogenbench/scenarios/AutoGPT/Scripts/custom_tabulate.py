# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, as of August 24, 2024, before release v0.2.35.
# SPDX-License-Identifier: MIT
import os
import sys

from autogenbench.tabulate_cmd import default_tabulate


def main(args):
    default_tabulate(args)


if __name__ == "__main__" and __package__ is None:
    main(sys.argv)
