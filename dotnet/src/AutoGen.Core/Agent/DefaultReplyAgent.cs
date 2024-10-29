﻿// Copyright (c) 2023 - 2024, Owners of https://github.com/autogenhub
// SPDX-License-Identifier: Apache-2.0
// Contributions to this project, i.e., https://github.com/autogenhub/autogen, 
// are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Portions derived from  https://github.com/microsoft/autogen under the MIT License.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// DefaultReplyAgent.cs

using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace AutoGen.Core;

public class DefaultReplyAgent : IAgent
{
    public DefaultReplyAgent(
        string name,
        string? defaultReply)
    {
        Name = name;
        DefaultReply = defaultReply ?? string.Empty;
    }

    public string Name { get; }

    public string DefaultReply { get; } = string.Empty;

    public async Task<IMessage> GenerateReplyAsync(
        IEnumerable<IMessage> _,
        GenerateReplyOptions? __ = null,
        CancellationToken ___ = default)
    {
        return new TextMessage(Role.Assistant, DefaultReply, from: this.Name);
    }
}
