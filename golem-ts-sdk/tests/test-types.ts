// DO NOT RENAME INTERFACES OR PROPERTIES.
// These names are introspected using RTTIST metadata reflection
// and are used in unit tests.

// These interfaces define the set of TypeScript types that are officially
// supported and guaranteed by the SDK’s type mapping layer.

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

// Currently only type alias will work
export type UnionType = string | number;

interface UnionPropertyInterfaceType {
    unionProp: UnionType;
}