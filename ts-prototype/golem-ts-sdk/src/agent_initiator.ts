import {ResolvedAgent} from "./resolved_agent";
import {WitValue} from "golem:rpc/types@0.2.1";

export type AgentInitiator = {
  initiate(agentName: string, constructor_params: WitValue[]): ResolvedAgent;
};
