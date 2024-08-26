﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Portions derived from  https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// OpenAIAgentExtension.cs

namespace AutoGen.OpenAI.V1.Extension;

public static class OpenAIAgentExtension
{
    /// <summary>
    /// Register an <see cref="OpenAIChatRequestMessageConnector"/> to the <see cref="OpenAIChatAgent"/>
    /// </summary>
    /// <param name="connector">the connector to use. If null, a new instance of <see cref="OpenAIChatRequestMessageConnector"/> will be created.</param>
    public static MiddlewareStreamingAgent<OpenAIChatAgent> RegisterMessageConnector(
        this OpenAIChatAgent agent, OpenAIChatRequestMessageConnector? connector = null)
    {
        if (connector == null)
        {
            connector = new OpenAIChatRequestMessageConnector();
        }

        return agent.RegisterStreamingMiddleware(connector);
    }

    /// <summary>
    /// Register an <see cref="OpenAIChatRequestMessageConnector"/> to the <see cref="MiddlewareAgent{T}"/> where T is <see cref="OpenAIChatAgent"/>
    /// </summary>
    /// <param name="connector">the connector to use. If null, a new instance of <see cref="OpenAIChatRequestMessageConnector"/> will be created.</param>
    public static MiddlewareStreamingAgent<OpenAIChatAgent> RegisterMessageConnector(
        this MiddlewareStreamingAgent<OpenAIChatAgent> agent, OpenAIChatRequestMessageConnector? connector = null)
    {
        if (connector == null)
        {
            connector = new OpenAIChatRequestMessageConnector();
        }

        return agent.RegisterStreamingMiddleware(connector);
    }
}
