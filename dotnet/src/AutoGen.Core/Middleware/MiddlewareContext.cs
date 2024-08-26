// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// MiddlewareContext.cs

using System.Collections.Generic;

namespace AutoGen.Core;

public class MiddlewareContext
{
    public MiddlewareContext(
        IEnumerable<IMessage> messages,
        GenerateReplyOptions? options)
    {
        this.Messages = messages;
        this.Options = options;
    }

    /// <summary>
    /// Messages to send to the agent
    /// </summary>
    public IEnumerable<IMessage> Messages { get; }

    /// <summary>
    /// Options to generate the reply
    /// </summary>
    public GenerateReplyOptions? Options { get; }
}
