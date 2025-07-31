import {InterfaceType, ObjectType, PromiseType, PropertyInfo, Type, TypeKind} from "rttist";
import {WitValue} from "golem:rpc/types@0.2.1";
import {WitNode} from "golem:rpc/types@0.2.1";

export function constructWitValueFromTsValue(tsValue: any, tsType: Type): WitValue {
    const value = constructValueFromTsValue(tsValue, tsType);
    return constructWitValueFromValue(value);
}

export function constructTsValueFromWitValue(witValue: WitValue, expectedType: Type): any {
    const wasmRpcValue = constructValueFromWitValue(witValue);
    return tsValueFromValue(wasmRpcValue, expectedType);
}

function constructValueFromTsValue(arg: any, type: Type): Value {
    switch (type.kind) {
        case TypeKind.Invalid:
            throw new Error(`Unimplemented type invalid: ${type.kind}`);
        case TypeKind.Unknown:
            throw new Error(`Unimplemented type unknwn: ${type.kind}`);
        case TypeKind.Any:
            throw new Error(`Unimplemented type 3: ${type.kind}`);

        case TypeKind.Never:
            throw new Error(`Unimplemented type 4: ${type.kind}`);

        case TypeKind.Void:
            throw new Error(`Unimplemented type 5: ${type.kind}`);

        case TypeKind.Undefined:
            throw new Error(`Unimplemented type 6: ${type.kind}`);

        case TypeKind.Null:
            throw new Error(`Unimplemented type 7: ${type.kind}`);

        case TypeKind.Intrinsic:
            throw new Error(`Unimplemented type 8: ${type.kind}`);

        case TypeKind.Boolean:
            if (typeof arg === "boolean") {
                return { kind: "bool", value: arg };
            } else {
                throw new Error(`Expected boolean, got ${typeof arg}`);
            }
        case TypeKind.False:
            if (typeof arg === "boolean") {
                return { kind: "bool", value: arg };
            } else {
                throw new Error(`Expected boolean, got ${typeof arg}`);
            }
        case TypeKind.True:
            if (typeof arg === "boolean") {
                return { kind: "bool", value: arg };
            } else {
                throw new Error(`Expected boolean, got ${typeof arg}`);
            }
        case TypeKind.Number:
            if (typeof arg === "number") {
                return { kind: "f64", value: arg };
            } else {
                throw new Error(`Expected number, got ${typeof arg}`);
            }
        case TypeKind.BigInt:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.String:
            if (typeof arg === "string") {
                return { kind: "string", value: arg };
            } else {
                throw new Error(`Expected string, got ${typeof arg}`);
            }
        case TypeKind.Symbol:
            throw new Error(`Unimplemented type 9: ${type.kind}`);

        case TypeKind.NonPrimitiveObject:
            throw new Error(`Unimplemented type 10: ${type.kind}`);

        case TypeKind.FunctionType:
            throw new Error(`Unimplemented type 11: ${type.kind}`);

        case TypeKind.Date:
            throw new Error(`Unimplemented type 12: ${type.kind}`);

        case TypeKind.Error:
            throw new Error(`Unimplemented type 13: ${type.kind}`);

        case TypeKind.RegExp:
            throw new Error(`Unimplemented type 14: ${type.kind}`);

        case TypeKind.Int8Array:
            throw new Error(`Unimplemented type 15: ${type.kind}`);

        case TypeKind.ArrayBuffer:
            throw new Error(`Unimplemented type 16: ${type.kind}`);

        case TypeKind.SharedArrayBuffer:
            throw new Error(`Unimplemented type 17: ${type.kind}`);

        case TypeKind.Atomics:
            throw new Error(`Unimplemented type 18: ${type.kind}`);

        case TypeKind.DataView:
            throw new Error(`Unimplemented type 19: ${type.kind}`);

        case TypeKind.ArrayDefinition:
            throw new Error(`Unimplemented type 20: ${type.kind}`);

        case TypeKind.ReadonlyArrayDefinition:
            throw new Error(`Unimplemented type 21: ${type.kind}`);

        case TypeKind.TupleDefinition:
            throw new Error(`Unimplemented type 22: ${type.kind}`);

        case TypeKind.MapDefinition:
            throw new Error(`Unimplemented type 22: ${type.kind}`);

        case TypeKind.WeakMapDefinition:
            throw new Error(`Unimplemented type 23: ${type.kind}`);

        case TypeKind.SetDefinition:
            throw new Error(`Unimplemented type 24: ${type.kind}`);

        case TypeKind.WeakSetDefinition:
            throw new Error(`Unimplemented type 25: ${type.kind}`);

        case TypeKind.PromiseDefinition:
            const promiseDefType = type as PromiseType;
            const promiseDefArgType = promiseDefType.getTypeArguments()[0];
            return constructValueFromTsValue(arg, promiseDefArgType);

        case TypeKind.GeneratorDefinition:
            throw new Error(`Unimplemented type 26: ${type.kind}`);

        case TypeKind.AsyncGeneratorDefinition:
            throw new Error(`Unimplemented type 27: ${type.kind}`);

        case TypeKind.IteratorDefinition:
            throw new Error(`Unimplemented type 28: ${type.kind}`);

        case TypeKind.IterableDefinition:
            throw new Error(`Unimplemented type 29: ${type.kind}`);

        case TypeKind.IterableIteratorDefinition:
            throw new Error(`Unimplemented type 30: ${type.kind}`);

        case TypeKind.AsyncIteratorDefinition:
            throw new Error(`Unimplemented type 31: ${type.kind}`);

        case TypeKind.AsyncIterableDefinition:
            throw new Error(`Unimplemented type 32: ${type.kind}`);

        case TypeKind.AsyncIterableIteratorDefinition:
            throw new Error(`Unimplemented type 33: ${type.kind}`);

        case TypeKind.Module:
            throw new Error(`Unimplemented type 34: ${type.kind}`);

        case TypeKind.Namespace:
            throw new Error(`Unimplemented type 35: ${type.kind}`);

        case TypeKind.Interface:
            if (typeof arg === "object" && arg !== null) {
                const innerType = type as ObjectType;
                const innerProperties = innerType.getProperties();
                const values: Value[] = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(arg, key)) {
                        throw new Error(`Missing property '${key}' in value`);
                    }

                    const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                    values.push(fieldVal);
                }

                return { kind: "record", value: values };  // Wrap the values in an object type
            } else {
                throw new Error(`Expected object, got ${arg} which is ${typeof arg}`);
            }

        case TypeKind.Class:
            throw new Error(`Unimplemented type 36: ${type.kind}`);

        case TypeKind.Union:
            throw new Error(`Unimplemented type 37: ${type.kind}`);

        case TypeKind.Intersection:
            throw new Error(`Unimplemented type 38: ${type.kind}`);

        case TypeKind.ConditionalType:
            throw new Error(`Unimplemented type 39: ${type.kind}`);

        case TypeKind.IndexedAccess:
            throw new Error(`Unimplemented type 40: ${type.kind}`);

        case TypeKind.TypeParameter:
            throw new Error(`Unimplemented type 41: ${type.kind}`);

        case TypeKind.Alias:
            throw new Error(`Unimplemented type 42: ${type.kind}`);

        case TypeKind.Method:
            throw new Error(`Unimplemented type 43: ${type.kind}`);

        case TypeKind.Function:
            throw new Error(`Unimplemented type 44: ${type.kind}`);

        case TypeKind.GeneratorFunction:
            throw new Error(`Unimplemented type 45: ${type.kind}`);

        case TypeKind.NumberLiteral:
            throw new Error(`Unimplemented type 46: ${type.kind}`);

        case TypeKind.BigIntLiteral:
            throw new Error(`Unimplemented type 47: ${type.kind}`);

        case TypeKind.TemplateLiteral:
            throw new Error(`Unimplemented type 48: ${type.kind}`);

        case TypeKind.EnumLiteral:
            throw new Error(`Unimplemented type 49: ${type.kind}`);

        case TypeKind.RegExpLiteral:
            throw new Error(`Unimplemented type 50: ${type.kind}`);

        case TypeKind.Enum:
            throw new Error(`Unimplemented type 51: ${type.kind}`);

        case TypeKind.UniqueSymbol:
            throw new Error(`Unimplemented type 52: ${type.kind}`);

        case TypeKind.ESSymbol:
            throw new Error(`Unimplemented type 53: ${type.kind}`);

        case TypeKind.Promise:
            const promiseType = type as PromiseType;
            const argument = promiseType.getTypeArguments()[0];
            return constructValueFromTsValue(arg, argument)

        case TypeKind.Generator:
            throw new Error(`Unimplemented type 54: ${type.kind}`);

        case TypeKind.AsyncGenerator:
            throw new Error(`Unimplemented type 55: ${type.kind}`);

        case TypeKind.Iterator:
            throw new Error(`Unimplemented type 56: ${type.kind}`);

        case TypeKind.Iterable:
            throw new Error(`Unimplemented type 57: ${type.kind}`);

        case TypeKind.IterableIterator:
            throw new Error(`Unimplemented type 58: ${type.kind}`);

        case TypeKind.AsyncIterator:
            throw new Error(`Unimplemented type 59: ${type.kind}`);

        case TypeKind.AsyncIterable:
            throw new Error(`Unimplemented type 60: ${type.kind}`);

        case TypeKind.AsyncIterableIterator:
            throw new Error(`Unimplemented type 61: ${type.kind}`);

        case TypeKind.Jsx:
            throw new Error(`Unimplemented type 62: ${type.kind}`);

        case TypeKind.Type:
            const typeArg = type.getTypeArguments()[0];
            return constructValueFromTsValue(arg, typeArg);

        case TypeKind.TypeCtor:
            throw new Error(`Unimplemented type 63: ${type.kind}`);

        // Difference between Object and ObjectType to be determine
        case TypeKind.ObjectType:
            if (typeof arg === "object" && arg !== null) {
                const innerType = type as ObjectType;
                const innerProperties = innerType.getProperties();
                const values: Value[] = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(arg, key)) {
                        throw new Error(`Missing property '${key}' in value`);
                    }

                    const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                    values.push(fieldVal);
                }

                return { kind: "record", value: values };  // Wrap the values in an object type
            } else {
                throw new Error(`Expected object, got ${typeof arg}`);
            }
        case TypeKind.Uint8Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u8", value: item })) };
            } else {
                throw new Error(`Expected Uint8Array, got ${typeof arg}`);
            }
        case TypeKind.Uint8ClampedArray:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u8", value: item })) };
            } else {
                throw new Error(`Expected Uint8ClampedArray, got ${typeof arg}`);
            }
        case TypeKind.Int16Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "s16", value: item })) };
            } else {
                throw new Error(`Expected Int16Array, got ${typeof arg}`);
            }
        case TypeKind.Uint16Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u16", value: item })) };
            } else {
                throw new Error(`Expected Uint16Array, got ${typeof arg}`);
            }
        case TypeKind.Int32Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "s32", value: item })) };
            } else {
                throw new Error(`Expected Int32Array, got ${typeof arg}`);
            }
        case TypeKind.Uint32Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u32", value: item })) };
            } else {
                throw new Error(`Expected Uint32Array, got ${typeof arg}`);
            }
        case TypeKind.Float32Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "f32", value: item })) };
            } else {
                throw new Error(`Expected Float32Array, got ${typeof arg}`);
            }
        case TypeKind.Float64Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "f64", value: item })) };
            } else {
                throw new Error(`Expected Float64Array, got ${typeof arg}`);
            }
        case TypeKind.BigInt64Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "bigint")) {
                return { kind: "list", value: arg.map(item => ({ kind: "s64", value: Number(item) })) };
            } else {
                throw new Error(`Expected BigInt64Array, got ${typeof arg}`);
            }
        case TypeKind.BigUint64Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "bigint")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u64", value: Number(item) })) };
            } else {
                throw new Error(`Expected BigUint64Array, got ${typeof arg}`);
            }
        case TypeKind.Object:
            if (typeof arg === "object" && arg !== null) {
                const innerType = type as ObjectType;
                const innerProperties = innerType.getProperties();
                const values: Value[] = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(arg, key)) {
                        throw new Error(`Missing property '${key}' in value`);
                    }

                    const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                    values.push(fieldVal);
                }

                return { kind: "record", value: values };  // Wrap the values in an object type
            } else {
                throw new Error(`Expected object, got ${typeof arg}`);
            }
        case TypeKind.StringLiteral:
            if (typeof arg === "string") {
                return { kind: "string", value: arg };
            } else {
                throw new Error(`Expected string literal, got ${typeof arg}`);
            }
    }
}

