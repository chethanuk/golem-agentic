import { describe, it, expect } from 'vitest'
import {Metadata} from "../src";
import {metadataCollection} from "../.metadata/metadata.index";
import {PackageName, updateMetadata} from "../src/type_metadata";
import {constructWitTypeFromTsType} from "../src/mapping/type-mapping";
import {constructAnalysedTypeFromTsType} from "../src/mapping/type-mapping";

describe('Test tyes', () => {
    // Load metadata is simulating the idea of user code updating the base type metadata library
    // of SDK
    loadMetadata();

    const testTypes = getTestTypes();

    console.log(testTypes);

    // This should be a round trip test
    it('every type in supported test is successfully converted to Wit Type', () => {
        testTypes.forEach((type) => {
            const witType = constructWitTypeFromTsType(type);
            expect(witType).toBeDefined();
        });
        expect(1 + 1).toBe(2)
    })

    it('every interface type can be successfully converted to analysed type of record', () => {
        testTypes.forEach((type) => {
            const analysed = constructAnalysedTypeFromTsType(type);
            expect(analysed).toBeDefined();
            expect(analysed.kind).toBe('record');
        });
    })
})


function loadMetadata() {
    updateMetadata(metadataCollection)
}

function getTestTypes() {
    return Metadata.getTypes().filter((type) => type.module.id == `@@golemcloud/golem-ts-sdk/tests/test-types`);
}