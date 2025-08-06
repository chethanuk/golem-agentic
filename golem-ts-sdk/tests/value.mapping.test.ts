import { describe, it, expect } from 'vitest'
import {getTestInterfaceType} from "./utils";
import {SampleInterfaceDataDefault} from "./test-data";
import {
    constructValueFromWitValue,
    constructWitValueFromTsValue,
    constructWitValueFromValue
} from "../src/mapping/value-mapping";


describe('TypeScript Values to Wit Value', () => {
    it('should return an empty object', () => {
        const interfaceType = getTestInterfaceType();
        const witValue = constructWitValueFromTsValue(SampleInterfaceDataDefault, interfaceType);
        const value = constructValueFromWitValue(witValue);
        const witValueReturned = constructWitValueFromValue(value);

        // Internal logic check - round trip (wit-value -> value -> wit-value)
        expect(witValueReturned).toEqual(witValue);

        // TODO; test constructTsValueFromWitValue(witValueReturned, interfaceType);
    })
})