The structure will change quite a bit once the SDK build starts!

`generated_dnd` is a generated rust, however, manually added to load the user's JS along with sdk module. User's module is imported 
in the runtime. 

When the rust-component generator is specialised to support dynamic loading of user's JS, it should be following this change
in `internal.rs`

### Prototype SDK notes

The SDK above is pretty much inspired from the typescript template of the golem SDK, but it is not a blund output of template SDK.
So to debug things and have better control, I build .dts files using wasm-quickjs wrapper toolings with the wit that I need, 
and wrote the agent implementation in the SDK. Later generated the rust component using wasm-quickjs rust component generator.
Also made some changes to the generated rust, with the assumption that user code is going to be dynamically loaded.
Changed `internal.rs` to simply add 1 more import which is user module. 

We can discuss this with @vigoo, whether to port the whole code in this prototype SDK to the golem-cli template generated code.
Regardless this SDK has to be npm published (along with being part of a pre-compiled wasm)

### What are the pre-requisites for user given this SDK?

* npm
* npx (comes with npm for latest versions of npm)

 
While rttist is needed, we incorporated it part of the build using certain configuration and generated code. 
While I can't conclude if this is the best of the best approach, the prototype already makes sure it is just `npm run build` 
for a user code that uses the SDK. 


Note that when this becomes a template in golem-cli, it will be `golem app build` and it becomes a wasm.
Users js module (output of npm run build) will be lifted to be a component that exports a function called `get-user-script` returning a string.
This component should be composed with the pre-compiled wasm (which is mainly SDK) 

```sh
npm run build
```

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

cp dist/index.mjs  ../generated_dnd/src/index.mjs (it can be any name - index.mjs or index.js - doesn't matter, and in reality, its going to be a "string" import)

```

```shell
cd ../generated_dnd
golem app build
# mv the component to code_first_agent branch's test-components directory
cd golem/integration-tests
cargo run --bin rib-repl agentic_guest
```

```rust
>>> let x = instance()
()
>>> let r = x.agent("AssistantAgent", [])
()
>>> r.invoke("ask", [{nodes: [prim-string("nyc1")]}])
emit("Hello! weather at nyc1,
is being computed by assistant-agent with id worker-1-fad6b578-fefb-4385-8c1f-d31f6096815d--AssistantAgent--2.,
Result from weather agent: Hi username Weather in nyc1 is sunny. Params passed: nyc1 {
  \"data\":\"Sample data\",
  \"value\":42
}. Computed by weather-agent worker-1-fad6b578-fefb-4385-8c1f-d31f6096815d--WeatherAgent--2. The query was done by assistant-agent worker-1-fad6b578-fefb-4385-8c1f-d31f6096815d--AssistantAgent--2 weather agent used worker-1-fad6b578-fefb-4385-8c1f-d31f6096815d--WeatherAgent--2")
>>>
```
