# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Portions derived from  https://github.com/microsoft/autogen are under the MIT License.
# SPDX-License-Identifier: MIT

# Functions to support visualisation around GraphViz and messages

import json
import re
from typing import Dict, List, Union
from uuid import uuid4

from graphviz import Digraph

from .visualise_log_classes import LogAgent, LogClient, LogEvent, LogFlow, LogInvocation

# for * imports, import all functions
__all__ = [
    "assign_agent_color",
    "darken_color",
    "extract_code_exitcode",
    "agent_id_by_name",
    "gcm_id_by_groupchat",
    "client_by_id",
    "has_agent_nodes",
    "get_agent_node_id",
    "add_node_start",
    "add_node_agent",
    "add_node_summary",
    "add_node_terminate",
    "add_node_code_execution",
    "add_node_custom_reply_func",
    "add_node_human",
    "add_node_eventflow_reply_func_executed",
    "add_node_invocation",
    "add_node_info",
    "add_agent_to_agent_edge",
    "add_agent_to_eventflow_edge",
    "add_agent_to_info_edge",
    "add_eventflow_to_eventflow_edge",
    "add_eventflow_to_node_edge",
    "add_event_to_agent_edge",
    "add_invocation_to_agent_return_edge",
    "add_invocation_to_eventflow_return_edge",
    "add_eventflow_to_agent_return_edge",
    "add_code_execution_to_agent_return_edge",
    "add_start_to_agent_edge",
    "add_invocation_to_event_edge",
    "add_agent_info_loop_edge",
    "create_tooltip",
    "truncate_string",
    "extract_invocation_response",
]


def assign_agent_color(agent_colors, agent_id) -> str:
    """Assigns a color to an agent in a deterministic order.

    Args:
        agent_colors: A dictionary mapping agent ids to their assigned colors.
        agent_name: The name of the agent to assign a color to.

    Returns:
        The color assigned to the agent.
    """
    available_colors = [
        "#FAF4D0",
        "#C0DFB7",
        "#EDB7AD",
        "#FBDBD5",
        "#E4EEE9",
        "#CDD5C6",
        "#A9C9D4",
        "#E8C4C6",
        "#EBCFB9",
        "#FF0080",
        "#808080",
        "#ADD8E6",
        "#90EE90",
        "#FFFFE0",
    ]
    color_index = len(agent_colors) % len(available_colors)  # Cycle through colors
    color = available_colors[color_index]
    agent_colors[agent_id] = color
    return color


def darken_color(color, amount=0.1):
    """Darkens a color by a given amount.

    Args:
        color: The color to darken, as a hex string (e.g., '#FF0000').
        amount: The amount to darken (0.0 - 1.0). 0.0 is no change, 1.0 is maximum darkness.

    Returns:
        The darkened color as a hex string.
    """
    c = int(color[1:], 16)
    r = max(0, int((c >> 16) - (255 * amount)))  # Clamp to 0
    g = max(0, int(((c >> 8) & 0xFF) - (255 * amount)))  # Clamp to 0
    b = max(0, int((c & 0xFF) - (255 * amount)))  # Clamp to 0
    return f"#{r:02X}{g:02X}{b:02X}"


def extract_code_exitcode(log_message: str) -> int:
    """Extracts the exitcode from a log message. The format is 'exitcode: 1'"""
    match = re.search(r"exitcode:\s*(\d+)", log_message)
    if match:
        exit_code = int(match.group(1))
        return exit_code
    else:
        print("Unable to extract exitcode.")
        return -1  # Unknown


def agent_id_by_name(agents: Dict[int, LogAgent], agent_name: str) -> int:
    """Retrieves an agent id by their name"""
    for agent in agents.values():
        if agent.agent_name == agent_name:
            return agent.id

    raise Exception(f"Unknown agent, name: {agent_name}")


def gcm_id_by_groupchat(agents: Dict[int, LogAgent], groupchat_unique_id: str) -> int:
    """Retrieves the groupchat manager for a groupchat"""
    for agent in agents.values():
        if (
            agent.agent_type == "GroupChatManager"
            and "groupchat" in agent.args
            and "_unique_id" in agent.args["groupchat"]
            and agent.args["groupchat"]["_unique_id"] == groupchat_unique_id
        ):
            return agent.id

    raise Exception(f"Couldn't find GroupChat Manager for GroupChat with unique_id: {groupchat_unique_id}")


