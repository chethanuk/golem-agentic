import { AgentName } from './agent-name';

/**
 * Represents a globally unique identifier for an agent instance.
 */
export class AgentId {
  /**
   * Creates a new `AgentId` instance.
   *
   * @param agentContainerName - The name of the container (e.g., worker or module) in which the agent lives.
   * @param agentName - The name of the agent.
   *   This is typically a unique identifier for the agent type,
   *   and is used in coordination with the container name and
   *   sequence number to form a globally unique `AgentId`.
   * @param localAgentSeqNum - A numeric sequence number to distinguish multiple instances.
   */
  constructor(
    public readonly agentContainerName: string,
    public readonly agentName: AgentName,
    public readonly localAgentSeqNum: number,
  ) {}

  toString(): string {
    return `${this.agentContainerName}--${this.agentName}--${this.localAgentSeqNum}`;
  }

  static fromString(s: string): AgentId {
    const parts = s.split('--');
    if (parts.length < 3) {
      throw new Error(`Invalid AgentId format: ${s}`);
    }
    const count = parseInt(parts.pop()!, 10);
    const agentName = parts.pop()!;
    const workerName = parts.join('--');
    return new AgentId(workerName, agentName as AgentName, count);
  }
}
