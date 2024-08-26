﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// TextMessage.cs

namespace AutoGen.Core;

public class TextMessage : IMessage, ICanGetTextContent
{
    public TextMessage(Role role, string content, string? from = null)
    {
        this.Content = content;
        this.Role = role;
        this.From = from;
    }

    public TextMessage(TextMessageUpdate update)
    {
        this.Content = update.Content ?? string.Empty;
        this.Role = update.Role;
        this.From = update.From;
    }

    public void Update(TextMessageUpdate update)
    {
        if (update.Role != this.Role)
        {
            throw new System.ArgumentException("Role mismatch", nameof(update));
        }

        if (update.From != this.From)
        {
            throw new System.ArgumentException("From mismatch", nameof(update));
        }

        this.Content = this.Content + update.Content ?? string.Empty;
    }

    public Role Role { get; set; }

    public string Content { get; set; }

    public string? From { get; set; }

    public override string ToString()
    {
        return $"TextMessage({this.Role}, {this.Content}, {this.From})";
    }

    public string? GetContent()
    {
        return this.Content;
    }
}

public class TextMessageUpdate : IMessage, ICanGetTextContent
{
    public TextMessageUpdate(Role role, string? content, string? from = null)
    {
        this.Content = content;
        this.From = from;
        this.Role = role;
    }

    public string? Content { get; set; }

    public string? From { get; set; }

    public Role Role { get; set; }

    public string? GetContent()
    {
        return this.Content;
    }
}
