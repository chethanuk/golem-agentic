var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
import { BaseAgent, Agent, Prompt, Description } from "golem-ts-sdk";
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var AssistantAgent = class AssistantAgent2 extends BaseAgent {
  static {
    __name(this, "AssistantAgent");
  }
  async ask(name) {
    const customData = {
      data: "Sample data",
      value: 42
    };
    const localWeatherClient = WeatherAgent.createLocal("");
    const localWeather = await localWeatherClient.getWeather(name, customData);
    return "Hello! weather at " + name + ", is being computed by assistant-agent with id " + this.getId() + "., Result from weather agent: " + localWeather + " weather agent used " + localWeatherClient.getId();
  }
};
_ts_decorate([
  Prompt("Ask your question"),
  Description("This method allows the agent to answer your question"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String
  ]),
  _ts_metadata("design:returntype", Promise)
], AssistantAgent.prototype, "ask", null);
AssistantAgent = _ts_decorate([
  Agent()
], AssistantAgent);
var WeatherAgent = class WeatherAgent2 extends BaseAgent {
  static {
    __name(this, "WeatherAgent");
  }
  assistantAgent;
  userName;
  constructor(username) {
    super();
    this.userName = username;
  }
  async getWeather(name, param2) {
    return Promise.resolve(`Hi ${this.userName} Weather in ${name} is sunny. Params passed: ${name} ${JSON.stringify(param2)}. Computed by weather-agent ${this.getId()}. The query was done by assistant-agent ${this.assistantAgent.getId()}`);
  }
};
_ts_decorate([
  Prompt("Get weather"),
  Description("Weather forecast weather for you"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String,
    typeof CustomData === "undefined" ? Object : CustomData
  ]),
  _ts_metadata("design:returntype", Promise)
], WeatherAgent.prototype, "getWeather", null);
WeatherAgent = _ts_decorate([
  Agent(),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String
  ])
], WeatherAgent);
