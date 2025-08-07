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

function constructValueFromTsValue(tsValue: any, type: Type): Value {
    switch (type.kind) {
        case TypeKind.Null:
            return { kind: "tuple", value: [] };

        case TypeKind.Intrinsic:
            throw new Error(`Unimplemented type 8: ${type.kind}`);

        case TypeKind.Boolean:
            if (typeof tsValue === "boolean") {
                return { kind: "bool", value: tsValue };
            } else {
                throw new Error(`Expected boolean, got ${typeof tsValue}`);
            }
        case TypeKind.False:
            if (typeof tsValue === "boolean") {
                return { kind: "bool", value: tsValue };
            } else {
                throw new Error(`Expected boolean, got ${typeof tsValue}`);
            }
        case TypeKind.True:
            if (typeof tsValue === "boolean") {
                return { kind: "bool", value: tsValue };
            } else {
                throw new Error(`Expected boolean, got ${typeof tsValue}`);
            }
        case TypeKind.Number:
            return { kind: "s32", value: tsValue };

        case TypeKind.BigInt:
            return { kind: "u64", value: tsValue };

        case TypeKind.String:
            return { kind: "string", value: tsValue };

        case TypeKind.PromiseDefinition:
            const promiseDefType = type as PromiseType;
            const promiseDefArgType = promiseDefType.getTypeArguments()[0];
            return constructValueFromTsValue(tsValue, promiseDefArgType);

        case TypeKind.Interface:
            if (typeof tsValue === "object" && tsValue !== null) {
                const innerType = type as ObjectType;
                const innerProperties = innerType.getProperties();
                const values: Value[] = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(tsValue, key)) {
                        if (prop.optional) {
                            values.push({ kind: "option"});
                        } else {
                            throw new Error(`Missing property '${key}' in value`);
                        }
                    } else {
                        const fieldVal = constructValueFromTsValue(tsValue[key], prop.type);
                        values.push(fieldVal);
                    }
                }

                return { kind: "record", value: values };
            } else {
                throw new Error(`Expected object, got ${tsValue} which is ${typeof tsValue}`);
            }

        case TypeKind.Class:
            throw new Error(`Unimplemented type 36: ${type.kind}`);

        case TypeKind.Union: {
            // When it comes to TS, a value for a union type is simply a non complex value.
            // function processUnion(x: string | number | boolean) { }
            // and x can be 1 or "1" or true.
            // to convert it to wit-value, the only choice is to match against all possible types
            const unionType = type as UnionType;
            const possibleTypes = unionType.types;
            const typeWithIndex = findTypeOfAny(tsValue, possibleTypes);

            if (!typeWithIndex) {
                throw new Error(`No matching type found for ${tsValue} in union type`);
            } else {
                const innerType = typeWithIndex[0];
                const result = constructValueFromTsValue(tsValue, innerType);
                return {kind: "variant", caseIdx: typeWithIndex![1], caseValue: result}
            }
        }

        case TypeKind.Alias:
            const aliasType = type as TypeAliasType;
            const targetType = aliasType.target;
            return constructValueFromTsValue(tsValue, targetType);

        case TypeKind.Promise:
            const promiseType = type as PromiseType;
            const argument = promiseType.getTypeArguments()[0];
            return constructValueFromTsValue(tsValue, argument)

        case TypeKind.Type:
            if (type.isArray()) {
                const typeArg = type.getTypeArguments?.()[0];
                return { kind: "list", value: tsValue.map((item: any) => constructValueFromTsValue(item, typeArg)) };
            } else if (type.isTuple()) {
                const typeArg = type.getTypeArguments?.();
                return { kind: "tuple", value: tsValue.map((item: any, idx: number) => constructValueFromTsValue(item, typeArg[idx])) };
            } else if (type.isGenericType()) {
                const genericType: GenericType<typeof type> = (type as GenericType<typeof type>);
                const genericTypeDefinition = genericType.genericTypeDefinition;
                if (genericTypeDefinition.name == 'Map') {
                    const typeArgs = type.getTypeArguments?.();

                    if (!typeArgs || typeArgs.length !== 2) {
                        throw new Error("Map must have two type arguments");
                    }

                    const result: Value[] =  Array.from(tsValue.entries()).map((keyValue: any) => {
                       return  {kind : "tuple", value: [constructValueFromTsValue(keyValue[0], typeArgs[0]), constructValueFromTsValue(keyValue[1], typeArgs[1])] };
                    })

                    return {kind: "list", value: result}
                } else {
                    throw new Error("Type must have a type argument");
                }
            }

            else {
                const typeArg = type.getTypeArguments()[0];
                return constructValueFromTsValue(tsValue, typeArg);
            }

        // Difference between Object and ObjectType to be determine
        case TypeKind.ObjectType:
            if (typeof tsValue === "object" && tsValue !== null) {
                const innerType = type as ObjectType;
                const innerProperties = innerType.getProperties();
                const values: Value[] = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(tsValue, key)) {
                        if (prop.type.isString()) {
                            if (tsValue == "") {
                                values.push({kind: "string", value: ""});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.type.isNumber()) {
                            if (tsValue == 0) {
                                values.push({kind: "s32", value: 0});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.type.isBoolean()) {
                            if (tsValue == false) {
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
                        const fieldVal = constructValueFromTsValue(tsValue[key], prop.type);
                        values.push(fieldVal);
                    }
                }

                return { kind: "record", value: values };
            } else {
                throw new Error(`Expected object, got ${typeof tsValue}`);
            }
        case TypeKind.Uint8Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "number")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "u8", value: item })) };
            } else {
                throw new Error(`Expected Uint8Array, got ${typeof tsValue}`);
            }
        case TypeKind.Uint8ClampedArray:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "number")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "u8", value: item })) };
            } else {
                throw new Error(`Expected Uint8ClampedArray, got ${typeof tsValue}`);
            }
        case TypeKind.Int16Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "number")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "s16", value: item })) };
            } else {
                throw new Error(`Expected Int16Array, got ${typeof tsValue}`);
            }
        case TypeKind.Uint16Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "number")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "u16", value: item })) };
            } else {
                throw new Error(`Expected Uint16Array, got ${typeof tsValue}`);
            }
        case TypeKind.Int32Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "number")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "s32", value: item })) };
            } else {
                throw new Error(`Expected Int32Array, got ${typeof tsValue}`);
            }
        case TypeKind.Uint32Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "number")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "u32", value: item })) };
            } else {
                throw new Error(`Expected Uint32Array, got ${typeof tsValue}`);
            }
        case TypeKind.Float32Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "number")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "f32", value: item })) };
            } else {
                throw new Error(`Expected Float32Array, got ${typeof tsValue}`);
            }
        case TypeKind.Float64Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "number")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "f64", value: item })) };
            } else {
                throw new Error(`Expected Float64Array, got ${typeof tsValue}`);
            }
        case TypeKind.BigInt64Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "bigint")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "s64", value: item })) };
            } else {
                throw new Error(`Expected BigInt64Array, got ${typeof tsValue}`);
            }
        case TypeKind.BigUint64Array:
            if (Array.isArray(tsValue) && tsValue.every(item => typeof item === "bigint")) {
                return { kind: "list", value: tsValue.map(item => ({ kind: "u64", value: item })) };
            } else {
                throw new Error(`Expected BigUint64Array, got ${typeof tsValue}`);
            }
        case TypeKind.Object:
            if (typeof tsValue === "object" && tsValue !== null) {
                const innerType = type as ObjectType;
                const innerProperties = innerType.getProperties();
                const values: Value[] = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(tsValue, key)) {
                        if (prop.type.isString()) {
                            if (tsValue == "") {
                                values.push({kind: "string", value: ""});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.type.isNumber()) {
                            if (tsValue == 0) {
                                values.push({kind: "s32", value: 0});
                            } else {
                                throw new Error(`Missing property '${key}' in value`);
                            }
                        } else if (prop.type.isBoolean()) {
                            if (tsValue == false) {
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
                        const fieldVal = constructValueFromTsValue(tsValue[key], prop.type);
                        values.push(fieldVal);
                    }
                }

                return { kind: "record", value: values };
            } else {
                throw new Error(`Expected object, got ${typeof tsValue}`);
            }
        case TypeKind.StringLiteral:
            if (typeof tsValue === "string") {
                return { kind: "string", value: tsValue };
            } else {
                throw new Error(`Expected string literal, got ${typeof tsValue}`);
            }
        default:
            throw new Error(`The following type is not supported in Golem in the context of agents: ${type.displayName}`);
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
        case TypeKind.Union:
            if (value.kind === 'variant') {
                const caseValue = value.caseValue;
                if (!caseValue) {
                    throw new Error(`Expected value, obtained value ${value}`);
                }

                const unionTypes = (expectedType as UnionType).types;
                const matchingType = unionTypes[value.caseIdx];

                return constructTsValueFromValue(caseValue, matchingType)
            } else {
                throw new Error(`Expected union, obtained value ${value}`);
            }
        case TypeKind.Alias:
            const aliasType = expectedType as TypeAliasType;
            const targetType = aliasType.target;
            return constructTsValueFromValue(value, targetType);
        case TypeKind.StringLiteral:
            if (value.kind === 'string') {
                return value.value;
            } else {
                throw new Error(`Unrecognized value for ${value.kind}`);
            }
        case TypeKind.Promise:
            const innerType = (expectedType as PromiseType).getTypeArguments()[0];
            return constructTsValueFromValue(value, innerType);
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

        default:
            throw new Error(`'${expectedType.displayName} with kind ${expectedType.kind} not supported'`);

    }
}

function findTypeOfAny(value: any, typeList: readonly Type[]): [Type, number] | undefined {
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

        case TypeKind.Null:
            return value === null;

        case TypeKind.Undefined:
            return value === undefined;

        case TypeKind.ArrayBuffer:
            const elementType = type.getTypeArguments?.()[0];
            return Array.isArray(value) &&
                value.every((item) => matchesType(item, elementType));

        case TypeKind.TupleDefinition:
            const tupleTypes = type.getTypeArguments();

            return Array.isArray(value) && value.length === tupleTypes.length &&
                value.every((v, idx) => matchesType(v, tupleTypes[idx]));

        case TypeKind.Object:
            if (typeof value !== 'object' || value === null) return false;

            let allValid = true;

            for (const prop of (type as ObjectType).getProperties() ?? []) {
                const propExists = (prop.name.toString() in value)
                if (!propExists) {
                    if (!prop.optional)  {
                        allValid = false;
                        break;
                    }
                } else {
                    if (!matchesType(value[prop.name.toString()], prop.type)) {
                        allValid = false;
                        break;
                    }
                }
            }

            return allValid;

        case TypeKind.Union:
            throw new Error("union of union not yet supported");

        case TypeKind.Any:
            return true;

        default:
            return false;
    }
}
