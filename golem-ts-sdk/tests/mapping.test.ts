import { describe, it, expect } from 'vitest'
import {constructAnalysedTypeFromTsType} from "../src/mapping/type-mapping";
import {
    expectTupleTypeWithNoItems, getTestInterfaceType, getRecordFieldsFromAnalysedType, getTestObjectType, getUnionType,
} from "./utils";
import {AnalysedType, NameTypePair} from "../src/mapping/analysed-type";

// Interface type indirectly tests primitive types, union, list etc
describe('TypeScript Interface to AnalysedType', () => {
    const interfaceType = getTestInterfaceType();
    const analysed = constructAnalysedTypeFromTsType(interfaceType);
    const recordFields = getRecordFieldsFromAnalysedType(analysed)!;


    it('Interface should be AnalysedType.Record', () => {
        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');
    })

    it('Primitive types within an interface', () => {
        checkPrimitiveFields(recordFields);
    });

    it('Undefined types within an interface', () => {
        checkUndefinedFields(recordFields);
    })

    it('Optional fields within an interface', () => {
        checkOptionalFields(recordFields);
        checkOptionalUndefinedFields(recordFields);
    })

    it('Union types (aliased) within an interface', () => {
        checkUnionFields(recordFields);
    })

    it('Object types within an interface', () => {
        checkObjectFields(recordFields);
    })

    it('List type within an interface', () => {
        checkListFields(recordFields);
    })

    it('List of objects within an interface', () => {
        checkListObjectFields(recordFields);
    })

    it('Tuple type within an interface', () => {
        checkTupleFields(recordFields);
    })

    it ('Tuple with object type within an interface', () => {
        checkTupleWithObjectFields(recordFields);
    })

    it('Map type within an interface', () => {
        checkMapFields(recordFields);
    })
});

describe('TypeScript Object to AnalysedType', () => {
    it('transforms object with different properties successfully to analysed type', () => {
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

// To be confirmed.
describe('TypeScript Union to AnalysedType.Variant', () => {
    it('Union is converted to Variant with the name of the type as case name', () => {
        const enumType = getUnionType();
        const analysedType = constructAnalysedTypeFromTsType(enumType);

        const expected: AnalysedType = {
            kind: 'variant',
            value: {
                cases: [
                    { name: 'string', typ: { kind: 'string' } },
                    { name: 'number', typ: { kind: 's32' } },
                    { name: 'false', typ: { kind: 'bool' } }, // RTTIST bug, should be just bool
                    { name: 'true', typ: { kind: 'bool' } }
                ],
                name: undefined
            }
        }

        expect(analysedType).toEqual(expected);
    })
})

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

function checkListFields(fields: any[]) {
    const listFields = fields.filter(f => f.name.startsWith('listProp'));
    expect(listFields.length).toBeGreaterThan(0);

    listFields.forEach(field => {
        expect(field.typ.kind).toBe('list');
        expect(field.typ.value.inner.kind).toBe('string'); // Assuming the inner type is string
    });
}

function checkListObjectFields(fields: any[]) {
    const listObjectFields = fields.filter(f => f.name.startsWith('listObjectProp'));
    expect(listObjectFields.length).toBeGreaterThan(0);

    listObjectFields.forEach(field => {
        expect(field.typ.kind).toBe('list');
        expect(field.typ.value.inner.kind).toBe('record');
        const innerFields = getRecordFieldsFromAnalysedType(field.typ.value.inner)!;
        expect(innerFields.length).toBe(3); // Assuming 3 fields in the object type
    });
}

function checkTupleFields(fields: any[]) {
    const tupleFields = fields.filter(f => f.name.startsWith('tupleProp'));
    console.log(tupleFields)

    tupleFields.forEach(field => {
        expect(field.typ.kind).toBe('tuple');
        if (field.typ.kind == 'tuple') {
            const expected: AnalysedType[] = [{kind: 'string'}, {kind: 's32'}, {kind: 'bool'}];
            expect(field.typ.value.items).toEqual(expected);
        }
    });
}

function checkTupleWithObjectFields(fields: any[]) {
    const tupleObjectFields = fields.filter(f => f.name.startsWith('tupleObjectProp'));
    expect(tupleObjectFields.length).toBeGreaterThan(0);

    tupleObjectFields.forEach(field => {
        expect(field.typ.kind).toBe('tuple');
        if (field.typ.kind == 'tuple') {
            const expected: AnalysedType[] = [
                { kind: 'string' },
                { kind: 's32' },
                { kind: 'record', value: { fields: [
                    { name: 'a', typ: { kind: 'string' } },
                    { name: 'b', typ: { kind: 's32' } },
                    { name: 'c', typ: { kind: 'bool' } }
                ], name: undefined } }
            ];
            expect(field.typ.value.items).toEqual(expected);
        }
    });
}

function checkMapFields(fields: any[]) {
    const mapFields = fields.filter(f => f.name.startsWith('mapProp'));
    expect(mapFields.length).toBeGreaterThan(0);

    // list of tuples, where each tuple is a key-value pair
    mapFields.forEach(field => {
        expect(field.typ.kind).toBe('list');
        if (field.typ.kind == 'list') {
            expect(field.typ.value.inner.kind).toBe('tuple');
            const inner = field.typ.value.inner;
            expect(inner.value.items.length).toBe(2);
            expect(inner.value.items[0].kind).toBe('string');
            expect(inner.value.items[1].kind).toBe('s32');
        }
    });
}