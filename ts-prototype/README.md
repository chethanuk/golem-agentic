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

User has to install RTTIST, and i think we can help it with the help of golem-cli, and I don't know how exactly,
but many times user has to install things and given these are within the typescript ecosystem, it shouldn't hurt them

The metadata generation pathway is much more convincing to me than deepkit's magic of transformers (or even rttists transformers)
that we are able to avoid these transformer plugins which can hurt the user with deadly errors

Also, always use RC versions

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
