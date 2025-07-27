import {agentRegistry} from "./registry";
import {AgentType} from "golem:agent/common";


type SkipAgentParams<T extends any[]> = T extends [infer Head, ...infer Tail]
    ? Head extends Agent
        ? SkipAgentParams<Tail>
        : [Head, ...SkipAgentParams<Tail>]
    : [];

export class Agent {
    getId(): string {
        // to be implemented by the agent implementation
        return agentRegistry.get(this.constructor.name)?.typeName ?? `${this.constructor.name}--0`;
    }

    getAgentType(): AgentType {
        const type = agentRegistry.get(this.constructor.name);
        if (!type) {
            throw new Error(`Agent type not found for ${this.constructor.name}`);
        }
        return type
    }

    static createRemote<T extends new (...args: any[]) => Agent>(
        this: T,
        ...args: SkipAgentParams<ConstructorParameters<T>>
    ): InstanceType<T> {
        throw new Error("this is automatically implemented");
    }

    static createLocal<T extends new (...args: any[]) => Agent>(
        this: T,
        ...args: SkipAgentParams<ConstructorParameters<T>>
    ): InstanceType<T> {
        throw new Error("this is automatically implemented");
    }
}

