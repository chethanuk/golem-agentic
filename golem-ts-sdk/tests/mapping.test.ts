import { describe, it, expect } from 'vitest'
import {constructWitTypeFromTsType} from "../src/mapping/type-mapping";
import {constructAnalysedTypeFromTsType} from "../src/mapping/type-mapping";
import {
    getInterfaces,
    getInterfaceWithOptionalProperty,
    getAll,
    loadMetadata,
    getRecordFieldsFromAnalysedType, getInterfaceWithOptionalUndefinedProperty
} from "./type-utils";

describe('Type Mapping for Interface Types in Typescript', () => {
    // A more general test case that every type defined in test-types can be converted to WitType
    it('every type in supported test types can be successfully converted to Wit Type', () => {
        const testTypes = getAll();

        testTypes.forEach((type) => {
            const witType = constructWitTypeFromTsType(type);
            expect(witType).toBeDefined();
        });
    })

    // A more general tests that every interface types defined in test-types is handled
    it('every interface type in supported test types can be successfully converted to AnalysedType.record', () => {
        const testTypes = getInterfaces();

        testTypes.forEach((type) => {
            const analysed = constructAnalysedTypeFromTsType(type);
            expect(analysed).toBeDefined();
            expect(analysed.kind).toBe('record');
        });
    })

    it('every optional defined property in interface has optional type in AnalysedType.record', () => {
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

    it('every optional undefined property in interface has optional type in AnalysedType.record', () => {
        const interfaceWithOptionalProperty = getInterfaceWithOptionalUndefinedProperty();
        const analysed = constructAnalysedTypeFromTsType(interfaceWithOptionalProperty);

        expect(analysed).toBeDefined();
        expect(analysed.kind).toBe('record');

        const recordFields = getRecordFieldsFromAnalysedType(analysed)!;
        const optionalFields = recordFields.filter((field) => field.name.startsWith('optionalUndefinedProp'));

        optionalFields.forEach((field) => {
            expect(field.typ.kind).toBe('option');

            const innerType = field.typ.kind === 'option' ? field.typ.value.inner : null;
            expect(innerType?.kind).toBe('tuple');

            const itemsLength = innerType?.kind === 'tuple' ? innerType.value.items.length : -1;
            expect(itemsLength).toBe(0);
        });
    })
})

