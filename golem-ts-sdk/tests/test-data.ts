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

interface SimpleInterfaceType {
  n: number;
}

// A union type will become a variant in WIT, however the names are of the type names (which is wrong)
// but I can't figure any other way of naming it unless it affect the user such as always do an alias
// i.e, instead of type MyUnion = `number | string`
// they have to write it as
// type MyNumber = number;
// type MyString = string;
// type MyUnion = MyNumber | MyString;
export type UnionType = number | string | boolean | ObjectType;

export type ObjectType = { a: string; b: number; c: boolean };

export type ObjectComplexType = {
  a: string;
  b: number;
  c: boolean;
  d: ObjectType;
  e: UnionType;
  f: ListType;
  g: ListComplexType;
  h: TupleType;
  i: TupleComplexType;
  j: MapType;
  k: SimpleInterfaceType;
};

export type ListType = Array<string>;

export type ListComplexType = Array<ObjectType>;

export type TupleType = [string, number, boolean];

export type TupleComplexType = [string, number, ObjectType];

export type MapType = Map<string, number>;

export interface TestInterfaceType {
  numberProp: number;
  stringProp: string;
  booleanProp: boolean;
  bigintProp: bigint;
  nullProp: null;
  trueProp: true;
  falseProp: false;
  optionalProp?: number;
  nestedProp: SimpleInterfaceType;
  unionProp: UnionType;
  objectProp: ObjectType;
  objectComplexProp: ObjectComplexType;
  listProp: ListType;
  listObjectProp: ListComplexType;
  tupleProp: TupleType;
  tupleObjectProp: TupleComplexType;
  mapProp: MapType;
  // FIXME, `RTTIST` bug or not supported yet
  // mapAlternativeProp: MapTypeAlternative,
  // unionPropInlined: string | number;
  // recordProp: RecordType;
  // enumType: EnumTypeAlias;
  // enumTypeInlined: EnumType,
  // objectPropInlined: {
  //     a: string,
  //     b: number,
  //     c: boolean
  // }
  // enumProp: EnumTypeAlias,
  // enumPropInlined: EnumTypeAlias,
}

// FIXME: RTTIST don't support these yet
// type MapTypeAlternative = { [key: string]: number };
// type RecordType = Record<number, string>;

// enum EnumType {
//     First = 'First',
//     Second = 1,
// }
//
// type EnumTypeAlias = EnumType;
