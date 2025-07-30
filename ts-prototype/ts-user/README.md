Build

```
npm run build

```

Note that npm run build generates `dist`, `.generated` and `.metadata` - all of them are git-ignored.
The `bootstrap/prebuild.ts` is all that is required. The responsibility of prebuild.ts can be lifted back to golem-cli (not preferred) or keep it as is.
So that user can do `npm run build` for some debugging etc (Example: they want to see the output of just `npm run build` and not `golem app build`)

