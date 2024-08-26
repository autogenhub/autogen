﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Portions derived from  https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// LMStudioConfig.cs

using System;

/// <summary>
/// Add support for consuming openai-like API from LM Studio
/// </summary>
public class LMStudioConfig : ILLMConfig
{
    public LMStudioConfig(string host, int port)
    {
        this.Host = host;
        this.Port = port;
        this.Uri = new Uri($"http://{host}:{port}");
    }

    public LMStudioConfig(Uri uri)
    {
        this.Uri = uri;
        this.Host = uri.Host;
        this.Port = uri.Port;
    }

    public string Host { get; }

    public int Port { get; }

    public Uri Uri { get; }
}
