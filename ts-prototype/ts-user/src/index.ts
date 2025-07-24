// @ts-ignore (Needn't worry about this, only to remove warning)
import { AgentDefinition, AgentImplementation, Prompt, Description, Metadata } from 'golem-ts-sdk'
import {metadataCollection} from "../.metadata/metadata.index";
import {ClassType} from "rttist";

// Now this is a copy of some code from the generated files from rttist
// and will not be part of the user code
//metadataCollection.forEach((mod) => mod.add(SdkMetadata, false));

metadataCollection.forEach((mod) => mod.add(Metadata, false));

@AgentDefinition()
abstract class AssistantAgent {
    // @ts-ignore (mainly to remove warning for decorators at abstract method levels- this will be a question)
    // @Prompt("Ask your question")
    // @Description("This method allows the agent to answer your question")
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
    // @Prompt("Get weather")
    // @Description("Weather forecast weather for you")
    abstract getWeather(name: string): Promise<string>;
}

@AgentImplementation()
class WeatherAgentImpl extends WeatherAgent {
    getWeather(name: string): Promise<string> {
        return Promise.resolve(`Weather in ${name} is sunny. Result ${name}` );
    }
}

function hello() {
    const AllTypes = Metadata.getTypes();

    const FilteredTypes = AllTypes.filter((type) => type.isClass() && type.name == "AssistantAgent")[0];
    const FilteredType = (FilteredTypes as ClassType);

    const AskMethodInfo = FilteredType.getMethod("ask")!;
    const AskSignature = AskMethodInfo.getSignatures()[0];
    return AskSignature.returnType.name;
}



console.log(hello())