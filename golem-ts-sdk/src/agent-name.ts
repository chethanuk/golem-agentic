import { Branded } from './branding';

export type AgentName = Branded<string, 'AgentName'>;

export function createAgentName(name: string): AgentName {
  return name as AgentName;
}

export type AgentClassName = Branded<string, 'AgentClassName'>;

export function createAgentClassName(name: string): AgentClassName {
  return name as AgentClassName;
}
