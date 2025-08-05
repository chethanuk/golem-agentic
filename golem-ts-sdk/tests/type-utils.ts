import {PackageName, updateMetadata} from "../src/type_metadata";
import {metadataCollection} from "../.metadata/metadata.index";
import {Metadata} from "../src";
import {Type, TypeKind} from "rttist";
import './test-setup';
import {AnalysedType, NameTypePair} from "../src/mapping/analysed-type";

export function loadMetadata() {
    updateMetadata(metadataCollection)
}

export function getAll() {
    return Metadata.getTypes().filter((type) => type.module.id == `@${PackageName}/tests/test-types`);
}

export function getInterfaces() {
    return getAll().filter((type) => type.kind === TypeKind.Interface);
}

export function getInterfaceWithOptionalProperty() {
      return getAll().filter((type) =>  type.name == 'OptionalPropertyInterfaceType')[0];
}

export function getInterfaceWithOptionalUndefinedProperty(): Type {
    return getAll().filter((type) => type.name == 'OptionalPropertyUndefinedInterfaceType')[0];
}

export function getInterfaceWithNestedProperty(): Type {
    return getAll().filter((type) => type.name == 'NestedPropertyInterfaceType')[0];
}

export function getRecordFieldsFromAnalysedType(analysedType: AnalysedType): NameTypePair[] | undefined {
    return analysedType.kind === 'record' ? analysedType.value.fields : undefined;
}
