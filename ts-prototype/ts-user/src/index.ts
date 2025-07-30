import {
    BaseAgent,
    Agent,
    Prompt,
    Description,
} from 'golem-ts-sdk';

@Agent()
class AssistantAgent extends BaseAgent {
    @Prompt("Ask your question")
    @Description("This method allows the agent to answer your question")
    async ask(name: string): Promise<string> {
        const customData = { data: "Sample data", value: 42 };

        // Can be used after solving https://github.com/golemcloud/wasm-rquickjs/issues/2
        // const remoteWeatherClient = WeatherAgent.createRemote("");
        // const remoteWeather = await remoteWeatherClient.getWeather(name, customData);

        const localWeatherClient = WeatherAgent.createLocal("username");
        const localWeather = await localWeatherClient.getWeather(name, customData);

        return (
            "Hello! weather at " + name +
            ", is being computed by assistant-agent with id " + this.getId() + "." +
            ", Result from weather agent: " + localWeather +
            " weather agent used " + localWeatherClient.getId()
        );
    }
}

// TODO; Remove dependency injection in favor of pessimitic dependecy- every other agent
// TODO; remove agentId, because this.getId() exists
@Agent()
class WeatherAgent extends BaseAgent {
    private assistantAgent!: AssistantAgent;
    private readonly userName: string;

    constructor(username: string) {
        super();
        this.userName = username;
    }

    @Prompt("Get weather")
    @Description("Weather forecast weather for you")
    async getWeather(name: string, param2: CustomData): Promise<string> {
        return Promise.resolve(
            `Hi ${this.userName} Weather in ${name} is sunny. Params passed: ${name} ${JSON.stringify(param2)}. ` +
            `Computed by weather-agent ${this.getId()}. ` +
            `The query was done by assistant-agent ${this.assistantAgent.getId()}`
        );
    }
}

interface CustomData {
    data: String;
    value: number;
}
