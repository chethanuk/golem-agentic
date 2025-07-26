import { AgentDefinition, AgentImplementation, Prompt, Description, Metadata } from 'golem-ts-sdk'

import {metadataCollection} from "./metadata.index";

// Now this is a copy of some code from the generated files from rttist
// and will not be part of the user code, we will generate this snippet because
metadataCollection.forEach((mod) => mod.add(Metadata, false));