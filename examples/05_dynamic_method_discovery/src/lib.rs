use golem_agentic::agent::Agent;
use golem_agentic_macros::{agent_definition, agent_implementation};

#[agent_definition]
pub trait DiscoveryAgent: Agent {
    fn list(&self) -> String;
}

#[derive(golem_agentic_macros::AgentConstruct)]
pub struct DiscoveryAgentImpl {
    pub agent_id: String,
}

#[agent_implementation]
impl DiscoveryAgent for DiscoveryAgentImpl {
    fn list(&self) -> String {
        // TODO: surface richer metadata, including methods and schemas
        let types = golem_agentic::agent_registry::get_all_agent_definitions();
        let names: Vec<String> = types.into_iter().map(|t| t.type_name).collect();
        format!("agents:{}", names.join(","))
    }
}

// -------------------------------
// Tests
// -------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn list_includes_discovery_agent() {
        let agent = DiscoveryAgentImpl {
            agent_id: "t".to_string(),
        };

        let output = agent.list();
        assert!(
            output.contains("discovery-agent"),
            "Expected output to list discovery-agent, got: {}",
            output
        );
    }
}
