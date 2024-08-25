"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9011],{78412:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var i=t(85893),a=t(11151);const s={title:"AgentEval: A Developer Tool to Assess Utility of LLM-powered Applications",authors:["jluey","julianakiseleva"],tags:["LLM","GPT","evaluation","task utility"]},r=void 0,o={permalink:"/autogen/blog/2024/06/21/AgentEval",source:"@site/blog/2024-06-21-AgentEval/index.mdx",title:"AgentEval: A Developer Tool to Assess Utility of LLM-powered Applications",description:"Fig.1: An AgentEval framework with verification step",date:"2024-06-21T00:00:00.000Z",formattedDate:"June 21, 2024",tags:[{label:"LLM",permalink:"/autogen/blog/tags/llm"},{label:"GPT",permalink:"/autogen/blog/tags/gpt"},{label:"evaluation",permalink:"/autogen/blog/tags/evaluation"},{label:"task utility",permalink:"/autogen/blog/tags/task-utility"}],readingTime:6.7,hasTruncateMarker:!1,authors:[{name:"James Woffinden-Luey",title:"Senior Research Engineer at Microsoft Research",url:"https://github.com/jluey1",key:"jluey"},{name:"Julia Kiseleva",title:"Senior Researcher at Microsoft Research",url:"https://github.com/julianakiseleva/",imageURL:"https://avatars.githubusercontent.com/u/5908392?v=4",key:"julianakiseleva"}],frontMatter:{title:"AgentEval: A Developer Tool to Assess Utility of LLM-powered Applications",authors:["jluey","julianakiseleva"],tags:["LLM","GPT","evaluation","task utility"]},unlisted:!1,prevItem:{title:"Enhanced Support for Non-OpenAI Models",permalink:"/autogen/blog/2024/06/24/AltModels-Classes"},nextItem:{title:"Agents in AutoGen",permalink:"/autogen/blog/2024/05/24/Agent"}},l={authorsImageUrls:[void 0,void 0]},c=[{value:"Introduction",id:"introduction",level:2},{value:"A Flexible and Scalable Framework",id:"a-flexible-and-scalable-framework",level:2},{value:"Empirical Validation",id:"empirical-validation",level:2},{value:"How to use <code>AgentEval</code>",id:"how-to-use-agenteval",level:2},{value:"What is next?",id:"what-is-next",level:2},{value:"Conclusion",id:"conclusion",level:2},{value:"Further reading",id:"further-reading",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Fig.1: An AgentEval framework with verification step",src:t(27580).Z+"",width:"1483",height:"1206"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("em",{children:"Fig.1 illustrates the general flow of AgentEval with verification step "})}),"\n",(0,i.jsx)(n.p,{children:"TL;DR:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"As a developer, how can you assess the utility and effectiveness of an LLM-powered application in helping end users with their tasks?"}),"\n",(0,i.jsxs)(n.li,{children:["To shed light on the question above, we previously introduced ",(0,i.jsx)(n.a,{href:"https://autogen-ai.github.io/autogen/blog/2023/11/20/AgentEval/",children:(0,i.jsx)(n.code,{children:"AgentEval"})})," \u2014 a framework to assess the multi-dimensional utility of any LLM-powered application crafted to assist users in specific tasks. We have now embedded it as part of the AutoGen library to ease developer adoption."]}),"\n",(0,i.jsxs)(n.li,{children:["Here, we introduce an updated version of AgentEval that includes a verification process to estimate the robustness of the QuantifierAgent. More details can be found in ",(0,i.jsx)(n.a,{href:"https://arxiv.org/abs/2405.02178",children:"this paper"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsxs)(n.p,{children:["Previously introduced ",(0,i.jsx)(n.a,{href:"https://autogen-ai.github.io/autogen/blog/2023/11/20/AgentEval/",children:(0,i.jsx)(n.code,{children:"AgentEval"})})," is a comprehensive framework designed to bridge the gap in assessing the utility of LLM-powered applications. It leverages recent advancements in LLMs to offer a scalable and cost-effective alternative to traditional human evaluations. The framework comprises three main agents: ",(0,i.jsx)(n.code,{children:"CriticAgent"}),", ",(0,i.jsx)(n.code,{children:"QuantifierAgent"}),", and ",(0,i.jsx)(n.code,{children:"VerifierAgent"}),", each playing a crucial role in assessing the task utility of an application."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"CriticAgent: Defining the Criteria"})}),"\n",(0,i.jsx)(n.p,{children:"The CriticAgent's primary function is to suggest a set of criteria for evaluating an application based on the task description and examples of successful and failed executions. For instance, in the context of a math tutoring application, the CriticAgent might propose criteria such as efficiency, clarity, and correctness. These criteria are essential for understanding the various dimensions of the application's performance. It\u2019s highly recommended that application developers validate the suggested criteria leveraging their domain expertise."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"QuantifierAgent: Quantifying the Performance"})}),"\n",(0,i.jsx)(n.p,{children:"Once the criteria are established, the QuantifierAgent takes over to quantify how well the application performs against each criterion. This quantification process results in a multi-dimensional assessment of the application's utility, providing a detailed view of its strengths and weaknesses."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"VerifierAgent: Ensuring Robustness and Relevance"})}),"\n",(0,i.jsx)(n.p,{children:"VerifierAgent ensures the criteria used to evaluate a utility are effective for the end-user, maintaining both robustness and high discriminative power. It does this through two main actions:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Criteria Stability:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Ensures criteria are essential, non-redundant, and consistently measurable."}),"\n",(0,i.jsx)(n.li,{children:"Iterates over generating and quantifying criteria, eliminating redundancies, and evaluating their stability."}),"\n",(0,i.jsx)(n.li,{children:"Retains only the most robust criteria."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Discriminative Power:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Tests the system's reliability by introducing adversarial examples (noisy or compromised data)."}),"\n",(0,i.jsx)(n.li,{children:"Assesses the system's ability to distinguish these from standard cases."}),"\n",(0,i.jsx)(n.li,{children:"If the system fails, it indicates the need for better criteria to handle varied conditions effectively."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"a-flexible-and-scalable-framework",children:"A Flexible and Scalable Framework"}),"\n",(0,i.jsx)(n.p,{children:"One of AgentEval's key strengths is its flexibility. It can be applied to a wide range of tasks where success may or may not be clearly defined. For tasks with well-defined success criteria, such as household chores, the framework can evaluate whether multiple successful solutions exist and how they compare. For more open-ended tasks, such as generating an email template, AgentEval can assess the utility of the system's suggestions."}),"\n",(0,i.jsx)(n.p,{children:"Furthermore, AgentEval allows for the incorporation of human expertise. Domain experts can participate in the evaluation process by suggesting relevant criteria or verifying the usefulness of the criteria identified by the agents. This human-in-the-loop approach ensures that the evaluation remains grounded in practical, real-world considerations."}),"\n",(0,i.jsx)(n.h2,{id:"empirical-validation",children:"Empirical Validation"}),"\n",(0,i.jsx)(n.p,{children:"To validate AgentEval, the framework was tested on two applications: math problem solving and ALFWorld, a household task simulation. The math dataset comprised 12,500 challenging problems, each with step-by-step solutions, while the ALFWorld dataset involved multi-turn interactions in a simulated environment. In both cases, AgentEval successfully identified relevant criteria, quantified performance, and verified the robustness of the evaluations, demonstrating its effectiveness and versatility."}),"\n",(0,i.jsxs)(n.h2,{id:"how-to-use-agenteval",children:["How to use ",(0,i.jsx)(n.code,{children:"AgentEval"})]}),"\n",(0,i.jsx)(n.p,{children:"AgentEval currently has two main stages; criteria generation and criteria quantification (criteria verification is still under development). Both stages make use of sequential LLM-powered agents to make their determinations."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Criteria Generation:"})}),"\n",(0,i.jsx)(n.p,{children:"During criteria generation, AgentEval uses example execution message chains to create a set of criteria for quantifying how well an application performed for a given task."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'def generate_criteria(\n    llm_config: Optional[Union[Dict, Literal[False]]] = None,\n    task: Task = None,\n    additional_instructions: str = "",\n    max_round=2,\n    use_subcritic: bool = False,\n)\n'})}),"\n",(0,i.jsx)(n.p,{children:"Parameters:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"llm_config (dict or bool): llm inference configuration."}),"\n",(0,i.jsxs)(n.li,{children:["task (",(0,i.jsx)(n.a,{href:"https://github.com/microsoft/autogen/tree/main/autogen/agentchat/contrib/agent_eval/task.py",children:"Task"}),"): The task to evaluate."]}),"\n",(0,i.jsx)(n.li,{children:"additional_instructions (str, optional): Additional instructions for the criteria agent."}),"\n",(0,i.jsx)(n.li,{children:"max_round (int, optional): The maximum number of rounds to run the conversation."}),"\n",(0,i.jsx)(n.li,{children:"use_subcritic (bool, optional): Whether to use the Subcritic agent to generate subcriteria. The Subcritic agent will break down a generated criteria into smaller criteria to be assessed."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Example code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'config_list = autogen.config_list_from_json("OAI_CONFIG_LIST")\ntask = Task(\n    **{\n        "name": "Math problem solving",\n        "description": "Given any question, the system needs to solve the problem as consisely and accurately as possible",\n        "successful_response": response_successful,\n        "failed_response": response_failed,\n    }\n)\n\ncriteria = generate_criteria(task=task, llm_config={"config_list": config_list})\n'})}),"\n",(0,i.jsx)(n.p,{children:"Note: Only one sample execution chain (success/failure) is required for the task object but AgentEval will perform better with an example for each case."}),"\n",(0,i.jsx)(n.p,{children:"Example Output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'[\n    {\n        "name": "Accuracy",\n        "description": "The solution must be correct and adhere strictly to mathematical principles and techniques appropriate for the problem.",\n        "accepted_values": ["Correct", "Minor errors", "Major errors", "Incorrect"]\n    },\n    {\n        "name": "Conciseness",\n        "description": "The explanation and method provided should be direct and to the point, avoiding unnecessary steps or complexity.",\n        "accepted_values": ["Very concise", "Concise", "Somewhat verbose", "Verbose"]\n    },\n    {\n        "name": "Relevance",\n        "description": "The content of the response must be relevant to the question posed and should address the specific problem requirements.",\n        "accepted_values": ["Highly relevant", "Relevant", "Somewhat relevant", "Not relevant"]\n    }\n]\n'})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Criteria Quantification:"})}),"\n",(0,i.jsx)(n.p,{children:"During the quantification stage, AgentEval will use the generated criteria (or user defined criteria) to assess a given execution chain to determine how well the application performed."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"def quantify_criteria(\n    llm_config: Optional[Union[Dict, Literal[False]]],\n    criteria: List[Criterion],\n    task: Task,\n    test_case: str,\n    ground_truth: str,\n)\n"})}),"\n",(0,i.jsx)(n.p,{children:"Parameters:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"llm_config (dict or bool): llm inference configuration."}),"\n",(0,i.jsxs)(n.li,{children:["criteria (",(0,i.jsx)(n.a,{href:"https://github.com/microsoft/autogen/tree/main/autogen/agentchat/contrib/agent_eval/criterion.py",children:"Criterion"}),"): A list of criteria for evaluating the utility of a given task. This can either be generated by the ",(0,i.jsx)(n.code,{children:"generate_criteria"})," function or manually created."]}),"\n",(0,i.jsxs)(n.li,{children:["task (",(0,i.jsx)(n.a,{href:"https://github.com/microsoft/autogen/tree/main/autogen/agentchat/contrib/agent_eval/task.py",children:"Task"}),"): The task to evaluate. It should match the one used during the ",(0,i.jsx)(n.code,{children:"generate_criteria"})," step."]}),"\n",(0,i.jsx)(n.li,{children:"test_case (str): The execution chain to assess. Typically this is a json list of messages but could be any string representation of a conversation chain."}),"\n",(0,i.jsx)(n.li,{children:"ground_truth (str): The ground truth for the test case."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Example Code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'test_case="""[\n    {\n      "content": "Find $24^{-1} \\\\pmod{11^2}$. That is, find the residue $b$ for which $24b \\\\equiv 1\\\\pmod{11^2}$.\\n\\nExpress your answer as an integer from $0$ to $11^2-1$, inclusive.",\n      "role": "user"\n    },\n    {\n      "content": "To find the modular inverse of 24 modulo 11^2, we can use the Extended Euclidean Algorithm. Here is a Python function to compute the modular inverse using this algorithm:\\n\\n```python\\ndef mod_inverse(a, m):\\n..."\n      "role": "assistant"\n    }\n  ]"""\n\nquantifier_output = quantify_criteria(\n    llm_config={"config_list": config_list},\n    criteria=criteria,\n    task=task,\n    test_case=test_case,\n    ground_truth="true",\n)\n'})}),"\n",(0,i.jsx)(n.p,{children:"The output will be a json object consisting of the ground truth and a dictionary mapping each criteria to it's score."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'{\n  "actual_success": true,\n  "estimated_performance": {\n      "Accuracy": "Correct",\n      "Conciseness": "Concise",\n      "Relevance": "Highly relevant"\n    }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"what-is-next",children:"What is next?"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Enabling AgentEval in AutoGen Studio for a nocode solution."}),"\n",(0,i.jsx)(n.li,{children:"Fully implementing VerifierAgent in the AgentEval framework."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"AgentEval represents a significant advancement in the evaluation of LLM-powered applications. By combining the strengths of CriticAgent, QuantifierAgent, and VerifierAgent, the framework offers a robust, scalable, and flexible solution for assessing task utility. This innovative approach not only helps developers understand the current performance of their applications but also provides valuable insights that can drive future improvements. As the field of intelligent agents continues to evolve, frameworks like AgentEval will play a crucial role in ensuring that these applications meet the diverse and dynamic needs of their users."}),"\n",(0,i.jsx)(n.h2,{id:"further-reading",children:"Further reading"}),"\n",(0,i.jsxs)(n.p,{children:["Please refer to our ",(0,i.jsx)(n.a,{href:"https://arxiv.org/abs/2405.02178",children:"paper"})," and ",(0,i.jsx)(n.a,{href:"https://github.com/microsoft/autogen/tree/main/autogen/agentchat/contrib/agent_eval",children:"codebase"})," for more details about AgentEval."]}),"\n",(0,i.jsx)(n.p,{children:"If you find this blog useful, please consider citing:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bobtex",children:"@article{arabzadeh2024assessing,\n  title={Assessing and Verifying Task Utility in LLM-Powered Applications},\n  author={Arabzadeh, Negar and Huo, Siging and Mehta, Nikhil and Wu, Qinqyun and Wang, Chi and Awadallah, Ahmed and Clarke, Charles LA and Kiseleva, Julia},\n  journal={arXiv preprint arXiv:2405.02178},\n  year={2024}\n}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},27580:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/agenteval_ov_v3-c471c3a909d8046fc75e70fb198e63ac.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>r});var i=t(67294);const a={},s=i.createContext(a);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);