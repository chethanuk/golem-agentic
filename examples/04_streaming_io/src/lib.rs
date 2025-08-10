use golem_agentic::agent::Agent;
use golem_agentic_macros::{agent_definition, agent_implementation};

#[agent_definition]
pub trait StreamAgent: Agent {
    fn produce_stream(&self, chunks: u32) -> String;
}

#[derive(golem_agentic_macros::AgentConstruct)]
pub struct StreamAgentImpl {
    pub agent_id: String,
}

#[agent_implementation]
impl StreamAgent for StreamAgentImpl {
    fn produce_stream(&self, chunks: u32) -> String {
        // TODO: import io/streams.wit and return a stream handle
        format!("streamed:{}", chunks)
    }
}

// -------------------------------
// Tests
// -------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn produce_stream_returns_expected_stub() {
        let agent = StreamAgentImpl {
            agent_id: "t".to_string(),
        };

        let result = agent.produce_stream(3);
        assert_eq!(result, "streamed:3");
    }
}
