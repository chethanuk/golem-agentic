import {Metadata} from "./type_metadata";
import {ClassType, ObjectType, Type, TypeKind} from "rttist";
import {Value, witValueFromValue} from "./value";
import {WitValue} from "golem:rpc/types@0.2.1";

export function getLocalClient<T extends new (...args: any[]) => any>(ctor: T) {
    return (...args: any[]) => {
        const instance = new ctor(...args);
        return new Proxy(instance, {
            get(target, prop) {
                const val = target[prop];
                if (typeof val === "function") {
                    return (...fnArgs: any[]) => {
                        console.log(`[Local] ${ctor.name}.${String(prop)}(${fnArgs})`);
                        return val.apply(target, fnArgs);
                    };
                }
                return val;
            }
        });

    }
}

export function getRemoteClient<T extends new (...args: any[]) => any>(ctor: T) {
    return (...args: any[]) => {
        const instance = new ctor(...args);
        const metadata = Metadata.getTypes().filter(
            (type) => type.isClass() && type.name === ctor.name
        )[0];

        return new Proxy(instance, {
            get(target, prop) {
                const val = target[prop];
                if (typeof val === "function") {
                    const paramInfo =
                        (metadata as ClassType).getMethod(prop)?.getSignatures()[0].getParameters()!;
                    return (...fnArgs: any[]) => {
                        const witValues = fnArgs.map((fnArg, index) => {
                            const typ = paramInfo[index].type;
                            return witValueFromFunctionArg(fnArg, typ);
                        })
                        console.log(`[Remote] ${ctor.name}.${String(prop)}(${fnArgs})`);
                        return Promise.resolve(`<<remote call with args ${JSON.stringify(witValues)}>>`);
                    };
                }
                return val;
            }
        });
    };
}

function witValueFromFunctionArg(arg: any, type: Type): WitValue {
    return witValueFromValue(valueFromFunctionArg(arg, type));
}

function valueFromFunctionArg(arg: any, type: Type): Value {
    switch (type.kind) {
        case TypeKind.Invalid:
            throw new Error(`Unimplemented type: ${type.kind}`);
        case TypeKind.Unknown:
            throw new Error(`Unimplemented type: ${type.kind}`);
        case TypeKind.Any:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Never:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Void:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Undefined:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Null:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Intrinsic:
            throw new Error(`Unimplemented type: ${type.kind}`);

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
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.NonPrimitiveObject:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.FunctionType:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Date:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Error:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.RegExp:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Int8Array:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.ArrayBuffer:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.SharedArrayBuffer:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Atomics:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.DataView:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.ArrayDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.ReadonlyArrayDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.TupleDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.MapDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.WeakMapDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.SetDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.WeakSetDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.PromiseDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.GeneratorDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.AsyncGeneratorDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.IteratorDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.IterableDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.IterableIteratorDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.AsyncIteratorDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.AsyncIterableDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.AsyncIterableIteratorDefinition:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Module:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Namespace:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Interface:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Class:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Union:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Intersection:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.ConditionalType:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.IndexedAccess:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.TypeParameter:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Alias:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Method:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Function:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.GeneratorFunction:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.NumberLiteral:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.BigIntLiteral:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.TemplateLiteral:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.EnumLiteral:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.RegExpLiteral:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Enum:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.UniqueSymbol:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.ESSymbol:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Promise:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Generator:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.AsyncGenerator:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Iterator:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Iterable:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.IterableIterator:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.AsyncIterator:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.AsyncIterable:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.AsyncIterableIterator:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Jsx:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.Type:
            throw new Error(`Unimplemented type: ${type.kind}`);

        case TypeKind.TypeCtor:
            throw new Error(`Unimplemented type: ${type.kind}`);

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

                    const fieldVal = valueFromFunctionArg(arg[key], prop.type);
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

                    const fieldVal = valueFromFunctionArg(arg[key], prop.type);
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