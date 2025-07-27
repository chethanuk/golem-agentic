import { AgentImpl, Agent, Prompt, Description } from 'golem-ts-sdk';

@AgentImpl()
class AssistantAgent extends Agent {
    @Prompt("Ask your question")
    @Description("This method allows the agent to answer your question")
    async ask(name: string): Promise<string> {
        const weather = WeatherAgent.createRemote();
        return weather.getWeather(name);
    }
}

@AgentImpl()
class WeatherAgent extends Agent {
    @Prompt("Get weather")
    @Description("Weather forecast weather for you")
    async getWeather(name: string): Promise<string> {
        return Promise.resolve(`Weather in ${name} is sunny. Result ${name}` );
    }
}
