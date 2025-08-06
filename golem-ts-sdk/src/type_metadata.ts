import {BaseMetadataLibrary, GlobalMetadata} from "rttist";

export const PackageName = "@golemcloud/golem-ts-sdk";

export const Metadata = new BaseMetadataLibrary(
    {
        nullability: false,
    },
    PackageName,
    GlobalMetadata
);


export function updateMetadata(metadata: Array<any>) {
    Metadata.clearMetadata(PackageName);
    metadata.forEach(mod => mod.add(Metadata, false));
}