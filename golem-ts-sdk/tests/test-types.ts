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

interface TestInterfaceType {
    n: number
}

interface NestedPropertyInterfaceType {
    n: number;
    nested: TestInterfaceType;
}

interface UndefinedPropertyInterfaceType {
    n: number;
    t: TestInterfaceType;
    undefinedProp: undefined;
}

interface OptionalPropertyInterfaceType {
    n: number,
    t: TestInterfaceType,
    optionalProp?: string
}

interface OptionalPropertyUndefinedInterfaceType {
    n: number,
    t: TestInterfaceType,
    optionalUndefinedProp?: undefined
}


// FIXME: Wait for RTTIST to support union types in interfaces.
// interface UnionPropertyInterfaceType {
//     n: number,
//     t: TestInterfaceType,
//     unionProp: string | number;
// }

// A union type will become a variant in WIT, and the names will be available in the case.name
// Example: [{name: 'string', typ: { kind: 'string' }}, {name: 'number', typ: { kind: 's32' }}]
// This needs to be verified with @vigoo
type UnionType = number | string | boolean;

interface UnionPropertyAliasInterfaceType {
    n: number,
    t: TestInterfaceType,
    unionProp: UnionType;
}

interface AllPrimitivesInterfaceType {
    number: number,
    text: string,
    bool: boolean,
    null: null,
    undefinedProperty: undefined,
    bigint: bigint,
}


