import {PackageName} from "../src/type_metadata";
import {Metadata} from "../src";
import {Type} from "rttist";
import './setup';
import {AnalysedType, NameTypePair} from "../src/mapping/analysed-type";
import {expect} from "vitest";

export function getAll() {
    return Metadata.getTypes().filter((type) => type.module.id == `@${PackageName}/tests/test-data`);
}

export function getTestInterfaceType(): Type {
    return getAll().filter((type) => type.name == 'TestInterfaceType')[0];
}

export function getTestObjectType(): Type {
    return getAll().filter((type) => type.name == 'ObjectType')[0];
}

export function expectTupleTypeWithNoItems(typ: AnalysedType) {
    expect(typ.kind).toBe('tuple');
    const itemsLength = typ?.kind === 'tuple' ? typ.value.items.length : -1;
    expect(itemsLength).toBe(0);
}

export function getRecordFieldsFromAnalysedType(analysedType: AnalysedType): NameTypePair[] | undefined {
    return analysedType.kind === 'record' ? analysedType.value.fields : undefined;
}
