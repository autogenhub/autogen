// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// ToolCallResultMessage.cs

using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AutoGen.Core;

public class ToolCallResultMessage : IMessage, ICanGetTextContent
{
    public ToolCallResultMessage(IEnumerable<ToolCall> toolCalls, string? from = null)
    {
        this.From = from;
        this.ToolCalls = toolCalls.ToList();
    }

    public ToolCallResultMessage(string result, string functionName, string functionArgs, string? from = null)
    {
        this.From = from;
        var toolCall = new ToolCall(functionName, functionArgs) { ToolCallId = functionName };
        toolCall.Result = result;
        this.ToolCalls = [toolCall];
    }

    /// <summary>
    /// The original tool call message
    /// </summary>
    public IList<ToolCall> ToolCalls { get; set; }

    public string? From { get; set; }

    public string? GetContent()
    {
        var results = this.ToolCalls
            .Where(x => x.Result != null)
            .Select(x => x.Result);

        return string.Join("\n", results);
    }

    public override string ToString()
    {
        var sb = new StringBuilder();
        sb.Append($"ToolCallResultMessage({this.From})");
        foreach (var toolCall in this.ToolCalls)
        {
            sb.Append($"\n\t{toolCall}");
        }

        return sb.ToString();
    }
}
