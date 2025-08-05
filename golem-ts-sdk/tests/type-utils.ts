import {PackageName, updateMetadata} from "../src/type_metadata";
import {metadataCollection} from "../.metadata/metadata.index";
import {Metadata} from "../src";
import {Type, TypeKind} from "rttist";
import './test-setup';
import {AnalysedType, NameTypePair} from "../src/mapping/analysed-type";
import {expect} from "vitest";

export function loadMetadata() {
    updateMetadata(metadataCollection)
}

export function getAll() {
    return Metadata.getTypes().filter((type) => type.module.id == `@${PackageName}/tests/test-types`);
}

export function getInterfaces() {
    return getAll().filter((type) => type.kind === TypeKind.Interface);
}

export function getInterfaceWithUndefinedProperty(): Type {
    return getAll().filter((type) => type.name == 'UndefinedPropertyInterfaceType')[0];
}

export function getInterfaceWithOptionalProperty() {
      return getAll().filter((type) =>  type.name == 'OptionalPropertyInterfaceType')[0];
}

export function getInterfaceWithOptionalUndefinedProperty(): Type {
    return getAll().filter((type) => type.name == 'OptionalPropertyUndefinedInterfaceType')[0];
}

export function getInterfaceWithUnionProperty(): Type {
    return getAll().filter((type) => type.name == 'UnionPropertyInterfaceType')[0];
}

export function getInterfaceWithUnionPropertyAlias(): Type {
    return getAll().filter((type) => type.name == 'UnionPropertyAliasInterfaceType')[0];
}

export function getInterfaceWithObjectPropertyAlias(): Type {
    return getAll().filter((type) => type.name == 'ObjectPropertyAliasInterfaceType')[0];
}


export function getInterfaceWithNestedProperty(): Type {
    return getAll().filter((type) => type.name == 'NestedPropertyInterfaceType')[0];
}

export function getRecordFieldsFromAnalysedType(analysedType: AnalysedType): NameTypePair[] | undefined {
    return analysedType.kind === 'record' ? analysedType.value.fields : undefined;
}


export function expectTupleTypeWithNoItems(typ: AnalysedType) {
    expect(typ.kind).toBe('tuple');
    const itemsLength = typ?.kind === 'tuple' ? typ.value.items.length : -1;
    expect(itemsLength).toBe(0);
}