The structure will change quite a bit once the SDK build starts!

`generated_dnd` is a generated rust, however, manually added to load the user's JS along with sdk module. User's module is imported 
in the runtime. 

When the rust-component generator is specialised to support dynamic loading of user's JS, it should be following this change
in `internal.rs`

We can discuss this with @vigoo, whether to port the whole code in this prototype SDK to the golem-cli template generated code.
Regardless this SDK has to be npm published (along with being part of a pre-compiled wasm)

### What are the pre-requisites for user given this SDK?

* npm
* npx (comes with npm for latest versions of npm)

 
While rttist is needed, we incorporated it part of the build using certain configuration and generated code. 
While I can't conclude if this is the best of the best approach, the prototype already makes sure it is just `npm run build` 
to build the user JS module. 


### Golem CLI integration plan - high level

Note that when this user code becomes a template in golem-cli, it will be `golem app build` and it becomes a wasm.
Users js module (output of npm run build) will be lifted to be a component that exports a function called `get-user-script` returning a string.
This component should be composed with the pre-compiled wasm (which is mainly SDK) 

```sh
npm run build
```

### Quick testing

```shell
# Not needed - just for prototype
cd ../../golem-ts-sdk
npn run build

cp dist/index.mjs  ../generated_dnd/src/module.js #alternatively you can copy the js in the published package as well
```

```shell
cd ts-examples/ts-user
npm install
npn run build

# this step is not exactly needed in real implementation, 
# as it will be done through wrapping users-js in another component which exports get-script method

cp dist/index.mjs  ../generated_dnd/src/index.mjs

```

```shell
cd ../generated_dnd
golem app build
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
