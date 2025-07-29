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
        extends: "@golem-ts-sdk:Agent",
        decorators: [
          {
            id: "@golem-ts-sdk:AgentImpl",
            name: "AgentImpl",
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
            name: "agentId",
            type: "@golem-ts-sdk:AgentId",
            flags: 8
          },
          {
            name: "assistantAgent",
            type: "@ts-user/index:AssistantAgent",
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
            returnType: "#void"
          }
        ],
        extends: "@golem-ts-sdk:Agent",
        decorators: [
          {
            id: "@golem-ts-sdk:AgentImpl",
            name: "AgentImpl",
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

// .metadata/bootstrap.ts
import { Metadata } from "golem-ts-sdk";
metadataCollection.forEach((mod) => mod.add(Metadata, false));
