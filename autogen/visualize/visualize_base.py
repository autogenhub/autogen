# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Portions derived from  https://github.com/microsoft/autogen are under the MIT License.
# SPDX-License-Identifier: MIT
import json
from datetime import datetime
from typing import Any, Dict


class LogBase:
    def __init__(self):
        pass


class LogSession(LogBase):
    def __init__(self, session_id: str):
        super().__init__()
        self.session_id = session_id


class LogClient(LogBase):
    def __init__(
        self,
        client_id: int,
        wrapper_id: int,
        session_id: str,
        class_name: str,
        json_state: str,
        timestamp: str,
        thread_id: int,
        is_custom_class: bool,
    ):
        super().__init__()
        self.client_id = client_id
        self.wrapper_id = wrapper_id
        self.session_id = session_id
        if class_name.endswith("Client"):
            self.class_name = class_name.replace("Client", "")
        else:
            self.class_name = class_name
        self.json_state = json_state
        self.timestamp = timestamp
        self.thread_id = thread_id
        self.is_custom_class = is_custom_class

    def __str__(self):
        return f"Client ({self.client_id}) - {self.class_name}"


class LogAgent(LogBase):
    def __init__(
        self,
        id: int,
        agent_name: str,
        wrapper_id: int,
        session_id: str,
        current_time: str,
        agent_type: str,
        args: Dict,
        thread_id: int,
    ):
        super().__init__()
        self.id = id
        self.agent_name = agent_name
        self.wrapper_id = wrapper_id
        self.session_id = session_id
        self.current_time = current_time
        self.current_timestamp = datetime.fromisoformat(current_time).timestamp()
        self.agent_type = agent_type
        self.args = args
        self.thread_id = thread_id

        # Group chat object for a group chat manager
        if self.agent_type == "GroupChatManager" and "self" in args and "_groupchat_sourceid" in args["self"]:
            self.groupchat_source_id = self.args["self"]["_groupchat_sourceid"]
        else:
            self.groupchat_source_id = None

        self.visualization_params = {}  # For tracking colours and what index we're up to

    def __str__(self):
        return f"Agent ({self.id}) - {self.agent_name}"


class LogEvent(LogBase):
    def __init__(
        self,
        source_id: int,
        source_name: str,
        event_name: str,
        agent_module: str,
        agent_class: str,
        json_state: str,
        timestamp: str,
        thread_id: int,
    ):
        super().__init__()
        self.event_id = _get_id_str(timestamp)
        self.source_id = source_id
        self.source_name = source_name
        self.event_name = event_name
        self.agent_module = agent_module
        self.agent_class = agent_class
        self.json_state = json.loads(json_state) if json_state else "{}"
        self.timestamp = _to_unix_timestamp(timestamp)
        self.thread_id = thread_id

        """ SAMPLE LOG ENTRIES

        event_name == "received_message"
            # json_state
            # '{"message": "We\'re launching a new drink, it\'s flavoured like water and is called \'h2-oh\'.\\nKey facts are:\\n- No calories, sugar-free\\n- Can be enjoyed hot or cold\\n- No expiry date\\n- One ingredient, water\\n\\nTargeted to everyone.\\n\\nPlease prepare a brief with this structure:\\nA. Taglines:\\n\\nB. Short-form video summary:\\n\\nC. Alternative product names:\\n", "sender": "user_proxy", "valid": true}'

        event_name == "reply_func_executed"
            # json_state
            # '{"reply_func_module": "autogen.agentchat.conversable_agent", "reply_func_name": "check_termination_and_human_reply", "final": false, "reply": null}'
            # '{"reply_func_module": "autogen.agentchat.conversable_agent", "reply_func_name": "generate_function_call_reply", "final": false, "reply": null}'
            # '{"reply_func_module": "autogen.agentchat.conversable_agent", "reply_func_name": "generate_tool_calls_reply", "final": false, "reply": null}'
            # '{"reply_func_module": "autogen.agentchat.conversable_agent", "reply_func_name": "generate_oai_reply", "final": true, "reply": {"content": "Agency Red: \\n\\nHere\'s our pitch for the \'h2-oh\' campaign:\\n\\n**A. Taglines:**\\n1. \\"Pure, Simple, Refreshing\\"\\n2. \\"Water, Evolved.\\"\\n3. \\"The Drink that\'s Still Water.\\"\\n\\n**B. Short-form video summary:** \\n(60-second spot)\\n\\n[Scene 1: Close-up of a person taking a sip from a glass of \'h2-oh\']\\nNarrator (Voiceover): \\"We drink it every day, but never truly see it.\\"\\n[Scene 2: A splashy montage of people drinking \'h2-oh\' in different settings]\\nNarrator (Voiceover): \\"Introducing h2-oh, water that\'s still water.\\"\\n[Scene 3: Close-up of the \'h2-oh\' bottle with the label and tagline on screen]\\nNarrator (Voiceover): \\"No calories, no sugar, just pure refreshment.\\"\\n[Scene 4: People enjoying \'h2-oh\' hot and cold]\\nNarrator (Voiceover): \\"Enjoy it hot or cold, whenever you need it.\\"\\n[Scene 5: Close-up of the person taking a sip again with a satisfied expression]\\nNarrator (Voiceover): \\"Experience water, reimagined.\\"\\n\\n**C. Alternative product names:**\\n1. AquaFresh\\n2. Purezza\\n3. HydroFlow", "refusal": null, "role": "assistant", "function_call": null, "tool_calls": null}}'
        """

    def __str__(self):
        return (
            f"Event ({self.timestamp}) - {self.source_name}, {self.event_name}, {self.agent_module}, {self.agent_class}"
        )


