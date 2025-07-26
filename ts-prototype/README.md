The structure will change quite a bit once the SDK build starts!

`generated_dnd` is a generated rust, however, manually added to load the user's JS along with sdk module. User's module is imported 
in the runtime. 

When the rust-component generator is specialised to support dynamic loading of user's JS, it should be following this change
in `internal.rs`

### Golem CLI template for SDK

The SDK above is pretty much inspired from the template of the golem SDK, but it is not a blund output of template SDK.
So to debug things and have better control, I build .dts files using wasm-quickjs wrapper toolings, and wrote the agent implementation in the SDK,
and generated the rust component using wasm-quickjs rust component generator, with necessary changes in the emitted wrapper
to support.

Once the experimentation is done, we will move the SDK logic to the output of `golem app new ts` 
for easier maintainence, such as updating host wit files etc  

### RTTIST installation

```
npm install -g @rttist/typegen@0.2.0

```

**User should never ever install RTTIST/typegen**, and i think we can help it with the help of golem-cli by directly using typegen API.
golem-cli should re-do what typegen does inspired from code like https://github.com/rttist/rttist/blob/main/packages/plugins/vite6-plugin-rttist/src/index.ts.

### RTTIST vs deepkit

The metadata generation pathway is much more convincing to me than deepkit's magic of transformers (or even rttists transformers).
We have more flexibility. Note that, we need type-metadata initialisation before user's code start doing its work.

There are 2 ways to do it.
1. Load the generated module along with user's module. If the runtime can take an `Array[String]` representing the sorted order of modules 
to be initialised, that can help avoid using custom transformers/compilers. It gives more flexibility to users if they need to use a specific transformer later on.
Currently in rust code, I am importing 2 modules along with SDK module - user's module and user's type-metadata-initialisation

2. Use transformer plugin, that will combine everything to 1 user module. But I will be suprised, if we assume that user will never have other initialisers that,
and end up seeing an existing configuration related to type-metadata - meaning, when we use transformer plugins, we are leaking internal details to what we are doing.


Note: RTTIST versions should be the very latest - RC

```
npm install -g @rttist/typegen@rc
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
rttist generate # to be done by golem cli
npn install ../golem-ts-sdk
npn run build

# this step is not exactly needed in real implementation, 
# as it will be done through wrapping users-js in another component which exports get-script method

# The component should take not just user's js but bootstrap or a sorted order of modules that are initialisers
# In our case, we will have bundler.js as well as index.js
cp dist/.metadata/bundler.mjs  ../generated_dnd/src/bundler.mjs
cp dist/src/index.mjs  ../generated_dnd/src/index.mjs

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
