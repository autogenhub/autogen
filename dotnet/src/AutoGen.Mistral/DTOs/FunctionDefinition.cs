// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// FunctionDefinition.cs

using System.Text.Json.Serialization;
using Json.Schema;

namespace AutoGen.Mistral;

public class FunctionDefinition
{
    public FunctionDefinition(string name, string description, JsonSchema? parameters = default)
    {
        Name = name;
        Description = description;
        Parameters = parameters;
    }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonPropertyName("parameters")]
    public JsonSchema? Parameters { get; set; }
}
