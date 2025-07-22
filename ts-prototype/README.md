`generated_dnd` is a generated rust, however, manually added the following changes, to ensure user's js is loaded
In practice, this will be done using wasm composition of the SDK component, with a generate-script component (which is a component that wraps the user's js)
The wasm-quickjs wrapper will ensure to do this - a specialised wrapper for code-first agent for TS
