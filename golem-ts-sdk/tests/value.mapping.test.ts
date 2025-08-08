import { describe, it, expect } from 'vitest';
import { getTestInterfaceType } from './utils';
import { TestInterfaceType } from './test-data';
import {
  constructValueFromWitValue,
  constructWitValueFromValue,
} from '../src/mapping/values/value';
import { constructWitValueFromTsValue } from '../src/mapping/values/ts-to-wit';
import { constructTsValueFromWitValue } from '../src/mapping/values/wit-to-ts';
import { testInterfaceTypeArb } from './arbitraries';
import * as fc from 'fast-check';

describe('typescript value to wit value round-trip conversions', () => {
  it('should correctly perform round-trip conversion for arbitrary values of interface type', () => {
    fc.assert(
      fc.property(testInterfaceTypeArb, (data) => {
        const interfaceType = getTestInterfaceType();
        const witValue = constructWitValueFromTsValue(data, interfaceType);

        // Round trip wit-value -> value -> wit-value
        const value = constructValueFromWitValue(witValue);
        const witValueReturned = constructWitValueFromValue(value);
        expect(witValueReturned).toEqual(witValue);

        // Round trip ts-value -> wit-value -> ts-value
        const tsValueReturned: TestInterfaceType = constructTsValueFromWitValue(
          witValueReturned,
          interfaceType,
        );

        expect(tsValueReturned).toEqual(data);
      }),
    );
  });

  it('should preserve values with only required properties (excluding optional)', () => {
    const defaultData: TestInterfaceType = {
      bigintProp: 0n,
      booleanProp: false,
      falseProp: false,
      listObjectProp: [],
      listProp: [],
      mapProp: new Map<string, number>(),
      nestedProp: { n: 0 },
      nullProp: null,
      numberProp: 0,
      objectProp: { a: '', b: 0, c: false },
      stringProp: '',
      trueProp: true,
      tupleObjectProp: ['', 0, { a: '', b: 0, c: false }],
      tupleProp: ['', 0, false],
      unionProp: 1,
    };

    const interfaceType = getTestInterfaceType();
    const witValue = constructWitValueFromTsValue(defaultData, interfaceType);

    // Round trip wit-value -> value -> wit-value
    const value = constructValueFromWitValue(witValue);
    const witValueReturned = constructWitValueFromValue(value);
    expect(witValueReturned).toEqual(witValue);

    // Round trip ts-value -> wit-value -> ts-value
    const tsValueReturned: TestInterfaceType = constructTsValueFromWitValue(
      witValueReturned,
      interfaceType,
    );

    expect(tsValueReturned).toEqual(defaultData);
  });

  it('should preserve values including optional properties', () => {
    const withOptionalValues: TestInterfaceType = {
      bigintProp: 0n,
      booleanProp: false,
      falseProp: false,
      listObjectProp: [],
      listProp: [],
      mapProp: new Map<string, number>(),
      nestedProp: { n: 0 },
      nullProp: null,
      numberProp: 0,
      objectProp: { a: '', b: 0, c: false },
      stringProp: '',
      trueProp: true,
      tupleObjectProp: ['', 0, { a: '', b: 0, c: false }],
      tupleProp: ['', 0, false],
      unionProp: 1,
      optionalProp: 2,
    };

    const interfaceType = getTestInterfaceType();
    const witValue = constructWitValueFromTsValue(
      withOptionalValues,
      interfaceType,
    );

    // Round trip wit-value -> value -> wit-value
    const value = constructValueFromWitValue(witValue);
    const witValueReturned = constructWitValueFromValue(value);
    expect(witValueReturned).toEqual(witValue);

    // Round trip ts-value -> wit-value -> ts-value
    const tsValueReturned: TestInterfaceType = constructTsValueFromWitValue(
      witValue,
      interfaceType,
    );

    expect(tsValueReturned).toEqual(withOptionalValues);
  });

  it('should preserve union properties with complex object variants', () => {
    const withComplexUnionType: TestInterfaceType = {
      bigintProp: 0n,
      booleanProp: false,
      falseProp: false,
      listObjectProp: [],
      listProp: [],
      mapProp: new Map<string, number>(),
      nestedProp: { n: 0 },
      nullProp: null,
      numberProp: 0,
      objectProp: { a: '', b: 0, c: false },
      stringProp: '',
      trueProp: true,
      tupleObjectProp: ['', 0, { a: '', b: 0, c: false }],
      tupleProp: ['', 0, false],
      unionProp: { a: 'test', b: 42, c: true }, // Using an object as a union type
      optionalProp: 2,
    };

    const interfaceType = getTestInterfaceType();
    const witValue = constructWitValueFromTsValue(
      withComplexUnionType,
      interfaceType,
    );

    // Round trip wit-value -> value -> wit-value
    const value = constructValueFromWitValue(witValue);
    const witValueReturned = constructWitValueFromValue(value);
    expect(witValueReturned).toEqual(witValue);

    // Round trip ts-value -> wit-value -> ts-value
    const tsValueReturned: TestInterfaceType = constructTsValueFromWitValue(
      witValue,
      interfaceType,
    );

    expect(tsValueReturned).toEqual(withComplexUnionType);
  });
});
