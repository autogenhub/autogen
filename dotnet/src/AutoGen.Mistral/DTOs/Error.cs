// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// Error.cs

using System.Text.Json.Serialization;

namespace AutoGen.Mistral
{
    public class Error
    {
        public Error(string type, string message, string? param = default(string), string? code = default(string))
        {
            Type = type;
            Message = message;
            Param = param;
            Code = code;
        }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        /// <summary>
        /// Gets or Sets Message
        /// </summary>
        [JsonPropertyName("message")]
        public string Message { get; set; }

        /// <summary>
        /// Gets or Sets Param
        /// </summary>
        [JsonPropertyName("param")]
        public string? Param { get; set; }

        /// <summary>
        /// Gets or Sets Code
        /// </summary>
        [JsonPropertyName("code")]
        public string? Code { get; set; }
    }
}
