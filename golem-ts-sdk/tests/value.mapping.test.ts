import { describe, it, expect } from 'vitest'
import {getTestInterfaceType} from "./utils";
import {TestInterfaceType} from "./test-data";
import {constructValueFromWitValue, constructWitValueFromValue} from "../src/mapping/values/value";
import {constructWitValueFromTsValue} from "../src/mapping/values/ts-to-wit";
import {constructTsValueFromWitValue} from "../src/mapping/values/wit-to-ts";


describe('Round trip value conversion', () => {
    it('with only required values', () => {
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

        const tsValueReturned: TestInterfaceType =
            constructTsValueFromWitValue(witValueReturned, interfaceType);

        // Round trip (ts-value -> wit-value -> ts-value)
        expect(tsValueReturned).toEqual(defaultData);
    })

    it('With optional values', () => {
        const withOptionalValues: TestInterfaceType = {
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
            optionalProp: 2
        }

        const interfaceType = getTestInterfaceType();
        const witValue = constructWitValueFromTsValue(withOptionalValues, interfaceType);
        const value = constructValueFromWitValue(witValue);
        const witValueReturned = constructWitValueFromValue(value);

        expect(witValueReturned).toEqual(witValue);

        const tsValueReturned: TestInterfaceType =
            constructTsValueFromWitValue(witValue, interfaceType);

        // Round trip (ts-value -> wit-value -> ts-value)
        expect(tsValueReturned).toEqual(withOptionalValues);
    })

    it('With complex values fo union types', () => {
        const withComplexUnionType: TestInterfaceType = {
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
            unionProp: {a: "test", b: 42, c: true}, // Using an object as a union type
            optionalProp: 2
        }

        const interfaceType = getTestInterfaceType();
        const witValue = constructWitValueFromTsValue(withComplexUnionType, interfaceType);
        const value = constructValueFromWitValue(witValue);
        const witValueReturned = constructWitValueFromValue(value);

        expect(witValueReturned).toEqual(witValue);

        const tsValueReturned: TestInterfaceType =
            constructTsValueFromWitValue(witValue, interfaceType);

        // Round trip (ts-value -> wit-value -> ts-value)
        expect(tsValueReturned).toEqual(withComplexUnionType);
    })
})