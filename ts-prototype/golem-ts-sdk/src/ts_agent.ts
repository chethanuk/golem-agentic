import {WitValue} from "golem:rpc/types@0.2.1";
import { AgentType } from 'golem:agent/common';
import {AgentId} from "./agent_management";

export interface AgentInternal {
    getId(): AgentId;
    invoke(method: string, args: WitValue[]): Promise<WitValue>;
    getDefinition(): AgentType;
}
