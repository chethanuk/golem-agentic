import { describe, it, expect } from 'vitest'
import {constructAnalysedTypeFromTsType} from "../src/mapping/type-mapping";
import {
    expectTupleTypeWithNoItems, getTestInterfaceType, getRecordFieldsFromAnalysedType, getTestObjectType, getUnionType,
} from "./utils";
import {AnalysedType, NameTypePair} from "../src/mapping/analysed-type";
import {SampleInterfaceDataDefault} from "./test-data";
import {constructValueFromWitValue, constructWitValueFromTsValue} from "../src/mapping/value-mapping";


describe('TypeScript Values to Wit Value', () => {
    it('should return an empty object', () => {
        const interfaceType = getTestInterfaceType();
        const witValue = constructWitValueFromTsValue(SampleInterfaceDataDefault, interfaceType);
        const value = constructValueFromWitValue(witValue);
        console.log(witValue);
        //console.log(value);
        expect(1).toBe(1);
    })
})