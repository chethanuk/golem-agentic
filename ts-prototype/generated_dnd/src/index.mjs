var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
import { AgentDefinition, AgentImplementation, Prompt, Description } from "golem-ts-sdk";
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
var AssistantAgent = class AssistantAgent2 {
  static {
    __name(this, "AssistantAgent");
  }
};
_ts_decorate([
  Prompt("Ask your question"),
  Description("This method allows the agent to answer your question"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String
  ]),
  _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AssistantAgent.prototype, "ask", null);
AssistantAgent = _ts_decorate([
  AgentDefinition()
], AssistantAgent);
var AssistantAgentImpl = class AssistantAgentImpl2 extends AssistantAgent {
  static {
    __name(this, "AssistantAgentImpl");
  }
  ask(name) {
    return Promise.resolve(`Hi ${name}`);
  }
};
AssistantAgentImpl = _ts_decorate([
  AgentImplementation()
], AssistantAgentImpl);
new AssistantAgentImpl();
