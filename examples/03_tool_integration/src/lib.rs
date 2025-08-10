use golem_agentic::agent::Agent;
use golem_agentic_macros::{agent_definition, agent_implementation};

#[agent_definition]
pub trait HttpToolAgent: Agent {
    fn fetch_url(&self, url: String) -> String;
}

#[derive(golem_agentic_macros::AgentConstruct)]
pub struct HttpToolAgentImpl {
    pub agent_id: String,
    pub timeout_ms: u32, // TODO: integrate with host HTTP client timeout
}

#[agent_implementation]
impl HttpToolAgent for HttpToolAgentImpl {
    fn fetch_url(&self, url: String) -> String {
        // TODO: import http/types.wit and perform real GET
        // For now, return a deterministic stub to keep example runnable
        format!("mock-status:200 len:{}", url.len())
    }
}

// -------------------------------
// Tests
// -------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn fetch_url_returns_expected_stub() {
        let agent = HttpToolAgentImpl {
            agent_id: "test".to_string(),
            timeout_ms: 1_000,
        };

        let url = "http://example.com";
        let expected = format!("mock-status:200 len:{}", 18);
        let actual = agent.fetch_url(url.to_string());

        assert_eq!(actual, expected);
    }
}
