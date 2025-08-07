import { AgentType } from 'golem:agent/common';

export const agentRegistry = new Map<string, AgentType>();

export function getRegisteredAgents(): AgentType[] {
  return Array.from(agentRegistry.values());
}
