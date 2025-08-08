import { PackageName } from '../src/type_metadata';
import { Metadata } from '../src';
import { Type } from 'rttist';
import './setup';
import { AnalysedType, NameTypePair } from '../src/mapping/types/analysed-type';
import { expect } from 'vitest';
import { ListObjectType } from './test-data';

export function getAll() {
  return Metadata.getTypes().filter(
    (type) => type.module.id == `@${PackageName}/tests/test-data`,
  );
}

export function getTestInterfaceType(): Type {
  return fetchType('TestInterfaceType');
}

export function getTestMapType(): Type {
  return fetchType('MapType');
}

export function getTestObjectType(): Type {
  return fetchType('ObjectType');
}

export function getTestListType(): Type {
  return fetchType('ListType');
}

export function getTestListOfObjectType(): Type {
  return fetchType('ListObjectType');
}

export function getUnionType(): Type {
  return fetchType('UnionType');
}

export function expectTupleTypeWithNoItems(typ: AnalysedType) {
  expect(typ.kind).toBe('tuple');
  const itemsLength = typ?.kind === 'tuple' ? typ.value.items.length : -1;
  expect(itemsLength).toBe(0);
}

export function getRecordFieldsFromAnalysedType(
  analysedType: AnalysedType,
): NameTypePair[] | undefined {
  return analysedType.kind === 'record' ? analysedType.value.fields : undefined;
}

function fetchType(typeNameInTestData: string): Type {
  const types = getAll().filter((type) => type.name == typeNameInTestData);

  if (types.length === 0) {
    throw new Error(`Type ${typeNameInTestData} not found in test data`);
  }
  return types[0];
}
