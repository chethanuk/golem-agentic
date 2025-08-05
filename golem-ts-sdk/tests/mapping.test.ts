import { describe, it, expect } from 'vitest'
import {constructWitTypeFromTsType} from "../src/mapping/type-mapping";
import {constructAnalysedTypeFromTsType} from "../src/mapping/type-mapping";
import {
    getInterfaces,
    getInterfaceWithOptionalProperty,
    getAll,
    getRecordFieldsFromAnalysedType,
    getInterfaceWithOptionalUndefinedProperty,
    getInterfaceWithUndefinedProperty,
    expectTupleTypeWithNoItems,
    getInterfaceWithUnionProperty,
    getInterfaceWithUnionPropertyAlias,
    getInterfaceWithObjectPropertyAlias
} from "./type-utils";
import {Type, TypeKind} from "rttist";
import {analysedType} from "../src/mapping/analysed-type";

describe('TypeScript interface to AnalysedType/WitType mapping', () => {
    it('converts all supported types to WitTyp', () => {
        const testTypes = getAll();

        testTypes.forEach((type) => {
            const witType = constructWitTypeFromTsType(type);
            expect(witType).toBeDefined();
        });
    })

    it('converts all interfaces to AnalysedType with kind "record"\'', () => {
        const testTypes = getInterfaces();

        testTypes.forEach((type) => {
            const analysed = constructAnalysedTypeFromTsType(type);
            expect(analysed).toBeDefined();
            expect(analysed.kind).toBe('record');
        });
    })

    it('converts primitive types to AnalysedType', () => {

        const numberType = Type.Number;
        expect(constructAnalysedTypeFromTsType(numberType)).toEqual(analysedType.s32());

        const stringType = Type.String;
        expect(constructAnalysedTypeFromTsType(stringType)).toEqual(analysedType.str());

        const booleanType = Type.Boolean;
        expect(constructAnalysedTypeFromTsType(booleanType)).toEqual(analysedType.bool());

        const bigIntType = Type.BigInt;
        expect(constructAnalysedTypeFromTsType(bigIntType)).toEqual(analysedType.u64());

        const nullType = Type.Null;
        expect(constructAnalysedTypeFromTsType(nullType)).toEqual(analysedType.tuple([]));

        const undefinedType = Type.Undefined;
        expect(constructAnalysedTypeFromTsType(undefinedType)).toEqual(analysedType.tuple([]));

        const trueType = Type.True;
        expect(constructAnalysedTypeFromTsType(trueType)).toEqual(analysedType.bool());

        const falseType = Type.False;
        expect(constructAnalysedTypeFromTsType(falseType)).toEqual(analysedType.bool());

        const unknowType = Type.Unknown;
        expect(constructAnalysedTypeFromTsType(unknowType)).toEqual(analysedType.tuple([]));

        const voidType = Type.Void;
        expect(constructAnalysedTypeFromTsType(voidType)).toEqual(analysedType.tuple([]));

    })

    it('treats interface properties explicitly typed as "undefined" as empty tuple types', () => {
        const interfaceWithUndefinedProperty = getInterfaceWithUndefinedProperty();
        const analysed = constructAnalysedTypeFromTsType(interfaceWithUndefinedProperty);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;
        const undefinedProperty = recordFields.filter((field) => field.name.startsWith('undefinedProp'));

        undefinedProperty.forEach((field) => {
            expectTupleTypeWithNoItems(field.typ)
        });
    })

    it('wraps optional non-undefined properties in option types', () => {
        const interfaceWithOptionalProperty = getInterfaceWithOptionalProperty();
        const analysed = constructAnalysedTypeFromTsType(interfaceWithOptionalProperty);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;
        const optionalFields = recordFields.filter((field) => field.name.startsWith('optional'));

        optionalFields.forEach((field) => {
            expect(field.typ.kind).toBe('option');
        });
    })

    it('wraps optional "undefined" properties in option types containing empty tuples', () => {
        const interfaceWithOptionalProperty = getInterfaceWithOptionalUndefinedProperty();
        const analysed = constructAnalysedTypeFromTsType(interfaceWithOptionalProperty);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;
        const optionalFields = recordFields.filter((field) => field.name.startsWith('optionalUndefinedProp'));

        optionalFields.forEach((field) => {
            expect(field.typ.kind).toBe('option');

            const innerType = field.typ.kind === 'option' ? field.typ.value.inner : null;
            expectTupleTypeWithNoItems(innerType!);
        });
    })

    // FIXME: Wait for RTTIST to support union types without aliases
    it.skip('interface with union property is analysed as variant with exact cases', () => {
        const interfaceWithUnionProperty = getInterfaceWithUnionProperty();
        const analysed = constructAnalysedTypeFromTsType(interfaceWithUnionProperty);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;

        const unionFields = recordFields.filter((field) =>
            field.name.startsWith('unionProp')
        );

        expect(unionFields.length).toBeGreaterThan(0);

        console.log(unionFields);

        unionFields.forEach((field) => {
            expect(field.typ.kind).toBe('variant');

            if (field.typ.kind === 'variant') {
                const cases = field.typ.value.cases;

                expect(cases).toEqual([
                    {
                        name: 'string',
                        typ: { kind: 'string' },
                    },
                    {
                        name: 'number',
                        typ: { kind: 's32' },
                    },
                ]);
            }
        });
    });

    it('interface with union property as alias is analysed as variant with exact cases', () => {
        const interfaceWithUnionProperty = getInterfaceWithUnionPropertyAlias();
        const analysed = constructAnalysedTypeFromTsType(interfaceWithUnionProperty);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;

        const unionFields = recordFields.filter((field) =>
            field.name.startsWith('unionProp')
        );

        expect(unionFields.length).toBeGreaterThan(0);

        unionFields.forEach((field) => {
            expect(field.typ.kind).toBe('variant');

            if (field.typ.kind === 'variant') {
                const cases = field.typ.value.cases;

                expect(cases).toEqual([
                    {
                        name: 'string',
                        typ: { kind: 'string' },
                    },
                    {
                        name: 'number',
                        typ: { kind: 's32' },
                    },
                    {
                        name: 'false',
                        typ: { kind: 'bool' },
                    },
                    {
                        name: 'true',
                        typ: { kind: 'bool' },
                    },
                ]);
            }
        });
    });

    it('interface with object property as alias should be a valid analysed type', () => {
        const interfaceWithUnionProperty = getInterfaceWithObjectPropertyAlias();
        const analysed = constructAnalysedTypeFromTsType(interfaceWithUnionProperty);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;

        const objectFields = recordFields.filter((field) =>
            field.name.startsWith('objectProp')
        );

        expect(objectFields.length).toBeGreaterThan(0);

        objectFields.forEach((nameTypePair) => {
            expect(nameTypePair.typ.kind).toBe('record');

            if (nameTypePair.typ.kind === 'record') {
                const fields = nameTypePair.typ.value.fields;

                expect(fields).toEqual([
                    {
                        name: 'a',
                        typ: { kind: 'string' },
                    },
                    {
                        name: 'b',
                        typ: { kind: 's32' },
                    },
                    {
                        name: 'c',
                        typ: { kind: 'bool' },
                    }
                ]);
            }
        });
    });

    it.skip('interface with enum property as alias should be a valid analysed type', () => {
        const interfaceWithUnionProperty = getInterfaceWithEnumPropertyAlias();
        console.log(interfaceWithUnionProperty);
        const analysed = constructAnalysedTypeFromTsType(interfaceWithUnionProperty);

        expect(analysed).toBeDefined();

        console.log(analysed);

        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;

        const objectFields = recordFields.filter((field) =>
            field.name.startsWith('enumProp')
        );

        objectFields.forEach((nameTypePair) => {
            expect(nameTypePair.typ.kind).toBe('enum');

            if (nameTypePair.typ.kind === 'enum') {
                const fields = nameTypePair.typ.value.cases;

                expect(fields).toEqual([
                    'A', 'B', 'C'
                ]);
            }
        });
    });
})

