interface TestType {
    n: number
}

interface NestedTestType {
    n: number;
    nested: TestType;
}

interface OptionalPropertyTestType {
    n: number,
    t: TestType,
    optionalProp?: string
}

