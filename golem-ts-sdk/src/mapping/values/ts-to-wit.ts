import {
  GenericType,
  ObjectType,
  PromiseType,
  Type,
  TypeAliasType,
  TypeKind,
  UnionType,
} from 'rttist';
import { WitValue } from 'golem:rpc/types@0.2.2';
import { constructWitValueFromValue, Value } from './value';

export function constructWitValueFromTsValue(
  tsValue: any,
  tsType: Type,
): WitValue {
  const value = constructValueFromTsValue(tsValue, tsType);
  return constructWitValueFromValue(value);
}

// Note that we take `type: Type` instead of `type: AnalysedType`(because at this point `AnalysedType` of the `tsValue` is also available)
// as `Type` holds more information, and can be used to determine the error messages for wrong `tsValue` more accurately.
function constructValueFromTsValue(tsValue: any, type: Type): Value {
  switch (type.kind) {
    case TypeKind.Null:
      return { kind: 'tuple', value: [] };

    case TypeKind.Boolean:
      if (typeof tsValue === 'boolean') {
        return { kind: 'bool', value: tsValue };
      } else {
        throw new Error(`Expected boolean, got ${typeof tsValue}`);
      }
    case TypeKind.False:
      if (typeof tsValue === 'boolean') {
        return { kind: 'bool', value: tsValue };
      } else {
        throw new Error(`Expected boolean, got ${typeof tsValue}`);
      }
    case TypeKind.True:
      if (typeof tsValue === 'boolean') {
        return { kind: 'bool', value: tsValue };
      } else {
        throw new Error(`Expected boolean, got ${typeof tsValue}`);
      }
    case TypeKind.Number:
      return { kind: 's32', value: tsValue };

    case TypeKind.BigInt:
      return { kind: 'u64', value: tsValue };

    case TypeKind.String:
      return { kind: 'string', value: tsValue };

    case TypeKind.PromiseDefinition:
      const promiseDefType = type as PromiseType;
      const promiseDefArgType = promiseDefType.getTypeArguments()[0];
      return constructValueFromTsValue(tsValue, promiseDefArgType);

    case TypeKind.Interface:
      return handleObject(tsValue, type);

    case TypeKind.Union: {
      return handleUnion(tsValue, type);
    }

    case TypeKind.Alias:
      const aliasType = type as TypeAliasType;
      const targetType = aliasType.target;
      return constructValueFromTsValue(tsValue, targetType);

    case TypeKind.Promise:
      const promiseType = type as PromiseType;
      const argument = promiseType.getTypeArguments()[0];
      return constructValueFromTsValue(tsValue, argument);

    case TypeKind.Type:
      return handleGeneralType(tsValue, type);

    // Difference between Object and ObjectType to be determine
    case TypeKind.ObjectType:
      return handleObject(tsValue, type);

    case TypeKind.Uint8Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'number')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 'u8', value: item })),
        };
      } else {
        throw new Error(`Expected Uint8Array, got ${typeof tsValue}`);
      }
    case TypeKind.Uint8ClampedArray:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'number')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 'u8', value: item })),
        };
      } else {
        throw new Error(`Expected Uint8ClampedArray, got ${typeof tsValue}`);
      }
    case TypeKind.Int16Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'number')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 's16', value: item })),
        };
      } else {
        throw new Error(`Expected Int16Array, got ${typeof tsValue}`);
      }
    case TypeKind.Uint16Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'number')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 'u16', value: item })),
        };
      } else {
        throw new Error(`Expected Uint16Array, got ${typeof tsValue}`);
      }
    case TypeKind.Int32Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'number')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 's32', value: item })),
        };
      } else {
        throw new Error(`Expected Int32Array, got ${typeof tsValue}`);
      }
    case TypeKind.Uint32Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'number')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 'u32', value: item })),
        };
      } else {
        throw new Error(`Expected Uint32Array, got ${typeof tsValue}`);
      }
    case TypeKind.Float32Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'number')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 'f32', value: item })),
        };
      } else {
        throw new Error(`Expected Float32Array, got ${typeof tsValue}`);
      }
    case TypeKind.Float64Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'number')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 'f64', value: item })),
        };
      } else {
        throw new Error(`Expected Float64Array, got ${typeof tsValue}`);
      }
    case TypeKind.BigInt64Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'bigint')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 's64', value: item })),
        };
      } else {
        throw new Error(`Expected BigInt64Array, got ${typeof tsValue}`);
      }
    case TypeKind.BigUint64Array:
      if (
        Array.isArray(tsValue) &&
        tsValue.every((item) => typeof item === 'bigint')
      ) {
        return {
          kind: 'list',
          value: tsValue.map((item) => ({ kind: 'u64', value: item })),
        };
      } else {
        throw new Error(`Expected BigUint64Array, got ${typeof tsValue}`);
      }
    case TypeKind.Object:
      return handleObject(tsValue, type);

    case TypeKind.StringLiteral:
      if (typeof tsValue === 'string') {
        return { kind: 'string', value: tsValue };
      } else {
        throw new Error(`Expected string literal, got ${typeof tsValue}`);
      }
    default:
      throw new Error(
        `The following type is not supported in Golem in the context of agents: ${type.displayName}`,
      );
  }
}

