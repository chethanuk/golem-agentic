import * as fc from 'fast-check';
import {
  ListObjectType,
  ListType,
  MapType,
  ObjectType,
  TestInterfaceType,
} from './test-data';

export const testMapArb: fc.Arbitrary<MapType> = fc
  .dictionary(fc.string(), fc.integer())
  .map((obj) => new Map(Object.entries(obj)));

export const testObjectArb: fc.Arbitrary<ObjectType> = fc.record({
  a: fc.string(),
  b: fc.integer(),
  c: fc.boolean(),
});

export const testListArb: fc.Arbitrary<ListType> = fc.array(fc.string());

export const testOfListObjectArb: fc.Arbitrary<ListObjectType> = fc.array(
  fc.record({
    a: fc.string(),
    b: fc.integer(),
    c: fc.boolean(),
  }),
);

export const testInterfaceTypeArb: fc.Arbitrary<TestInterfaceType> = fc.record({
  bigintProp: fc.bigInt(),
  booleanProp: fc.boolean(),
  falseProp: fc.constant(false),
  listObjectProp: fc.array(
    fc.record({
      a: fc.string(),
      b: fc.integer(),
      c: fc.boolean(),
    }),
  ),
  listProp: fc.array(fc.string()),
  mapProp: fc
    .dictionary(fc.string(), fc.integer())
    .map((obj) => new Map(Object.entries(obj))),
  nestedProp: fc.record({ n: fc.integer() }),
  nullProp: fc.constant(null),
  numberProp: fc.integer(),
  objectProp: fc.record({
    a: fc.string(),
    b: fc.integer(),
    c: fc.boolean(),
  }),
  stringProp: fc.string(),
  trueProp: fc.constant(true),
  tupleObjectProp: fc.tuple(
    fc.string(),
    fc.integer(),
    fc.record({
      a: fc.string(),
      b: fc.integer(),
      c: fc.boolean(),
    }),
  ),
  tupleProp: fc.tuple(fc.string(), fc.integer(), fc.boolean()),
  unionProp: fc.oneof(
    fc.integer(),
    fc.string(),
    fc.boolean(),
    fc.record({
      a: fc.string(),
      b: fc.integer(),
      c: fc.boolean(),
    }),
  ),
  optionalProp: fc.option(fc.integer(), { nil: undefined }),
});
