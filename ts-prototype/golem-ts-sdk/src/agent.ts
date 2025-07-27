import {agentRegistry} from "./registry";
import {AgentType} from "golem:agent/common";

export class Agent {
    getId(): string {
        return agentRegistry.get(this.constructor.name)?.typeName ?? `${this.constructor.name}--0`;
    }

    getAgentType(): AgentType {
        const type = agentRegistry.get(this.constructor.name);
        if (!type) {
            throw new Error(`Agent type not found for ${this.constructor.name}`);
        }
        return type
    }


}