function handleUnion(tsValue: any, type: Type): Value {
  // When it comes to TS, a value for a union type is simply a non complex value.
  // function processUnion(x: string | number | boolean) { }
  // and x can be 1 or "1" or true.
  // to convert it to wit-value, the only choice is to match against all possible types
  const unionType = type as UnionType;
  const possibleTypes = unionType.types;
  const typeWithIndex = findTypeOfAny(tsValue, possibleTypes);

  if (!typeWithIndex) {
    throw new Error(`No matching type found for the value '${tsValue}' in union type. Type structure: ${unionType.displayName}`);
  } else {
    const innerType = typeWithIndex[0];
    const result = constructValueFromTsValue(tsValue, innerType);
    return { kind: 'variant', caseIdx: typeWithIndex![1], caseValue: result };
  }
}

function handleGeneralType(tsValue: any, type: Type): Value {
  if (type.isArray()) {
    const typeArg = type.getTypeArguments?.()[0];
    return {
      kind: 'list',
      value: tsValue.map((item: any) =>
        constructValueFromTsValue(item, typeArg),
      ),
    };
  } else if (type.isTuple()) {
    const typeArg = type.getTypeArguments?.();
    return {
      kind: 'tuple',
      value: tsValue.map((item: any, idx: number) =>
        constructValueFromTsValue(item, typeArg[idx]),
      ),
    };
  } else if (type.isGenericType()) {
    const genericType: GenericType<typeof type> = type as GenericType<
      typeof type
    >;
    const genericTypeDefinition = genericType.genericTypeDefinition;
    if (genericTypeDefinition.name == 'Map') {
      const typeArgs = type.getTypeArguments?.();

      if (!typeArgs || typeArgs.length !== 2) {
        throw new Error('Map must have two type arguments');
      }

      const result: Value[] = Array.from(tsValue.entries()).map(
        (keyValue: any) => {
          return {
            kind: 'tuple',
            value: [
              constructValueFromTsValue(keyValue[0], typeArgs[0]),
              constructValueFromTsValue(keyValue[1], typeArgs[1]),
            ],
          };
        },
      );

      return { kind: 'list', value: result };
    } else {
      throw new Error('Type must have a type argument');
    }
  } else {
    const typeArg = type.getTypeArguments()[0];
    return constructValueFromTsValue(tsValue, typeArg);
  }
}

