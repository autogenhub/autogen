﻿// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// Role.cs

using System;

namespace AutoGen.Core;

public readonly struct Role : IEquatable<Role>
{
    private readonly string label;

    internal Role(string name)
    {
        label = name;
    }

    public static Role User { get; } = new Role("user");

    public static Role Assistant { get; } = new Role("assistant");

    public static Role System { get; } = new Role("system");

    public static Role Function { get; } = new Role("function");

    public bool Equals(Role other)
    {
        return label.Equals(other.label, StringComparison.OrdinalIgnoreCase);
    }

    public override string ToString()
    {
        return label;
    }

    public override bool Equals(object? obj)
    {
        return obj is Role other && Equals(other);
    }

    public override int GetHashCode()
    {
        return label.GetHashCode();
    }

    public static bool operator ==(Role left, Role right)
    {
        return left.Equals(right);
    }

    public static bool operator !=(Role left, Role right)
    {
        return !(left == right);
    }
}
