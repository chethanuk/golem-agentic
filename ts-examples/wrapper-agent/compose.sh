#!/bin/sh

wac plug --plug ../multi-agents/target/wasm32-wasip1/debug/multi_agents.wasm target/wasm32-wasip1/debug/wrapper_agent.wasm -o target/wasm32-wasip1/debug/plugged.wasm
