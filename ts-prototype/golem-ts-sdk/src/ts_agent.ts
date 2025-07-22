import {WitValue} from "golem:rpc/types@0.2.1";
import { AgentType } from 'golem:agent/common';

export interface TSAgent {
    getId(): string;
    invoke(method: string, args: WitValue[]): Promise<WitValue>;
    getDefinition(): AgentType;
}
