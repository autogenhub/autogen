﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Portions derived from  https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// GeminiAgentExtension.cs

using AutoGen.Core;

namespace AutoGen.Gemini;

public static class GeminiAgentExtension
{

    /// <summary>
    /// Register an <see cref="GeminiMessageConnector"/> to the <see cref="GeminiChatAgent"/>
    /// </summary>
    /// <param name="connector">the connector to use. If null, a new instance of <see cref="GeminiMessageConnector"/> will be created.</param>
    public static MiddlewareStreamingAgent<GeminiChatAgent> RegisterMessageConnector(
        this GeminiChatAgent agent, GeminiMessageConnector? connector = null)
    {
        if (connector == null)
        {
            connector = new GeminiMessageConnector();
        }

        return agent.RegisterStreamingMiddleware(connector);
    }

    /// <summary>
    /// Register an <see cref="GeminiMessageConnector"/> to the <see cref="MiddlewareAgent{T}"/> where T is <see cref="GeminiChatAgent"/>
    /// </summary>
    /// <param name="connector">the connector to use. If null, a new instance of <see cref="GeminiMessageConnector"/> will be created.</param>
    public static MiddlewareStreamingAgent<GeminiChatAgent> RegisterMessageConnector(
        this MiddlewareStreamingAgent<GeminiChatAgent> agent, GeminiMessageConnector? connector = null)
    {
        if (connector == null)
        {
            connector = new GeminiMessageConnector();
        }

        return agent.RegisterStreamingMiddleware(connector);
    }
}
