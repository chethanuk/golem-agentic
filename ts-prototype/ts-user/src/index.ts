// @ts-ignore (Needn't worry about this, only to remove warning)
import { Agent, Prompt, Description } from 'golem-ts-sdk'

@Agent()
class AssistantAgent {
    @Prompt("Ask your question")
    @Description("This method allows the agent to answer your question")
    ask(name: string): Promise<string> {
        const weather = new WeatherAgent();
        return weather.getWeather(name);
    }
}

@Agent()
class WeatherAgent {
    @Prompt("Get weather")
    @Description("Weather forecast weather for you")
    getWeather(name: string): Promise<string> {
        return Promise.resolve(`Weather in ${name} is sunny. Result ${name}` );
    }
}

