import {BaseMetadataLibrary, GlobalMetadata} from "rttist";

// A hook to keep track of user's metadata
// It is upto the user code to update this Metadata
export const Metadata = new BaseMetadataLibrary({
    nullability: false,
}, "@ts-user", GlobalMetadata);
