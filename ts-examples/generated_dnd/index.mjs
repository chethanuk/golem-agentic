import { Metadata, Prompt, Description, Agent, BaseAgent } from '@afsalthaj/golem-ts-sdk';

function add(library, stripInternals) { library.addMetadata({ name: "", id: "@ts-user/src/index", children: ["@@afsalthaj/golem-ts-sdk", "@@afsalthaj/golem-ts-sdk", "@@afsalthaj/golem-ts-sdk", "@@afsalthaj/golem-ts-sdk"], types: [{ kind: 64, name: "AssistantAgent", methods: [{ name: "ask", signatures: [{ parameters: [{ name: "name", type: "#String", flags: 0 }], returnType: "#Promise{#String}" }], decorators: [{ id: "@@afsalthaj/golem-ts-sdk:Prompt", name: "Prompt", args: ["Ask your question"] }, { id: "@@afsalthaj/golem-ts-sdk:Description", name: "Description", args: ["This method allows the agent to answer your question"] }], flags: 0 }], indexes: [], constructors: [{ returnType: "#void" }], extends: "@@afsalthaj/golem-ts-sdk:BaseAgent", decorators: [{ id: "@@afsalthaj/golem-ts-sdk:Agent", name: "Agent", args: [] }], id: "@ts-user/src/index:AssistantAgent" }, { kind: 64, name: "WeatherAgent", properties: [{ name: "userName", type: "#String", flags: 8 }], methods: [{ name: "getWeather", signatures: [{ parameters: [{ name: "name", type: "#String", flags: 0 }, { name: "param2", type: "@ts-user/src/index:CustomData", flags: 0 }], returnType: "#Promise{#String}" }], decorators: [{ id: "@@afsalthaj/golem-ts-sdk:Prompt", name: "Prompt", args: ["Get weather"] }, { id: "@@afsalthaj/golem-ts-sdk:Description", name: "Description", args: ["Weather forecast weather for you"] }], flags: 0 }], indexes: [], constructors: [{ returnType: "#void", parameters: [{ name: "username", type: "#String", flags: 0 }] }], extends: "@@afsalthaj/golem-ts-sdk:BaseAgent", decorators: [{ id: "@@afsalthaj/golem-ts-sdk:Agent", name: "Agent", args: [] }], id: "@ts-user/src/index:WeatherAgent" }, { kind: 63, name: "CustomData", properties: [{ name: "data", type: "#String", flags: 0 }, { name: "value", type: "#Number", flags: 0 }], methods: [], indexes: [], id: "@ts-user/src/index:CustomData" }] }, stripInternals); }

var $0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    add: add
});

const metadataCollection = [$0];

// Clear preloaded metadata
Metadata.clearMetadata("@afsalthaj/golem-ts-sdk");
// Load generated metadata
metadataCollection.forEach(mod => mod.add(Metadata, false));
// Import the user module after metadata is ready
// this is to be done this way otherwise rollup ends up generating the module,
// where loading the metadata comes after the user module is loaded - resulting in errors.
var index$1 = (async () => {
    return await Promise.resolve().then(function () { return index; });
})();

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

let AssistantAgent = class AssistantAgent extends BaseAgent {
    async ask(name) {
        const customData = { data: "Sample data", value: 42 };
        // Can be used after solving https://github.com/golemcloud/wasm-rquickjs/issues/2
        // const remoteWeatherClient = WeatherAgent.createRemote("");
        // const remoteWeather = await remoteWeatherClient.getWeather(name, customData);
        const localWeatherClient = WeatherAgent.createLocal("afsal");
        const localWeather = await localWeatherClient.getWeather(name, customData);
        return (`Hello! I'm the assistant agent (${this.getId()}) reporting on the weather in ${name}. ` +
            `Here’s what the weather agent says: "\n${localWeather}\n". ` +
            `Info retrieved using weather agent (${localWeatherClient.getId()}).`);
    }
};
__decorate([
    Prompt("Ask your question"),
    Description("This method allows the agent to answer your question"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssistantAgent.prototype, "ask", null);
AssistantAgent = __decorate([
    Agent()
], AssistantAgent);
let WeatherAgent = class WeatherAgent extends BaseAgent {
    constructor(username) {
        super();
        this.userName = username;
    }
    async getWeather(name, param2) {
        return Promise.resolve(`Hi ${this.userName} Weather in ${name} is sunny. Params passed: ${name} ${JSON.stringify(param2)}. ` +
            `Computed by weather-agent ${this.getId()}. `);
    }
};
__decorate([
    Prompt("Get weather"),
    Description("Weather forecast weather for you"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WeatherAgent.prototype, "getWeather", null);
WeatherAgent = __decorate([
    Agent(),
    __metadata("design:paramtypes", [String])
], WeatherAgent);

var index = /*#__PURE__*/Object.freeze({
    __proto__: null
});

export { index$1 as default };
