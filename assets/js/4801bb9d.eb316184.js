"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8603],{7992:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var t=s(85893),a=s(11151);const r={sidebar_label:"groupchat",title:"agentchat.groupchat"},i=void 0,l={id:"reference/agentchat/groupchat",title:"agentchat.groupchat",description:"GroupChat",source:"@site/docs/reference/agentchat/groupchat.md",sourceDirName:"reference/agentchat",slug:"/reference/agentchat/groupchat",permalink:"/autogen/docs/reference/agentchat/groupchat",draft:!1,unlisted:!1,editUrl:"https://github.com/autogen-ai/autogen/edit/main/website/docs/reference/agentchat/groupchat.md",tags:[],version:"current",frontMatter:{sidebar_label:"groupchat",title:"agentchat.groupchat"},sidebar:"referenceSideBar",previous:{title:"conversable_agent",permalink:"/autogen/docs/reference/agentchat/conversable_agent"},next:{title:"user_proxy_agent",permalink:"/autogen/docs/reference/agentchat/user_proxy_agent"}},o={},c=[{value:"GroupChat",id:"groupchat",level:2},{value:"agent_names",id:"agent_names",level:3},{value:"reset",id:"reset",level:3},{value:"append",id:"append",level:3},{value:"agent_by_name",id:"agent_by_name",level:3},{value:"nested_agents",id:"nested_agents",level:3},{value:"next_agent",id:"next_agent",level:3},{value:"select_speaker_msg",id:"select_speaker_msg",level:3},{value:"select_speaker_prompt",id:"select_speaker_prompt",level:3},{value:"introductions_msg",id:"introductions_msg",level:3},{value:"manual_select_speaker",id:"manual_select_speaker",level:3},{value:"random_select_speaker",id:"random_select_speaker",level:3},{value:"select_speaker",id:"select_speaker",level:3},{value:"a_select_speaker",id:"a_select_speaker",level:3},{value:"a_auto_select_speaker",id:"a_auto_select_speaker",level:3},{value:"GroupChatManager",id:"groupchatmanager",level:2},{value:"groupchat",id:"groupchat-1",level:3},{value:"chat_messages_for_summary",id:"chat_messages_for_summary",level:3},{value:"last_speaker",id:"last_speaker",level:3},{value:"run_chat",id:"run_chat",level:3},{value:"a_run_chat",id:"a_run_chat",level:3},{value:"resume",id:"resume",level:3},{value:"a_resume",id:"a_resume",level:3},{value:"messages_from_string",id:"messages_from_string",level:3},{value:"messages_to_string",id:"messages_to_string",level:3},{value:"clear_agents_history",id:"clear_agents_history",level:3}];function h(e){const n={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"groupchat",children:"GroupChat"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"@dataclass\nclass GroupChat()\n"})}),"\n",(0,t.jsx)(n.p,{children:"(In preview) A group chat class that contains the following data fields:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"agents: a list of participating agents."}),"\n",(0,t.jsx)(n.li,{children:"messages: a list of messages in the group chat."}),"\n",(0,t.jsx)(n.li,{children:"max_round: the maximum number of rounds."}),"\n",(0,t.jsx)(n.li,{children:'admin_name: the name of the admin agent if there is one. Default is "Admin".\nKeyBoardInterrupt will make the admin agent take over.'}),"\n",(0,t.jsxs)(n.li,{children:["func_call_filter: whether to enforce function call filter. Default is True.\nWhen set to True and when a message is a function call suggestion,\nthe next speaker will be chosen from an agent which contains the corresponding function name\nin its ",(0,t.jsx)(n.code,{children:"function_map"}),"."]}),"\n",(0,t.jsx)(n.li,{children:'select_speaker_message_template: customize the select speaker message (used in "auto" speaker selection), which appears first in the message context and generally includes the agent descriptions and list of agents. If the string contains "{roles}" it will replaced with the agent\'s and their role descriptions. If the string contains "{agentlist}" it will be replaced with a comma-separated list of agent names in square brackets. The default value is:\n"You are in a role play game. The following roles are available:\n{roles}.\nRead the following conversation.\nThen select the next role from {agentlist} to play. Only return the role."'}),"\n",(0,t.jsx)(n.li,{children:'select_speaker_prompt_template: customize the select speaker prompt (used in "auto" speaker selection), which appears last in the message context and generally includes the list of agents and guidance for the LLM to select the next agent. If the string contains "{agentlist}" it will be replaced with a comma-separated list of agent names in square brackets. The default value is:\n"Read the above conversation. Then select the next role from {agentlist} to play. Only return the role."\nTo ignore this prompt being used, set this to None. If set to None, ensure your instructions for selecting a speaker are in the select_speaker_message_template string.'}),"\n",(0,t.jsx)(n.li,{children:'select_speaker_auto_multiple_template: customize the follow-up prompt used when selecting a speaker fails with a response that contains multiple agent names. This prompt guides the LLM to return just one agent name. Applies only to "auto" speaker selection method. If the string contains "{agentlist}" it will be replaced with a comma-separated list of agent names in square brackets. The default value is:\n"You provided more than one name in your text, please return just the name of the next speaker. To determine the speaker use these prioritised rules:'}),"\n"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:'If the context refers to themselves as a speaker e.g. "As the..." , choose that speaker\'s name'}),"\n",(0,t.jsx)(n.li,{children:'If it refers to the "next" speaker name, choose that name'}),"\n",(0,t.jsx)(n.li,{children:"Otherwise, choose the first provided speaker's name in the context\nThe names are case-sensitive and should not be abbreviated or changed.\nRespond with ONLY the name of the speaker and DO NOT provide a reason.\""}),"\n"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'select_speaker_auto_none_template: customize the follow-up prompt used when selecting a speaker fails with a response that contains no agent names. This prompt guides the LLM to return an agent name and provides a list of agent names. Applies only to "auto" speaker selection method. If the string contains "{agentlist}" it will be replaced with a comma-separated list of agent names in square brackets. The default value is:\n"You didn\'t choose a speaker. As a reminder, to determine the speaker use these prioritised rules:'}),"\n"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:'If the context refers to themselves as a speaker e.g. "As the..." , choose that speaker\'s name'}),"\n",(0,t.jsx)(n.li,{children:'If it refers to the "next" speaker name, choose that name'}),"\n",(0,t.jsx)(n.li,{children:"Otherwise, choose the first provided speaker's name in the context\nThe names are case-sensitive and should not be abbreviated or changed.\nThe only names that are accepted are {agentlist}.\nRespond with ONLY the name of the speaker and DO NOT provide a reason.\""}),"\n"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'speaker_selection_method: the method for selecting the next speaker. Default is "auto".\nCould be any of the following (case insensitive), will raise ValueError if not recognized:'}),"\n",(0,t.jsx)(n.li,{children:'"auto": the next speaker is selected automatically by LLM.'}),"\n",(0,t.jsx)(n.li,{children:'"manual": the next speaker is selected manually by user input.'}),"\n",(0,t.jsx)(n.li,{children:'"random": the next speaker is selected randomly.'}),"\n",(0,t.jsxs)(n.li,{children:['"round_robin": the next speaker is selected in a round robin fashion, i.e., iterating in the same order as provided in ',(0,t.jsx)(n.code,{children:"agents"}),"."]}),"\n",(0,t.jsx)(n.li,{children:"a customized speaker selection function (Callable): the function will be called to select the next speaker.\nThe function should take the last speaker and the group chat as input and return one of the following:"}),"\n"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["an ",(0,t.jsx)(n.code,{children:"Agent"})," class, it must be one of the agents in the group chat."]}),"\n",(0,t.jsx)(n.li,{children:"a string from ['auto', 'manual', 'random', 'round_robin'] to select a default method to use."}),"\n",(0,t.jsx)(n.li,{children:"None, which would terminate the conversation gracefully."}),"\n"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'max_retries_for_selecting_speaker: the maximum number of times the speaker selection requery process will run.\nIf, during speaker selection, multiple agent names or no agent names are returned by the LLM as the next agent, it will be queried again up to the maximum number\nof times until a single agent is returned or it exhausts the maximum attempts.\nApplies only to "auto" speaker selection method.\nDefault is 2.'}),"\n",(0,t.jsx)(n.li,{children:'select_speaker_transform_messages: (optional) the message transformations to apply to the nested select speaker agent-to-agent chat messages.\nTakes a TransformMessages object, defaults to None and is only utilised when the speaker selection method is "auto".'}),"\n",(0,t.jsx)(n.li,{children:'select_speaker_auto_verbose: whether to output the select speaker responses and selections\nIf set to True, the outputs from the two agents in the nested select speaker chat will be output, along with\nwhether the responses were successful, or not, in selecting an agent\nApplies only to "auto" speaker selection method.'}),"\n",(0,t.jsxs)(n.li,{children:["allow_repeat_speaker: whether to allow the same speaker to speak consecutively.\nDefault is True, in which case all speakers are allowed to speak consecutively.\nIf ",(0,t.jsx)(n.code,{children:"allow_repeat_speaker"})," is a list of Agents, then only those listed agents are allowed to repeat.\nIf set to False, then no speakers are allowed to repeat.\n",(0,t.jsx)(n.code,{children:"allow_repeat_speaker"})," and ",(0,t.jsx)(n.code,{children:"allowed_or_disallowed_speaker_transitions"})," are mutually exclusive."]}),"\n",(0,t.jsxs)(n.li,{children:["allowed_or_disallowed_speaker_transitions: dict.\nThe keys are source agents, and the values are agents that the key agent can/can't transit to,\ndepending on speaker_transitions_type. Default is None, which means all agents can transit to all other agents.\n",(0,t.jsx)(n.code,{children:"allow_repeat_speaker"})," and ",(0,t.jsx)(n.code,{children:"allowed_or_disallowed_speaker_transitions"})," are mutually exclusive."]}),"\n",(0,t.jsxs)(n.li,{children:['speaker_transitions_type: whether the speaker_transitions_type is a dictionary containing lists of allowed agents or disallowed agents.\n"allowed" means the ',(0,t.jsx)(n.code,{children:"allowed_or_disallowed_speaker_transitions"}),' is a dictionary containing lists of allowed agents.\nIf set to "disallowed", then the ',(0,t.jsx)(n.code,{children:"allowed_or_disallowed_speaker_transitions"})," is a dictionary containing lists of disallowed agents.\nMust be supplied if ",(0,t.jsx)(n.code,{children:"allowed_or_disallowed_speaker_transitions"})," is not None."]}),"\n",(0,t.jsx)(n.li,{children:'enable_clear_history: enable possibility to clear history of messages for agents manually by providing\n"clear history" phrase in user prompt. This is experimental feature.\nSee description of GroupChatManager.clear_agents_history function for more info.'}),"\n",(0,t.jsx)(n.li,{children:"send_introductions: send a round of introductions at the start of the group chat, so agents know who they can speak to (default: False)"}),"\n",(0,t.jsxs)(n.li,{children:["role_for_select_speaker_messages: sets the role name for speaker selection when in 'auto' mode, typically 'user' or 'system'. (default: 'system')\n",(0,t.jsx)(n.code,{children:"python       def custom_speaker_selection_func(           last_speaker: Agent, groupchat: GroupChat       ) -> Union[Agent, str, None]:       "})]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"agent_names",children:"agent_names"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"@property\ndef agent_names() -> List[str]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Return the names of the agents in the group chat."}),"\n",(0,t.jsx)(n.h3,{id:"reset",children:"reset"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def reset()\n"})}),"\n",(0,t.jsx)(n.p,{children:"Reset the group chat."}),"\n",(0,t.jsx)(n.h3,{id:"append",children:"append"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def append(message: Dict, speaker: Agent)\n"})}),"\n",(0,t.jsx)(n.p,{children:"Append a message to the group chat.\nWe cast the content to str here so that it can be managed by text-based\nmodel."}),"\n",(0,t.jsx)(n.h3,{id:"agent_by_name",children:"agent_by_name"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def agent_by_name(name: str,\n                  recursive: bool = False,\n                  raise_on_name_conflict: bool = False) -> Optional[Agent]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Returns the agent with a given name. If recursive is True, it will search in nested teams."}),"\n",(0,t.jsx)(n.h3,{id:"nested_agents",children:"nested_agents"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def nested_agents() -> List[Agent]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Returns all agents in the group chat manager."}),"\n",(0,t.jsx)(n.h3,{id:"next_agent",children:"next_agent"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def next_agent(agent: Agent, agents: Optional[List[Agent]] = None) -> Agent\n"})}),"\n",(0,t.jsx)(n.p,{children:"Return the next agent in the list."}),"\n",(0,t.jsx)(n.h3,{id:"select_speaker_msg",children:"select_speaker_msg"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def select_speaker_msg(agents: Optional[List[Agent]] = None) -> str\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Return the system message for selecting the next speaker. This is always the ",(0,t.jsx)(n.em,{children:"first"})," message in the context."]}),"\n",(0,t.jsx)(n.h3,{id:"select_speaker_prompt",children:"select_speaker_prompt"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def select_speaker_prompt(agents: Optional[List[Agent]] = None) -> str\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Return the floating system prompt selecting the next speaker.\nThis is always the ",(0,t.jsx)(n.em,{children:"last"})," message in the context.\nWill return None if the select_speaker_prompt_template is None."]}),"\n",(0,t.jsx)(n.h3,{id:"introductions_msg",children:"introductions_msg"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def introductions_msg(agents: Optional[List[Agent]] = None) -> str\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Return the system message for selecting the next speaker. This is always the ",(0,t.jsx)(n.em,{children:"first"})," message in the context."]}),"\n",(0,t.jsx)(n.h3,{id:"manual_select_speaker",children:"manual_select_speaker"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def manual_select_speaker(\n        agents: Optional[List[Agent]] = None) -> Union[Agent, None]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Manually select the next speaker."}),"\n",(0,t.jsx)(n.h3,{id:"random_select_speaker",children:"random_select_speaker"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def random_select_speaker(\n        agents: Optional[List[Agent]] = None) -> Union[Agent, None]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Randomly select the next speaker."}),"\n",(0,t.jsx)(n.h3,{id:"select_speaker",children:"select_speaker"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def select_speaker(last_speaker: Agent, selector: ConversableAgent) -> Agent\n"})}),"\n",(0,t.jsx)(n.p,{children:"Select the next speaker (with requery)."}),"\n",(0,t.jsx)(n.h3,{id:"a_select_speaker",children:"a_select_speaker"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"async def a_select_speaker(last_speaker: Agent,\n                           selector: ConversableAgent) -> Agent\n"})}),"\n",(0,t.jsx)(n.p,{children:"Select the next speaker (with requery), asynchronously."}),"\n",(0,t.jsx)(n.h3,{id:"a_auto_select_speaker",children:"a_auto_select_speaker"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"async def a_auto_select_speaker(last_speaker: Agent,\n                                selector: ConversableAgent,\n                                messages: Optional[List[Dict]],\n                                agents: Optional[List[Agent]]) -> Agent\n"})}),"\n",(0,t.jsx)(n.p,{children:'(Asynchronous) Selects next speaker for the "auto" speaker selection method. Utilises its own two-agent chat to determine the next speaker and supports requerying.'}),"\n",(0,t.jsx)(n.p,{children:'Speaker selection for "auto" speaker selection method:'}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Create a two-agent chat with a speaker selector agent and a speaker validator agent, like a nested chat"}),"\n",(0,t.jsx)(n.li,{children:"Inject the group messages into the new chat"}),"\n",(0,t.jsx)(n.li,{children:"Run the two-agent chat, evaluating the result of response from the speaker selector agent:"}),"\n"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"If a single agent is provided then we return it and finish. If not, we add an additional message to this nested chat in an attempt to guide the LLM to a single agent response"}),"\n"]}),"\n",(0,t.jsxs)(n.ol,{start:"4",children:["\n",(0,t.jsx)(n.li,{children:"Chat continues until a single agent is nominated or there are no more attempts left"}),"\n",(0,t.jsx)(n.li,{children:"If we run out of turns and no single agent can be determined, the next speaker in the list of agents is returned"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Arguments"}),":"]}),"\n",(0,t.jsx)(n.p,{children:"last_speaker Agent: The previous speaker in the group chat\nselector ConversableAgent:\nmessages Optional[List[Dict]]: Current chat messages\nagents Optional[List[Agent]]: Valid list of agents for speaker selection"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Returns"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Dict"})," - a counter for mentioned agents."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"groupchatmanager",children:"GroupChatManager"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"class GroupChatManager(ConversableAgent)\n"})}),"\n",(0,t.jsx)(n.p,{children:"(In preview) A chat manager agent that can manage a group chat of multiple agents."}),"\n",(0,t.jsx)(n.h3,{id:"groupchat-1",children:"groupchat"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"@property\ndef groupchat() -> GroupChat\n"})}),"\n",(0,t.jsx)(n.p,{children:"Returns the group chat managed by the group chat manager."}),"\n",(0,t.jsx)(n.h3,{id:"chat_messages_for_summary",children:"chat_messages_for_summary"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def chat_messages_for_summary(agent: Agent) -> List[Dict]\n"})}),"\n",(0,t.jsx)(n.p,{children:"The list of messages in the group chat as a conversation to summarize.\nThe agent is ignored."}),"\n",(0,t.jsx)(n.h3,{id:"last_speaker",children:"last_speaker"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"@property\ndef last_speaker() -> Agent\n"})}),"\n",(0,t.jsx)(n.p,{children:"Return the agent who sent the last message to group chat manager."}),"\n",(0,t.jsx)(n.p,{children:"In a group chat, an agent will always send a message to the group chat manager, and the group chat manager will\nsend the message to all other agents in the group chat. So, when an agent receives a message, it will always be\nfrom the group chat manager. With this property, the agent receiving the message can know who actually sent the\nmessage."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Example"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'from autogen import ConversableAgent\nfrom autogen import GroupChat, GroupChatManager\n\n\ndef print_messages(recipient, messages, sender, config):\n    # Print the message immediately\n    print(\n        f"Sender: {sender.name} | Recipient: {recipient.name} | Message: {messages[-1].get(\'content\')}"\n    )\n    print(f"Real Sender: {sender.last_speaker.name}")\n    assert sender.last_speaker.name in messages[-1].get("content")\n    return False, None  # Required to ensure the agent communication flow continues\n\n\nagent_a = ConversableAgent("agent A", default_auto_reply="I\'m agent A.")\nagent_b = ConversableAgent("agent B", default_auto_reply="I\'m agent B.")\nagent_c = ConversableAgent("agent C", default_auto_reply="I\'m agent C.")\nfor agent in [agent_a, agent_b, agent_c]:\n    agent.register_reply(\n        [ConversableAgent, None], reply_func=print_messages, config=None\n    )\ngroup_chat = GroupChat(\n    [agent_a, agent_b, agent_c],\n    messages=[],\n    max_round=6,\n    speaker_selection_method="random",\n    allow_repeat_speaker=True,\n)\nchat_manager = GroupChatManager(group_chat)\ngroupchat_result = agent_a.initiate_chat(\n    chat_manager, message="Hi, there, I\'m agent A."\n)\n'})}),"\n",(0,t.jsx)(n.h3,{id:"run_chat",children:"run_chat"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def run_chat(messages: Optional[List[Dict]] = None,\n             sender: Optional[Agent] = None,\n             config: Optional[GroupChat] = None) -> Tuple[bool, Optional[str]]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Run a group chat."}),"\n",(0,t.jsx)(n.h3,{id:"a_run_chat",children:"a_run_chat"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"async def a_run_chat(messages: Optional[List[Dict]] = None,\n                     sender: Optional[Agent] = None,\n                     config: Optional[GroupChat] = None)\n"})}),"\n",(0,t.jsx)(n.p,{children:"Run a group chat asynchronously."}),"\n",(0,t.jsx)(n.h3,{id:"resume",children:"resume"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def resume(messages: Union[List[Dict], str],\n           remove_termination_string: Optional[Union[str,\n                                                     Callable[[str],\n                                                              str]]] = None,\n           silent: Optional[bool] = False) -> Tuple[ConversableAgent, Dict]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Resumes a group chat using the previous messages as a starting point. Requires the agents, group chat, and group chat manager to be established\nas per the original group chat."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Arguments"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"messages Union[List[Dict], str]: The content of the previous chat's messages, either as a Json string or a list of message dictionaries."}),"\n",(0,t.jsx)(n.li,{children:"remove_termination_string (str or function): Remove the termination string from the last message to prevent immediate termination\nIf a string is provided, this string will be removed from last message.\nIf a function is provided, the last message will be passed to this function."}),"\n",(0,t.jsx)(n.li,{children:"silent (bool or None): (Experimental) whether to print the messages for this conversation. Default is False."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Returns"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Tuple[ConversableAgent, Dict]: A tuple containing the last agent who spoke and their message"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"a_resume",children:"a_resume"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"async def a_resume(\n        messages: Union[List[Dict], str],\n        remove_termination_string: Optional[Union[str, Callable[[str],\n                                                                str]]] = None,\n        silent: Optional[bool] = False) -> Tuple[ConversableAgent, Dict]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Resumes a group chat using the previous messages as a starting point, asynchronously. Requires the agents, group chat, and group chat manager to be established\nas per the original group chat."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Arguments"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"messages Union[List[Dict], str]: The content of the previous chat's messages, either as a Json string or a list of message dictionaries."}),"\n",(0,t.jsx)(n.li,{children:"remove_termination_string (str or function): Remove the termination string from the last message to prevent immediate termination\nIf a string is provided, this string will be removed from last message.\nIf a function is provided, the last message will be passed to this function, and the function returns the string after processing."}),"\n",(0,t.jsx)(n.li,{children:"silent (bool or None): (Experimental) whether to print the messages for this conversation. Default is False."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Returns"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Tuple[ConversableAgent, Dict]: A tuple containing the last agent who spoke and their message"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"messages_from_string",children:"messages_from_string"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def messages_from_string(message_string: str) -> List[Dict]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Reads the saved state of messages in Json format for resume and returns as a messages list"}),"\n",(0,t.jsx)(n.p,{children:"args:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"message_string: Json string, the saved state"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"returns:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"List[Dict]: List of messages"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"messages_to_string",children:"messages_to_string"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def messages_to_string(messages: List[Dict]) -> str\n"})}),"\n",(0,t.jsx)(n.p,{children:"Converts the provided messages into a Json string that can be used for resuming the chat.\nThe state is made up of a list of messages"}),"\n",(0,t.jsx)(n.p,{children:"args:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"messages (List[Dict]): set of messages to convert to a string"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"returns:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"str: Json representation of the messages which can be persisted for resuming later"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"clear_agents_history",children:"clear_agents_history"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def clear_agents_history(reply: dict, groupchat: GroupChat) -> str\n"})}),"\n",(0,t.jsx)(n.p,{children:'Clears history of messages for all agents or selected one. Can preserve selected number of last messages.\nThat function is called when user manually provide "clear history" phrase in his reply.\nWhen "clear history" is provided, the history of messages for all agents is cleared.\nWhen "clear history <agent_name>" is provided, the history of messages for selected agent is cleared.\nWhen "clear history <nr_of_messages_to_preserve>" is provided, the history of messages for all agents is cleared\nexcept last <nr_of_messages_to_preserve> messages.\nWhen "clear history <agent_name> <nr_of_messages_to_preserve>" is provided, the history of messages for selected\nagent is cleared except last <nr_of_messages_to_preserve> messages.\nPhrase "clear history" and optional arguments are cut out from the reply before it passed to the chat.'}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Arguments"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"reply"})," ",(0,t.jsx)(n.em,{children:"dict"})," - reply message dict to analyze."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"groupchat"})," ",(0,t.jsx)(n.em,{children:"GroupChat"})," - GroupChat object."]}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>i});var t=s(67294);const a={},r=t.createContext(a);function i(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);