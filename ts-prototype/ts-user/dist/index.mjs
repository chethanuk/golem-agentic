var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
import { AgentDefinition, AgentImplementation, Prompt, Description, Metadata } from "golem-ts-sdk";

// .metadata/index.ts
var index_exports = {};
__export(index_exports, {
  add: () => add
});
function add(library, stripInternals) {
  library.addMetadata({
    name: "",
    id: "@ts-user/index",
    children: [
      "@golem-ts-sdk",
      "@golem-ts-sdk",
      "@golem-ts-sdk",
      "@golem-ts-sdk",
      "@golem-ts-sdk",
      "@ts-user/Users/afsalthaj/projects/ribbb/golem-agentic/ts-prototype/ts-user/.metadata/metadata.index",
      "@rttist",
      "@rttist",
      "@rttist",
      "@ts-user/Users/afsalthaj/projects/ribbb/golem-agentic/ts-prototype/ts-user/.metadata/metadata.typelib"
    ],
    types: [
      {
        kind: 64,
        name: "AssistantAgent",
        methods: [
          {
            name: "ask",
            signatures: [
              {
                parameters: [
                  {
                    name: "input",
                    type: "#String",
                    flags: 0
                  }
                ],
                returnType: "#Promise{#String}"
              }
            ],
            flags: 0
          }
        ],
        indexes: [],
        constructors: [
          {
            returnType: "#void"
          }
        ],
        decorators: [
          {
            id: "@golem-ts-sdk:AgentDefinition",
            name: "AgentDefinition",
            args: []
          }
        ],
        abstract: true,
        id: "@ts-user/index:AssistantAgent"
      },
      {
        kind: 64,
        name: "AssistantAgentImpl",
        methods: [
          {
            name: "ask",
            signatures: [
              {
                parameters: [
                  {
                    name: "name",
                    type: "#String",
                    flags: 0
                  }
                ],
                returnType: "#Promise{#String}"
              }
            ],
            flags: 0
          }
        ],
        indexes: [],
        constructors: [
          {
            returnType: "#void"
          }
        ],
        extends: "@ts-user/index:AssistantAgent",
        decorators: [
          {
            id: "@golem-ts-sdk:AgentImplementation",
            name: "AgentImplementation",
            args: []
          }
        ],
        id: "@ts-user/index:AssistantAgentImpl"
      },
      {
        kind: 64,
        name: "WeatherAgent",
        methods: [
          {
            name: "getWeather",
            signatures: [
              {
                parameters: [
                  {
                    name: "name",
                    type: "#String",
                    flags: 0
                  }
                ],
                returnType: "#Promise{#String}"
              }
            ],
            flags: 0
          }
        ],
        indexes: [],
        constructors: [
          {
            returnType: "#void"
          }
        ],
        decorators: [
          {
            id: "@golem-ts-sdk:AgentDefinition",
            name: "AgentDefinition",
            args: []
          }
        ],
        abstract: true,
        id: "@ts-user/index:WeatherAgent"
      },
      {
        kind: 64,
        name: "WeatherAgentImpl",
        methods: [
          {
            name: "getWeather",
            signatures: [
              {
                parameters: [
                  {
                    name: "name",
                    type: "#String",
                    flags: 0
                  }
                ],
                returnType: "#Promise{#String}"
              }
            ],
            flags: 0
          }
        ],
        indexes: [],
        constructors: [
          {
            returnType: "#void"
          }
        ],
        extends: "@ts-user/index:WeatherAgent",
        decorators: [
          {
            id: "@golem-ts-sdk:AgentImplementation",
            name: "AgentImplementation",
            args: []
          }
        ],
        id: "@ts-user/index:WeatherAgentImpl"
      }
    ]
  }, stripInternals);
}
__name(add, "add");

// .metadata/metadata.index.ts
var metadataCollection = [
  index_exports
];

// src/index.ts
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
metadataCollection.forEach((mod) => mod.add(Metadata, false));
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
    const weather = new WeatherAgentImpl();
    return weather.getWeather(name);
  }
};
AssistantAgentImpl = _ts_decorate([
  AgentImplementation()
], AssistantAgentImpl);
var WeatherAgent = class WeatherAgent2 {
  static {
    __name(this, "WeatherAgent");
  }
};
_ts_decorate([
  Prompt("Get weather"),
  Description("Weather forecast weather for you"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String
  ]),
  _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], WeatherAgent.prototype, "getWeather", null);
WeatherAgent = _ts_decorate([
  AgentDefinition()
], WeatherAgent);
var WeatherAgentImpl = class WeatherAgentImpl2 extends WeatherAgent {
  static {
    __name(this, "WeatherAgentImpl");
  }
  getWeather(name) {
    return Promise.resolve(`Weather in ${name} is sunny. Result ${name}`);
  }
};
WeatherAgentImpl = _ts_decorate([
  AgentImplementation()
], WeatherAgentImpl);
