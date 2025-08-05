// DO NOT RENAME INTERFACES OR PROPERTIES.
// These names are introspected using RTTIST metadata reflection
// and are used in unit tests.

// These interfaces define the set of TypeScript types that are officially
// supported and guaranteed by the SDK’s type mapping layer.

// Whatever you add here will be tested automatically in the unit test with no further change.
// This will at least ensure the mapping layer does not break for these types.
// However, you can/should explicitly test the behavior of a specific type by adding necessary utility
// functions in type-utils.ts in tests module.

// ─────────────────────────────────────────────────────────────────────────────

import {n} from "vitest/dist/chunks/reporters.d.BFLkQcL6";

interface SimpleInterfaceType {
    n: number,
}

// A union type will become a variant in WIT, and the names will be available in the case.name
// Example: [{name: 'string', typ: { kind: 'string' }}, {name: 'number', typ: { kind: 's32' }}]
// This needs to be verified with @vigoo
type UnionType = number | string | boolean;

type ObjectType = {a: string, b: number, c: boolean}

interface TestInterfaceType {
    numberProp: number;
    stringProp: string;
    booleanProp: boolean;
    bigintProp: bigint;
    nullProp: null;
    undefinedProp: undefined
    trueProp: true;
    falseProp: false;
    unknownProp: unknown;
    voidProp: void;
    optionalProp?: number;
    optionalUndefinedProp?: undefined,
    nestedProp: SimpleInterfaceType;
    unionProp: UnionType,
    //unionPropInlined: string | number; //FIXME, RTTIST bug
    objectProp: ObjectType,
    // objectPropInlined: { // FIXME, RTTIST bug
    //     a: string,
    //     b: number,
    //     c: boolean
    // }
}


