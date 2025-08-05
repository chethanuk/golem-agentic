import { describe, it, expect } from 'vitest'
import {Metadata} from "../src";
import {metadataCollection} from "../.metadata/metadata.index";

describe('Math test', () => {
    Metadata.clearMetadata("@golemcloud/golem-ts-sdk");

    loadMetadata();
    console.log(Metadata.getTypes().filter((type) => type.name === 'TestType'));
    it('adds numbers', () => {
        expect(1 + 1).toBe(2)
    })
})


function loadMetadata() {
   Metadata.clearMetadata("@golemcloud/golem-ts-sdk");
   metadataCollection.forEach(mod => mod.add(Metadata, false));
}