// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// FunctionCallTemplateTests.cs

using ApprovalTests;
using ApprovalTests.Namers;
using ApprovalTests.Reporters;
using AutoGen.SourceGenerator.Template;
using Xunit;

namespace AutoGen.SourceGenerator.Tests;

public class FunctionCallTemplateTests
{
    [Fact]
    [UseReporter(typeof(DiffReporter))]
    [UseApprovalSubdirectory("ApprovalTests")]
    public void TestFunctionCallTemplate()
    {
        var functionExample = new FunctionExamples();
        var function = functionExample.AddAsyncFunctionContract;
        var functionCallTemplate = new FunctionCallTemplate()
        {
            ClassName = function.ClassName,
            NameSpace = function.Namespace,
            FunctionContracts = [new SourceGeneratorFunctionContract()
            {
                Name = function.Name,
                Description = function.Description,
                ReturnType = function.ReturnType!.ToString(),
                ReturnDescription = function.ReturnDescription,
                Parameters = function.Parameters!.Select(p => new SourceGeneratorParameterContract()
                {
                    Name = p.Name,
                    Description = p.Description,
                    Type = p.ParameterType!.ToString(),
                    IsOptional = !p.IsRequired,
                    JsonType = p.ParameterType!.ToString(),
                }).ToArray()
            }]
        };

        var actual = functionCallTemplate.TransformText();

        Approvals.Verify(actual);
    }
}
