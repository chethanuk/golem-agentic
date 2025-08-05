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
    expectTupleTypeWithNoItems
} from "./type-utils";

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
})

