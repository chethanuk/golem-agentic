import { AgentType } from 'golem:agent/common';
import {WitValue} from 'golem:rpc/types@0.2.1';
import {agentRegistry} from "./registry";
import {TSAgent} from "./ts_agent";

export class ResolvedAgent {
    private tsAgent: TSAgent;
    private name: string;

    constructor(name: string, instance: TSAgent) {
        this.name = name;
        this.tsAgent = instance;
    }

    getId(): string {
        return `${this.name}--0`; // We can increment this agent-id same as rust
    }

    // Convert WitValue to TS
    async invoke(methodName: string, args: WitValue[]): Promise<any> {
        await this.tsAgent.invoke(methodName, args);
    }

    getDefinition(): AgentType {
        return agentRegistry.get(this.name)!;
    }
}
