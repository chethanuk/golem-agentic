import {
    GenericType,
    InterfaceType,
    ObjectType,
    PromiseType,
    PropertyInfo,
    Type,
    TypeAliasType,
    TypeKind,
    UnionType
} from "rttist";
import {WitValue} from "golem:rpc/types@0.2.2";
import {constructValueFromWitValue, constructWitValueFromValue, Value} from "./value";

export function constructWitValueFromTsValue(tsValue: any, tsType: Type): WitValue {
    const value = constructValueFromTsValue(tsValue, tsType);
    return constructWitValueFromValue(value);
}

export function constructTsValueFromWitValue(witValue: WitValue, expectedType: Type): any {
    const value = constructValueFromWitValue(witValue);
    return constructTsValueFromValue(value, expectedType);
}

function constructValueFromTsValue(arg: any, type: Type): Value {
    switch (type.kind) {
        case TypeKind.Invalid:
            throw new Error(`Unimplemented type invalid: ${type.kind}`);
        case TypeKind.Unknown:
            return { kind: "tuple", value: [] };
        case TypeKind.Any:
            throw new Error(`Unimplemented type 3: ${type.kind}`);

        case TypeKind.Never:
            throw new Error(`Unimplemented type 4: ${type.kind}`);

        case TypeKind.Void:
            return { kind: "tuple", value: [] };

        case TypeKind.Undefined:
            return { kind: "tuple", value: [] };

        case TypeKind.Null:
            return { kind: "tuple", value: [] };

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
            return { kind: "s32", value: arg };

        case TypeKind.BigInt:
            return { kind: "u64", value: arg };

        case TypeKind.String:
            return { kind: "string", value: arg };

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
                        if (prop.optional) {
                            values.push({ kind: "option"});
                        } else {
                            throw new Error(`Missing property '${key}' in value`);
                        }
                    } else {
                        const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                        values.push(fieldVal);
                    }
                }

                return { kind: "record", value: values };
            } else {
                throw new Error(`Expected object, got ${arg} which is ${typeof arg}`);
            }

        case TypeKind.Class:
            throw new Error(`Unimplemented type 36: ${type.kind}`);

        // This should return a variant
        case TypeKind.Union:
            const unionType = type as UnionType;
            const lowered = (typeof arg).toLowerCase();
            const idx = unionType.types.findIndex((x) => x.name.toLowerCase() == lowered);
            const innerType = unionType.types[idx];
            if (idx < 0) {
                throw new Error(`No matching type found for ${lowered} in union type`);
            }

            return {kind: "variant", caseIdx: idx,  caseValue: constructValueFromTsValue(arg, innerType) }

        case TypeKind.Intersection:
            throw new Error(`Unimplemented type 38: ${type.kind}`);

        case TypeKind.ConditionalType:
            throw new Error(`Unimplemented type 39: ${type.kind}`);

        case TypeKind.IndexedAccess:
            throw new Error(`Unimplemented type 40: ${type.kind}`);

        case TypeKind.TypeParameter:
            throw new Error(`Unimplemented type 41: ${type.kind}`);

        case TypeKind.Alias:
            const aliasType = type as TypeAliasType;
            const targetType = aliasType.target;
            return constructValueFromTsValue(arg, targetType);

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
            if (type.isArray()) {
                const typeArg = type.getTypeArguments?.()[0];
                return { kind: "list", value: arg.map((item: any) => constructValueFromTsValue(item, typeArg)) };
            } else if (type.isTuple()) {
                const typeArg = type.getTypeArguments?.();
                return { kind: "tuple", value: arg.map((item: any, idx: number) => constructValueFromTsValue(item, typeArg[idx])) };
            } else if (type.isGenericType()) {
                const genericType: GenericType<typeof type> = (type as GenericType<typeof type>);
                const genericTypeDefinition = genericType.genericTypeDefinition;
                if (genericTypeDefinition.name == 'Map') {
                    const typeArgs = type.getTypeArguments?.();

                    if (!typeArgs || typeArgs.length !== 2) {
                        throw new Error("Map must have two type arguments");
                    }

                    const result: Value[] =  Array.from(arg.entries()).map((keyValue: any) => {
                       return  {kind : "tuple", value: [constructValueFromTsValue(keyValue[0], typeArgs[0]), constructValueFromTsValue(keyValue[1], typeArgs[1])] };
                    })

                    return {kind: "list", value: result}
                } else {
                    throw new Error("Type must have a type argument");
                }
            }

            else {
                const typeArg = type.getTypeArguments()[0];
                return constructValueFromTsValue(arg, typeArg);
            }

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
                        if (prop.type.isString()) {
                            if (arg == "") {
                                values.push({kind: "string", value: ""});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.type.isNumber()) {
                            if (arg == 0) {
                                values.push({kind: "s32", value: 0});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.type.isBoolean()) {
                            if (arg == false) {
                                values.push({kind: "bool", value: false});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.optional) {
                            values.push({ kind: "option" });
                        } else {
                            throw new Error(`Missing property '${key}' in value`);
                        }
                    } else {
                        const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                        values.push(fieldVal);
                    }
                }

                return { kind: "record", value: values };
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
                return { kind: "list", value: arg.map(item => ({ kind: "s64", value: item })) };
            } else {
                throw new Error(`Expected BigInt64Array, got ${typeof arg}`);
            }
        case TypeKind.BigUint64Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "bigint")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u64", value: item })) };
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
                        if (prop.type.isString()) {
                            if (arg == "") {
                                values.push({kind: "string", value: ""});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.type.isNumber()) {
                            if (arg == 0) {
                                values.push({kind: "s32", value: 0});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.type.isBoolean()) {
                            if (arg == false) {
                                values.push({kind: "bool", value: false});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.optional) {
                            values.push({ kind: "option" });
                        } else {
                            throw new Error(`Missing property '${key}' in value`);
                        }
                    } else {
                        const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                        values.push(fieldVal);
                    }
                }

                return { kind: "record", value: values };
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

function constructTsValueFromValue(value: Value, expectedType: Type): any {
    if (value == undefined) {
        return null
    }

    // There is no option type in type-script, so take analysed type along with expected type.
    if (value.kind == 'option') {
        if (!value.value) {
            return null
        } else {
            return constructValueFromTsValue(value.value, expectedType)
        }
    }

    switch (expectedType.kind)  {
        case TypeKind.Invalid:
            throw new Error(`Expected type '${expectedType.kind}'`);
        case TypeKind.Unknown:
            return null;
        case TypeKind.Any:
            throw new Error(`'${expectedType.kind}' not supported`);
        case TypeKind.Never:
            throw new Error(`'${expectedType.kind}' not supported`);
        case TypeKind.Void:
            return undefined;
        case TypeKind.Undefined:
            return undefined;
        case TypeKind.Null:
            return null;

        case TypeKind.Intrinsic:
            break;
        case TypeKind.Boolean:
            if (value.kind === 'bool') {
                return value.value;
            } else {
                throw new Error(`Expected boolean, obtained value ${value}`);
            }
        case TypeKind.False:
            if (value.kind === 'bool') {
                return value.value
            } else {
                throw new Error(`Expected boolean, obtained value ${value}`);
            }
        case TypeKind.True:
            if (value.kind === 'bool') {
                return value.value;
            } else {
                throw new Error(`Expected boolean, obtained value ${value}`);
            }
        case TypeKind.Number:
            if (value.kind === 'f64' ||
                value.kind === 'u8' ||
                value.kind === 'u16' ||
                value.kind === 'u32' ||
                value.kind === 'u64' ||
                value.kind === 's8' ||
                value.kind === 's16' ||
                value.kind === 's32' ||
                value.kind === 's64'
            ) {
                return value.value;
            }  else {
                throw new Error(`Expected number, obtained value ${value}`);
            }
        case TypeKind.BigInt:
            if (value.kind == 'u64') {
                return value.value
            } else {
                throw new Error(`Expected bigint, obtained value ${value}`);
            }
        case TypeKind.String:
            if (value.kind === 'string')  {
               return value.value
            } else {
                throw new Error(`Expected string, obtained value ${value}`);
            }
        case TypeKind.Symbol:
            throw new Error(`Unrecognized type for ${value.kind}`);
        case TypeKind.NonPrimitiveObject:
            if (value.kind == 'record') {
                const fieldValues = value.value;
                const expectedTypeFields: ReadonlyArray<PropertyInfo> = (expectedType as ObjectType).getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name: string = field.name.toString();
                    const expectedFieldType = field.type;
                    acc[name] = constructTsValueFromValue(fieldValues[idx], expectedFieldType);
                    return acc;
                }, {} as Record<string, any>);
            } else {
                throw new Error(`Expected object, obtained value ${value}`);
            }
        case TypeKind.ObjectType:
            if (value.kind === 'record') {
                const fieldValues = value.value;
                const expectedTypeFields: ReadonlyArray<PropertyInfo> = (expectedType as ObjectType).getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name: string = field.name.toString();
                    const expectedFieldType = field.type;
                    acc[name] = constructTsValueFromValue(fieldValues[idx], expectedFieldType);
                    return acc;
                }, {} as Record<string, any>);
            } else {
                throw new Error(`Expected object, obtained value ${value}`);
            }
        case TypeKind.FunctionType:
            throw new Error(`Unrecognized type for ${value.kind}`);
        case TypeKind.Date:
            if (value.kind === 'string') {
                return new Date(value.value);
            } else {
                throw new Error(`Expected date, obtained value ${value}`);
            }
        case TypeKind.Error:
            if (value.kind === 'result') {
                if (value.value.err !== undefined) {
                    if (value.value.err.kind == 'string') {
                        return new Error(value.value.err.value);
                    } else {
                        throw new Error(`Expected error string, obtained value ${value.value.err}`);
                    }
                } else {
                    throw new Error(`Expected error, obtained value ${value}`);
                }
            } else {
                throw new Error(`Expected error, obtained value ${value}`);
            }
        case TypeKind.RegExp:
            if (value.kind === 'string') {
                return new RegExp(value.value);
            } else {
                throw new Error(`Expected RegExp, obtained value ${value}`);
            }
        case TypeKind.Int8Array:
            if (value.kind === 'list') {
                return new Int8Array(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int8Array, obtained value ${value}`);
            }
        case TypeKind.Uint8Array:
            if (value.kind === 'list') {
                return new Uint8Array(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint8Array, obtained value ${value}`);
            }
        case TypeKind.Uint8ClampedArray:
            if (value.kind === 'list') {
                return new Uint8ClampedArray(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint8ClampedArray, obtained value ${value}`);
            }
        case TypeKind.Int16Array:
            if (value.kind === 'list') {
                return new Int16Array(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int16Array, obtained value ${value}`);
            }
        case TypeKind.Uint16Array:
            if (value.kind === 'list') {
                return new Uint16Array(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint16Array, obtained value ${value}`);
            }
        case TypeKind.Int32Array:
            if (value.kind === 'list') {
                return new Int32Array(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Int32Array, obtained value ${value}`);
            }
        case TypeKind.Uint32Array:
            if (value.kind === 'list') {
                return new Uint32Array(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Uint32Array, obtained value ${value}`);
            }
        case TypeKind.Float32Array:
            if (value.kind === 'list') {
                return new Float32Array(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Float32Array, obtained value ${value}`);
            }
        case TypeKind.Float64Array:
            if (value.kind === 'list') {
                return new Float64Array(value.value.map(v => constructTsValueFromValue(v, Type.Number)));
            } else {
                throw new Error(`Expected Float64Array, obtained value ${value}`);
            }
        case TypeKind.BigInt64Array:
            if (value.kind === 'list') {
                return new BigInt64Array(value.value.map(v => constructTsValueFromValue(v, Type.BigInt)));
            } else {
                throw new Error(`Expected BigInt64Array, obtained value ${value}`);
            }
        case TypeKind.BigUint64Array:
            if (value.kind === 'list') {
                return new BigUint64Array(value.value.map(v => constructTsValueFromValue(v, Type.BigInt)));
            } else {
                throw new Error(`Expected BigUint64Array, obtained value ${value}`);
            }
        case TypeKind.ArrayBuffer:
            if (value.kind === 'list') {
                const byteArray = value.value.map(v => {
                    const convertedValue = constructTsValueFromValue(v, Type.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new Uint8Array(byteArray).buffer;
            } else {
                throw new Error(`Expected ArrayBuffer, obtained value ${value}`);
            }
        case TypeKind.SharedArrayBuffer:
            if (value.kind === 'list') {
                const byteArray = value.value.map(v => {
                    const convertedValue = constructTsValueFromValue(v, Type.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new Uint8Array(byteArray).buffer;
            } else {
                throw new Error(`Expected SharedArrayBuffer, obtained value ${value}`);
            }
        case TypeKind.Atomics:
            break;
        case TypeKind.DataView:
            if (value.kind === 'list') {
                const byteArray = value.value.map(v => {
                    const convertedValue = constructTsValueFromValue(v, Type.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new DataView(new Uint8Array(byteArray).buffer);
            } else {
                throw new Error(`Expected DataView, obtained value ${value}`);
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
            if (value.kind === 'record') {
                const fieldValues = value.value;
                const expectedTypeFields: ReadonlyArray<PropertyInfo> = (expectedType as ObjectType).getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name: string = field.name.toString();
                    const expectedFieldType = field.type;
                    const tsValue = constructTsValueFromValue(fieldValues[idx], expectedFieldType)
                    if (field.optional && (tsValue === undefined || tsValue === null)) {
                        return acc
                    } else {
                        acc[name] = tsValue;
                        return acc;
                    }
                }, {} as Record<string, any>);
            } else {
                throw new Error(`Expected object, obtained value ${value}`);
            }
        case TypeKind.Interface:
            if (value.kind === 'record') {
                const fieldValues = value.value;
                const expectedTypeFields: ReadonlyArray<PropertyInfo> = (expectedType as InterfaceType).getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name: string = field.name.toString();
                    const expectedFieldType = field.type;
                    const tsValue = constructTsValueFromValue(fieldValues[idx], expectedFieldType)
                    if (field.optional && (tsValue === undefined || tsValue === null)) {
                       return acc
                    } else {
                        acc[name] = tsValue;
                        return acc;
                    }
                }, {} as Record<string, any>);
            } else {
                throw new Error(`Expected object, obtained value ${value}`);
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
            const aliasType = expectedType as TypeAliasType;
            const targetType = aliasType.target;
            return constructTsValueFromValue(value, targetType);
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
            if (value.kind === 'string') {
                return value.value;
            } else {
                throw new Error(`Unrecognized value for ${value.kind}`);
            }
        case TypeKind.Promise:
            const innerType = (expectedType as PromiseType).getTypeArguments()[0];
            return constructTsValueFromValue(value, innerType);
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
            if (expectedType.isArray()) {
                if (value.kind == "list") {
                    return value.value.map((item: Value) => constructTsValueFromValue(item, expectedType.getTypeArguments?.()[0]));
                } else {
                    throw new Error(`Expected array, obtained value ${value}`);
                }
            } else if (expectedType.isTuple()) {
                const typeArg = expectedType.getTypeArguments?.();
                if (value.kind == "tuple") {
                    return value.value.map((item: Value, idx: number) => constructTsValueFromValue(item, typeArg[idx]));
                } else {
                    throw new Error(`Expected tuple, obtained value ${value}`);
                }
            } else if (expectedType.isGenericType()) {
                const genericType: GenericType<typeof expectedType> = (expectedType as GenericType<typeof expectedType>);
                const genericTypeDefinition = genericType.genericTypeDefinition;
                if (genericTypeDefinition.name == 'Map') {
                    const typeArgs = expectedType.getTypeArguments?.();

                    if (!typeArgs || typeArgs.length !== 2) {
                        throw new Error("Map must have two type arguments");
                    }

                    if (value.kind == 'list') {
                        const entries = value.value.flatMap((item: Value) => {
                            if (item.kind !== 'tuple' || item.value.length !== 2) {
                                throw new Error(`Expected tuple of two items, obtained value ${item}`);
                            }
                            return [
                                constructTsValueFromValue(item.value[0], typeArgs[0]),
                                constructTsValueFromValue(item.value[1], typeArgs[1])
                            ];
                        });
                        return new Map(entries);
                    } else {
                        throw new Error(`Expected Map, obtained value ${value}`);
                    }
                } else {
                    throw new Error("Type must have a type argument");
                }
            }

            else {
                const arg = expectedType.getTypeArguments?.()[0];
                if (!arg) {
                    throw new Error("Type must have a type argument");
                }
                return constructTsValueFromValue(value, arg);
            }

        case TypeKind.TypeCtor:
            break;

    }
}

