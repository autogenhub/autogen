﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// KernelExtension.cs

using System.Linq;
using Microsoft.SemanticKernel;

namespace AutoGen.SemanticKernel.Extension;

public static class KernelExtension
{
    public static SemanticKernelAgent ToSemanticKernelAgent(this Kernel kernel, string name, string systemMessage = "You are a helpful AI assistant", PromptExecutionSettings? settings = null)
    {
        return new SemanticKernelAgent(kernel, name, systemMessage, settings);
    }

    /// <summary>
    /// Convert a <see cref="KernelFunctionMetadata"/> to a <see cref="FunctionContract"/>
    /// </summary>
    /// <param name="metadata">kernel function metadata</param>
    public static FunctionContract ToFunctionContract(this KernelFunctionMetadata metadata)
    {
        return new FunctionContract()
        {
            Name = metadata.Name,
            Description = metadata.Description,
            Parameters = metadata.Parameters.Select(p => p.ToFunctionParameterContract()).ToList(),
            ReturnType = metadata.ReturnParameter.ParameterType,
            ReturnDescription = metadata.ReturnParameter.Description,
            ClassName = metadata.PluginName,
        };
    }

    /// <summary>
    /// Convert a <see cref="KernelParameterMetadata"/> to a <see cref="FunctionParameterContract"/>
    /// </summary>
    /// <param name="metadata">kernel parameter metadata</param>
    public static FunctionParameterContract ToFunctionParameterContract(this KernelParameterMetadata metadata)
    {
        return new FunctionParameterContract()
        {
            Name = metadata.Name,
            Description = metadata.Description,
            DefaultValue = metadata.DefaultValue,
            IsRequired = metadata.IsRequired,
            ParameterType = metadata.ParameterType,
        };
    }
}
