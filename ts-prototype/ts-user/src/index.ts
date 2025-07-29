import { AgentImpl, Agent, Prompt, Description } from 'golem-ts-sdk';

@AgentImpl()
class AssistantAgent extends Agent {
    @Prompt("Ask your question")
    @Description("This method allows the agent to answer your question")
    async ask(name: string): Promise<string> {
        const customData = { data: "Sample data", value: 42 }
      //  const remoteWeatherClient = WeatherAgent.createRemote();
      //  const remoteWeather = await remoteWeatherClient.getWeather(name, customData);
        const localWeatherClient = WeatherAgent.createLocal();
        const localWeather = await localWeatherClient.getWeather(name, customData);

        return "Hello! weather at " + name + ",is being computed by assistant-agent with id " + this.getId() + "." + ", Result from weather agent: " + localWeather + " weather agent used " + localWeatherClient.getId();
    }
}



@AgentImpl()
class WeatherAgent extends Agent {
    @Prompt("Get weather")
    @Description("Weather forecast weather for you")
    async getWeather(name: string, param2: CustomData): Promise<string> {
        return Promise.resolve(`Weather in ${name} is sunny. Params passed: ${name} ${JSON.stringify(param2)}. Computed by weather-agent ${this.getId()}.` );
    }
}

interface CustomData {
    data: String,
    value: number,
}
