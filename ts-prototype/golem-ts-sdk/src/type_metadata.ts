//tadataLibrary, GlobalMetadata} from "rttist";

// A hook to keep track of user's metadata
// It is upto the user code to update this Metadata
import {BaseMetadataLibrary, GlobalMetadata} from "rttist";

export const Metadata = new BaseMetadataLibrary({
    nullability: false,
}, "@user-code", GlobalMetadata);

