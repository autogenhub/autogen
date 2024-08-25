"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6577],{74403:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>s,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var o=t(85893),a=t(11151);const l={custom_edit_url:"https://github.com/autogen-ai/autogen/edit/main/website/docs/topics/non-openai-models/local-litellm-ollama.ipynb",source_notebook:"/website/docs/topics/non-openai-models/local-litellm-ollama.ipynb",title:"LiteLLM with Ollama"},s="LiteLLM with Ollama",i={id:"topics/non-openai-models/local-litellm-ollama",title:"LiteLLM with Ollama",description:"Open In Colab",source:"@site/docs/topics/non-openai-models/local-litellm-ollama.mdx",sourceDirName:"topics/non-openai-models",slug:"/topics/non-openai-models/local-litellm-ollama",permalink:"/autogen/docs/topics/non-openai-models/local-litellm-ollama",draft:!1,unlisted:!1,editUrl:"https://github.com/autogen-ai/autogen/edit/main/website/docs/topics/non-openai-models/local-litellm-ollama.ipynb",tags:[],version:"current",frontMatter:{custom_edit_url:"https://github.com/autogen-ai/autogen/edit/main/website/docs/topics/non-openai-models/local-litellm-ollama.ipynb",source_notebook:"/website/docs/topics/non-openai-models/local-litellm-ollama.ipynb",title:"LiteLLM with Ollama"},sidebar:"docsSidebar",previous:{title:"Together.AI",permalink:"/autogen/docs/topics/non-openai-models/cloud-togetherai"},next:{title:"LM Studio",permalink:"/autogen/docs/topics/non-openai-models/local-lm-studio"}},r={},c=[{value:"Installing LiteLLM",id:"installing-litellm",level:2},{value:"Installing Ollama",id:"installing-ollama",level:2},{value:"Downloading models",id:"downloading-models",level:2},{value:"Running LiteLLM proxy server",id:"running-litellm-proxy-server",level:2},{value:"Using LiteLLM+Ollama with AutoGen",id:"using-litellmollama-with-autogen",level:2},{value:"Example with Function Calling",id:"example-with-function-calling",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"litellm-with-ollama",children:"LiteLLM with Ollama"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://colab.research.google.com/github/autogen-ai/autogen/blob/main/website/docs/topics/non-openai-models/local-litellm-ollama.ipynb",children:(0,o.jsx)(n.img,{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"})}),"\n",(0,o.jsx)(n.a,{href:"https://github.com/autogen-ai/autogen/blob/main/website/docs/topics/non-openai-models/local-litellm-ollama.ipynb",children:(0,o.jsx)(n.img,{src:"https://img.shields.io/badge/Open%20on%20GitHub-grey?logo=github",alt:"Open on GitHub"})})]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://litellm.ai/",children:"LiteLLM"})," is an open-source locally run proxy\nserver that provides an OpenAI-compatible API. It interfaces with a\nlarge number of providers that do the inference. To handle the\ninference, a popular open-source inference engine is\n",(0,o.jsx)(n.a,{href:"https://ollama.com/",children:"Ollama"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["As not all proxy servers support OpenAI\u2019s ",(0,o.jsx)(n.a,{href:"https://platform.openai.com/docs/guides/function-calling",children:"Function\nCalling"}),"\n(usable with AutoGen), LiteLLM together with Ollama enable this useful\nfeature."]}),"\n",(0,o.jsx)(n.p,{children:"Running this stack requires the installation of:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["AutoGen (",(0,o.jsx)(n.a,{href:"../../../docs/installation",children:"installation instructions"}),")"]}),"\n",(0,o.jsx)(n.li,{children:"LiteLLM"}),"\n",(0,o.jsx)(n.li,{children:"Ollama"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Note: We recommend using a virtual environment for your stack, see ",(0,o.jsx)(n.a,{href:"https://microsoft.github.io/autogen/docs/installation/#create-a-virtual-environment-optional",children:"this\narticle"}),"\nfor guidance."]}),"\n",(0,o.jsx)(n.h2,{id:"installing-litellm",children:"Installing LiteLLM"}),"\n",(0,o.jsx)(n.p,{children:"Install LiteLLM with the proxy server functionality:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"pip install 'litellm[proxy]'\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Note: If using Windows, run LiteLLM and Ollama within a\n",(0,o.jsx)(n.a,{href:"https://learn.microsoft.com/en-us/windows/wsl/install",children:"WSL2"}),"."]}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsxs)(n.p,{children:["For custom LiteLLM installation instructions, see their ",(0,o.jsx)(n.a,{href:"https://github.com/BerriAI/litellm",children:"GitHub repository"}),"."]})}),"\n",(0,o.jsx)(n.h2,{id:"installing-ollama",children:"Installing Ollama"}),"\n",(0,o.jsxs)(n.p,{children:["For Mac and Windows, ",(0,o.jsx)(n.a,{href:"https://ollama.com/download",children:"download Ollama"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"For Linux:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"curl -fsSL https://ollama.com/install.sh | sh\n"})}),"\n",(0,o.jsx)(n.h2,{id:"downloading-models",children:"Downloading models"}),"\n",(0,o.jsxs)(n.p,{children:["Ollama has a library of models to choose from, see them\n",(0,o.jsx)(n.a,{href:"https://ollama.com/library",children:"here"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Before you can use a model, you need to download it (using the name of\nthe model from the library):"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"ollama pull llama3:instruct\n"})}),"\n",(0,o.jsx)(n.p,{children:"To view the models you have downloaded and can use:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"ollama list\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsxs)(n.p,{children:["Ollama enables the use of GGUF model files, available readily on Hugging Face. See Ollama`s ",(0,o.jsx)(n.a,{href:"https://github.com/ollama/ollama",children:"GitHub repository"}),"\nfor examples."]})}),"\n",(0,o.jsx)(n.h2,{id:"running-litellm-proxy-server",children:"Running LiteLLM proxy server"}),"\n",(0,o.jsx)(n.p,{children:"To run LiteLLM with the model you have downloaded, in your terminal:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"litellm --model ollama/llama3:instruct\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-text",children:"INFO:     Started server process [19040]\nINFO:     Waiting for application startup.\n\n#------------------------------------------------------------#\n#                                                            #\n#       'This feature doesn't meet my needs because...'       #\n#        https://github.com/BerriAI/litellm/issues/new        #\n#                                                            #\n#------------------------------------------------------------#\n\n Thank you for using LiteLLM! - Krrish & Ishaan\n\n\n\nGive Feedback / Get Help: https://github.com/BerriAI/litellm/issues/new\n\n\nINFO:     Application startup complete.\nINFO:     Uvicorn running on http://0.0.0.0:4000 (Press CTRL+C to quit)\n"})}),"\n",(0,o.jsxs)(n.p,{children:["This will run the proxy server and it will be available at\n\u2018",(0,o.jsx)(n.a,{href:"http://0.0.0.0:4000/%E2%80%99",children:"http://0.0.0.0:4000/\u2019"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"using-litellmollama-with-autogen",children:"Using LiteLLM+Ollama with AutoGen"}),"\n",(0,o.jsx)(n.p,{children:"Now that we have the URL for the LiteLLM proxy server, you can use it\nwithin AutoGen in the same way as OpenAI or cloud-based proxy servers."}),"\n",(0,o.jsxs)(n.p,{children:["As you are running this proxy server locally, no API key is required.\nAdditionally, as the model is being set when running the LiteLLM\ncommand, no model name needs to be configured in AutoGen. However,\n",(0,o.jsx)(n.code,{children:"model"})," and ",(0,o.jsx)(n.code,{children:"api_key"})," are mandatory fields for configurations within\nAutoGen so we put dummy values in them, as per the example below."]}),"\n",(0,o.jsxs)(n.p,{children:["An additional setting for the configuration is ",(0,o.jsx)(n.code,{children:"price"}),", which can be\nused to set the pricing of tokens. As we\u2019re running it locally, we\u2019ll\nput our costs as zero. Using this setting will also avoid a prompt being\nshown when price can\u2019t be determined."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from autogen import ConversableAgent, UserProxyAgent\n\nlocal_llm_config = {\n    "config_list": [\n        {\n            "model": "NotRequired",  # Loaded with LiteLLM command\n            "api_key": "NotRequired",  # Not needed\n            "base_url": "http://0.0.0.0:4000",  # Your LiteLLM URL\n            "price": [0, 0],  # Put in price per 1K tokens [prompt, response] as free!\n        }\n    ],\n    "cache_seed": None,  # Turns off caching, useful for testing different models\n}\n\n# Create the agent that uses the LLM.\nassistant = ConversableAgent("agent", llm_config=local_llm_config)\n\n# Create the agent that represents the user in the conversation.\nuser_proxy = UserProxyAgent("user", code_execution_config=False)\n\n# Let the assistant start the conversation.  It will end when the user types exit.\nres = assistant.initiate_chat(user_proxy, message="How can I help you today?")\n\nprint(assistant)\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-text",children:"agent (to user):\n\nHow can I help you today?\n\n--------------------------------------------------------------------------------\nuser (to agent):\n\nWhy is the sky blue?\n\n--------------------------------------------------------------------------------\n\n>>>>>>>> USING AUTO REPLY...\nagent (to user):\n\nA classic question!\n\nThe sky appears blue because of a phenomenon called scattering. When sunlight enters Earth's atmosphere, it encounters tiny molecules of gases such as nitrogen (N2) and oxygen (O2). These molecules scatter the light in all directions, but they scatter shorter (blue) wavelengths more than longer (red) wavelengths.\n\nThis is known as Rayleigh scattering, named after the British physicist Lord Rayleigh, who first described the phenomenon in the late 19th century. As a result of this scattering, the blue light is distributed throughout the atmosphere, giving the sky its blue appearance.\n\nAdditionally, when sunlight passes through more dense atmospheric particles like water vapor, pollutants, and dust, it can also be scattered or absorbed, which affects the color we see. For example, during sunrise and sunset, the light has to travel longer distances through the atmosphere, which scatters the shorter wavelengths even more, making the sky appear more red.\n\nSo, there you have it! The blue sky is a result of the combination of sunlight, atmospheric gases, and the scattering of light.\n\nHow's that? Do you have any other questions or would you like to explore more topics?\n\n--------------------------------------------------------------------------------\nuser (to agent):\n\nWhy is it sometimes red, then?\n\n--------------------------------------------------------------------------------\n\n>>>>>>>> USING AUTO REPLY...\nagent (to user):\n\nExcellent follow-up question!\n\nAs I mentioned earlier, the color we see in the sky can be affected by the amount and type of particles in the atmosphere. When the sunlight has to travel longer distances through the air, like during sunrise and sunset, it encounters more atmospheric particles that scatter the shorter blue wavelengths even more than the longer red wavelengths.\n\nThis is known as Mie scattering, named after the German physicist Gustav Mie. The larger particles, such as water droplets, pollen, and dust, are responsible for this type of scattering. They scatter the shorter blue wavelengths more efficiently than the longer red wavelengths, which is why we often see more red or orange hues during these times.\n\nAdditionally, during sunrise and sunset, the sun's rays have to travel through a thicker layer of atmosphere, which contains more particles like water vapor, pollutants, and aerosols. These particles can absorb or scatter certain wavelengths of light, making them appear redder or more orange.\n\nThe combination of Mie scattering and absorption by atmospheric particles can create the warm, golden hues we often see during sunrise and sunset. It's a beautiful reminder that the color of our sky is not just a result of the sun itself but also the complex interactions between sunlight, atmosphere, and particles!\n\nWould you like to explore more about the Earth's atmosphere or perhaps learn about other fascinating topics?\n\n--------------------------------------------------------------------------------\n<autogen.agentchat.conversable_agent.ConversableAgent object at 0x7fe35da88dd0>\n"})}),"\n",(0,o.jsx)(n.h2,{id:"example-with-function-calling",children:"Example with Function Calling"}),"\n",(0,o.jsx)(n.p,{children:"Function calling (aka Tool calling) is a feature of OpenAI\u2019s API that\nAutoGen, LiteLLM, and Ollama support."}),"\n",(0,o.jsxs)(n.p,{children:["Below is an example of using function calling with LiteLLM and Ollama.\nBased on this ",(0,o.jsx)(n.a,{href:"https://github.com/microsoft/autogen/blob/501f8d22726e687c55052682c20c97ce62f018ac/notebook/agentchat_function_call_currency_calculator.ipynb",children:"currency\nconversion"}),"\nnotebook."]}),"\n",(0,o.jsx)(n.p,{children:"LiteLLM is loaded in the same way as the previous example and we\u2019ll\ncontinue to use Meta\u2019s Llama3 model as it is good at constructing the\nfunction calling message required."}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Note:"})," LiteLLM version 1.41.27, or later, is required (to support\nfunction calling natively using Ollama)."]}),"\n",(0,o.jsx)(n.p,{children:"In your terminal:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"litellm --model ollama/llama3\n"})}),"\n",(0,o.jsx)(n.p,{children:"Then we run our program with function calling."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from typing import Literal\n\nfrom typing_extensions import Annotated\n\nimport autogen\n\nlocal_llm_config = {\n    "config_list": [\n        {\n            "model": "NotRequired",  # Loaded with LiteLLM command\n            "api_key": "NotRequired",  # Not needed\n            "base_url": "http://0.0.0.0:4000",  # Your LiteLLM URL\n            "price": [0, 0],  # Put in price per 1K tokens [prompt, response] as free!\n        }\n    ],\n    "cache_seed": None,  # Turns off caching, useful for testing different models\n}\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-text",children:"/usr/local/lib/python3.11/site-packages/tqdm/auto.py:21: TqdmWarning: IProgress not found. Please update jupyter and ipywidgets. See https://ipywidgets.readthedocs.io/en/stable/user_install.html\n  from .autonotebook import tqdm as notebook_tqdm\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'# Create the agent and include examples of the function calling JSON in the prompt\n# to help guide the model\nchatbot = autogen.AssistantAgent(\n    name="chatbot",\n    system_message="""For currency exchange tasks,\n        only use the functions you have been provided with.\n        If the function has been called previously,\n        return only the word \'TERMINATE\'.""",\n    llm_config=local_llm_config,\n)\n\nuser_proxy = autogen.UserProxyAgent(\n    name="user_proxy",\n    is_termination_msg=lambda x: x.get("content", "") and "TERMINATE" in x.get("content", ""),\n    human_input_mode="NEVER",\n    max_consecutive_auto_reply=1,\n    code_execution_config={"work_dir": "code", "use_docker": False},\n)\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'CurrencySymbol = Literal["USD", "EUR"]\n\n# Define our function that we expect to call\n\n\ndef exchange_rate(base_currency: CurrencySymbol, quote_currency: CurrencySymbol) -> float:\n    if base_currency == quote_currency:\n        return 1.0\n    elif base_currency == "USD" and quote_currency == "EUR":\n        return 1 / 1.1\n    elif base_currency == "EUR" and quote_currency == "USD":\n        return 1.1\n    else:\n        raise ValueError(f"Unknown currencies {base_currency}, {quote_currency}")\n\n\n# Register the function with the agent\n@user_proxy.register_for_execution()\n@chatbot.register_for_llm(description="Currency exchange calculator.")\ndef currency_calculator(\n    base_amount: Annotated[float, "Amount of currency in base_currency"],\n    base_currency: Annotated[CurrencySymbol, "Base currency"] = "USD",\n    quote_currency: Annotated[CurrencySymbol, "Quote currency"] = "EUR",\n) -> str:\n    quote_amount = exchange_rate(base_currency, quote_currency) * base_amount\n    return f"{format(quote_amount, \'.2f\')} {quote_currency}"\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'# start the conversation\nres = user_proxy.initiate_chat(\n    chatbot,\n    message="How much is 123.45 EUR in USD?",\n    summary_method="reflection_with_llm",\n)\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-text",children:'user_proxy (to chatbot):\n\nHow much is 123.45 EUR in USD?\n\n--------------------------------------------------------------------------------\nchatbot (to user_proxy):\n\n***** Suggested tool call (call_d9584223-9af0-4526-ad09-856b03487fd5): currency_calculator *****\nArguments: \n{"base_amount": 123.45, "base_currency": "EUR", "quote_currency": "USD"}\n************************************************************************************************\n\n--------------------------------------------------------------------------------\n\n>>>>>>>> EXECUTING FUNCTION currency_calculator...\nuser_proxy (to chatbot):\n\nuser_proxy (to chatbot):\n\n***** Response from calling tool (call_d9584223-9af0-4526-ad09-856b03487fd5) *****\n135.80 USD\n**********************************************************************************\n\n--------------------------------------------------------------------------------\nchatbot (to user_proxy):\n\n***** Suggested tool call (call_17b07b4d-629f-4314-8a04-97b1537fa486): currency_calculator *****\nArguments: \n{"base_amount": 123.45, "base_currency": "EUR", "quote_currency": "USD"}\n************************************************************************************************\n\n--------------------------------------------------------------------------------\n'})}),"\n",(0,o.jsx)(n.p,{children:"We can see that the currency conversion function was called with the\ncorrect values and a result was generated."}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsx)(n.p,{children:"Once functions are included in the conversation it is possible, using LiteLLM and Ollama, that the model may continue to recommend tool calls (as shown above). This is an area of active development and a native Ollama client for AutoGen is planned for a future release."})})]})}function u(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>s});var o=t(67294);const a={},l=o.createContext(a);function s(e){const n=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),o.createElement(l.Provider,{value:n},e.children)}}}]);