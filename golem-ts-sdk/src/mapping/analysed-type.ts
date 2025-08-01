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
    | { kind: 'str' }
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

export interface TypeResult {
  ok?: AnalysedType;
  err?: AnalysedType;
}

export interface TypeVariant {
  cases: NameOptionTypePair[];
}

export interface TypeOption {
  inner: AnalysedType;
}

export interface TypeEnum {
  cases: string[];
}

export interface TypeFlags {
  names: string[];
}

export interface TypeRecord {
  fields: NameTypePair[];
}

export interface TypeTuple {
  items: AnalysedType[];
}

export interface TypeList {
  inner: AnalysedType;
}

export interface TypeHandle {
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
  str: (): AnalysedType => ({ kind: 'str' }),
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

  list: (inner: AnalysedType): AnalysedType => ({ kind: 'list', value: { inner } }),
  option: (inner: AnalysedType): AnalysedType => ({ kind: 'option', value: { inner } }),
  tuple: (items: AnalysedType[]): AnalysedType => ({ kind: 'tuple', value: { items } }),
  record: (fields: NameTypePair[]): AnalysedType => ({ kind: 'record', value: { fields } }),
  flags: (names: string[]): AnalysedType => ({ kind: 'flags', value: { names } }),
  enum: (cases: string[]): AnalysedType => ({ kind: 'enum', value: { cases } }),
  variant: (cases: NameOptionTypePair[]): AnalysedType => ({ kind: 'variant', value: { cases } }),

  resultOk: (ok: AnalysedType): AnalysedType =>
      ({ kind: 'result', value: { ok } }),
  resultErr: (err: AnalysedType): AnalysedType =>
      ({ kind: 'result', value: { err } }),

  result: (ok: AnalysedType, err: AnalysedType): AnalysedType =>
      ({ kind: 'result', value: { ok, err } }),


  handle: (resourceId: AnalysedResourceId, mode: AnalysedResourceMode): AnalysedType =>
      ({ kind: 'handle', value: { resourceId, mode } }),
};
