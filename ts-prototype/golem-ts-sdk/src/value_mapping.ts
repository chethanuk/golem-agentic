import {InterfaceType, ObjectType, PromiseType, PropertyInfo, Type, TypeKind} from "rttist";
import {Value, valueFromWitValue} from "./value";

export function convertToTsValue(wasmRpcValue: Value, expectedType: Type): any {
    switch (expectedType.kind)  {
        case TypeKind.Invalid:
            break;
        case TypeKind.Unknown:
            break;
        case TypeKind.Any:
            break;
        case TypeKind.Never:
            break;
        case TypeKind.Void:
            break;
        case TypeKind.Undefined:
            break;
        case TypeKind.Null:
            if (wasmRpcValue.kind === 'option') {
                return null;
            } else {
                throw new Error(`Unrecognized value for ${wasmRpcValue.kind}`);
            }
        case TypeKind.Intrinsic:
            break;
        case TypeKind.Boolean:
            if (wasmRpcValue.kind === 'bool') {
                return wasmRpcValue.value;
            } else {
                throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.False:
            if (wasmRpcValue.kind === 'bool') {
                return wasmRpcValue.value
            } else {
                throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.True:
            if (wasmRpcValue.kind === 'bool') {
                return wasmRpcValue.value;
            } else {
                throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Number:
            if (wasmRpcValue.kind === 'f64') {
                return wasmRpcValue.value;
            } else if (wasmRpcValue.kind === 'u8' || wasmRpcValue.kind === 'u16' || wasmRpcValue.kind === 'u32' || wasmRpcValue.kind === 'u64') {
                return wasmRpcValue.value;
            } else if (wasmRpcValue.kind === 's8' || wasmRpcValue.kind === 's16' || wasmRpcValue.kind === 's32' || wasmRpcValue.kind === 's64') {
                return wasmRpcValue.value;
            } else {
                throw new Error(`Expected number, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.BigInt:
            if (wasmRpcValue.kind == 'u64') {
                return wasmRpcValue.value
            } else {
                throw new Error(`Expected number, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.String:
            if (wasmRpcValue.kind === 'string')  {
               return wasmRpcValue.value
            } else {
                throw new Error(`Expected string, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Symbol:
            throw new Error(`Unrecognized type for ${wasmRpcValue.kind}`);
        case TypeKind.NonPrimitiveObject:
            if (wasmRpcValue.kind == 'record') {
                const fieldValues = wasmRpcValue.value;
                const expectedTypeFields: ReadonlyArray<PropertyInfo> = (expectedType as ObjectType).getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name: string = field.name.toString();
                    const expectedFieldType = field.type;
                    acc[name] = convertToTsValue(fieldValues[idx], expectedFieldType);
                    return acc;
                }, {} as Record<string, any>);
            } else {
                throw new Error(`Expected object, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.ObjectType:
            if (wasmRpcValue.kind === 'record') {
                const fieldValues = wasmRpcValue.value;
                const expectedTypeFields: ReadonlyArray<PropertyInfo> = (expectedType as ObjectType).getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name: string = field.name.toString();
                    const expectedFieldType = field.type;
                    acc[name] = convertToTsValue(fieldValues[idx], expectedFieldType);
                    return acc;
                }, {} as Record<string, any>);
            } else {
                throw new Error(`Expected object, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.FunctionType:
            throw new Error(`Unrecognized type for ${wasmRpcValue.kind}`);
        case TypeKind.Date:
            if (wasmRpcValue.kind === 'string') {
                return new Date(wasmRpcValue.value);
            } else {
                throw new Error(`Expected date, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Error:
            if (wasmRpcValue.kind === 'result') {
                if (wasmRpcValue.value.err !== undefined) {
                    if (wasmRpcValue.value.err.kind == 'string') {
                        return new Error(wasmRpcValue.value.err.value);
                    } else {
                        throw new Error(`Expected error string, obtained value ${wasmRpcValue.value.err}`);
                    }
                } else {
                    throw new Error(`Expected error, obtained value ${wasmRpcValue}`);
                }
            } else {
                throw new Error(`Expected error, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.RegExp:
            if (wasmRpcValue.kind === 'string') {
                return new RegExp(wasmRpcValue.value);
            } else {
                throw new Error(`Expected RegExp, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Int8Array:
            if (wasmRpcValue.kind === 'list') {
                return new Int8Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int8Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Uint8Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint8Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint8Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Uint8ClampedArray:
            if (wasmRpcValue.kind === 'list') {
                return new Uint8ClampedArray(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint8ClampedArray, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Int16Array:
            if (wasmRpcValue.kind === 'list') {
                return new Int16Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int16Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Uint16Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint16Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint16Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Int32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Int32Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int32Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Uint32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint32Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint32Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Float32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Float32Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Float32Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Float64Array:
            if (wasmRpcValue.kind === 'list') {
                return new Float64Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Float64Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.BigInt64Array:
            if (wasmRpcValue.kind === 'list') {
                return new BigInt64Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.BigInt)));
            } else {
                throw new Error(`Expected BigInt64Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.BigUint64Array:
            if (wasmRpcValue.kind === 'list') {
                return new BigUint64Array(wasmRpcValue.value.map(v => convertToTsValue(v, Type.BigInt)));
            } else {
                throw new Error(`Expected BigUint64Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.ArrayBuffer:
            if (wasmRpcValue.kind === 'list') {
                const byteArray = wasmRpcValue.value.map(v => {
                    const convertedValue = convertToTsValue(v, Type.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new Uint8Array(byteArray).buffer;
            } else {
                throw new Error(`Expected ArrayBuffer, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.SharedArrayBuffer:
            if (wasmRpcValue.kind === 'list') {
                const byteArray = wasmRpcValue.value.map(v => {
                    const convertedValue = convertToTsValue(v, Type.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new Uint8Array(byteArray).buffer;
            } else {
                throw new Error(`Expected SharedArrayBuffer, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Atomics:
            break;
        case TypeKind.DataView:
            if (wasmRpcValue.kind === 'list') {
                const byteArray = wasmRpcValue.value.map(v => {
                    const convertedValue = convertToTsValue(v, Type.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new DataView(new Uint8Array(byteArray).buffer);
            } else {
                throw new Error(`Expected DataView, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.ArrayDefinition:
            break;
        case TypeKind.ReadonlyArrayDefinition:
            break;
        case TypeKind.TupleDefinition:
            break;
        case TypeKind.MapDefinition:
            break;
        case TypeKind.WeakMapDefinition:
            break;
        case TypeKind.SetDefinition:
            break;
        case TypeKind.WeakSetDefinition:
            break;
        case TypeKind.PromiseDefinition:
            break;
        case TypeKind.GeneratorDefinition:
            break;
        case TypeKind.AsyncGeneratorDefinition:
            break;
        case TypeKind.IteratorDefinition:
            break;
        case TypeKind.IterableDefinition:
            break;
        case TypeKind.IterableIteratorDefinition:
            break;
        case TypeKind.AsyncIteratorDefinition:
            break;
        case TypeKind.AsyncIterableDefinition:
            break;
        case TypeKind.AsyncIterableIteratorDefinition:
            break;
        case TypeKind.Module:
            break;
        case TypeKind.Namespace:
            break;
        case TypeKind.Object:
            break;
        case TypeKind.Interface:
            if (wasmRpcValue.kind === 'record') {
                const fieldValues = wasmRpcValue.value;
                const expectedTypeFields: ReadonlyArray<PropertyInfo> = (expectedType as InterfaceType).getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name: string = field.name.toString();
                    const expectedFieldType = field.type;
                    acc[name] = convertToTsValue(fieldValues[idx], expectedFieldType);
                    return acc;
                }, {} as Record<string, any>);
            } else {
                throw new Error(`Expected object, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Class:
            break;
        case TypeKind.Union:
            break;
        case TypeKind.Intersection:
            break;
        case TypeKind.ConditionalType:
            break;
        case TypeKind.IndexedAccess:
            break;
        case TypeKind.TypeParameter:
            break;
        case TypeKind.Alias:
            break;
        case TypeKind.Method:
            break;
        case TypeKind.Function:
            break;
        case TypeKind.GeneratorFunction:
            break;
        case TypeKind.NumberLiteral:
            break;
        case TypeKind.BigIntLiteral:
            break;
        case TypeKind.StringLiteral:
            if (wasmRpcValue.kind === 'string') {
                return wasmRpcValue.value;
            } else {
                throw new Error(`Unrecognized value for ${wasmRpcValue.kind}`);
            }
        case TypeKind.Promise:
            const innerType = (expectedType as PromiseType).getTypeArguments()[0];
            return convertToTsValue(wasmRpcValue, innerType);
        case TypeKind.TemplateLiteral:
            break;
        case TypeKind.EnumLiteral:
            break;
        case TypeKind.RegExpLiteral:
            break;
        case TypeKind.Enum:
            break;
        case TypeKind.UniqueSymbol:
            break;
        case TypeKind.ESSymbol:
            break;
        case TypeKind.Generator:
            break;
        case TypeKind.AsyncGenerator:
            break;
        case TypeKind.Iterator:
            break;
        case TypeKind.Iterable:
            break;
        case TypeKind.IterableIterator:
            break;
        case TypeKind.AsyncIterator:
            break;
        case TypeKind.AsyncIterable:
            break;
        case TypeKind.AsyncIterableIterator:
            break;
        case TypeKind.Jsx:
            break;
        case TypeKind.Type:
            const arg = expectedType.getTypeArguments?.()[0];
            if (!arg) {
                throw new Error("Type must have a type argument");
            }
            return convertToTsValue(wasmRpcValue, arg);

        case TypeKind.TypeCtor:
            break;

    }
}
