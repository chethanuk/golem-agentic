import { BaseMetadataLibrary, GlobalMetadata } from "rttist";
import { metadataCollection } from "./metadata.index";

// Clear global metadata to prevent duplicates in case of HMR
GlobalMetadata.clearMetadata("@ts-user");

const Metadata = new BaseMetadataLibrary({
	nullability: false,
}, "@ts-user", GlobalMetadata);
metadataCollection.forEach((mod) => mod.add(Metadata, true));
export { Metadata };