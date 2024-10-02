# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Portions derived from  https://github.com/microsoft/autogen are under the MIT License.
# SPDX-License-Identifier: MIT

import re
from typing import Dict, List, Union
from uuid import uuid4

from graphviz import Digraph

from ..logger import FileLogger, SqliteLogger
from .visualise_log_classes import LogAgent, LogClient, LogEvent, LogFlow, LogInvocation, LogSession
from .visualise_process_log import load_log_file
from .visualise_utils import (
    add_agent_to_agent_edge,
    add_agent_to_eventflow_edge,
    add_agent_to_info_edge,
    add_code_execution_to_agent_return_edge,
    add_eventflow_to_agent_return_edge,
    add_eventflow_to_eventflow_edge,
    add_eventflow_to_node_edge,
    add_invocation_to_agent_return_edge,
    add_invocation_to_eventflow_return_edge,
    add_node_agent,
    add_node_code_execution,
    add_node_custom_reply_func,
    add_node_eventflow_reply_func_executed,
    add_node_human,
    add_node_info,
    add_node_invocation,
    add_node_start,
    add_node_summary,
    add_node_terminate,
    agent_id_by_name,
    assign_agent_color,
    create_tooltip,
    darken_color,
    extract_code_exitcode,
    extract_invocation_response,
    gcm_id_by_groupchat,
    truncate_string,
)