def client_by_id(
    clients: Dict[int, LogClient], wrapper_clients: Dict[int, List], client_id: int, wrapper_id: int
) -> LogClient:
    """Retrieves a client by id. If it can't find it, look up a client based on the wrapper_id"""
    if client_id in clients:
        return clients[client_id]
    elif wrapper_id in wrapper_clients:
        return clients[wrapper_clients[wrapper_id][0]]  # Return the first client in the wrapper
    else:
        raise Exception(
            f"Unknown client, id: {client_id}. Additionally, can't find other clients with wrapper_id: {wrapper_id}"
        )


def has_agent_nodes(agents: Dict[int, LogAgent]):
    """Are there agent nodes"""

    for agent in agents.values():
        if len(agent.visualization_params) != 0:
            if agent.visualization_params["index"] != 0:
                return True

    return False


def get_agent_node_id(agent: LogAgent) -> str:
    """Gets the unique node id for an agent node"""
    return f"{agent.id}_{agent.visualization_params['index']}"


def format_tooltip(tooltip: str) -> str:
    """Validates that a tooltip is valid, particularly the length which can't be more than 16K"""
    if len(tooltip) > 16384:
        return tooltip[:16384]
    else:
        return tooltip


def add_node_start(design_config: Dict, dot: Digraph):

    dot.node(
        "start",
        "START",
        color=design_config["start_border_color"],
        style="filled",
        fillcolor=design_config["start_bg"],
        fontcolor=design_config["start_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )


def add_node_agent(design_config: Dict, agents: Dict[int, LogAgent], dot: Digraph, agent: LogAgent):
    """Add an agent node to the diagram"""

    starting_point = not has_agent_nodes(agents)

    # Increment the index of the agent
    agent.visualization_params["index"] = agent.visualization_params["index"] + 1

    # Create a unique node id
    node_id = get_agent_node_id(agent)

    if starting_point:
        # If this is the start of the program, add a start node first and then link to it once we have the agent node
        add_node_start(design_config, dot)

    # Add the node to the diagram
    color = agent.visualization_params["color"]
    dot.node(
        node_id,
        f"{agent.agent_name} ({agent.visualization_params['index']})",
        shape=design_config["node_shape"]["agent"],
        color=darken_color(color, 0.2),
        style="filled",
        fillcolor=color,
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )

    if starting_point:
        # Link the start to the agent
        add_start_to_agent_edge(design_config, dot, agent)


def add_node_summary(design_config: Dict, dot: Digraph, eventflow: Union[LogEvent | LogFlow]):
    """Add a summary node to the diagram"""

    dot.node(
        _get_eventflow_id(eventflow),
        "Summarize",
        shape=design_config["node_shape"]["summary"],
        color=design_config["border_color"],
        style="filled",
        fillcolor=design_config["fill_color"],
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )


def add_node_terminate(design_config: Dict, dot: Digraph, eventflow: Union[LogEvent | LogFlow]):
    """Add a termination node to the diagram"""

    dot.node(
        _get_eventflow_id(eventflow),
        "Termination",
        shape=design_config["node_shape"]["terminate"],
        color=design_config["border_color"],
        style="filled",
        fillcolor=design_config["fill_color"],
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )


def add_node_code_execution(
    design_config: Dict, dot: Digraph, event: LogEvent, exitcode: int, tooltip_text: str = "", href_text: str = ""
):
    """Add a code execution node to the diagram"""

    edge_color = design_config["edge_success_color"] if exitcode == 0 else design_config["edge_unsuccessful_color"]

    dot.node(
        event.event_id,
        "Code Execution",
        shape=design_config["node_shape"]["code_execution"],
        tooltip=format_tooltip(tooltip_text),
        href_text=href_text,
        color=edge_color,
        style="filled",
        fillcolor=design_config["fill_color"],
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )


def add_node_custom_reply_func(design_config: Dict, dot: Digraph, event: LogEvent, reply_func_name: str):
    """Add a custom reply function event node to the diagram"""

    dot.node(
        event.event_id,
        reply_func_name,
        shape=design_config["node_shape"]["custom_reply_func"],
        color=design_config["border_color"],
        style="filled",
        fillcolor=design_config["fill_color"],
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )


def add_node_human(design_config: Dict, dot: Digraph, event: LogEvent):
    """Add a human input node to the diagram"""

    dot.node(
        event.event_id,
        "Human Reply",
        shape=design_config["node_shape"]["human"],
        color=design_config["border_color"],
        style="filled",
        fillcolor=design_config["fill_color"],
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )


def add_node_eventflow_reply_func_executed(
    design_config: Dict, dot: Digraph, eventflow: Union[LogEvent | LogFlow], label: str, shape_name: str
):
    """Add an event node to the diagram"""

    dot.node(
        _get_eventflow_id(eventflow),
        label,
        shape=shape_name,
        color=design_config["border_color"],
        style="filled",
        fillcolor=design_config["fill_color"],
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )


def add_node_invocation(
    design_config: Dict,
    clients: Dict[int, LogClient],
    wrapper_clients: Dict[int, List],
    dot: Digraph,
    invocation: LogInvocation,
):
    """Add an invocation node to the diagram"""

    client_name = client_by_id(clients, wrapper_clients, invocation.client_id, invocation.wrapper_id).class_name

    dot.node(
        invocation.invocation_id,
        client_name,
        shape=design_config["node_shape"]["invocation"],
        color=design_config["border_color"],
        style="filled",
        fillcolor=design_config["fill_color"],
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )


def add_node_info(design_config: Dict, dot: Digraph, label: str) -> str:
    """Add an info node to the diagram an returns the name of the node"""

    new_id = str(uuid4())

    dot.node(
        new_id,
        label,
        shape=design_config["node_shape"]["info"],
        color=design_config["border_color"],
        style="filled",
        fillcolor=design_config["fill_color"],
        fontcolor=design_config["node_font_color"],
        fontname=design_config["font_names"],
        penwidth=design_config["node_pen_width"],
    )

    return new_id


def add_agent_to_agent_edge(
    design_config: Dict,
    agents: Dict[int, LogAgent],
    dot: Digraph,
    sender_agent: LogAgent,
    recipient_agent: LogAgent,
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
    dir: str = "forward",
    style: str = "solid",
):
    """Adds an edge between nodes"""

    # Ensure the agent nodes exist (e.g. they aren't index 0)
    if sender_agent.visualization_params["index"] == 0:
        add_node_agent(design_config, agents, dot, sender_agent)

    if recipient_agent.visualization_params["index"] == 0:
        add_node_agent(design_config, agents, dot, recipient_agent)

    dot.edge(
        get_agent_node_id(sender_agent),
        get_agent_node_id(recipient_agent),
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        dir=dir,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
        style=style,
    )


def add_agent_to_eventflow_edge(
    design_config: Dict,
    dot: Digraph,
    agent: LogAgent,
    eventflow: Union[LogEvent | LogFlow],
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
):
    """Adds an edge between an agent and an event"""

    dot.edge(
        get_agent_node_id(agent),
        _get_eventflow_id(eventflow),
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
    )


def add_agent_to_info_edge(
    design_config: Dict,
    dot: Digraph,
    agent: LogAgent,
    node_id: str,
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
):
    """Adds an edge between an agent and an event"""

    dot.edge(
        get_agent_node_id(agent),
        node_id,
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
    )


def add_eventflow_to_eventflow_edge(
    design_config: Dict,
    dot: Digraph,
    eventflow_one: Union[LogEvent | LogEvent],
    eventflow_two: Union[LogEvent | LogEvent],
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
):
    """Adds an edge between two events"""

    dot.edge(
        _get_eventflow_id(eventflow_one),
        _get_eventflow_id(eventflow_two),
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
    )


def add_eventflow_to_node_edge(
    design_config: Dict,
    dot: Digraph,
    eventflow: Union[LogEvent | LogFlow],
    node_id: str,
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
):
    """Adds an edge between an event and a node"""

    dot.edge(
        _get_eventflow_id(eventflow),
        node_id,
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
    )


def add_event_to_agent_edge(
    design_config: Dict,
    dot: Digraph,
    event: LogEvent,
    agent: LogAgent,
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
):
    """Adds an edge between an event and an agent"""

    dot.edge(
        event.event_id,
        get_agent_node_id(agent),
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
    )


def add_invocation_to_agent_return_edge(
    design_config: Dict,
    dot: Digraph,
    agent: LogAgent,
    invocation: LogInvocation,
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
):
    """Adds an edge between agent and invocation and a return edge"""

    dot.edge(
        get_agent_node_id(agent),
        invocation.invocation_id,
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
    )
    dot.edge(invocation.invocation_id, get_agent_node_id(agent), color=design_config["edge_color"])


def add_invocation_to_eventflow_return_edge(
    design_config: Dict,
    dot: Digraph,
    eventflow: Union[LogEvent | LogFlow],
    invocation: LogInvocation,
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
):
    """Adds an edge between event and invocation and a return edge"""

    dot.edge(
        _get_eventflow_id(eventflow),
        invocation.invocation_id,
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
    )
    dot.edge(invocation.invocation_id, _get_eventflow_id(eventflow), color=design_config["edge_color"])


def add_eventflow_to_agent_return_edge(
    design_config: Dict,
    dot: Digraph,
    agent: LogAgent,
    eventflow: Union[LogEvent | LogFlow],
    edge_text: str,
    tooltip_text: str = "",
    href_text: str = "",
):
    """Adds an edge between agent and event/flow and a return edge"""

    dot.edge(
        get_agent_node_id(agent),
        _get_eventflow_id(eventflow),
        label=edge_text,
        labeltooltip=format_tooltip(tooltip_text),
        labelhref=href_text,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        color=design_config["edge_color"],
        fontname=design_config["font_names"],
    )
    dot.edge(_get_eventflow_id(eventflow), get_agent_node_id(agent), color=design_config["edge_color"])


def add_code_execution_to_agent_return_edge(
    design_config: Dict, dot: Digraph, agent: LogAgent, event: LogEvent, exitcode: int
):
    """Adds an edge between agent and code execution and a return edge with result information"""

    label_text = "Success" if exitcode == 0 else "Unsuccessful"
    edge_color = design_config["edge_success_color"] if exitcode == 0 else design_config["edge_unsuccessful_color"]

    dot.edge(
        event.event_id,
        get_agent_node_id(agent),
        label=label_text,
        color=edge_color,
        labeldistance=design_config["label_distance"],
        fontcolor=design_config["font_color"],
        fontname=design_config["font_names"],
        dir="both",
    )


def add_start_to_agent_edge(design_config: Dict, dot: Digraph, agent: LogAgent):
    """Adds an edge from the start node to an agent"""

    dot.edge("start", get_agent_node_id(agent), color=design_config["edge_color"])


def add_invocation_to_event_edge(
    design_config: Dict, dot: Digraph, event: LogEvent, invocation: LogInvocation, label: str
):
    """Adds an edge between an event and an invocation"""

    dot.edge(event.event_id, invocation.invocation_id, label, color=design_config["edge_color"])


def add_agent_info_loop_edge(
    design_config: Dict, dot: Digraph, agent: LogAgent, edge_text: str, tooltip_text: str = "", href_text: str = ""
):
    """Adds an information-only loop edge to/from an agent"""

    dot.edge(get_agent_node_id(agent), get_agent_node_id(agent), label=edge_text, color=design_config["edge_color"])


def create_tooltip(message):
    """Create tool tips based on a message"""
    if isinstance(message, str):
        return message
    elif isinstance(message, dict):
        if isinstance(message["content"], list):
            # If it's a list, just serialise it
            return str(message["content"])
        else:
            tooltip_text = message["content"] if message["content"] else ""
            if "tool_calls" in message and message["tool_calls"] is not None:
                for tool_call in message["tool_calls"]:
                    tooltip_text += f"\nTool call: {json.dumps(tool_call['function'])}"
        return tooltip_text
    else:
        return "Unable to create tooltip"


def truncate_string(string, max_length):
    """Keeps string lengths to a max length"""
    if len(string) <= max_length:
        return string
    else:
        return string[: max_length - 3] + "..."


def extract_invocation_response(invocation: LogInvocation) -> str:
    """Extract an invocation's response and return as a string"""

    if "ChatCompletionMessage" in invocation.response:
        pattern = r'ChatCompletionMessage\(content=(\'|")(.+?)(?<!\\)\1(?=,\s*refusal)'
        match = re.search(pattern, invocation.response, re.DOTALL)
        if match:
            content = match.group(2)
            # Unescape quotes and newlines
            content = content.replace('\\"', '"').replace("\\'", "'").replace("\\n", "\n")
            return content

    return str(invocation.response)


def _get_eventflow_id(eventflow: Union[LogEvent | LogFlow]):
    """Returns the event or flow id"""
    return eventflow.event_id if isinstance(eventflow, LogEvent) else eventflow.flow_id
