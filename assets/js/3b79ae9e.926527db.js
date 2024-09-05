"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3574],{80001:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>a});var n=r(85893),o=r(11151);const l={sidebar_label:"local_jupyter_server",title:"coding.jupyter.local_jupyter_server"},s=void 0,i={id:"reference/coding/jupyter/local_jupyter_server",title:"coding.jupyter.local_jupyter_server",description:"LocalJupyterServer",source:"@site/docs/reference/coding/jupyter/local_jupyter_server.md",sourceDirName:"reference/coding/jupyter",slug:"/reference/coding/jupyter/local_jupyter_server",permalink:"/autogen/docs/reference/coding/jupyter/local_jupyter_server",draft:!1,unlisted:!1,editUrl:"https://github.com/autogen-ai/autogen/edit/main/website/docs/reference/coding/jupyter/local_jupyter_server.md",tags:[],version:"current",frontMatter:{sidebar_label:"local_jupyter_server",title:"coding.jupyter.local_jupyter_server"},sidebar:"referenceSideBar",previous:{title:"jupyter_code_executor",permalink:"/autogen/docs/reference/coding/jupyter/jupyter_code_executor"},next:{title:"base",permalink:"/autogen/docs/reference/coding/base"}},c={},a=[{value:"LocalJupyterServer",id:"localjupyterserver",level:2},{value:"__init__",id:"__init__",level:3}];function u(e){const t={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"localjupyterserver",children:"LocalJupyterServer"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"class LocalJupyterServer(JupyterConnectable)\n"})}),"\n",(0,n.jsx)(t.h3,{id:"__init__",children:"__init__"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def __init__(ip: str = "127.0.0.1",\n             port: Optional[int] = None,\n             token: Union[str, GenerateToken] = GenerateToken(),\n             log_file: str = "jupyter_gateway.log",\n             log_level: str = "INFO",\n             log_max_bytes: int = 1048576,\n             log_backup_count: int = 3)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Runs a Jupyter Kernel Gateway server locally."}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Arguments"}),":"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"ip"})," ",(0,n.jsx)(t.em,{children:"str, optional"}),' - IP address to bind to. Defaults to "127.0.0.1".']}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"port"})," ",(0,n.jsx)(t.em,{children:"Optional[int], optional"})," - Port to use, if None it automatically selects a port. Defaults to None."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"token"})," ",(0,n.jsx)(t.em,{children:"Union[str, GenerateToken], optional"})," - Token to use for Jupyter server. By default will generate a token. Using None will use no token for authentication. Defaults to GenerateToken()."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"log_file"})," ",(0,n.jsx)(t.em,{children:"str, optional"}),' - File for Jupyter Kernel Gateway logs. Defaults to "jupyter_gateway.log".']}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"log_level"})," ",(0,n.jsx)(t.em,{children:"str, optional"}),' - Level for Jupyter Kernel Gateway logs. Defaults to "INFO".']}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"log_max_bytes"})," ",(0,n.jsx)(t.em,{children:"int, optional"})," - Max logfile size. Defaults to 1048576."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"log_backup_count"})," ",(0,n.jsx)(t.em,{children:"int, optional"})," - Number of backups for rotating log. Defaults to 3."]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(u,{...e})}):u(e)}},11151:(e,t,r)=>{r.d(t,{Z:()=>i,a:()=>s});var n=r(67294);const o={},l=n.createContext(o);function s(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);