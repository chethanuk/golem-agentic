import { getSelfMetadata } from 'golem:api/host@1.1.7';
import { AgentId } from './agent-id';
import { AgentName } from './agent-name';

/**
 * Maintains a counter for each agent type to ensure unique IDs for each instance.
 */
export const agentInstanceSequence = new Map<AgentName, number>();

/**
 * Creates a unique `AgentId` for an agent instance based on its name and the current worker's metadata.
 * Creation of a unique ID will increment the sequence number for that agent type.
 * @param agentName
 */
export function createUniqueAgentId(agentName: AgentName): AgentId {
  const current = agentInstanceSequence.get(agentName) ?? 0;
  agentInstanceSequence.set(agentName, current + 1);
  const count: number = agentInstanceSequence.get(agentName)!;
  const workerName: string = getSelfMetadata().workerId.workerName;
  return new AgentId(workerName, agentName, count);
}
