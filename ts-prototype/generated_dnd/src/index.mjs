var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
var src_exports = {};
import { BaseAgent, Agent, Prompt, Description } from "golem-ts-sdk";
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var AssistantAgent, WeatherAgent;
var init_src = __esm({
  "src/index.ts"() {
    "use strict";
    __name(_ts_decorate, "_ts_decorate");
    __name(_ts_metadata, "_ts_metadata");
    AssistantAgent = class AssistantAgent2 extends BaseAgent {
      static {
        __name(this, "AssistantAgent");
      }
      async ask(name) {
        const customData = {
          data: "Sample data",
          value: 42
        };
        const localWeatherClient = WeatherAgent.createLocal("afsal");
        const localWeather = await localWeatherClient.getWeather(name, customData);
        return `Hello! I'm the assistant agent (${this.getId()}) reporting on the weather in ${name}. Here\u2019s what the weather agent says: "
${localWeather}
". Info retrieved using weather agent (${localWeatherClient.getId()}).`;
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
    WeatherAgent = class WeatherAgent2 extends BaseAgent {
      static {
        __name(this, "WeatherAgent");
      }
      userName;
      constructor(username) {
        super();
        this.userName = username;
      }
      async getWeather(name, param2) {
        return Promise.resolve(`Hi ${this.userName} Weather in ${name} is sunny. Params passed: ${name} ${JSON.stringify(param2)}. Computed by weather-agent ${this.getId()}. `);
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
  }
});

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
      "@golem-ts-sdk"
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
                    name: "name",
                    type: "#String",
                    flags: 0
                  }
                ],
                returnType: "#Promise{#String}"
              }
            ],
            decorators: [
              {
                id: "@golem-ts-sdk:Prompt",
                name: "Prompt",
                args: [
                  "Ask your question"
                ]
              },
              {
                id: "@golem-ts-sdk:Description",
                name: "Description",
                args: [
                  "This method allows the agent to answer your question"
                ]
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
        extends: "@golem-ts-sdk:BaseAgent",
        decorators: [
          {
            id: "@golem-ts-sdk:Agent",
            name: "Agent",
            args: []
          }
        ],
        id: "@ts-user/index:AssistantAgent"
      },
      {
        kind: 64,
        name: "WeatherAgent",
        properties: [
          {
            name: "userName",
            type: "#String",
            flags: 8
          }
        ],
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
                  },
                  {
                    name: "param2",
                    type: "@ts-user/index:CustomData",
                    flags: 0
                  }
                ],
                returnType: "#Promise{#String}"
              }
            ],
            decorators: [
              {
                id: "@golem-ts-sdk:Prompt",
                name: "Prompt",
                args: [
                  "Get weather"
                ]
              },
              {
                id: "@golem-ts-sdk:Description",
                name: "Description",
                args: [
                  "Weather forecast weather for you"
                ]
              }
            ],
            flags: 0
          }
        ],
        indexes: [],
        constructors: [
          {
            returnType: "#void",
            parameters: [
              {
                name: "username",
                type: "#String",
                flags: 0
              }
            ]
          }
        ],
        extends: "@golem-ts-sdk:BaseAgent",
        decorators: [
          {
            id: "@golem-ts-sdk:Agent",
            name: "Agent",
            args: []
          }
        ],
        id: "@ts-user/index:WeatherAgent"
      },
      {
        kind: 63,
        name: "CustomData",
        properties: [
          {
            name: "data",
            type: "#String",
            flags: 0
          },
          {
            name: "value",
            type: "#Number",
            flags: 0
          }
        ],
        methods: [],
        indexes: [],
        id: "@ts-user/index:CustomData"
      }
    ]
  }, stripInternals);
}
__name(add, "add");

// .metadata/metadata.index.ts
var metadataCollection = [
  index_exports
];

// .generated/index.ts
import { Metadata } from "golem-ts-sdk";
metadataCollection.forEach((mod) => mod.add(Metadata, false));
var userModulePromise = Promise.resolve().then(() => (init_src(), src_exports));
var index_default = (async () => {
  const mod = await userModulePromise;
  return mod;
})();
export {
  index_default as default
};
