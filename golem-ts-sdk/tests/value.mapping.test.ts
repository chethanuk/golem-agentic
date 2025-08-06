import { describe, it, expect } from 'vitest'
import {getTestInterfaceType} from "./utils";
import {
    constructTsValueFromWitValue,
    constructValueFromWitValue,
    constructWitValueFromTsValue,
    constructWitValueFromValue
} from "../src/mapping/value-mapping";
import {TestInterfaceType} from "./test-data";


describe('TypeScript Values to Wit Value', () => {
    it('', () => {
        // Just default values and see if we can successfully convert all of them to WIT value
         const defaultData: TestInterfaceType = {
            bigintProp: 0n,
            booleanProp: false,
            falseProp: false,
            listObjectProp: [],
            listProp: [],
            mapProp: new Map<string, number>(),
            nestedProp: {n: 0},
            nullProp: null,
            numberProp: 0,
            objectProp: {a: "", b: 0, c: false},
            stringProp: "",
            trueProp: true,
            tupleObjectProp: ["", 0, {a: "", b: 0, c: false}],
            tupleProp: ["", 0, false],
            undefinedProp: undefined,
            unionProp: 1,
            unknownProp: undefined,
            voidProp: undefined,
        }

        const interfaceType = getTestInterfaceType();
        const witValue = constructWitValueFromTsValue(defaultData, interfaceType);
        const value = constructValueFromWitValue(witValue);
        const witValueReturned = constructWitValueFromValue(value);

        // Internal logic check - round trip (wit-value -> value -> wit-value)
        expect(witValueReturned).toEqual(witValue);
        const result = constructTsValueFromWitValue(witValueReturned, interfaceType);
        console.log(result);

        // TODO; test constructTsValueFromWitValue(witValueReturned, interfaceType);
    })
})