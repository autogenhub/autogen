import json
import os
from typing import Any, Callable, Dict, List, Literal, Optional, Tuple, Type, TypeVar, Union

from openai.types.chat.chat_completion import ChatCompletion

import autogen
from autogen.agentchat import Agent, ConversableAgent
from autogen.function_utils import get_function_schema, load_basemodels_if_needed, serialize_to_str
from autogen.oai import OpenAIWrapper


def parse_json_object(response: str) -> dict:
    return json.loads(response)


class SwarmAgent(ConversableAgent):
    def __init__(
        self,
        name: str,
        system_message: Optional[str] = "You are a helpful AI Assistant.",
        llm_config: Optional[Union[Dict, Literal[False]]] = None,
        functions: Union[List[Callable], Callable] = None,
        is_termination_msg: Optional[Callable[[Dict], bool]] = None,
        max_consecutive_auto_reply: Optional[int] = None,
        human_input_mode: Literal["ALWAYS", "NEVER", "TERMINATE"] = "NEVER",
        description: Optional[str] = None,
        **kwargs,
    ) -> None:
        super().__init__(
            name,
            system_message,
            is_termination_msg,
            max_consecutive_auto_reply,
            human_input_mode,
            llm_config=llm_config,
            description=description,
            **kwargs,
        )
        if isinstance(functions, list):
            self.add_functions(functions)
        elif isinstance(functions, Callable):
            self.add_single_function(functions)

        self._reply_func_list.clear()
        self.register_reply([Agent, None], SwarmAgent.generate_reply_with_tool_calls)

    def update_context_variables(self, context_variables: Dict[str, Any]) -> None:
        pass

    # return str or any instance of BaseModel from pydantic

    def generate_reply_with_tool_calls(
        self,
        messages: Optional[List[Dict]] = None,
        sender: Optional[Agent] = None,
        config: Optional[OpenAIWrapper] = None,
    ) -> Tuple[bool, Union[str, Dict, None]]:

        if messages is None:
            messages = self._oai_messages[sender]

        messages = self._oai_system_message + [{"role": "user", "content": input}]
        response = self.client.create(messages=messages)

        if isinstance(response, ChatCompletion):
            response = self.client.extract_text_or_completion_object(response)
            if isinstance(response, str):
                return response
            elif isinstance(response, dict):
                _, func_response = self.generate_tool_calls_reply([response])
                return [response, func_response]
        else:
            raise ValueError("Invalid response type:", type(response))

    def add_single_function(self, func: Callable, description=""):
        func._name = func.__name__

        if description:
            func._description = description
        else:
            func._description = func.__doc__

        f = get_function_schema(func, name=func._name, description=func._description)
        self.update_tool_signature(f, is_remove=False)
        self.register_function({func._name: self._wrap_function(func)})

    def add_functions(self, func_list: List[Callable]):
        for func in func_list:
            self.add_single_function(func["func"])
