// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// VertexGeminiClient.cs

using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.AIPlatform.V1;

namespace AutoGen.Gemini;

internal class VertexGeminiClient : IGeminiClient
{
    private readonly PredictionServiceClient client;
    public VertexGeminiClient(PredictionServiceClient client)
    {
        this.client = client;
    }

    public VertexGeminiClient(string location)
    {
        PredictionServiceClientBuilder builder = new()
        {
            Endpoint = $"{location}-aiplatform.googleapis.com",
        };

        this.client = builder.Build();
    }

    public Task<GenerateContentResponse> GenerateContentAsync(GenerateContentRequest request, CancellationToken cancellationToken = default)
    {
        return client.GenerateContentAsync(request, cancellationToken);
    }

    public IAsyncEnumerable<GenerateContentResponse> GenerateContentStreamAsync(GenerateContentRequest request)
    {
        return client.StreamGenerateContent(request).GetResponseStream();
    }
}
