"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("@deepkit/type");
const index_mjs_1 = require("golem-ts-sdk/dist/index.mjs");
let AssistantAgent = class AssistantAgent {
};
AssistantAgent.__type = ['input', 'ask', 'AssistantAgent', 'P&2!&`0"=5w#'];
AssistantAgent = __decorate([
    (0, index_mjs_1.AgentDefinition)()
], AssistantAgent);
let AssistantAgentImpl = class AssistantAgentImpl extends AssistantAgent {
    ask(name) {
        const weather = new WeatherAgentImpl();
        return weather.getWeather(name);
    }
};
AssistantAgentImpl.__type = [() => AssistantAgent, 'name', 'ask', 'AssistantAgentImpl', 'P7!P&2"&`0#5w$'];
AssistantAgentImpl = __decorate([
    (0, index_mjs_1.AgentImplementation)()
], AssistantAgentImpl);
let WeatherAgent = class WeatherAgent {
};
WeatherAgent.__type = ['name', 'getWeather', 'WeatherAgent', 'P&2!&`0"=5w#'];
WeatherAgent = __decorate([
    (0, index_mjs_1.AgentDefinition)()
], WeatherAgent);
let WeatherAgentImpl = class WeatherAgentImpl extends WeatherAgent {
    getWeather(name) {
        const reflection = (type_1.ReflectionClass.from.Ω = [[() => WeatherAgent, 'P7!']], type_1.ReflectionClass.from());
        let result = reflection.getMethodNames().join(" ");
        return Promise.resolve(`Weather in ${name} is sunny ${result}`);
    }
};
WeatherAgentImpl.__type = [() => WeatherAgent, 'name', 'getWeather', 'WeatherAgentImpl', 'P7!P&2"&`0#5w$'];
WeatherAgentImpl = __decorate([
    (0, index_mjs_1.AgentImplementation)()
], WeatherAgentImpl);
const __ΩUser = ['username', 'birthDate', 'User', 'P&4!T4"8Mw#y'];
const user = (type_1.cast.Ω = [[() => __ΩUser, 'n!']], (0, type_1.cast)({
    username: 'Peter',
    birthDate: '2010-10-10T00:00:00Z'
}));
console.log(user);
const reflection = (type_1.ReflectionClass.from.Ω = [[() => __ΩUser, 'n!']], type_1.ReflectionClass.from());
console.log(reflection.getProperties());
