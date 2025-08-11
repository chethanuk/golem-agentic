// Copyright 2024-2025 Golem Cloud
//
// Licensed under the Golem Source License v1.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://license.golem.cloud/LICENSE
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export interface NameTypePair {
  name: string;
  typ: AnalysedType;
}

export interface NameOptionTypePair {
  name: string;
  typ?: AnalysedType;
}

export type AnalysedType =
    | { kind: 'variant'; value: TypeVariant }
    | { kind: 'result'; value: TypeResult }
    | { kind: 'option'; value: TypeOption }
    | { kind: 'enum'; value: TypeEnum }
    | { kind: 'flags'; value: TypeFlags }
    | { kind: 'record'; value: TypeRecord }
    | { kind: 'tuple'; value: TypeTuple }
    | { kind: 'list'; value: TypeList }
    | { kind: 'string' }
    | { kind: 'chr' }
    | { kind: 'f64' }
    | { kind: 'f32' }
    | { kind: 'u64' }
    | { kind: 's64' }
    | { kind: 'u32' }
    | { kind: 's32' }
    | { kind: 'u16' }
    | { kind: 's16' }
    | { kind: 'u8' }
    | { kind: 's8' }
    | { kind: 'bool' }
    | { kind: 'handle'; value: TypeHandle };

export function getNameFromAnalysedType(typ: AnalysedType): string | undefined {
  switch (typ.kind) {
    case 'variant':
      return typ.value.name;
    case 'result':
      return typ.value.name;
    case 'option':
      return typ.value.name;
    case 'enum':
      return typ.value.name;
    case 'flags':
      return typ.value.name;
    case 'record':
      return typ.value.name;
    case 'tuple':
      return typ.value.name;
    case 'list':
      return typ.value.name;
    case 'handle':
      return typ.value.name;
    default:
      return undefined;
  }
}

export interface TypeResult {
  name: string | undefined;
  ok?: AnalysedType;
  err?: AnalysedType;
}

export interface TypeVariant {
  name: string | undefined;
  cases: NameOptionTypePair[];
}

export interface TypeOption {
  name: string | undefined;
  inner: AnalysedType;
}

export interface TypeEnum {
  name: string | undefined;
  cases: string[];
}

export interface TypeFlags {
  name: string | undefined;
  names: string[];
}

export interface TypeRecord {
  name: string | undefined;
  fields: NameTypePair[];
}

export interface TypeTuple {
  name: string | undefined;
  items: AnalysedType[];
}

export interface TypeList {
  name: string | undefined;
  inner: AnalysedType;
}

export interface TypeHandle {
  name: string | undefined;
  resourceId: AnalysedResourceId;
  mode: AnalysedResourceMode;
}

export type AnalysedResourceMode = 'owned' | 'borrowed';

export type AnalysedResourceId = number;


export const analysedType = {
  field: (name: string, typ: AnalysedType): NameTypePair => ({ name, typ }),

  case: (name: string, typ: AnalysedType): NameOptionTypePair => ({ name, typ }),
  optCase: (name: string, typ?: AnalysedType): NameOptionTypePair => ({ name, typ }),
  unitCase: (name: string): NameOptionTypePair => ({ name }),

  bool: (): AnalysedType => ({ kind: 'bool' }),
  str: (): AnalysedType => ({ kind: 'string' }),
  chr: (): AnalysedType => ({ kind: 'chr' }),
  f64: (): AnalysedType => ({ kind: 'f64' }),
  f32: (): AnalysedType => ({ kind: 'f32' }),
  u64: (): AnalysedType => ({ kind: 'u64' }),
  s64: (): AnalysedType => ({ kind: 's64' }),
  u32: (): AnalysedType => ({ kind: 'u32' }),
  s32: (): AnalysedType => ({ kind: 's32' }),
  u16: (): AnalysedType => ({ kind: 'u16' }),
  s16: (): AnalysedType => ({ kind: 's16' }),
  u8: (): AnalysedType => ({ kind: 'u8' }),
  s8: (): AnalysedType => ({ kind: 's8' }),

  list: (inner: AnalysedType): AnalysedType => ({ kind: 'list', value: { name: undefined, inner } }),
  option: (inner: AnalysedType): AnalysedType => ({ kind: 'option', value: { name: undefined, inner } }),
  tuple: (items: AnalysedType[]): AnalysedType => ({ kind: 'tuple', value: { name: undefined, items } }),
  record: (fields: NameTypePair[]): AnalysedType => ({ kind: 'record', value: { name: undefined, fields } }),
  flags: (names: string[]): AnalysedType => ({ kind: 'flags', value: { name: undefined, names } }),
  enum: (cases: string[]): AnalysedType => ({ kind: 'enum', value: { name: undefined, cases } }),
  variant: (cases: NameOptionTypePair[]): AnalysedType => ({ kind: 'variant', value: { name: undefined, cases } }),

  resultOk: (ok: AnalysedType): AnalysedType =>
      ({ kind: 'result', value: { name: undefined, ok } }),
  resultErr: (err: AnalysedType): AnalysedType =>
      ({ kind: 'result', value: { name: undefined, err } }),

  result: (ok: AnalysedType, err: AnalysedType): AnalysedType =>
      ({ kind: 'result', value: { name: undefined, ok, err } }),


  handle: (resourceId: AnalysedResourceId, mode: AnalysedResourceMode): AnalysedType =>
      ({ kind: 'handle', value: { name: undefined, resourceId, mode } }),
};
