// Modifications made in https://github.com/autogen-ai/autogen since August 25, 2024, are licensed under the Apache License, Version 2.0 (Apache-2.0).
// Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
// SPDX-License-Identifier: Apache-2.0
// Portions derived from  https://github.com/microsoft/autogen under the MIT License, before release v0.2.35.
// SPDX-License-Identifier: MIT
// Copyright (c) Microsoft Corporation. All rights reserved.
// WorkflowOrchestrator.cs

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AutoGen.Core;

public class WorkflowOrchestrator : IOrchestrator
{
    private readonly Graph workflow;

    public WorkflowOrchestrator(Graph workflow)
    {
        this.workflow = workflow;
    }

    public async Task<IAgent?> GetNextSpeakerAsync(
        OrchestrationContext context,
        CancellationToken cancellationToken = default)
    {
        var lastMessage = context.ChatHistory.LastOrDefault();
        if (lastMessage == null)
        {
            return null;
        }

        var candidates = context.Candidates.ToList();
        var currentSpeaker = candidates.FirstOrDefault(candidates => candidates.Name == lastMessage.From);

        if (currentSpeaker == null)
        {
            return null;
        }
        var nextAgents = await this.workflow.TransitToNextAvailableAgentsAsync(currentSpeaker, context.ChatHistory);
        nextAgents = nextAgents.Where(nextAgent => candidates.Any(candidate => candidate.Name == nextAgent.Name));
        candidates = nextAgents.ToList();
        if (!candidates.Any())
        {
            return null;
        }

        if (candidates is { Count: 1 })
        {
            return candidates.First();
        }
        else
        {
            throw new System.Exception("There are more than one available agents from the workflow for the next speaker.");
        }
    }
}
