# This is only a reference as manual steps involved

cd ts-user && npm install && npm run build

cd ..

npm pack @afsalthaj/golem-ts-sdk@0.0.1-dev.6
tar -xzf afsalthaj-golem-ts-sdk-0.0.1-dev.6.tgz

wasm-rquickjs generate-wrapper-crate \
--js-modules @afsalthaj/golem-ts-sdk=package/dist/index.mjs \
--js-modules ts-user/dist/index.mjs \
--wit ../wit --output generated_rust

cd generated_rust
# This will fail as you need to do a minor change in `lib.rs` to  fix compilation error.   
# vec![("user-module", Box::new(|| { include_str!("user-module.js").to_string() }))]
golem app build

cd ../wrapper-agent && cargo component build
wac plug target/wasm32-wasip1/debug/wrapper_agent.wasm --plug ../generated_rust/target/wasm32-wasip1/debug/agent_guest.wasm  -o agent_guest.wasm

# Move agent_guest.wasm to code_first_agent (a few improvements with REPL) branch's test-components directory
