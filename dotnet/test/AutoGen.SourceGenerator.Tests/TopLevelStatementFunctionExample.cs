﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Portions derived from  https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// TopLevelStatementFunctionExample.cs

using AutoGen.Core;

public partial class TopLevelStatementFunctionExample
{
    [Function]
    public Task<string> Add(int a, int b)
    {
        return Task.FromResult($"{a + b}");
    }
}
