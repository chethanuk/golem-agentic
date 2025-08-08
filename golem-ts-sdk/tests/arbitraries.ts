import * as fc from 'fast-check';
import {
  ListObjectType,
  ListType,
  MapType,
  ObjectType,
  TestInterfaceType,
  TupleComplexType,
  TupleType,
  UnionType,
} from './test-data';

export const mapArb: fc.Arbitrary<MapType> = fc
  .dictionary(fc.string(), fc.integer())
  .map((obj) => new Map(Object.entries(obj)));

export const objectArb: fc.Arbitrary<ObjectType> = fc.record({
  a: fc.string(),
  b: fc.integer(),
  c: fc.boolean(),
});

export const listArb: fc.Arbitrary<ListType> = fc.array(fc.string());

export const listOfObjArb: fc.Arbitrary<ListObjectType> = fc.array(
  fc.record({
    a: fc.string(),
    b: fc.integer(),
    c: fc.boolean(),
  }),
);

export const unionArb: fc.Arbitrary<UnionType> = fc.oneof(
  fc.integer(),
  fc.string(),
  fc.boolean(),
  fc.record({
    a: fc.string(),
    b: fc.integer(),
    c: fc.boolean(),
  }),
);

export const tupleArb: fc.Arbitrary<TupleType> = fc.tuple(
  fc.string(),
  fc.integer(),
  fc.boolean(),
);

export const tupleComplexArb: fc.Arbitrary<TupleComplexType> = fc.tuple(
  fc.string(),
  fc.integer(),
  fc.record({
    a: fc.string(),
    b: fc.integer(),
    c: fc.boolean(),
  }),
);

export const interfaceArb: fc.Arbitrary<TestInterfaceType> = fc.record({
  bigintProp: fc.bigInt(),
  booleanProp: fc.boolean(),
  falseProp: fc.constant(false),
  listObjectProp: listOfObjArb,
  listProp: listArb,
  mapProp: mapArb,
  nestedProp: fc.record({ n: fc.integer() }),
  nullProp: fc.constant(null),
  numberProp: fc.integer(),
  objectProp: objectArb,
  stringProp: fc.string(),
  trueProp: fc.constant(true),
  tupleObjectProp: tupleComplexArb,
  tupleProp: tupleArb,
  unionProp: unionArb,
  optionalProp: fc.option(fc.integer(), { nil: undefined }),
});
