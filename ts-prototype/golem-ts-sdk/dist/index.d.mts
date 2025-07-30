import * as bindings from 'agentic-guest';
import { AgentType } from 'golem:agent/common';
import { WitValue } from 'golem:rpc/types@0.2.1';
import { BaseMetadataLibrary } from 'rttist';

type Branded<T, B> = T & {
    __brand: B;
};

type AgentName = Branded<string, "AgentName">;

/**
 * Represents a globally unique identifier for an agent instance.
 */
declare class AgentId {
    readonly agentContainerName: string;
    readonly agentName: AgentName;
    readonly localAgentSeqNum: number;
    /**
     * Creates a new `AgentId` instance.
     *
     * @param agentContainerName - The name of the container (e.g., worker or module) in which the agent lives.
     * @param agentName - The name of the agent.
     *   This is typically a unique identifier for the agent type,
     *   and is used in coordination with the container name and
     *   sequence number to form a globally unique `AgentId`.
     * @param localAgentSeqNum - A numeric sequence number to distinguish multiple instances.
     */
    constructor(agentContainerName: string, agentName: AgentName, localAgentSeqNum: number);
    toString(): string;
    static fromString(s: string): AgentId;
}

interface AgentInternal {
    getId(): AgentId;
    invoke(method: string, args: WitValue[]): Promise<WitValue>;
    getAgentType(): AgentType;
}

declare class ResolvedAgent {
    readonly classInstance: any;
    private agentInternal;
    private readonly name;
    constructor(name: string, tsAgentInternal: AgentInternal, originalInstance: any);
    getId(): AgentId;
    invoke(methodName: string, args: WitValue[]): Promise<WitValue>;
    getDefinition(): AgentType;
}

type AgentInitiator = {
    initiate(agentName: string, constructorParams: WitValue[]): ResolvedAgent;
};

declare class BaseAgent {
    getId(): AgentId;
    getAgentType(): AgentType;
    static createRemote<T extends new (...args: any[]) => BaseAgent>(this: T, ...args: ConstructorParameters<T>): InstanceType<T>;
    static createLocal<T extends new (...args: any[]) => BaseAgent>(this: T, ...args: ConstructorParameters<T>): InstanceType<T>;
}

declare function Prompt(prompt: string): (target: Object, propertyKey: string) => void;
declare function Description(desc: string): (target: Object, propertyKey: string) => void;
declare function Agent$1(): <T extends new (...args: any[]) => any>(ctor: T) => T | undefined;

declare const Metadata: BaseMetadataLibrary;

declare const agents: Map<AgentId, Agent>;
declare const agentInitiators: Map<string, AgentInitiator>;
declare const agentRegistry: Map<string, AgentType>;
declare function getRegisteredAgents(): AgentType[];
declare class Agent {
    readonly resolvedAgent: ResolvedAgent;
    constructor(name: string, params: bindings.guest.WitValue[]);
    getId(): Promise<string>;
    invoke(methodName: string, args: bindings.guest.WitValue[]): Promise<bindings.guest.StatusUpdate>;
    getDefinition(): Promise<any>;
}
declare const guest: typeof bindings.guest;

export { Agent$1 as Agent, AgentId, BaseAgent, Description, Metadata, Prompt, agentInitiators, agentRegistry, agents, getRegisteredAgents, guest };
