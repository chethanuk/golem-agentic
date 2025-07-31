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

/**
 * An AgentInternal is an internal interface that represents the basic usage of an agent
 * It is constructed only after instantiating of an agent through the AgentInitiator.
 */
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

/**
 * AgentInitiator is the canonical interface for instantiating agents.
 * The exported component uses AgentInitiator, and so is remoteClients and localClients.
 *
 * Any agent creation in SDK goes through `AgentInitiator`
 *
 * An AgentInitiator returns is `ResolvedAgent`, which encapsulates:
 * - The original instance of the agent
 * - But most importantly, an instance of `AgentInternal`, useful for invoking dynamic methods on the agent
 */
type AgentInitiator = {
    /**
     * Initiates the creation of an agent.
     *
     * @param agentName - The name of the agent to instantiate.
     * @param constructorParams - Constructor arguments for the agent, encoded as `WitValue`s.
     * @returns A `ResolvedAgent` containing the created agent and its internal handler.
     */
    initiate(agentName: string, constructorParams: WitValue[]): ResolvedAgent;
};

/**
 * BaseAgent is the foundational class for defining agent implementations.
 *
 * All agents must extend this class and **must** be decorated with the `@Agent()` decorator.
 * Do **not** need to override the methods and manually implement them in this class.
 * The `@Agent()` decorator handles all runtime wiring (e.g., `getId()`, `createRemote()`, etc.).
 *
 * Example usage:
 *
 * ```ts
 * @Agent()
 * class AssistantAgent extends BaseAgent {
 *   @Prompt("Ask your question")
 *   @Description("This method allows the agent to answer your question")
 *   async ask(name: string): Promise<string> {
 *      return `Hello ${name}, I'm the assistant agent (${this.getId()})!`;
 *   }
 * }
 * ```
 */
declare class BaseAgent {
    /**
     * Returns the unique `AgentId` for this agent instance.
     *
     * This is automatically populated by the `@Agent()` decorator at runtime.
     *
     * @throws Will throw if accessed before the agent is initialized.
     */
    getId(): AgentId;
    /**
     * Returns the `AgentType` metadata registered for this agent.
     *
     * This information is retrieved from the runtime agent registry and reflects
     * metadata defined via decorators like `@Agent()`, `@Prompt()`, etc.
     *
     * @throws Will throw if metadata is missing or the agent is not properly registered.
     */
    getAgentType(): AgentType;
    /**
     * Creates a remote client instance of this agent type.
     *
     * This remote client will communicate with an agent instance running
     * in a separate container, effectively offloading computation to that remote context.
     *
     * @param args - Constructor arguments for the agent
     * @returns A remote proxy instance of the agent
     *
     * @example
     * const remoteClient = MyAgent.createRemote("arg1", "arg2") where `arg1`, `arg2` are the constructor arguments
     * validated at compile time.
     */
    static createRemote<T extends new (...args: any[]) => BaseAgent>(this: T, ...args: ConstructorParameters<T>): InstanceType<T>;
    /**
     * Creates a local instance of the agent within the current container.
     *
     * This method is preferred over directly calling `new MyAgent(arg1, arg2)` as it ensures
     * correct initialization, agent ID assignment, etc.
     *
     * @param args - Constructor arguments for the agent
     * @returns A locally instantiated agent
     *
     * @example
     * const localClient = MyAgent.createLocal("arg1", "arg2") where `arg1`, `arg2` are the constructor arguments
     * validated at compile time.;
     */
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
