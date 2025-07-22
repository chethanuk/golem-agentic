declare module 'agentic-guest' {
  import * as golemAgentCommon from 'golem:agent/common';
  import * as golemRpc021Types from 'golem:rpc/types@0.2.1';
  export module guest {
    export async function getAgent(agentId: string): Promise<AgentRef>;
    export async function discoverAgents(): Promise<AgentRef[]>;
    export async function discoverAgentTypes(): Promise<AgentType[]>;
    export class Agent {
      constructor(agentName: string, params: WitValue[]);
      async getId(): Promise<string>;
      async invoke(methodName: string, input: WitValue[]): Promise<StatusUpdate>;
      async getDefinition(): Promise<AgentType>;
    }
    export type StatusUpdate = golemAgentCommon.StatusUpdate;
    export type AgentType = golemAgentCommon.AgentType;
    export type WitValue = golemRpc021Types.WitValue;
    export type AgentRef = {
      agentId: string;
      agentName: string;
      agentHandle: number;
    };
  }
}
