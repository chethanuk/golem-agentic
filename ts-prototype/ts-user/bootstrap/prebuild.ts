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

const userEntryModule  = config.entry.replace(/\.ts$/, '');

const wrapperContent = `
import '../.metadata/metadata.index';
import { Metadata } from '@afsalthaj/golem-ts-sdk';
import { metadataCollection } from '../.metadata/metadata.index';

// Clear preloaded metadata
Metadata.clearMetadata("@afsalthaj/golem-ts-sdk");
// Load generated metadata
metadataCollection.forEach(mod => mod.add(Metadata, false));

// Import the user module *after* metadata is ready
export default (async () => {
  return await import("../src/index");
})();

`;

fs.writeFileSync(wrapperPath, wrapperContent);
