import {ResolvedAgent} from "./resolved-agent";
import {WitValue} from "golem:rpc/types@0.2.1";

// Creating an instance of an agent always goes through AgentInitiator,
// regardless of whether it is local or remote agent resource creation.
// See `client-generation.ts` for local agent client creation where it
// internally invokes `initiate`.

// Creating an agent resource from outside (example: golem REPL), also
// go through `AgentInitiator`. This is the only way to create a `ResolvedAgent`
// which holds the original instance of the agent, along with an instance of `AgentInternal`
// that is useful to invoking dynamic methods on the agent.
export type AgentInitiator = {
  initiate(agentName: string, constructorParams: WitValue[]): ResolvedAgent;
};
