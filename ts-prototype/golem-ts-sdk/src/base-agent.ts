import {agentRegistry} from "./index";
import {AgentType} from "golem:agent/common";
import {AgentId} from "./agent-id";


export class BaseAgent {
    getId(): AgentId {
       throw new Error("An agent ID will be created at runtime");
    }

    getAgentType(): AgentType {
        const type = agentRegistry.get(this.constructor.name);
        if (!type) {
            throw new Error(`Agent type not found for ${this.constructor.name}`);
        }
        return type
    }

    static createRemote<T extends new (...args: any[]) => BaseAgent>(
        this: T,
        ...args: ConstructorParameters<T>
    ): InstanceType<T> {
        throw new Error("A remote client will be created at runtime");
    }

    static createLocal<T extends new (...args: any[]) => BaseAgent>(
        this: T,
        ...args: ConstructorParameters<T>
    ): InstanceType<T> {
        throw new Error("A local client will be created at runtime");
    }
}

