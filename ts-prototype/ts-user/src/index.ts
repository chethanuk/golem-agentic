// @ts-ignore (Needn't worry about this, only to remove warning)
import { AgentDefinition, AgentImplementation, Prompt, Description } from 'golem-ts-sdk'
import '../.metadata/initialiser';

@AgentDefinition()
abstract class AssistantAgent {
    // @ts-ignore (mainly to remove warning for decorators at abstract method levels- this will be a question)
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
    // @ts-ignore (mainly to remove warning for decorators at abstract method levels - this will be a question)
    @Prompt("Get weather")
    @Description("Weather forecast weather for you")
    abstract getWeather(name: string): Promise<string>;
}

@AgentImplementation()
class WeatherAgentImpl extends WeatherAgent {
    getWeather(name: string): Promise<string> {
        return Promise.resolve(`Weather in ${name} is sunny. Result ${name}` );
    }
}