function tsValueFromValue(wasmRpcValue: Value, expectedType: Type): any {
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
                    acc[name] = tsValueFromValue(fieldValues[idx], expectedFieldType);
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
                    acc[name] = tsValueFromValue(fieldValues[idx], expectedFieldType);
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
                return new Int8Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int8Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Uint8Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint8Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint8Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Uint8ClampedArray:
            if (wasmRpcValue.kind === 'list') {
                return new Uint8ClampedArray(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint8ClampedArray, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Int16Array:
            if (wasmRpcValue.kind === 'list') {
                return new Int16Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int16Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Uint16Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint16Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint16Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Int32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Int32Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int32Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Uint32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint32Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint32Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Float32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Float32Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Float32Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.Float64Array:
            if (wasmRpcValue.kind === 'list') {
                return new Float64Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Float64Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.BigInt64Array:
            if (wasmRpcValue.kind === 'list') {
                return new BigInt64Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.BigInt)));
            } else {
                throw new Error(`Expected BigInt64Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.BigUint64Array:
            if (wasmRpcValue.kind === 'list') {
                return new BigUint64Array(wasmRpcValue.value.map(v => tsValueFromValue(v, Type.BigInt)));
            } else {
                throw new Error(`Expected BigUint64Array, obtained value ${wasmRpcValue}`);
            }
        case TypeKind.ArrayBuffer:
            if (wasmRpcValue.kind === 'list') {
                const byteArray = wasmRpcValue.value.map(v => {
                    const convertedValue = tsValueFromValue(v, Type.Number);
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
                    const convertedValue = tsValueFromValue(v, Type.Number);
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
                    const convertedValue = tsValueFromValue(v, Type.Number);
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
                    acc[name] = tsValueFromValue(fieldValues[idx], expectedFieldType);
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
            return tsValueFromValue(wasmRpcValue, innerType);
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
            return tsValueFromValue(wasmRpcValue, arg);

        case TypeKind.TypeCtor:
            break;

    }
}

export type Value =
    | { kind: 'bool'; value: boolean }
    | { kind: 'u8'; value: number }
    | { kind: 'u16'; value: number }
    | { kind: 'u32'; value: number }
    | { kind: 'u64'; value: number }
    | { kind: 's8'; value: number }
    | { kind: 's16'; value: number }
    | { kind: 's32'; value: number }
    | { kind: 's64'; value: number }
    | { kind: 'f32'; value: number }
    | { kind: 'f64'; value: number }
    | { kind: 'char'; value: string }
    | { kind: 'string'; value: string }
    | { kind: 'list'; value: Value[] }
    | { kind: 'tuple'; value: Value[] }
    | { kind: 'record'; value: Value[] }
    | { kind: 'variant'; caseIdx: number; caseValue?: Value }
    | { kind: 'enum'; value: number }
    | { kind: 'flags'; value: boolean[] }
    | { kind: 'option'; value?: Value }
    | { kind: 'result'; value: { ok?: Value; err?: Value } }
    | { kind: 'handle'; uri: string; resourceId: number };


export function constructValueFromWitValue(wit: WitValue): Value {
    if (!wit.nodes.length) throw new Error("Empty nodes in WitValue");
    return buildTree(wit.nodes[0], wit.nodes);
}


function buildTree(node: WitNode, nodes: WitNode[]): Value {
    switch (node.tag) {
        case 'record-value':
            return {
                kind: 'record',
                value: node.val.map(i => buildTree(nodes[i], nodes)),
            };

        case 'variant-value': {
            const [caseIdx, maybeIndex] = node.val;
            return {
                kind: 'variant',
                caseIdx,
                caseValue: maybeIndex !== undefined ? buildTree(nodes[maybeIndex], nodes) : undefined,
            };
        }

        case 'enum-value':
            return { kind: 'enum', value: node.val };

        case 'flags-value':
            return { kind: 'flags', value: node.val };

        case 'tuple-value':
            return {
                kind: 'tuple',
                value: node.val.map(i => buildTree(nodes[i], nodes)),
            };

        case 'list-value':
            return {
                kind: 'list',
                value: node.val.map(i => buildTree(nodes[i], nodes)),
            };

        case 'option-value':
            return {
                kind: 'option',
                value: node.val !== undefined ? buildTree(nodes[node.val], nodes) : undefined,
            };

        case 'result-value': {
            const res: { tag: "ok"; val: number | undefined } | { tag: "err"; val: number | undefined } = node.val;

            if (res.tag === "ok") {
                return {
                    kind: "result",
                    value: {
                        ok: res.val !== undefined ? buildTree(nodes[res.val], nodes) : undefined,
                    },
                };
            } else {
                return {
                    kind: "result",
                    value: {
                        err: res.val !== undefined ? buildTree(nodes[res.val], nodes) : undefined,
                    },
                };
            }
        }

        case 'prim-u8': return { kind: 'u8', value: node.val };
        case 'prim-u16': return { kind: 'u16', value: node.val };
        case 'prim-u32': return { kind: 'u32', value: node.val };
        case 'prim-u64': return { kind: 'u64', value: node.val };
        case 'prim-s8': return { kind: 's8', value: node.val };
        case 'prim-s16': return { kind: 's16', value: node.val };
        case 'prim-s32': return { kind: 's32', value: node.val };
        case 'prim-s64': return { kind: 's64', value: node.val };
        case 'prim-float32': return { kind: 'f32', value: node.val };
        case 'prim-float64': return { kind: 'f64', value: node.val };
        case 'prim-char': return { kind: 'char', value: node.val };
        case 'prim-bool': return { kind: 'bool', value: node.val };
        case 'prim-string': return { kind: 'string', value: node.val };

        case 'handle': {
            const [uri, resourceId] = node.val;
            return {
                kind: 'handle',
                uri: uri.value,
                resourceId,
            };
        }

        default:
            throw new Error(`Unhandled tag: ${(node as any).tag}`);
    }
}


export function constructWitValueFromValue(value: Value): WitValue {
    const nodes: WitNode[] = [];
    buildNodes(value, nodes);
    return { nodes: nodes };
}


function buildNodes(value: Value, nodes: WitNode[]): number {
    const push = (node: WitNode): number => {
        nodes.push(node);
        return nodes.length - 1;
    };

    switch (value.kind) {
        case 'record':
            const recordIndices = value.value.map(v => buildNodes(v, nodes));
            return push({ tag: 'record-value', val: recordIndices });

        case 'variant':
            return push({ tag: 'variant-value', val: value.caseValue !== undefined
                    ? [value.caseIdx, buildNodes(value.caseValue, nodes)]
                    : [value.caseIdx, undefined] });

        case 'enum':
            return push({ tag: 'enum-value', val: value.value });

        case 'flags':
            return push({ tag: 'flags-value', val: value.value });

        case 'tuple':
            const tupleIndices = value.value.map(v => buildNodes(v, nodes));
            return push({ tag: 'tuple-value', val: tupleIndices });

        case 'list':
            const listIndices = value.value.map(v => buildNodes(v, nodes));
            return push({ tag: 'list-value', val: listIndices });

        case 'option':
            return push({
                tag: 'option-value',
                val: value.value !== undefined ? buildNodes(value.value, nodes) : undefined
            });

        case 'result':
            if ('ok' in value.value) {
                return push({
                    tag: 'result-value',
                    val: {
                        tag: 'ok',
                        val: value.value.ok !== undefined
                            ? buildNodes(value.value.ok, nodes)
                            : undefined
                    }
                });
            } else {
                return push({
                    tag: 'result-value',
                    val: {
                        tag: 'err',
                        val: value.value.err !== undefined
                            ? buildNodes(value.value.err, nodes)
                            : undefined
                    }
                });
            }

        case 'u8': return push({ tag: 'prim-u8', val: value.value });
        case 'u16': return push({ tag: 'prim-u16', val: value.value });
        case 'u32': return push({ tag: 'prim-u32', val: value.value });
        case 'u64': return push({ tag: 'prim-u64', val: value.value });
        case 's8': return push({ tag: 'prim-s8', val: value.value });
        case 's16': return push({ tag: 'prim-s16', val: value.value });
        case 's32': return push({ tag: 'prim-s32', val: value.value });
        case 's64': return push({ tag: 'prim-s64', val: value.value });
        case 'f32': return push({ tag: 'prim-float32', val: value.value });
        case 'f64': return push({ tag: 'prim-float64', val: value.value });
        case 'char': return push({ tag: 'prim-char', val: value.value });
        case 'bool': return push({ tag: 'prim-bool', val: value.value });
        case 'string': return push({ tag: 'prim-string', val: value.value });

        case 'handle':
            return push({
                tag: 'handle',
                val: [{ value: value.uri }, value.resourceId]
            });

        default:
            throw new Error(`Unhandled kind: ${(value as any).kind}`);
    }
}
