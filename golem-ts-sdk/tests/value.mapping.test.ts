import { describe, it, expect } from 'vitest'
import {getTestInterfaceType} from "./utils";
import {TestInterfaceType} from "./test-data";
import {constructValueFromWitValue, constructWitValueFromValue} from "../src/mapping/values/value";
import {constructWitValueFromTsValue} from "../src/mapping/values/ts-to-wit";
import {constructTsValueFromWitValue} from "../src/mapping/values/wit-to-ts";


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
            unionProp: 1,
        }

        const interfaceType = getTestInterfaceType();
        const witValue = constructWitValueFromTsValue(defaultData, interfaceType);
        const value = constructValueFromWitValue(witValue);
        const witValueReturned = constructWitValueFromValue(value);

        // Internal logic check - round trip (wit-value -> value -> wit-value)
        expect(witValueReturned).toEqual(witValue);
        const result = constructTsValueFromWitValue(witValue, interfaceType);
        console.log(result);

        const tsValueReturned = constructTsValueFromWitValue(witValueReturned, interfaceType);

        console.log(tsValueReturned);

        // TODO; test constructTsValueFromWitValue(witValueReturned, interfaceType);
    })
})