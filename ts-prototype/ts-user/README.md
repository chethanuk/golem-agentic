Build

```
npm run build

```

The user module will be in dist.

Note that `npm run build` generates `.metadata`, `.generated` and `dist` - all of them are git-ignored.


#### Internals

`npm run build` makes use of `bootstrap/prebuild.ts`. This idea of dealing with RTTIST does seem to be more reliable than any other transformers which 
complicates the build configuration by far. This step can be easily lifted to golem-cli templates too.
