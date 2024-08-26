# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, as of August 24, 2024, before release v0.2.35.
# SPDX-License-Identifier: MIT
import time

from autogen import ConversableAgent

from ..DebugLog import Info, Warn
from .CAP2AG import CAP2AG


class Agent:
    def __init__(self, agent: ConversableAgent, counter_party_name="user_proxy", init_chat=False):
        self._agent = agent
        self._the_other_name = counter_party_name
        self._agent_adptr = CAP2AG(
            ag_agent=self._agent, the_other_name=self._the_other_name, init_chat=init_chat, self_recursive=True
        )

    def register(self, network):
        Info("Agent", f"Running Standalone {self._agent.name}")
        network.register(self._agent_adptr)

    def running(self):
        return self._agent_adptr.run
