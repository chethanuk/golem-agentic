use golem_agentic::agent::Agent;
use golem_agentic_macros::{agent_definition, agent_implementation};

#[agent_definition]
pub trait McpAgent: Agent {
    fn tools(&self) -> String;
}

#[derive(golem_agentic_macros::AgentConstruct)]
pub struct McpAgentImpl {
    pub agent_id: String,
}

#[agent_implementation]
impl McpAgent for McpAgentImpl {
    fn tools(&self) -> String {
        // TODO: integrate MCP-like registry and return structured list
        "[\"search\",\"http\",\"kv\"]".to_string()
    }
}

// -------------------------------
// Tests
// -------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn tools_returns_expected_json() {
        let agent = McpAgentImpl {
            agent_id: "t".to_string(),
        };

        let expected = "[\"search\",\"http\",\"kv\"]";
        let actual = agent.tools();

        assert_eq!(actual, expected);
    }
}
