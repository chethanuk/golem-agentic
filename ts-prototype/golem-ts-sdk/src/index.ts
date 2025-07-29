import type * as bindings from 'agentic-guest';
import {  AgentType } from 'golem:agent/common';
import {agentInitiators, agentRegistry} from './registry';
import {ResolvedAgent} from "./resolved_agent";
import {AgentId} from "./agent_management";

export { Agent } from './agent';
export { Prompt, Description, agentRegistry, AgentImpl } from './registry';
export {Metadata } from './type_metadata';

export function getRegisteredAgents(): AgentType[] {
    return Array.from(agentRegistry.values());
}

export const agents = new Map<AgentId, Agent>();

class Agent {
    private resolvedAgent: ResolvedAgent;

    constructor(name: string, params: bindings.guest.WitValue[]) {
        console.log("Agent constructor called", name, params);

        const initiator = agentInitiators.get(name);

        if (!initiator) {
            const entries = Array.from(agentInitiators.keys());

            throw new Error(`No implementation found for agent: ${name}. Valid entries are ${entries.join(", ")}`);
        }

        const resolvedAgent = initiator.initiate(name, params);

        this.resolvedAgent = resolvedAgent;

        agents.set(resolvedAgent.getId(), this)

    }

    async getId(): Promise<string> {
        return this.resolvedAgent.getId().toString()
    }

    async invoke(methodName: string, args: bindings.guest.WitValue[]): Promise<bindings.guest.StatusUpdate> {
        return this.resolvedAgent.invoke(methodName, args).then(result => {
            if (result.nodes[0].tag == "prim-string") {
                return {
                    tag: "emit",
                    val: result.nodes[0].val as string // only for testing
                }
            } else {
                throw new Error("Unrecognized method");
            }
        });
    }

    async getDefinition(): Promise<any> {
       this.resolvedAgent.getDefinition()
    }
}


async function getAgent(agentId: string): Promise<bindings.guest.AgentRef> {
    console.log("getAgent called", agentId);

    return {
        agentId: agentId,
        agentName: "dummy-agent",
        agentHandle: 1
    };
}

async function discoverAgents(): Promise<bindings.guest.AgentRef[]> {
    console.log("discoverAgents called");

    return [
        {
            agentId: "dummy-agent-id",
            agentName: "dummy-agent",
            agentHandle: 1
        }
    ];
}

async function discoverAgentTypes(): Promise<bindings.guest.AgentType[]> {
    console.log("discoverAgentTypes called");

    return getRegisteredAgents();
}


export const guest: typeof bindings.guest = {
    getAgent,
    discoverAgents,
    discoverAgentTypes,
    Agent
}
