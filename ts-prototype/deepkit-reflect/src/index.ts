import { cast, MinLength, ReflectionClass } from '@deepkit/type';
import { AgentDefinition, Prompt, Description, AgentImplementation } from 'golem-ts-sdk/dist/index.mjs';


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
        const reflection = ReflectionClass.from<WeatherAgent>();

        let result = reflection.getMethodNames().join(" ");

        return Promise.resolve(`Weather in ${name} is sunny ${result}`);
    }
}




interface User {
    username: string
    birthDate?: Date;
}

const user = cast<User>({
    username: 'Peter',
    birthDate: '2010-10-10T00:00:00Z'
});
console.log(user);

const reflection = ReflectionClass.from<User>();
console.log(reflection.getProperties());