class LogFlow(LogBase):
    def __init__(
        self,
        source_id: int,
        source_name: str,
        code_point: str,
        code_point_id: str,
        info: str,
        timestamp: str,
        thread_id: int,
    ):
        super().__init__()
        self.flow_id = _get_id_str(timestamp)
        self.source_id = source_id
        self.source_name = source_name
        self.code_point = code_point
        self.code_point_id = code_point_id
        self.info = json.loads(info) if info else "{}"
        self.timestamp = _to_unix_timestamp(timestamp)
        self.thread_id = thread_id

        """ SAMPLE LOG ENTRIES

        code_point == "_summary_from_nested_chat start"
            # "nested_chat_id": "7cadd935-2408-4a6b-90e1-06a8b25b1a82"
            # info
            # '{"chat_queue": [{"recipient": "<<non-serializable: ConversableAgent>>", "message": "<<non-serializable: function>>", "summary_method": "last_msg", "max_turns": 1}], "sender": "agency_red"}'

        code_point == "_summary_from_nested_chat end"
            # "nested_chat_id": "7cadd935-2408-4a6b-90e1-06a8b25b1a82"

        code_point == "generate_tool_calls_reply"
            # info
            # {"tool_call_id": "ollama_manual_func_1546", "function_name": "currency_calculator", "function_arguments": "{\"base_amount\": 123.45, \"base_currency\": \"EUR\", \"quote_currency\": \"USD\"}", "return_value": "135.80 USD", "sender": "chatbot"}
        """

    def __str__(self):
        return f"Flow ({self.timestamp}) - {self.source_name}, {self.code_point}, {self.code_point_id}"


class LogInvocation(LogBase):
    def __init__(
        self,
        invocation_id: str,
        client_id: int,
        wrapper_id: int,
        request: Dict,
        response: Any,
        is_cached: int,
        cost: float,
        start_time: str,
        end_time: str,
        thread_id: int,
        source_name: str,
    ):
        super().__init__()
        self.invocation_id = invocation_id
        self.client_id = client_id
        self.wrapper_id = wrapper_id
        self.request = request
        self.response = response
        self.is_cached = is_cached
        self.cost = cost
        self.start_time = start_time
        self.end_time = end_time
        self.thread_id = thread_id
        self.source_name = source_name

    def __str__(self):
        return f"Invocation ({self.invocation_id})"


# Timestamp will be key, convert to a number
def _to_unix_timestamp(timestamp_str: str) -> float:
    """Convert unix timestamp to a float number"""
    dt = datetime.fromisoformat(timestamp_str)
    return dt.timestamp()


def _get_id_str(timestamp_str: str) -> str:
    """Convert timestamp string to a float then to a string"""
    id = str(_to_unix_timestamp(timestamp_str))
    return id