class Visualize:
    def __init__(self, log_source: Union[str, FileLogger, SqliteLogger]) -> None:
        """Visualizes an AutoGen workflow

        Uses an AutoGen log or logger to create a diagram. Uses GraphViz engine for diagram production.

        Args:
            log_source (Union[str, BaseLogger]):    A string with a path/filename to a text log file or a Logger object based on BaseLogger
        """

        self.log_source = log_source

        if isinstance(log_source, str):
            self.source = "logfile"
        elif isinstance(log_source, FileLogger):

            if len(log_source.logger.handlers) != 0:
                raise Exception("File logging must be stopped for visualization.")

            self.source = "filelogger"
        elif isinstance(log_source, SqliteLogger):
            self.source = "sqlitelogger"
        else:
            raise Exception("Invalid log source.")

        # Colours, fonts, shapes
        # Future work to be able to provide your own style
        # Shapes: https://graphviz.org/doc/info/shapes.html
        self.design_config: Dict = {
            "canvas_replace_bg": "#123456",  # Note: colour will be replaced by "url(#bg_pattern)" which is a pattern defined in the SVG (added post-creation). Colour should be unique.
            "canvas_pattern_bg": "#222222",
            "canvas_pattern_color": "#2A2A2A",
            "nested_bg": "#18184F",
            "groupchat_bg": "#004F4F",
            "start_bg": "#222222",
            "start_font_color": "#FFFFFF",
            "start_border_color": "#6666FF",
            "fill_color": "#DDFFF7",
            "border_color": "#00BE92",
            "font_color": "#FAFAFA",
            "node_font_color": "#222222",
            "edge_color": "#6666FF",
            "edge_success_color": "#00FF00",
            "edge_unsuccessful_color": "#FF0000",
            "edge_style": "solid",
            "edge_style_silent": "dashed",
            "font_names": "Helvetica, DejaVu Sans, Arial, Courier, sans-serif",
            "label_distance": "5.0",
            "node_pen_width": "3.0",
            "node_shape": {
                "agent": "oval",
                "summary": "parallelogram",
                "terminate": "octagon",
                "invocation": "invhouse",
                "info": "note",
                "code_execution": "cds",
                "custom_reply_func": "septagon",
                "human": "Mdiamond",
            },
        }

    def create_svg(self, output_path_filename: str, cleanup: bool = True):
        """Creates a diagram in SVG format

        Args:
            path_filename (str):    Path and Filename to create. Removes .svg if it exists (as GraphViz adds it)
            cleanup (bool):         Remove the GraphViz DOT file (which is created alongside the SVG)
        """

        # Append .svg if needed
        if output_path_filename.lower().endswith(".svg"):
            output_path_filename = output_path_filename[:-4]

        # Ensure the file exists

        # Objects to populate from log
        clients: Dict[int, LogClient] = {}
        agents: Dict[int, LogAgent] = {}
        events: Dict[float, LogEvent] = {}
        flows: Dict[float, LogFlow] = {}
        invocations: Dict[str, LogInvocation] = {}
        all_ordered: List[LogClient | LogAgent | LogEvent | LogFlow | LogInvocation | LogSession] = []

        # Keep track of wrapper_ids and client_ids, this can help us reconcile when a client_id doesn't exist we can use a previous client with the same wrapper
        wrapper_clients: Dict[int, List] = {}

        if self.source == "logfile" or self.source == "filelogger":

            load_log_file(
                self.log_source if self.source == "logfile" else self.log_source.log_file,
                clients,
                wrapper_clients,
                agents,
                events,
                flows,
                invocations,
                all_ordered,
            )

            # Visualise the logs
            final_dot = self.visualize_execution(
                clients, wrapper_clients, agents, events, flows, invocations, all_ordered
            )

            # Render the diagram to file
            file_path = final_dot.render(filename=output_path_filename, format="svg", cleanup=cleanup)

            # Post-visualisation, add background, bold content with anchors
            self.svg_post_process(file_path)
        else:
            raise "Sorry, only supporting text log files for now"

    def svg_post_process(self, output_path_filename: str):
        """Post-processing the SVG, adding the background pattern

        Args:
            output_path_filename (str): SVG file to process
        """

        background_pattern = (
            '<pattern height="40" width="40" id="bg_pattern" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="40" height="40" fill="'
            + self.design_config["canvas_pattern_bg"]
            + '" /><circle cx="15" cy="15" r="14" stroke="'
            + self.design_config["canvas_pattern_color"]
            + '" stroke-width="1" fill="none" /><text x="7" y="19" font-family="Arial" font-size="12" fill="'
            + self.design_config["canvas_pattern_color"]
            + '">AG</text></pattern>'
        )

        # Read the original SVG content
        with open(output_path_filename, "r") as file:
            svg_content = file.read()

        # Check if <defs> tag exists, if not, insert it before the closing </svg> tag
        if "<defs>" not in svg_content:
            insert_position = svg_content.find("</svg>")
            if insert_position == -1:
                raise ValueError("Invalid SVG file: no closing </svg> tag found.")

            # Add <defs> section and new content
            defs_section = f"<defs>{background_pattern}</defs>\n"
            updated_svg = svg_content[:insert_position] + defs_section + svg_content[insert_position:]
        else:
            # If <defs> exists, insert the content inside it
            insert_position = svg_content.find("</defs>") + len("</defs>")
            updated_svg = svg_content[:insert_position] + background_pattern + svg_content[insert_position:]

        # Update the background fill
        updated_svg = updated_svg.replace(self.design_config["canvas_replace_bg"], "url(#bg_pattern)")

        # Bold text with anchors
        updated_svg = Visualize.svg_highlight_anchors(updated_svg)

        # Write the updated SVG content to a new file or overwrite the original
        with open(output_path_filename, "w") as file:
            file.write(updated_svg)

    @staticmethod
    def svg_highlight_anchors(svg_string: str):
        """Bolds text within anchors and changes cursor to pointer - to indicate hover over

        Args:
            svg_string (str):   SVG file content
        """

        def modify_anchor_and_text(match):
            a_tag = match.group(1)
            text_tag = match.group(2)
            closing_a = match.group(3)

            # Add cursor: pointer to the anchor tag if it's not already there
            if "style" not in a_tag:
                a_tag = a_tag.replace(">", ' style="cursor: pointer;">', 1)
            elif "cursor: pointer" not in a_tag:
                a_tag = a_tag.replace('style="', 'style="cursor: pointer; ', 1)

            # Add font-weight: bold to the text tag if it's not already there
            if "font-weight" not in text_tag:
                text_tag = text_tag.replace("<text", '<text font-weight="bold"', 1)

            return a_tag + text_tag + closing_a

        pattern = r"(<a[^>]*>)([\s\S]*?<text[\s\S]*?</text>)([\s\S]*?</a>)"
        return re.sub(pattern, modify_anchor_and_text, svg_string)

    def visualize_execution(
        self,
        clients: Dict[int, LogClient],
        wrapper_clients: Dict[int, List],
        agents: Dict[int, LogAgent],
        events: Dict[float, LogEvent],
        flows: Dict[float, LogFlow],
        invocations: Dict[str, LogInvocation],
        all_ordered: List[LogClient | LogAgent | LogEvent | LogInvocation | LogSession],
    ) -> Digraph:
        """Create the diagram of the program execution

        Args:
            clients (Dict[int, LogClient]):             Log clients
            wrapper_clients (Dict[int, List]):          Log wrapper / clients
            agents (Dict[int, LogAgent]):               log agents
            events (Dict[float, LogEvent]):             Log events
            flows (Dict[float, LogFlow]):               Log flows
            invocations (Dict[str, LogInvocation]):     Log invocations
            all_orderedList ([LogClient | LogAgent | LogEvent | LogFlow | LogInvocation | LogSession]):   All log objects in order

        Returns:
            A GraphViz digraph
        """

        def summary_text(summary: Union[str, dict]) -> str:
            """Returns the summary text for a summary result"""

            if isinstance(summary, str):
                return summary
            elif isinstance(summary, dict):
                if "summary" in summary:
                    return summary["summary"]["content"]
                elif "content" in summary:
                    return summary["content"]
                else:
                    raise "Can't summarise!"
            else:
                raise "Can't summarise"

        def create_nested_digraph(nested_chat_node_name: str, label: str, color: str) -> Digraph:
            """Creates a nested digraph"""
            nested_graph = Digraph(nested_chat_node_name)
            nested_graph.attr(
                style="rounded, filled",
                color=darken_color(color, 0.1),
                fillcolor=color,
                label=label,
                labeljust="r",
                labelloc="b",
                penwidth="5",
                margin="35",
                fontcolor=self.design_config["font_color"],
                fontname=self.design_config["font_names"],
            )
            return nested_graph

        def process_level(
            top_level: bool,
            current_level: Digraph,
            level_id: str,
            items: List,
            start_index: int,
            current_nested_chat_id: str,
            parent_agent: LogAgent,
        ) -> int:
            current_agent: LogAgent = None
            last_termination: LogEvent = None
            # last_nested_summarize_level_and_event: List[Digraph, LogEvent] = None
            available_invocations = []
            last_nested_agent: LogAgent = (
                None  # Coming out of a nested chat, we track the last agent to see if we link to it on the next event
            )

            i = start_index
            while i < len(items):
                item = items[i]

                if isinstance(item, LogClient):
                    client: LogClient = item

                    # For each client, add the client_id to the wrapper dictionary so we can resolve any client_ids that don't appear in the log file
                    # Can occur with group chat's inner auto speaker select chat
                    if client.wrapper_id in wrapper_clients:
                        wrapper_clients[client.wrapper_id].append(client.client_id)
                    else:
                        wrapper_clients[client.wrapper_id] = [client.client_id]

                elif isinstance(item, LogAgent):
                    agent: LogAgent = agents[item.id]

                    # Assign an number to the agent as we'll be repeating the agent throughout the diagram
                    # Every new instance will have an incremented number
                    if "index" not in agent.visualization_params:
                        agent.visualization_params["index"] = 0

                    # Assign a colour to the agent
                    if agent.id not in agent_colors:
                        assign_agent_color(agent_colors, agent.id)
                        agent.visualization_params["color"] = agent_colors[agent.id]

                elif isinstance(item, LogFlow):
                    flow: LogFlow = item

                    if flow.code_point == "_summary_from_nested_chat start":
                        # Start of a nested chat

                        nested_chat_id = flow.code_point_id
                        next_level_id = str(uuid4())
                        nested_chat_node_name = f"cluster_{next_level_id}"

                        new_nested = create_nested_digraph(
                            nested_chat_node_name, "Nested Chat", self.design_config["nested_bg"]
                        )

                        nested_chats[nested_chat_id] = {
                            "type": "Nested Chat",
                            "edge_label": "Nested Chat",
                            "level_index": next_level_id,
                            "parent_agent_node_id": agent_id_by_name(agents, flow.source_name),
                            "nested_chat_node_name": nested_chat_node_name,
                            "linked_to_parent_agent_node": False,
                        }
                        nested_graphs[next_level_id] = new_nested

                        i, last_nested_agent = process_level(
                            False, new_nested, next_level_id, items, i + 1, nested_chat_id, current_agent
                        )
                        current_level.subgraph(new_nested)
                        continue

                    elif flow.code_point in [
                        "_auto_select_speaker start",
                        "a_auto_select_speaker start",
                    ]:
                        # Start of a group chat auto select speaker

                        nested_chat_id = flow.code_point_id
                        next_level_id = str(uuid4())
                        nested_chat_node_name = f"cluster_{next_level_id}"

                        new_nested = create_nested_digraph(
                            nested_chat_node_name, "Group Chat Auto Select Speaker", self.design_config["groupchat_bg"]
                        )

                        nested_chats[nested_chat_id] = {
                            "type": "Group Chat",
                            "edge_label": "Auto Select Speaker",
                            "level_index": next_level_id,
                            "parent_agent_node_id": agent_id_by_name(agents, flow.info["selector"]),
                            "nested_chat_node_name": nested_chat_node_name,
                            "linked_to_parent_agent_node": False,
                        }
                        nested_graphs[next_level_id] = new_nested

                        i, last_nested_agent = process_level(
                            False, new_nested, next_level_id, items, i + 1, nested_chat_id, current_agent
                        )
                        current_level.subgraph(new_nested)
                        continue

                    elif flow.code_point in [
                        "_summary_from_nested_chat end",
                        "_auto_select_speaker end",
                        "a_auto_select_speaker end",
                    ]:

                        # End the nested chat
                        return i + 1, current_agent

                    elif flow.code_point == "_initiate_chat max_turns":

                        # Maximum turns hit, add a termination node
                        add_node_terminate(self.design_config, current_level, flow)

                        # Link it to the agent
                        add_agent_to_eventflow_edge(
                            self.design_config,
                            current_level,
                            current_agent,
                            flow,
                            f"Max turns hit ({flow.info['turns']})",
                        )

                        last_termination = flow

                    elif (
                        flow.code_point == "_reflection_with_llm_as_summary"
                        or flow.code_point == "_last_msg_as_summary"
                    ):

                        # Add summary node
                        add_node_summary(self.design_config, current_level, flow)

                        # Link it to the agent or termination (which ever is later)
                        summary = summary_text(flow.info["summary"])
                        if (
                            last_termination is not None
                            and last_termination.timestamp > current_agent.current_timestamp
                        ):
                            add_eventflow_to_eventflow_edge(
                                self.design_config, current_level, last_termination, flow, flow.code_point, summary
                            )
                        else:
                            add_agent_to_eventflow_edge(
                                self.design_config, current_level, current_agent, flow, flow.code_point, summary
                            )

                        # If we have available invocations, add them to the agent in a return sequence
                        if len(available_invocations) > 0:
                            for invocation in available_invocations:
                                add_invocation_to_eventflow_return_edge(
                                    self.design_config, current_level, flow, invocation, flow.code_point, summary
                                )

                            # Once added, we clear the available invocations
                            available_invocations.clear()

                        # If we're at the final stage of a group chat auto select speaker, show the name of the agent selected
                        if (
                            current_level.name is not None
                            and current_nested_chat_id in nested_chats
                            and nested_chats[current_nested_chat_id]["type"] == "Group Chat"
                        ):
                            node_id = add_node_info(self.design_config, current_level, truncate_string(summary, 30))
                            add_eventflow_to_node_edge(self.design_config, current_level, flow, node_id, "next speaker")

                        # Track last summarize event so we can connect it to the outside
                        # of the nested chat
                        # Not used at this stage but may need to be used to link back to summarise nodes
                        # last_nested_summarize_level_and_event = [current_level, event]

                    elif (
                        flow.code_point == "generate_tool_calls_reply"
                        or flow.code_point == "a_generate_tool_calls_reply"
                    ):
                        # Tool calls will be like invocations - it will call the tool and loop back

                        # Add function call node
                        add_node_eventflow_reply_func_executed(
                            self.design_config,
                            dot,
                            flow,
                            flow.info["function_name"],
                            self.design_config["node_shape"]["code_execution"],
                        )

                        # Create the edge loop
                        add_eventflow_to_agent_return_edge(
                            self.design_config,
                            current_level,
                            current_agent,
                            flow,
                            flow.code_point,
                            flow.info["return_value"],
                        )

                    elif flow.code_point.startswith("_prepare_and_select_agents:callable:"):
                        # Group Chat callable speaker selection

                        callable_name = flow.code_point.split(":")[2]

                        # Get the group chat manager for this groupchat as the source
                        source_agent = agents[gcm_id_by_groupchat(agents, flow.info["groupchat_unique_id"])]

                        # Add function call node
                        add_node_eventflow_reply_func_executed(
                            self.design_config,
                            dot,
                            flow,
                            callable_name,
                            self.design_config["node_shape"]["code_execution"],
                        )

                        # Create the edge loop
                        add_eventflow_to_agent_return_edge(
                            self.design_config, current_level, source_agent, flow, flow.info["next_agent"]
                        )

                    elif flow.code_point == "manual_select_speaker":
                        # TODO TODO
                        raise Exception("manual_select_speaker not handled.")

                    elif flow.code_point == "random_select_speaker":
                        # TODO TODO
                        raise Exception("random_select_speaker not handled.")

                    elif flow.code_point == "round_robin":

                        next_agent_name = flow.info["next_agent"]

                        if current_agent.agent_name == next_agent_name:
                            # Add info that this agent was selected by round robin
                            node_id = add_node_info(self.design_config, current_level, "Round Robin")
                            add_agent_to_info_edge(
                                self.design_config, current_level, current_agent, node_id, "selected"
                            )
                        else:
                            print(
                                f"** flow.code_point == 'round_robin', current agent expected {next_agent_name}, not {current_agent.agent_name}. **"
                            )

                    elif flow.code_point.startswith("speaker_selection_method:"):
                        # TODO TODO
                        print(f"** {flow.code_point} not handled. **")
                        pass

                elif isinstance(item, LogEvent):
                    event: LogEvent = item

                    if event.event_name == "received_message":

                        """
                        # If we want to ignore silent events restore, however we do need to show some for group chat.
                        if "silent" in event.json_state and event.json_state["silent"] == True:
                            # Ignore silent messages
                            i += 1
                            continue
                        """

                        is_silent = "silent" in event.json_state and event.json_state["silent"]

                        sender_agent = agents[agent_id_by_name(agents, event.json_state["sender"])]
                        recipient_agent = agents[agent_id_by_name(agents, event.source_name)]

                        if top_level and current_agent is None:
                            add_node_agent(self.design_config, agents, current_level, sender_agent)

                        if not top_level and not nested_chats[current_nested_chat_id]["linked_to_parent_agent_node"]:
                            if nested_chats[current_nested_chat_id]["parent_agent_node_id"] != sender_agent.id:
                                # If the first agent in this nested/group chat is different to the previous agent then we need to create the agent inside and link to it
                                add_node_agent(self.design_config, agents, current_level, sender_agent)
                                is_group_chat = nested_chats[current_nested_chat_id]["type"] == "Group Chat"
                                add_agent_to_agent_edge(
                                    self.design_config,
                                    agents,
                                    nested_graphs[nested_chats[current_nested_chat_id]["level_index"]],
                                    agents[nested_chats[current_nested_chat_id]["parent_agent_node_id"]],
                                    sender_agent,
                                    nested_chats[current_nested_chat_id]["edge_label"],
                                    dir="both" if is_group_chat else "forward",
                                    style=self.design_config["edge_style" if not is_silent else "edge_style_silent"],
                                )
                            nested_chats[current_nested_chat_id]["linked_to_parent_agent_node"] = True
                        elif last_nested_agent is not None and last_nested_agent.id == sender_agent.id:
                            pass

                        add_node_agent(self.design_config, agents, current_level, recipient_agent)

                        edge_text = event.event_name
                        tooltip_text = create_tooltip(event.json_state["message"])
                        add_agent_to_agent_edge(
                            self.design_config,
                            agents,
                            current_level,
                            sender_agent,
                            recipient_agent,
                            edge_text,
                            tooltip_text,
                            style=self.design_config["edge_style" if not is_silent else "edge_style_silent"],
                        )

                        current_agent = recipient_agent

                    elif event.event_name == "reply_func_executed":
                        # Reply function executed, such as termination, generate oai reply, etc.

                        # We'll only consider the final ones for now
                        if event.json_state["final"]:
                            # Get the name of the function
                            reply_func_name = event.json_state["reply_func_name"]

                            # Specific function handling
                            if reply_func_name == "check_termination_and_human_reply":

                                if event.json_state["reply"] is None:
                                    # No human reply or human chose to exit, so this is a termination.

                                    # Add summary node
                                    add_node_terminate(self.design_config, current_level, event)

                                    # Link it to the agent
                                    add_agent_to_eventflow_edge(
                                        self.design_config, current_level, current_agent, event, reply_func_name
                                    )

                                    last_termination = event
                                else:
                                    # We have a human reply

                                    # Add human node
                                    add_node_human(self.design_config, current_level, event)

                                    # Link it to the agent
                                    source_agent = agents[agent_id_by_name(agents, event.source_name)]
                                    add_eventflow_to_agent_return_edge(
                                        self.design_config,
                                        current_level,
                                        source_agent,
                                        event,
                                        reply_func_name,
                                        event.json_state["reply"]["content"],
                                    )

                                    """
                                    # Add a human node (which we'll denote as a human)
                                    if not _have_human_agent(agents):
                                        human_agent = _add_human_agent(agents)

                                        if not "index" in human_agent.visualization_params:
                                            human_agent.visualization_params["index"] = 0

                                        # Assign a colour to the agent
                                        if not human_agent.id in agent_colors:
                                            assign_agent_color(agent_colors, human_agent.id)
                                            human_agent.visualization_params["color"] = agent_colors[human_agent.id]
                                    else:
                                        human_agent = _get_human_agent(agents)

                                    # Link to the human node
                                    add_agent_to_agent_edge(self.design_config, agents, current_level, current_agent, human_agent, reply_func_name, event.json_state['reply']['content'])

                                    current_agent = human_agent
                                    """

                            elif reply_func_name == "_summary_from_nested_chats":

                                # This may be necessary - review during development for first release.
                                #
                                # Add recipient agent to diagram
                                # recipient_agent = agents[agent_id_by_name(agents, event.source_name)]
                                # add_node_agent(self.design_config, agents, current_level, recipient_agent)

                                # _add_event_to_agent_edge(self.design_config, current_level, last_nested_summarize_level_and_event[1], recipient_agent, reply_func_name, event.json_state['reply'])

                                pass

                            elif reply_func_name == "generate_code_execution_reply":  # Executed code
                                exitcode = extract_code_exitcode(event.json_state["reply"])

                                if exitcode != -1:
                                    # Add the exitcode node and result

                                    executing_agent = agents[agent_id_by_name(agents, event.source_name)]

                                    add_node_code_execution(
                                        self.design_config, current_level, event, exitcode, event.json_state["reply"]
                                    )

                                    # Link it to the agent
                                    add_code_execution_to_agent_return_edge(
                                        self.design_config, current_level, executing_agent, event, exitcode
                                    )

                            elif not event.json_state["reply_func_module"].startswith("autogen."):
                                # Custom reply function, assuming it's not part of the AutoGen package
                                # Keep this elif at the bottom

                                add_node_custom_reply_func(self.design_config, current_level, event, reply_func_name)
                                add_eventflow_to_agent_return_edge(
                                    self.design_config,
                                    current_level,
                                    current_agent,
                                    event,
                                    "",
                                    create_tooltip(event.json_state["reply"]),
                                )

                            # If we have available invocations, add them to the agent in a return sequence
                            if len(available_invocations) > 0:
                                for invocation in available_invocations:
                                    # Add them to the source agent
                                    source_agent = agents[agent_id_by_name(agents, event.source_name)]

                                    add_invocation_to_agent_return_edge(
                                        self.design_config,
                                        current_level,
                                        source_agent,
                                        invocation,
                                        reply_func_name,
                                        extract_invocation_response(invocation),
                                    )

                                # Once added, we clear the available invocations
                                available_invocations.clear()

                    else:
                        pass

                elif isinstance(item, LogInvocation):
                    invocation: LogInvocation = item

                    # Add the invocation node
                    add_node_invocation(self.design_config, clients, wrapper_clients, dot, invocation)

                    available_invocations.append(invocation)

                i += 1

            return i, None

        # Initialize the main diagram
        dot = Digraph()
        dot.attr(bgcolor=self.design_config["canvas_replace_bg"])

        # Tracks each agent's node color
        agent_colors = {}

        # Nested graphs (nested chat and group chat)
        nested_chats: Dict[str, Dict] = {"0": {}}
        nested_graphs: Dict[uuid4, Digraph] = {}

        # Start node
        add_node_start(self.design_config, dot)

        # Process the entire diagram recursively, start with top level
        process_level(True, dot, "0", all_ordered, 0, "0", None)

        return dot
