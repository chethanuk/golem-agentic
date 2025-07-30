import {getSelfMetadata} from "golem:api/host@1.1.7";
import {AgentId} from "./agent-id";
import {AgentName} from "./agent-name";

export const agentInstanceCounters = new Map<AgentName, number>();

export function createUniqueAgentId(agentName: AgentName): AgentId {
    const current = agentInstanceCounters.get(agentName) ?? 0;
    agentInstanceCounters.set(agentName, current + 1);
    const count: number = agentInstanceCounters.get(agentName)!;
    const workerName: string = getSelfMetadata().workerId.workerName;
    return new AgentId(workerName, agentName, count);
}