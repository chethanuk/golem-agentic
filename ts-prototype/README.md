`generated_dnd` is a generated rust, however, manually added to load the user's JS along with sdk module. User's module is imported 
in the runtime. 

When the rust-component generator is specialised to support dynamic loading of user's JS, it should be following this change
in `internal.rs`

### Quick testing

```shell
cd golem-ts-sdk
npn run build
# this step is not needed in real implementation, 
# as it will be automatically done when pre-compiling with specialised rust generator with wasm-rquickjs
# with the changes as mentioned above
cp dist/index.mjs  ../generated_dnd/src/module.js
```

```shell
cd ../ts-user
npn install ../golem-ts-sdk
npn run build

# this step is not exactly needed in real implementation, 
# as it will be done through wrapping users-js in another component which exports get-script method
cp dist/index.mjs  ../generated_dnd/src/index.mjs

```

```shell
cd ../generated_dnd
golem app build
# mv the component to code_first_agent branch's test-components directory
cd golem/integration-tests
cargo run --bin rib-repl agentic_gues
```

```rust
>>> let x = instance()
()
>>> let r = x.agent("AssistantAgent", [{nodes: [prim-string("foo")]}])
()
>>> r.invoke("ask", [{nodes: [prim-string("foo")]}])
emit("Hi foo")
>>>
>>>

```