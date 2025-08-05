// DON'T CHANGE THE INTERFACE NAME OR PROPERTY NAME AS THEY ARE USED IN RTTIST-REFLECTION-BASED TESTS

// These types represent the types that we guaranteed to support in the SDK.

/// Interface types with various _types_ of properties
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