function handleObject(tsValue: any, type: Type): Value {
  if (typeof tsValue === 'object' && tsValue !== null) {
    const innerType = type as ObjectType;
    const innerProperties = innerType.getProperties();
    const values: Value[] = [];
    for (const prop of innerProperties) {
      const key = prop.name.toString();
      if (!Object.prototype.hasOwnProperty.call(tsValue, key)) {
        if (prop.optional) {
          values.push({ kind: 'option' });
        } else if (prop.type.isString()) {
          if (tsValue == '') {
            values.push({ kind: 'string', value: '' });
          } else {
            throw new Error(`Missing property '${key}' in value`);
          }
        } else if (prop.type.isNumber()) {
          if (tsValue == 0) {
            values.push({ kind: 's32', value: 0 });
          } else {
            throw new Error(`Missing property '${key}' in value`);
          }
        } else if (prop.type.isBoolean()) {
          if (tsValue == false) {
            values.push({ kind: 'bool', value: false });
          } else {
            throw new Error(`Missing property '${key}' in value`);
          }
        } else if (prop.optional) {
          values.push({ kind: 'option' });
        } else {
          throw new Error(`Missing property '${key}' in value`);
        }
      } else {
        const fieldVal = constructValueFromTsValue(tsValue[key], prop.type);
        values.push(fieldVal);
      }
    }

    return { kind: 'record', value: values };
  } else {
    throw new Error(`Expected object, got ${typeof tsValue}`);
  }
}

function findTypeOfAny(
  value: any,
  typeList: readonly Type[],
): [Type, number] | undefined {
  let idx = 0;
  for (const type of typeList) {
    if (matchesType(value, type)) {
      return [type, idx];
    }

    idx++;
  }

  return undefined;
}

function matchesType(value: any, type: Type): boolean {
  switch (type.kind) {
    case TypeKind.Number:
      return typeof value === 'number';

    case TypeKind.String:
      return typeof value === 'string';

    case TypeKind.Boolean:
      return typeof value === 'boolean';

    case TypeKind.True:
      return typeof value === 'boolean';

    case TypeKind.False:
      return typeof value === 'boolean';

    case TypeKind.Null:
      return value === null;

    case TypeKind.Undefined:
      return value === undefined;

    case TypeKind.Type:
        // TypeKind.Type is a generic type, we need to check if the value matches the type
        if (type.isArray()) {
            const typeArg = type.getTypeArguments?.()[0];
            return Array.isArray(value) && value.every((item) => matchesType(item, typeArg));
        } else if (type.isTuple()) {
            const typeArgs = type.getTypeArguments?.();
            return (
            Array.isArray(value) &&
            value.length === typeArgs.length &&
            value.every((v, idx) => matchesType(v, typeArgs[idx]))
            );
        } else {
            throw new Error(`Unsupported TypeKind.Type with generic type: ${type.displayName}`);
        }

    case TypeKind.ArrayBuffer:
      const elementType = type.getTypeArguments?.()[0];
      return (
        Array.isArray(value) &&
        value.every((item) => matchesType(item, elementType))
      );

    case TypeKind.TupleDefinition:
      const tupleTypes = type.getTypeArguments();

      return (
        Array.isArray(value) &&
        value.length === tupleTypes.length &&
        value.every((v, idx) => matchesType(v, tupleTypes[idx]))
      );

    case TypeKind.ObjectType:
      return handleObjectMatch(value, type);

    case TypeKind.Interface:
      return handleObjectMatch(value, type);

    case TypeKind.Alias:
      const aliasType = type as TypeAliasType;
      const targetType = aliasType.target;
      return matchesType(value, targetType);

    case TypeKind.Object:
      return handleObjectMatch(value, type);

    case TypeKind.Union:
      throw new Error('union of union not yet supported');

    case TypeKind.Any:
      return true;

    default:
      return false;
  }
}

function handleObjectMatch(value: any, type: Type): boolean {
  if (typeof value !== 'object' || value === null) return false;

  let allValidProp = true;

  for (const prop of (type as ObjectType).getProperties() ?? []) {
    const propExists = prop.name.toString() in value;
    if (!propExists) {
      if (!prop.optional) {
        allValidProp = false;
        break;
      }
    } else {
      if (!matchesType(value[prop.name.toString()], prop.type)) {
        allValidProp = false;
        break;
      }
    }
  }

  return allValidProp;
}
