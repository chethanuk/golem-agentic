import {Result} from "golem:rpc/types@0.2.2";
import {AgentError, AgentType, DataValue} from 'golem:agent/common';
import {AgentId} from "./agent-id";

/**
 * An AgentInternal is an internal interface that represents the basic usage of an agent
 * It is constructed only after instantiating of an agent through the AgentInitiator.
 */
export interface AgentInternal {
    getId(): AgentId;
    invoke(method: string, args: DataValue): Promise<Result<DataValue, AgentError>>
    getAgentType(): AgentType;
}
