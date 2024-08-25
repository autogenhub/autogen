"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7404],{45108:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var a=n(85893),o=n(11151);const r={custom_edit_url:"https://github.com/autogen-ai/autogen/edit/main/notebook/agentchat_groupchat.ipynb",description:"Explore the utilization of large language models in automated group chat scenarios, where agents perform tasks collectively, demonstrating how they can be configured, interact with each other, and retrieve specific information from external resources.",source_notebook:"/notebook/agentchat_groupchat.ipynb",tags:["orchestration","group chat"],title:"Group Chat"},i="Group Chat",s={id:"notebooks/agentchat_groupchat",title:"Group Chat",description:"Explore the utilization of large language models in automated group chat scenarios, where agents perform tasks collectively, demonstrating how they can be configured, interact with each other, and retrieve specific information from external resources.",source:"@site/docs/notebooks/agentchat_groupchat.mdx",sourceDirName:"notebooks",slug:"/notebooks/agentchat_groupchat",permalink:"/autogen/docs/notebooks/agentchat_groupchat",draft:!1,unlisted:!1,editUrl:"https://github.com/autogen-ai/autogen/edit/main/notebook/agentchat_groupchat.ipynb",tags:[{label:"orchestration",permalink:"/autogen/docs/tags/orchestration"},{label:"group chat",permalink:"/autogen/docs/tags/group-chat"}],version:"current",frontMatter:{custom_edit_url:"https://github.com/autogen-ai/autogen/edit/main/notebook/agentchat_groupchat.ipynb",description:"Explore the utilization of large language models in automated group chat scenarios, where agents perform tasks collectively, demonstrating how they can be configured, interact with each other, and retrieve specific information from external resources.",source_notebook:"/notebook/agentchat_groupchat.ipynb",tags:["orchestration","group chat"],title:"Group Chat"},sidebar:"notebooksSidebar",previous:{title:"Groupchat with Llamaindex agents",permalink:"/autogen/docs/notebooks/agentchat_group_chat_with_llamaindex_agents"},next:{title:"Group Chat with Retrieval Augmented Generation",permalink:"/autogen/docs/notebooks/agentchat_groupchat_RAG"}},l={},c=[{value:"Set your API Endpoint",id:"set-your-api-endpoint",level:2},{value:"Construct Agents",id:"construct-agents",level:2},{value:"Start Chat",id:"start-chat",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"group-chat",children:"Group Chat"}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:"https://colab.research.google.com/github/autogen-ai/autogen/blob/main/notebook/agentchat_groupchat.ipynb",children:(0,a.jsx)(t.img,{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"})}),"\n",(0,a.jsx)(t.a,{href:"https://github.com/autogen-ai/autogen/blob/main/notebook/agentchat_groupchat.ipynb",children:(0,a.jsx)(t.img,{src:"https://img.shields.io/badge/Open%20on%20GitHub-grey?logo=github",alt:"Open on GitHub"})})]}),"\n",(0,a.jsxs)(t.p,{children:["AutoGen offers conversable agents powered by LLM, tool or human, which\ncan be used to perform tasks collectively via automated chat. This\nframework allows tool use and human participation through multi-agent\nconversation. Please find documentation about this feature\n",(0,a.jsx)(t.a,{href:"https://microsoft.github.io/autogen/docs/Use-Cases/agent_chat",children:"here"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:["This notebook is modified based on\n",(0,a.jsx)(t.a,{href:"https://github.com/microsoft/FLAML/blob/4ea686af5c3e8ff24d9076a7a626c8b28ab5b1d7/notebook/autogen_multiagent_roleplay_chat.ipynb",children:"https://github.com/microsoft/FLAML/blob/4ea686af5c3e8ff24d9076a7a626c8b28ab5b1d7/notebook/autogen_multiagent_roleplay_chat.ipynb"})]}),"\n",(0,a.jsxs)(t.admonition,{title:"Requirements",type:"info",children:[(0,a.jsxs)(t.p,{children:["Install ",(0,a.jsx)(t.code,{children:"pyautogen"}),":"]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"pip install pyautogen\n"})}),(0,a.jsxs)(t.p,{children:["For more information, please refer to the ",(0,a.jsx)(t.a,{href:"/docs/installation/",children:"installation guide"}),"."]})]}),"\n",(0,a.jsx)(t.h2,{id:"set-your-api-endpoint",children:"Set your API Endpoint"}),"\n",(0,a.jsxs)(t.p,{children:["The\n",(0,a.jsx)(t.a,{href:"https://microsoft.github.io/autogen/docs/reference/oai/openai_utils#config_list_from_json",children:(0,a.jsx)(t.code,{children:"config_list_from_json"})}),"\nfunction loads a list of configurations from an environment variable or\na json file."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:'import autogen\n\nconfig_list = autogen.config_list_from_json(\n    "OAI_CONFIG_LIST",\n    filter_dict={\n        "model": ["gpt-4", "gpt-4-0314", "gpt4", "gpt-4-32k", "gpt-4-32k-0314", "gpt-4-32k-v0314"],\n    },\n)\n'})}),"\n",(0,a.jsx)(t.admonition,{type:"tip",children:(0,a.jsxs)(t.p,{children:["Learn more about configuring LLMs for agents ",(0,a.jsx)(t.a,{href:"/docs/topics/llm_configuration",children:"here"}),"."]})}),"\n",(0,a.jsx)(t.h2,{id:"construct-agents",children:"Construct Agents"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:'llm_config = {"config_list": config_list, "cache_seed": 42}\nuser_proxy = autogen.UserProxyAgent(\n    name="User_proxy",\n    system_message="A human admin.",\n    code_execution_config={\n        "last_n_messages": 2,\n        "work_dir": "groupchat",\n        "use_docker": False,\n    },  # Please set use_docker=True if docker is available to run the generated code. Using docker is safer than running the generated code directly.\n    human_input_mode="TERMINATE",\n)\ncoder = autogen.AssistantAgent(\n    name="Coder",\n    llm_config=llm_config,\n)\npm = autogen.AssistantAgent(\n    name="Product_manager",\n    system_message="Creative in software product ideas.",\n    llm_config=llm_config,\n)\ngroupchat = autogen.GroupChat(agents=[user_proxy, coder, pm], messages=[], max_round=12)\nmanager = autogen.GroupChatManager(groupchat=groupchat, llm_config=llm_config)\n'})}),"\n",(0,a.jsx)(t.h2,{id:"start-chat",children:"Start Chat"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:'user_proxy.initiate_chat(\n    manager, message="Find a latest paper about gpt-4 on arxiv and find its potential applications in software."\n)\n# type exit to terminate the chat\n'})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:'User_proxy (to chat_manager):\n\nFind a latest paper about gpt-4 on arxiv and find its potential applications in software.\n\n--------------------------------------------------------------------------------\nCoder (to chat_manager):\n\nTo find the latest paper about GPT-4 on arxiv, I\'ll provide you with a Python code that fetches the most recent papers from the arxiv API and filters the results to get the most relevant paper related to GPT-4. After fetching the paper, I\'ll extract the information for potential applications in software. Please execute the following Python code:\n\n```python\nimport requests\nfrom bs4 import BeautifulSoup\nimport re\n\ndef fetch_arxiv_papers(query):\n    base_url = "http://export.arxiv.org/api/query?"\n    search_query = "all:" + query\n    response = requests.get(base_url, params={"search_query": search_query, "sortBy": "submittedDate", "sortOrder": "descending"})\n    return BeautifulSoup(response.content, "xml")\n\ndef find_gpt4_paper():\n    papers = fetch_arxiv_papers("gpt-4")\n    for entry in papers.find_all("entry"):\n        title = entry.title.text.strip()\n        summary = entry.summary.text.strip()\n        if "gpt-4" in title.lower() or "gpt-4" in summary.lower():\n            return {"title": title, "summary": summary}\n\ngpt4_paper = find_gpt4_paper()\nif gpt4_paper:\n    print("Title:", gpt4_paper["title"])\n    print("Summary:", gpt4_paper["summary"])\nelse:\n    print("No recent GPT-4 papers found.")\n```\n\nOnce we have the paper details, I\'ll analyze the summary to identify potential applications in software development.\n\n--------------------------------------------------------------------------------\n\n>>>>>>>> USING AUTO REPLY...\n\n>>>>>>>> EXECUTING CODE BLOCK 0 (inferred language is python)...\nUser_proxy (to chat_manager):\n\nexitcode: 0 (execution succeeded)\nCode output: \nTitle: FIMO: A Challenge Formal Dataset for Automated Theorem Proving\nSummary: We present FIMO, an innovative dataset comprising formal mathematical problem\nstatements sourced from the International Mathematical Olympiad (IMO)\nShortlisted Problems. Designed to facilitate advanced automated theorem proving\nat the IMO level, FIMO is currently tailored for the Lean formal language. It\ncomprises 149 formal problem statements, accompanied by both informal problem\ndescriptions and their corresponding LaTeX-based informal proofs. Through\ninitial experiments involving GPT-4, our findings underscore the existing\nlimitations in current methodologies, indicating a substantial journey ahead\nbefore achieving satisfactory IMO-level automated theorem proving outcomes.\n\n\n--------------------------------------------------------------------------------\nProduct_manager (to chat_manager):\n\nBased on the paper titled "FIMO: A Challenge Formal Dataset for Automated Theorem Proving" and its summary, the potential applications of GPT-4 in software development can be related to the field of automated theorem proving.\n\n1. **Automated theorem proving**: GPT-4 can be utilized in the development of automated theorem proving software that attempts to prove complex mathematical problems taken from International Mathematical Olympiad (IMO) or other challenging sources. By fine-tuning GPT-4 with a dataset like FIMO consisting of formal mathematical problems, the model can potentially better understand the problem statements and generate appropriate proofs.\n\n2. **Mathematical problem-solving assistants**: Software tools can be developed using GPT-4 to guide users in solving complex mathematical problems. The AI model can be integrated into educational platforms, online math tutoring services, or even standalone tools to help make solving problems easier and faster for students and professionals alike.\n\n3. **Formal language translation**: GPT-4 can potentially be integrated into software for translating between formal languages, assisting in the understanding and comparison of various formal systems. This would be especially useful in research communities employing different formal languages and wanting to share ideas and results.\n\n4. **Mathematical proof checking**: GPT-4 can be employed in proof-checking software to identify and correct inconsistencies. By improving the correctness of proofs, this application would ultimately help users save time and contribute to the overall quality of mathematical research.\n\nPlease note that this paper highlights the current limitations of GPT-4 in the context of IMO-level theorem proving. Nevertheless, these potential applications suggest directions for further research and software development as the model and related techniques continue to improve.\n\n--------------------------------------------------------------------------------\n\n>>>>>>>> USING AUTO REPLY...\nUser_proxy (to chat_manager):\n\n\n\n--------------------------------------------------------------------------------\n\n>>>>>>>> USING AUTO REPLY...\nUser_proxy (to chat_manager):\n\n\n\n--------------------------------------------------------------------------------\nCoder (to chat_manager):\n\nTERMINATE\n\n--------------------------------------------------------------------------------\n'})})]})}function h(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>i});var a=n(67294);const o={},r=a.createContext(o);function i(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);