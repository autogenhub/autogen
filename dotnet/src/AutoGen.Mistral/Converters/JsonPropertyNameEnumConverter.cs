// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Portions derived from  https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// JsonPropertyNameEnumConverter.cs

using System;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace AutoGen.Mistral;

internal class JsonPropertyNameEnumConverter<T> : JsonConverter<T> where T : struct, Enum
{
    public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string value = reader.GetString() ?? throw new JsonException("Value was null.");

        foreach (var field in typeToConvert.GetFields())
        {
            var attribute = field.GetCustomAttribute<JsonPropertyNameAttribute>();
            if (attribute?.Name == value)
            {
                return (T)Enum.Parse(typeToConvert, field.Name);
            }
        }

        throw new JsonException($"Unable to convert \"{value}\" to enum {typeToConvert}.");
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        var field = value.GetType().GetField(value.ToString());
        var attribute = field?.GetCustomAttribute<JsonPropertyNameAttribute>();

        if (attribute != null)
        {
            writer.WriteStringValue(attribute.Name);
        }
        else
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
