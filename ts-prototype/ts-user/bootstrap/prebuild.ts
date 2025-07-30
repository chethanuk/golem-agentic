import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const configPath = path.resolve(__dirname, '../.buildrc.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

try {
    execSync('npx --version', { stdio: 'ignore' });
    // npx is available, run your command
    execSync('npx @rttist/typegen@0.2.0 generate', { stdio: 'inherit' });
} catch (e) {
    console.error('npx is not available. Please install Node.js with npm >= 5.2.0');
    process.exit(1);
}

const outputDir = path.resolve(__dirname, '../.generated');
fs.mkdirSync(outputDir, { recursive: true });

const wrapperPath = path.join(outputDir, 'index.ts');
const wrapperContent = `
// DO NOT EDIT THIS CONFIGURATION
import '../.metadata/metadata.index';
import { BaseMetadataLibrary, GlobalMetadata } from "rttist";

import { Metadata } from '@afsalthaj/golem-ts-sdk';
import { metadataCollection } from '../.metadata/metadata.index';

// Since user code already depends on RTTIST's metadata, 
// we hvave to clear the SDK metadata that is already pre-loaded.
Metadata.clearMetadata("@afsalthaj/golem-ts-sdk");

// Generated metadata is loaded into SDK's shared metadata 
metadataCollection.forEach(mod => mod.add(Metadata, false));

// Import the user module - in a way that should be always imported after the metadata is loaded
let userModulePromise = import("../${config.entry}");

export default (async () => {
  const mod = await userModulePromise;
  return mod;
})();
`;

fs.writeFileSync(wrapperPath, wrapperContent);
