// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// GraphTests.cs

using Xunit;

namespace AutoGen.Tests
{
    public class GraphTests
    {
        [Fact]
        public void GraphTest()
        {
            var graph1 = new Graph();
            Assert.NotNull(graph1);

            var graph2 = new Graph(null);
            Assert.NotNull(graph2);
        }
    }
}
