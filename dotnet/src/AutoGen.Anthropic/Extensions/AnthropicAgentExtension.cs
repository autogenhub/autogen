﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// AnthropicAgentExtension.cs

using AutoGen.Anthropic.Middleware;
using AutoGen.Core;

namespace AutoGen.Anthropic.Extensions;

public static class AnthropicAgentExtension
{
    /// <summary>
    /// Register an <see cref="AnthropicMessageConnector"/> to the <see cref="AnthropicClientAgent"/>
    /// </summary>
    /// <param name="connector">the connector to use. If null, a new instance of <see cref="AnthropicMessageConnector"/> will be created.</param>
    public static MiddlewareStreamingAgent<AnthropicClientAgent> RegisterMessageConnector(
        this AnthropicClientAgent agent, AnthropicMessageConnector? connector = null)
    {
        connector ??= new AnthropicMessageConnector();

        return agent.RegisterStreamingMiddleware(connector);
    }

    /// <summary>
    /// Register an <see cref="AnthropicMessageConnector"/> to the <see cref="MiddlewareAgent{T}"/> where T is <see cref="AnthropicClientAgent"/>
    /// </summary>
    /// <param name="connector">the connector to use. If null, a new instance of <see cref="AnthropicMessageConnector"/> will be created.</param>
    public static MiddlewareStreamingAgent<AnthropicClientAgent> RegisterMessageConnector(
        this MiddlewareStreamingAgent<AnthropicClientAgent> agent, AnthropicMessageConnector? connector = null)
    {
        connector ??= new AnthropicMessageConnector();

        return agent.RegisterStreamingMiddleware(connector);
    }
}
