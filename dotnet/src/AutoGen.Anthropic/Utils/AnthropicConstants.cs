// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// AnthropicConstants.cs

namespace AutoGen.Anthropic.Utils;

public static class AnthropicConstants
{
    public static string Endpoint = "https://api.anthropic.com/v1/messages";

    // Models
    public static string Claude3Opus = "claude-3-opus-20240229";
    public static string Claude3Sonnet = "claude-3-sonnet-20240229";
    public static string Claude3Haiku = "claude-3-haiku-20240307";
    public static string Claude35Sonnet = "claude-3-5-sonnet-20240620";
}
