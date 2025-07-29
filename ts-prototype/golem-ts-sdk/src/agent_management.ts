import {ResolvedAgent} from "./resolved_agent";
import {Branded} from "./branding";
import {getSelfMetadata} from "golem:api/host@1.1.7";

type AgentName = Branded<string, "AgentName">;

export class AgentId {
    constructor(
        public readonly workerName: string,
        public readonly agentName: AgentName,
        public readonly count: number
    ) {}

    toString(): string {
        return `${this.workerName}--${this.agentName}--${this.count}`;
    }

    static fromString(s: string): AgentId {
        const parts = s.split("--");
        if (parts.length < 3) {
            throw new Error(`Invalid AgentId format: ${s}`);
        }
        const count = parseInt(parts.pop()!, 10);
        const agentName = parts.pop()!;
        const workerName = parts.join("--");
        return new AgentId(workerName, agentName as AgentName, count);
    }
}

export function createAgentName(name: string): AgentName {
    return name as AgentName;
}

export const agentInstanceCounters = new Map<AgentName, number>();

export function createUniqueAgentId(agentName: AgentName): AgentId {
    const current = agentInstanceCounters.get(agentName) ?? 0;
    agentInstanceCounters.set(agentName, current + 1);
    const count: number = agentInstanceCounters.get(agentName)!;
    const workerName: string = getSelfMetadata().workerId.workerName;
    return new AgentId(workerName, agentName, count);
}