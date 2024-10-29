from typing import Dict, Optional, Union

from autogen import UserProxyAgent

from .falkor_graph_query_engine import FalkorGraphQueryEngine, FalkorGraphQueryResult
from .graph_rag_capability import GraphRagCapability


class FalkorGraphRagCapability(GraphRagCapability):
    """
    A graph rag capability uses a graph query engine to give a conversable agent the graph rag ability.

    An agent class with graph rag capability could
    1. create a graph in the underlying database with input documents.
    2. retrieved relevant information based on messages received by the agent.
    3. generate answers from retrieved information and send messages back.

    For example,
    graph_query_engine = GraphQueryEngine(...)
    graph_query_engine.init_db([Document(doc1), Document(doc2), ...])

    graph_rag_agent = ConversableAgent(
        name="graph_rag_agent",
        max_consecutive_auto_reply=3,
        ...
    )
    graph_rag_capability = GraphRagCapbility(graph_query_engine)
    graph_rag_capability.add_to_agent(graph_rag_agent)

    user_proxy = UserProxyAgent(
        name="user_proxy",
        code_execution_config=False,
        is_termination_msg=lambda msg: "TERMINATE" in msg["content"],
        human_input_mode="ALWAYS",
    )
    user_proxy.initiate_chat(graph_rag_agent, message="Name a few actors who've played in 'The Matrix'")

    # ChatResult(
        # chat_id=None,
        # chat_history=[
            # {'content': 'Name a few actors who've played in \'The Matrix\'', 'role': 'graph_rag_agent'},
            # {'content': 'A few actors who have played in The Matrix are:
            #   - Keanu Reeves
            #   - Laurence Fishburne
            #   - Carrie-Anne Moss
            #   - Hugo Weaving',
            #   'role': 'user_proxy'},
        # ...)

    """

    def __init__(self, query_engine: FalkorGraphQueryEngine):
        """
        initialize graph rag capability with a graph query engine
        """
        self.query_engine = query_engine

    def add_to_agent(self, agent: UserProxyAgent):
        self.graph_rag_agent = agent

        # Validate the agent config
        if agent.llm_config not in (None, False):
            raise Exception(
                "Graph rag capability limits the query to graph DB, llm_config must be a dict or False or None."
            )

        # Register a hook for processing the last message.
        agent.register_hook(hookable_method="process_last_received_message", hook=self.process_last_received_message)

        # Append extra info to the system message.
        agent.update_system_message(
            agent.system_message + "\nYou've been given the special ability to use graph rag to retrieve information."
        )

    def process_last_received_message(self, message: Union[Dict, str]):
        question = self._get_last_question(message)
        result: FalkorGraphQueryResult = self.query_engine.query(question)
        return result.answer

    def _get_last_question(self, message: Union[Dict, str]):
        if isinstance(message, str):
            return message
        if isinstance(message, Dict):
            if "content" in message:
                return message["content"]
        return None
