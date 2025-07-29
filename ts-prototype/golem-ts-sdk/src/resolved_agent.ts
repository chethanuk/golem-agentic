import { AgentType } from 'golem:agent/common';
import {WitValue} from 'golem:rpc/types@0.2.1';
import {agentRegistry} from "./registry";
import {AgentInternal} from "./ts_agent";
import {AgentId} from "./agent_management";

export class ResolvedAgent {
    readonly originalInstance: any;
    private tsAgent: AgentInternal;
    private readonly name: string;


    constructor(name: string, tsAgentInternal: AgentInternal, originalInstance: any) {
        this.name = name;
        this.tsAgent = tsAgentInternal;
        this.originalInstance = originalInstance;
    }

    getId(): AgentId {
        return this.tsAgent.getId();
    }

    invoke(methodName: string, args: WitValue[]): Promise<WitValue> {
        return this.tsAgent.invoke(methodName, args);
    }

    getDefinition(): AgentType {
        return agentRegistry.get(this.name)!;
    }
}
