import {AgentType} from "golem:agent/common";
import {AgentId} from "./agent-id";
import {agentRegistry} from "./agent-registry";

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
export class BaseAgent {
    /**
     * Returns the unique `AgentId` for this agent instance.
     *
     * This is automatically populated by the `@Agent()` decorator at runtime.
     *
     * @throws Will throw if accessed before the agent is initialized.
     */
    getId(): AgentId {
       throw new Error("An agent ID will be created at runtime");
    }

    /**
     * Returns the `AgentType` metadata registered for this agent.
     *
     * This information is retrieved from the runtime agent registry and reflects
     * metadata defined via decorators like `@Agent()`, `@Prompt()`, etc.
     *
     * @throws Will throw if metadata is missing or the agent is not properly registered.
     */
    getAgentType(): AgentType {
        const type = agentRegistry.get(this.constructor.name);
        if (!type) {
            throw new Error(`Agent type not found for ${this.constructor.name}`);
        }
        return type
    }

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
    static createRemote<T extends new (...args: any[]) => BaseAgent>(
        this: T,
        ...args: ConstructorParameters<T>
    ): InstanceType<T> {
        throw new Error("A remote client will be created at runtime");
    }

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
    static createLocal<T extends new (...args: any[]) => BaseAgent>(
        this: T,
        ...args: ConstructorParameters<T>
    ): InstanceType<T> {
        throw new Error("A local client will be created at runtime");
    }
}

