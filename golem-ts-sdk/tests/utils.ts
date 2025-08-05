import {PackageName, updateMetadata} from "../src/type_metadata";
import {metadataCollection} from "../.metadata/metadata.index";
import {Metadata} from "../src";
import {InterfaceType, TypeKind} from "rttist";

export function loadMetadata() {
    updateMetadata(metadataCollection)
}

export function getSupportedTestTypes() {
    return Metadata.getTypes().filter((type) => type.module.id == `@${PackageName}/tests/test-types`);
}

export function getInterfaceTestTypes() {
    return getSupportedTestTypes().filter((type) => type.kind === TypeKind.Interface);
}

export function getInterfaceTypesWithOptionalProperty() {
      return getSupportedTestTypes().filter((type) =>  type.name.startsWith('OptionalProperty'));
}
