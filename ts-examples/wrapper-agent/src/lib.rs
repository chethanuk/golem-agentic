use golem_wasm_rpc::{NodeBuilder, Value, WitValueBuilderExtensions};
use crate::bindings::export;
use crate::bindings::exports::golem::agent::guest::{AgentError, DataValue, Guest, GuestAgent as ReExportedGuestAgent};
use crate::bindings::exports::golem::simulated_agentic_typescript::simulated_agent_ts::{WeatherAgentRecord1, Guest as SimulatedGuest, GuestAssistantAgent, GuestWeatherAgent};
use crate::bindings::golem::agent::common::{AgentType, ElementValue};
use crate::bindings::golem::agent::guest::Agent;
use crate::bindings::golem::rpc::types::{Uri, WitNode, WitValue};

#[allow(warnings)]
mod bindings;

struct Component;

impl Guest for Component {
    type Agent = WrapperAgent;

    fn discover_agent_types() -> Vec<AgentType> {
        bindings::golem::agent::guest::discover_agent_types()
    }

    fn get_agent(agent_type: String, agent_id: String) -> bindings::exports::golem::agent::guest::Agent {
        unsafe { std::mem::transmute(bindings::golem::agent::guest::get_agent(&agent_type, &agent_id)) }
    }

    fn discover_agents() -> Vec<bindings::exports::golem::agent::guest::Agent> {
        unsafe { std::mem::transmute(bindings::golem::agent::guest::discover_agents()) }
    }
}

struct WrapperAgent {
    agent: Agent
}

impl ReExportedGuestAgent for WrapperAgent {


    fn get_id(&self) -> String {
        self.agent.get_id()
    }

    fn get_definition(&self) -> AgentType {
        self.agent.get_definition()
    }

    fn invoke(&self, method_name: String, input: DataValue) -> Result<DataValue, AgentError> {
        self.agent.invoke(method_name.as_str(), &input)
    }

    fn create(agent_type: String, input: DataValue) -> Result<bindings::exports::golem::agent::guest::Agent, AgentError> {
        Agent::create(agent_type.as_str(), &input)
            .map(|agent| unsafe { std::mem::transmute(agent) })
    }
}

impl SimulatedGuest for Component {
    type AssistantAgent = AssistantAgentResource;
    type WeatherAgent = WeatherAgentResource;
}

struct AssistantAgentResource {
    inner: Agent,
}

struct WeatherAgentResource {
    inner: Agent,
}


impl GuestAssistantAgent for AssistantAgentResource {

    fn new() -> Self {
        let params: Vec<ElementValue> =
            vec![];

        let data_value = DataValue::Tuple(params);

        let agent =
            Agent::create("AssistantAgent", &data_value).expect("failed to create the agent"); // to be derived from agentic definitions


        Self { inner: agent }
    }

    // Look at the agent definitions and form this function
    fn ask(&self, query: String) -> Result<DataValue, AgentError> {
        let param_wit_value = convert_to_guest_value(
            golem_wasm_rpc::WitValue::builder().string(query.as_str()),
        ); // Generate this in moonbit wrapper

        let params = vec![ElementValue::ComponentModel(param_wit_value)];

        self.inner.invoke("ask", &DataValue::Tuple(params))
    }
}

impl GuestWeatherAgent for WeatherAgentResource {
    fn new() -> Self {
        let agent = Agent::create("WeatherAgent", &DataValue::Tuple(vec![])).expect("failed to create the agent"); // to be derived from agentic definitions
        Self { inner: agent }
    }

    fn get_weather(&self, location: String, param2: WeatherAgentRecord1) -> Result<DataValue, AgentError> {
        let location_wit_value =
            ElementValue::ComponentModel(convert_to_guest_value(golem_wasm_rpc::WitValue::builder().string(location.as_str())));

        let param4_wit_value =
            ElementValue::ComponentModel(weather_agent_record2_to_wit_value(param2));

        let data_value = DataValue::Tuple(vec![location_wit_value, param4_wit_value]);

        self.inner.invoke("get-weather", &data_value)
    }
}


pub fn convert_to_guest_value(host_value: golem_wasm_rpc::WitValue) -> WitValue {
    let guest_nodes: Vec<WitNode> = host_value
        .nodes
        .into_iter()
        .map(|node| match node {
            golem_wasm_rpc::WitNode::RecordValue(v) => WitNode::RecordValue(v),
            golem_wasm_rpc::WitNode::VariantValue((tag, val)) => WitNode::VariantValue((tag, val)),
            golem_wasm_rpc::WitNode::EnumValue(v) => WitNode::EnumValue(v),
            golem_wasm_rpc::WitNode::FlagsValue(bools) => WitNode::FlagsValue(bools),
            golem_wasm_rpc::WitNode::TupleValue(v) => WitNode::TupleValue(v),
            golem_wasm_rpc::WitNode::ListValue(v) => WitNode::ListValue(v),
            golem_wasm_rpc::WitNode::OptionValue(opt) => WitNode::OptionValue(opt),
            golem_wasm_rpc::WitNode::ResultValue(res) => WitNode::ResultValue(res),
            golem_wasm_rpc::WitNode::PrimU8(v) => WitNode::PrimU8(v),
            golem_wasm_rpc::WitNode::PrimU16(v) => WitNode::PrimU16(v),
            golem_wasm_rpc::WitNode::PrimU32(v) => WitNode::PrimU32(v),
            golem_wasm_rpc::WitNode::PrimU64(v) => WitNode::PrimU64(v),
            golem_wasm_rpc::WitNode::PrimS8(v) => WitNode::PrimS8(v),
            golem_wasm_rpc::WitNode::PrimS16(v) => WitNode::PrimS16(v),
            golem_wasm_rpc::WitNode::PrimS32(v) => WitNode::PrimS32(v),
            golem_wasm_rpc::WitNode::PrimS64(v) => WitNode::PrimS64(v),
            golem_wasm_rpc::WitNode::PrimFloat32(v) => WitNode::PrimFloat32(v),
            golem_wasm_rpc::WitNode::PrimFloat64(v) => WitNode::PrimFloat64(v),
            golem_wasm_rpc::WitNode::PrimChar(c) => WitNode::PrimChar(c),
            golem_wasm_rpc::WitNode::PrimBool(b) => WitNode::PrimBool(b),
            golem_wasm_rpc::WitNode::PrimString(s) => WitNode::PrimString(s),
            golem_wasm_rpc::WitNode::Handle((uri, rid)) => WitNode::Handle((Uri{
                value: uri.value,
            }, rid)),
        })
        .collect();

    WitValue { nodes: guest_nodes }
}


fn weather_agent_record2_to_wit_value(weather_agent_record: WeatherAgentRecord1) -> WitValue {
    let value = Value::Record(vec![
        Value::String(weather_agent_record.data.clone()),
        Value::S32(weather_agent_record.value),
    ]);

    let wasm_rpc_value = golem_wasm_rpc::WitValue::from(value);
    let guest_value = convert_to_guest_value(wasm_rpc_value);

    guest_value
}


export!(Component with_types_in bindings);



