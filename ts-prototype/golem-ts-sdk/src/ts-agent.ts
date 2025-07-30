import {WitValue} from "golem:rpc/types@0.2.1";
import { AgentType } from 'golem:agent/common';
import {AgentId} from "./agent-id";

// An AgentInternal is an internal interface that represents the basic usage of an agent
// An AgentInternal is formed only after instantiating of an agent through the AgentInitiator.
export interface AgentInternal {
    getId(): AgentId;
    invoke(method: string, args: WitValue[]): Promise<WitValue>;
    getAgentType(): AgentType;
}
