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

// A union type will become a variant in WIT, and the names will be available in the case.name
// Example: [{name: 'string', typ: { kind: 'string' }}, {name: 'number', typ: { kind: 's32' }}]
// This needs to be verified with @vigoo
type UnionType = number | string | boolean | ObjectType;

type ObjectType = { a: string; b: number; c: boolean };

type ListType = Array<string>;

type ListObjectType = Array<ObjectType>;

type TupleType = [string, number, boolean];

type TupleWithObjectType = [string, number, ObjectType];

type MapType = Map<string, number>;

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
  listProp: ListType;
  listObjectProp: ListObjectType;
  tupleProp: TupleType;
  tupleObjectProp: TupleWithObjectType;
  mapProp: MapType;
  //FIXME, RTTIST bug or not supported yet
  // mapAlternativeProp: MapTypeAlternative,
  //unionPropInlined: string | number;
  // recordProp: RecordType;
  // enumType: EnumTypeAlias;
  //enumTypeInlined: EnumType,
  // objectPropInlined: {
  //     a: string,
  //     b: number,
  //     c: boolean
  // }
  //enumProp: EnumTypeAlias,
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
