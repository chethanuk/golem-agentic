import { describe, it, expect } from 'vitest'
import {constructWitTypeFromTsType} from "../src/mapping/type-mapping";
import {constructAnalysedTypeFromTsType} from "../src/mapping/type-mapping";
import {getInterfaceTestTypes, getInterfaceTypesWithOptionalProperty, getSupportedTestTypes, loadMetadata} from "./utils";

describe('Type Mapping for Interface Types in Typescript', () => {
    // A more general test case that every type defined in test-types can be converted to WitType
    it('every type in supported test types can be successfully converted to Wit Type', () => {
        const testTypes = getSupportedTestTypes();

        testTypes.forEach((type) => {
            const witType = constructWitTypeFromTsType(type);
            expect(witType).toBeDefined();
        });
    })

    // A more general tests that every interface types defined in test-types is handled
    it('every interface type in supported test types can be successfully converted to AnalysedType.record', () => {
        const testTypes = getInterfaceTestTypes();

        testTypes.forEach((type) => {
            const analysed = constructAnalysedTypeFromTsType(type);
            expect(analysed).toBeDefined();
            expect(analysed.kind).toBe('record');
        });
    })

    it('every optional property in interface has optional type in AnalysedType.record', () => {
        const testTypes = getInterfaceTypesWithOptionalProperty();
        console.log(testTypes)

        testTypes.forEach((type) => {
            const analysed = constructAnalysedTypeFromTsType(type);
            expect(analysed).toBeDefined();
            expect(analysed.kind).toBe('record');
            if (analysed.kind === 'record') {
                const fields = analysed.value;
                const optionalFields = fields.fields.filter((field) => field.name.startsWith('optional'));

                optionalFields.forEach((field) => {
                    expect(field.typ.kind).toBe('option');
                });

            }
        });
    })
})
