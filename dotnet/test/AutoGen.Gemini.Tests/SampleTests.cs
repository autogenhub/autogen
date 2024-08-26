// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// SampleTests.cs

using AutoGen.Gemini.Sample;
using AutoGen.Tests;

namespace AutoGen.Gemini.Tests;

public class SampleTests
{
    [ApiKeyFact("GCP_VERTEX_PROJECT_ID")]
    public async Task TestChatWithVertexGeminiAsync()
    {
        await Chat_With_Vertex_Gemini.RunAsync();
    }

    [ApiKeyFact("GCP_VERTEX_PROJECT_ID")]
    public async Task TestFunctionCallWithGeminiAsync()
    {
        await Function_Call_With_Gemini.RunAsync();
    }

    [ApiKeyFact("GCP_VERTEX_PROJECT_ID")]
    public async Task TestImageChatWithVertexGeminiAsync()
    {
        await Image_Chat_With_Vertex_Gemini.RunAsync();
    }
}
