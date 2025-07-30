import {agentRegistry} from "./index";
import {AgentType} from "golem:agent/common";
import {AgentId} from "./agent-id";


type SkipAgentParams<T extends any[]> = T extends [infer Head, ...infer Tail]
    ? Head extends BaseAgent
        ? SkipAgentParams<Tail>
        : [Head, ...SkipAgentParams<Tail>]
    : [];

export class BaseAgent {
    getId(): AgentId {
       throw new Error("An agent Id is created only after agent is instantiated");
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
        ...args: SkipAgentParams<ConstructorParameters<T>>
    ): InstanceType<T> {
        throw new Error("Remote clients will exist after AgentImpl initialisation");
    }

    static createLocal<T extends new (...args: any[]) => BaseAgent>(
        this: T,
        ...args: SkipAgentParams<ConstructorParameters<T>>
    ): InstanceType<T> {
        throw new Error("Local Clients will exist after AgentImpl initialisation");
    }
}

