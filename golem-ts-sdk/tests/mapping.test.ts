import { describe, it, expect } from 'vitest'
import {constructAnalysedTypeFromTsType} from "../src/mapping/type-mapping";
import {
    expectTupleTypeWithNoItems, getTestInterfaceType, getRecordFieldsFromAnalysedType, getTestObjectType,
} from "./utils";
import {NameTypePair} from "../src/mapping/analysed-type";

describe('TypeScript Interface to AnalysedType/WitType mapping', () => {
    it('correctly analyses fields of the test interface', () => {
        const interfaceType = getTestInterfaceType();
        const analysed = constructAnalysedTypeFromTsType(interfaceType);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;

        checkPrimitiveFields(recordFields);
        checkUndefinedFields(recordFields);
        checkOptionalFields(recordFields);
        checkOptionalUndefinedFields(recordFields);
        checkUnionFields(recordFields);
        checkObjectFields(recordFields);
    });
});

describe('TypeScript Object to AnalysedType/WitType mapping', () => {
    it('correctly analyses fields of the test interface', () => {
        const interfaceType = getTestObjectType();
        const analysed = constructAnalysedTypeFromTsType(interfaceType);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;

        const expected: NameTypePair[] = [
            {
                name: "a",
                typ: { kind: 'string' }
            },
            {
                name: "b",
                typ: { kind: 's32' }
            },
            {
                name: "c",
                typ: { kind: 'bool'}
            }
        ]

        expect(recordFields).toEqual(expected);
    });
});

function checkPrimitiveFields(fields: any[]) {
    const expected = {
        numberProp: { kind: 's32' },
        stringProp: { kind: 'string' },
        booleanProp: { kind: 'bool' },
        bigintProp: { kind: 'u64' },
        nullProp: { kind: 'tuple', value: { items: [] } },
        undefinedProp: { kind: 'tuple', value: { items: [] } },
        trueProp: { kind: 'bool' },
        falseProp: { kind: 'bool' },
        unknownProp: { kind: 'tuple', value: { items: [] } },
        voidProp: { kind: 'tuple', value: { items: [] } },
    };

    for (const [name, expectedType] of Object.entries(expected)) {
        const field = fields.find(f => f.name === name);
        expect(field).toBeDefined();
        expect(field.typ).toMatchObject(expectedType);
    }
}

function checkUndefinedFields(fields: NameTypePair[]) {
    const undefinedProps = fields.filter(f => f.name.startsWith('undefinedProp'));
    undefinedProps.forEach(field => {
        expectTupleTypeWithNoItems(field.typ);
    });
}

function checkOptionalFields(fields: NameTypePair[]) {
    const optionalFields = fields.filter(f => f.name.startsWith('optional') && !f.name.includes('Undefined'));
    optionalFields.forEach(field => {
        expect(field.typ.kind).toBe('option');
    });
}

function checkOptionalUndefinedFields(fields: any[]) {
    const optionalFields = fields.filter(f => f.name.startsWith('optionalUndefinedProp'));
    optionalFields.forEach(field => {
        expect(field.typ.kind).toBe('option');
        const inner = field.typ.value.inner;
        expectTupleTypeWithNoItems(inner);
    });
}

function checkUnionFields(fields: any[]) {
    const unionFields = fields.filter(f => f.name.startsWith('unionProp'));
    expect(unionFields.length).toBeGreaterThan(0);

    const expectedCases = [
        { name: 'string', typ: { kind: 'string' } },
        { name: 'number', typ: { kind: 's32' } },
        { name: 'false', typ: { kind: 'bool' } },
        { name: 'true', typ: { kind: 'bool' } },
    ];

    unionFields.forEach(field => {
        expect(field.typ.kind).toBe('variant');
        expect(field.typ.value.cases).toEqual(expectedCases);
    });
}

function checkObjectFields(fields: any[]) {
    const objectFields = fields.filter(f => f.name.startsWith('objectProp'));
    expect(objectFields.length).toBeGreaterThan(0);

    const expected = [
        { name: 'a', typ: { kind: 'string' } },
        { name: 'b', typ: { kind: 's32' } },
        { name: 'c', typ: { kind: 'bool' } },
    ];

    objectFields.forEach(field => {
        expect(field.typ.kind).toBe('record');
        expect(field.typ.value.fields).toEqual(expected);
    });
}

