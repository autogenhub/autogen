﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Portions derived from  https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// IStreamingMiddleware.cs

using System.Collections.Generic;
using System.Threading;

namespace AutoGen.Core;

/// <summary>
/// The streaming middleware interface. For non-streaming version middleware, check <see cref="IMiddleware"/>.
/// </summary>
public interface IStreamingMiddleware : IMiddleware
{
    /// <summary>
    /// The streaming version of <see cref="IMiddleware.InvokeAsync(MiddlewareContext, IAgent, CancellationToken)"/>.
    /// </summary>
    public IAsyncEnumerable<IMessage> InvokeAsync(
        MiddlewareContext context,
        IStreamingAgent agent,
        CancellationToken cancellationToken = default);
}
