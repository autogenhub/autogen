﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Portions derived from  https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// MessageEnvelope.cs

using System.Collections.Generic;

namespace AutoGen.Core;

public abstract class MessageEnvelope : IMessage
{
    public MessageEnvelope(string? from = null, IDictionary<string, object>? metadata = null)
    {
        this.From = from;
        this.Metadata = metadata ?? new Dictionary<string, object>();
    }

    public static MessageEnvelope<TContent> Create<TContent>(TContent content, string? from = null, IDictionary<string, object>? metadata = null)
    {
        return new MessageEnvelope<TContent>(content, from, metadata);
    }

    public string? From { get; set; }

    public IDictionary<string, object> Metadata { get; set; }
}

public class MessageEnvelope<T> : MessageEnvelope, IMessage<T>
{
    public MessageEnvelope(T content, string? from = null, IDictionary<string, object>? metadata = null)
        : base(from, metadata)
    {
        this.Content = content;
        this.From = from;
        this.Metadata = metadata ?? new Dictionary<string, object>();
    }

    public T Content { get; }
}
