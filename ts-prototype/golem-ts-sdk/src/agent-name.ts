import {Branded} from "./branding";

export type AgentName = Branded<string, "AgentName">;

export function createAgentName(name: string): AgentName {
    return name as AgentName;
}