interface TestInterfaceType {
    n: number
}

interface NestedPropertyInterfaceType {
    n: number;
    nested: TestInterfaceType;
}

interface OptionalPropertyInterfaceType {
    n: number,
    t: TestInterfaceType,
    optionalProp?: string
}

