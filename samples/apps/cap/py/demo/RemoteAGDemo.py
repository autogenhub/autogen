# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, as of August 24, 2024, before release v0.2.35.
# SPDX-License-Identifier: MIT
# Start Broker & Assistant
# Start UserProxy - Let it run


def remote_ag_demo():
    print("Remote Agent Demo")
    instructions = """
    In this demo, Assistant, and UserProxy are running in separate processes.
    demo/standalone/user_proxy.py will initiate a conversation by sending UserProxy Agent a message.

    Please do the following:
    1) Start Assistant (python demo/standalone/assistant.py)
    2) Start UserProxy (python demo/standalone/user_proxy.py)
    """
    print(instructions)
    input("Press Enter to return to demo menu...")
    pass
