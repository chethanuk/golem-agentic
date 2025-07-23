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
        const weather = new WeatherAgentImpl();
        return weather.getWeather(name);
    }
}


@AgentDefinition()
abstract class WeatherAgent {
    // @ts-ignore
    @Prompt("Get weather")
    @Description("Weather forecast weather for you")
    abstract getWeather(name: string): Promise<string>;
}

@AgentImplementation()
class WeatherAgentImpl extends WeatherAgent {
    getWeather(name: string): Promise<string> {
        return Promise.resolve(`Weather in ${name} is sunny`);
    }
}