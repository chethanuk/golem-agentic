var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

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

// .metadata/initialiser.ts
import { Metadata } from "golem-ts-sdk";
metadataCollection.forEach((mod) => mod.add(Metadata, false));
