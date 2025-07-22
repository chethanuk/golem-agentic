import { AgentDefinition, AgentImplementation, Prompt, Description } from 'golem-ts-sdk'

@AgentDefinition()
abstract class AssistantAgent {
    // @ts-ignore
    @Prompt("Ask your question")
    @Description("This method allows the agent to answer your question")
    abstract ask(input: string): Promise<string>;
}


@AgentImplementation()
class AssistantAgentImpl extends AssistantAgent {
    ask(name: string): Promise<string> {
        return Promise.resolve(`Hi ${name}`);
    }
}

new AssistantAgentImpl()