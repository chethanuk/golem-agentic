import {AgentError, AgentType, DataValue} from 'golem:agent/common';
import {Result, WitValue} from 'golem:rpc/types@0.2.2';
import {AgentInternal} from "./agent-internal";
import {AgentId} from "./agent-id";
import {agentRegistry} from "./agent-registry";

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

    invoke(methodName: string, args: DataValue): Promise<Result<DataValue, AgentError>> {
        return this.agentInternal.invoke(methodName, args);
    }

    getDefinition(): AgentType {
        return agentRegistry.get(this.name)!;
    }
}
