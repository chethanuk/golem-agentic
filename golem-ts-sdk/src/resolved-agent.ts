import { AgentType } from 'golem:agent/common';
import {WitValue} from 'golem:rpc/types@0.2.1';
import {agentRegistry} from "./index";
import {AgentInternal} from "./agent-internal";
import {AgentId} from "./agent-id";

export class ResolvedAgent {
    readonly classInstance: any;
    private agentInternal: AgentInternal;
    private readonly name: string;


    constructor(name: string, tsAgentInternal: AgentInternal, originalInstance: any) {
        this.name = name;
        this.agentInternal = tsAgentInternal;
        this.classInstance = originalInstance;
    }

    getId(): AgentId {
        return this.agentInternal.getId();
    }

    invoke(methodName: string, args: WitValue[]): Promise<WitValue> {
        return this.agentInternal.invoke(methodName, args);
    }

    getDefinition(): AgentType {
        return agentRegistry.get(this.name)!;
    }
}
