// src/index.ts
var agentRegistry = /* @__PURE__ */ new Map();
function AgentDefinition(name) {
  return function(target) {
    console.log("Registering agent:", name ?? target.name);
    agentRegistry.set(name ?? target.name, target);
  };
}
function getRegisteredAgents() {
  return Array.from(agentRegistry.entries()).map(([name, klass]) => ({
    name,
    klass
  }));
}
var Agent = class {
  constructor(name, params) {
    console.log("Agent constructor called", name, params);
    this.name = name;
    this.params = params;
  }
  async getId() {
    console.log("getId called");
    return "dummy-agent-id";
  }
  async invoke(methodName, args) {
    console.log(`invoke called: ${methodName}`, args);
    return {
      kind: "complete",
      result: { kind: "string", value: "dummy" }
    };
  }
  async getDefinition() {
    console.log("getDefinition called");
    return {
      type_name: this.name,
      methods: []
    };
  }
};
async function getAgent(agentId) {
  console.log("getAgent called", agentId);
  return {
    agentId,
    agentName: "dummy-agent",
    agentHandle: 1
  };
}
async function discoverAgents() {
  console.log("discoverAgents called");
  return [
    {
      agentId: "dummy-agent-id",
      agentName: "dummy-agent",
      agentHandle: 1
    }
  ];
}
async function discoverAgentTypes() {
  console.log("discoverAgentTypes called");
  getRegisteredAgents().map((agent) => ({
    agentId: `id-${agent.name}`,
    agentName: agent.name,
    agentHandle: 1
  }));
  return [{
    typeName: "dummy-agent-type",
    methods: [],
    requires: [],
    description: "A dummy agent type",
    agentConstructor: {
      name: "DummyAgent",
      description: "A dummy agent for testing",
      promptHint: "Type your command here",
      inputSchema: {
        tag: "structured",
        val: {
          parameters: [{
            tag: "text",
            val: { languageCode: "en" }
          }]
        }
      }
    }
  }];
}
var guest = {
  getAgent,
  discoverAgents,
  discoverAgentTypes,
  Agent
};
guest.discoverAgents();
export {
  Agent,
  AgentDefinition,
  getRegisteredAgents,
  guest
};
