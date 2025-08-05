import {
    AnalysedType, getNameFromAnalysedType,
    NameOptionTypePair,
    NameTypePair,
} from './analysed-type';
import {NamedWitTypeNode, NodeIndex, ResourceMode, Result, WitTypeNode} from "golem:rpc/types@0.2.2";
import {AgentError, WitType} from "golem:agent/common";
import {EnumType, Type, TypeAliasType, UnionType} from "rttist";
import {InterfaceType, ObjectType, Type as TsType, TypeKind} from "rttist";
import {analysedType} from "./analysed-type";

export function constructWitTypeFromTsType(type: Type) : Result<WitType, AgentError> {
    const analysedType = constructAnalysedTypeFromTsType(type)

    if (analysedType.tag === "err") {
        return analysedType;
    } else  {
        const builder = new WitTypeBuilder();
        builder.add(analysedType.val);
        return {
            tag: "ok",
            val: builder.build()
        };
    }
}

// Copied from wasm-rpc rust implementation
class WitTypeBuilder {
    private nodes: NamedWitTypeNode[] = [];
    private mapping = new Map<string, number>();

    add(typ: AnalysedType): NodeIndex {
        const hash = JSON.stringify(typ);
        if (this.mapping.has(hash)) {
            return this.mapping.get(hash)!;
        }

        const idx = this.nodes.length;
        const boolType: WitTypeNode = { tag: 'prim-bool-type' };
        this.nodes.push({  name: undefined,  type: boolType });

        const node: WitTypeNode = this.convert(typ);
        const name = getNameFromAnalysedType(typ);
        this.nodes[idx] = { name, type: node };
        this.mapping.set(hash, idx);
        return idx;
    }

    build(): WitType {
        return { nodes: this.nodes };
    }

    private convert(typ: AnalysedType): WitTypeNode {
        switch (typ.kind) {
            case 'variant': {
                const cases: [string, NodeIndex | undefined][] = typ.value.cases.map(
                    (c: NameOptionTypePair) => [c.name, c.typ ? this.add(c.typ) : undefined],
                );
                return { tag: 'variant-type', val: cases };
            }

            case 'result': {
                const ok = typ.value.ok ? this.add(typ.value.ok) : undefined;
                const err = typ.value.err ? this.add(typ.value.err) : undefined;
                return { tag: 'result-type', val: [ok, err] };
            }

            case 'option': {
                const inner = this.add(typ.value.inner);
                return { tag: 'option-type', val: inner };
            }

            case 'enum':
                return { tag: 'enum-type', val: typ.value.cases };

            case 'flags':
                return { tag: 'flags-type', val: typ.value.names };

            case 'record': {
                const fields: [string, NodeIndex][] = typ.value.fields.map(
                    (f: NameTypePair) => [f.name, this.add(f.typ)],
                );
                return { tag: 'record-type', val: fields };
            }

            case 'tuple': {
                const elements = typ.value.items.map((item) => this.add(item));
                return { tag: 'tuple-type', val: elements };
            }

            case 'list': {
                const inner = this.add(typ.value.inner);
                return { tag: 'list-type', val: inner };
            }

            case 'string':
                return { tag: 'prim-string-type' };
            case 'chr':
                return { tag: 'prim-char-type' };
            case 'f64':
                return { tag: 'prim-f64-type' };
            case 'f32':
                return { tag: 'prim-f32-type' };
            case 'u64':
                return { tag: 'prim-u64-type' };
            case 's64':
                return { tag: 'prim-s64-type' };
            case 'u32':
                return { tag: 'prim-u32-type' };
            case 's32':
                return { tag: 'prim-s32-type' };
            case 'u16':
                return { tag: 'prim-u16-type' };
            case 's16':
                return { tag: 'prim-s16-type' };
            case 'u8':
                return { tag: 'prim-u8-type' };
            case 's8':
                return { tag: 'prim-s8-type' };
            case 'bool':
                return { tag: 'prim-bool-type' };

            // FIXME: Why? typ.value.resourceId is a number and the handle-type takes a bigint
            case 'handle': {
                const resId: number = typ.value.resourceId;
                const mode: ResourceMode =
                    typ.value.mode === 'owned' ? 'owned' : 'borrowed';
                return { tag: 'handle-type', val: [BigInt(resId), mode] };
            }

            default:
                throw new Error(`Unhandled AnalysedType kind: ${(typ as any).kind}`);
        }
    }
}

export function constructAnalysedTypeFromTsType(type: TsType): Result<AnalysedType, AgentError> {
    switch (type.kind) {
        case TypeKind.Intrinsic:
            return invalidTypeError(type);
        case TypeKind.False:
            return validType(analysedType.bool());
        case TypeKind.True:
            return validType(analysedType.bool());
        case TypeKind.DataView:
            return validType(analysedType.list(analysedType.u8()));
        case TypeKind.MapDefinition:
            const mapKeyType = type.getTypeArguments?.()[0];
            const mapValueType = type.getTypeArguments?.()[1];

            return flatMap(constructAnalysedTypeFromTsType(mapKeyType), (key) =>
                flatMap(constructAnalysedTypeFromTsType(mapValueType), (value) => {
                    if (!key || !value) return invalidTypeError(type);
                    return validType(analysedType.list(analysedType.tuple([key, value])));
                })
            );

        case TypeKind.WeakMapDefinition:
            const args = type.getTypeArguments?.();
            if (!args || args.length < 2) {
                return invalidTypeError(type);
            }

            const [weakMapKeyType, weakMapValueType] = args;

            return flatMap(constructAnalysedTypeFromTsType(weakMapKeyType), (key) =>
                flatMap(constructAnalysedTypeFromTsType(weakMapValueType), (value) =>
                    validType(analysedType.list(analysedType.tuple([key, value])))
                )
            );

        case TypeKind.SetDefinition:
            const setElementType = type.getTypeArguments?.()[0];
            if (!setElementType) {
                return invalidTypeError(type);
            }

            return flatMap(constructAnalysedTypeFromTsType(setElementType), (elementType) =>
                validType(analysedType.list(elementType))
            );

        case TypeKind.WeakSetDefinition:
            const setType = type.getTypeArguments?.()[0];
            if (!setType) {
                return invalidTypeError(type);
            }

            return flatMap(constructAnalysedTypeFromTsType(setType), (elementType) =>
                validType(analysedType.list(elementType))
            );

        case TypeKind.GeneratorDefinition:
            const genType = type.getTypeArguments?.()[0];
            if (!genType) {
                return invalidTypeError(type); // return an error Result instead of throwing
            }

            return flatMap(constructAnalysedTypeFromTsType(genType), (elemType) =>
                validType(analysedType.list(elemType))
            );

        case TypeKind.AsyncGeneratorDefinition:
            const generatorType = type.getTypeArguments?.()[0];
            if (!generatorType) {
                return invalidTypeError(type); // Return an error Result instead of throwing
            }

            return flatMap(constructAnalysedTypeFromTsType(generatorType), (elemType) =>
                validType(analysedType.list(elemType))
            );

        case TypeKind.IteratorDefinition:
            const iteratorType = type.getTypeArguments?.()[0];
            if (!iteratorType) {
                return invalidTypeError(type);
            }

            return flatMap(constructAnalysedTypeFromTsType(iteratorType), (elemType) =>
                validType(analysedType.list(elemType))
            );

        case TypeKind.IterableDefinition:
            const iterableType = type.getTypeArguments?.()[0];
            if (!iterableType) {
                return invalidTypeError(type);
            }

            return flatMap(constructAnalysedTypeFromTsType(iterableType), (elemType) =>
                validType(analysedType.list(elemType))
            );

        case TypeKind.IterableIteratorDefinition:
            const iterableIteratorType = type.getTypeArguments?.()[0];
            if (!iterableIteratorType) {
                return invalidTypeError(type);
            }

            return flatMap(constructAnalysedTypeFromTsType(iterableIteratorType), (elemType) =>
                validType(analysedType.list(elemType))
            );

        case TypeKind.AsyncIteratorDefinition:
            const asyncIteratorType = type.getTypeArguments?.()[0];
            if (!asyncIteratorType) {
                return invalidTypeError(type);
            }

            return flatMap(constructAnalysedTypeFromTsType(asyncIteratorType), (elemType) =>
                validType(analysedType.list(elemType))
            );

        case TypeKind.AsyncIterableDefinition:
            const asyncIterableType = type.getTypeArguments?.()[0];
            if (!asyncIterableType) {
                return invalidTypeError(type);
            }

            return flatMap(constructAnalysedTypeFromTsType(asyncIterableType), (elemType) =>
                validType(analysedType.list(elemType))
            );

        case TypeKind.AsyncIterableIteratorDefinition:
            const asyncIterableIteratorType = type.getTypeArguments?.()[0];
            if (!asyncIterableIteratorType) {
                return invalidTypeError(type);
            }

            return flatMap(constructAnalysedTypeFromTsType(asyncIterableIteratorType), (elemType) =>
                validType(analysedType.list(elemType))
            );

        case TypeKind.Type:
            const arg = type.getTypeArguments?.()[0];
            if (!arg) {
                throw new Error("Type must have a type argument");
            }

            return constructAnalysedTypeFromTsType(arg);

            case TypeKind.Module:
            throw new Error("unimplemented")

        case TypeKind.Namespace:
            throw new Error("unimplemented")

        case TypeKind.Object:
            const object = type as ObjectType;

            const fieldsResult = traverse(object.getProperties(), (prop) =>
                map(constructAnalysedTypeFromTsType(prop.type), (fieldType) =>
                    analysedType.field(prop.name.toString(), fieldType)
                )
            );

            if (fieldsResult.tag === 'err') {
                return fieldsResult;
            }

            return validType(analysedType.record(fieldsResult.val));

        case TypeKind.Interface:
            const objectInterface = type as InterfaceType;

            const interfaceFieldsResult = traverse(objectInterface.getProperties(), (prop) =>
                map(constructAnalysedTypeFromTsType(prop.type), (propertyAnalysedType) => {
                    const fieldType = prop.optional
                        ? analysedType.option(propertyAnalysedType)
                        : propertyAnalysedType;
                    return analysedType.field(prop.name.toString(), fieldType);
                })
            );

            if (interfaceFieldsResult.tag === 'err') {
                return interfaceFieldsResult;
            }

            return validType(analysedType.record(interfaceFieldsResult.val));


        case TypeKind.Class:
        case TypeKind.Union:
            const unionType = type as UnionType;
            const possibleTypes: NameOptionTypePair[] = unionType.types.map((type) =>  {
               return {
                   name: type.name.toLowerCase(),
                   typ: constructAnalysedTypeFromTsType(type)
               }
            });
            return analysedType.variant(possibleTypes)
        case TypeKind.TemplateLiteral:
            throw new Error("unimplemented")
        case TypeKind.Intersection:
            throw new Error("unimplemented")
        case TypeKind.ConditionalType:
            throw new Error("unimplemented")
        case TypeKind.IndexedAccess:
            throw new Error("unimplemented")
        case TypeKind.TypeParameter:
            throw new Error("unimplemented")
        case TypeKind.Alias:
            const typeAlias = type as TypeAliasType;
            return constructAnalysedTypeFromTsType(typeAlias.target)
        case TypeKind.Method:
            throw new Error("unimplemented")
        case TypeKind.Function:
            throw new Error("unimplemented")
        case TypeKind.GeneratorFunction:
            throw new Error("unimplemented")
        case TypeKind.EnumLiteral:
            throw new Error("unimplemented")
        case TypeKind.RegExpLiteral:
            throw new Error("unimplemented")
        case TypeKind.Enum:
            const enumType = type as EnumType;
            const cases = enumType.getEntries().map((entry) => entry[0])
            return analysedType.enum(cases);

        case TypeKind.UniqueSymbol:
            throw new Error("unimplemented")
        case TypeKind.ESSymbol:
            throw new Error("unimplemented")
        case TypeKind.Generator:
            throw new Error("unimplemented")
        case TypeKind.AsyncGenerator:
            throw new Error("unimplemented")
        case TypeKind.Iterator:
            throw new Error("unimplemented")
        case TypeKind.Iterable:
            throw new Error("unimplemented")
        case TypeKind.IterableIterator:
            throw new Error("unimplemented")
        case TypeKind.AsyncIterator:
            throw new Error("unimplemented")
        case TypeKind.AsyncIterable:
            throw new Error("unimplemented")
        case TypeKind.AsyncIterableIterator:
            throw new Error("unimplemented")
        case TypeKind.Jsx:
            throw new Error("unimplemented")
        case TypeKind.TypeCtor:
            throw new Error("unimplemented")
        case TypeKind.Unknown:
            return analysedType.tuple([]); // FIXME: Maybe we can disallow
        case TypeKind.Any:
            throw new Error("unimplemented")
        case TypeKind.Never:
            throw new Error("unimplemented")
        case TypeKind.Void:
            return analysedType.tuple([]); // FIXME: Maybe we can disallow

        case TypeKind.Undefined:
            // Why empty tuple for undefined?
            //
            // Undefined types can exist
            // a: undefined;
            // In this case a should exist but just that it can be undefined. The best analysed_type
            // for this situation is tuple[]
            // If value is tuple, and the type is undefined, we convert the wit-value of empty to ts value of "undefined"
            // This will also help in situations such as
            // a: string| undefined;
            // This is different to `a?: string`. In this case type of `a` is just option<string>
            // and if there is `a?: undefined`, then it is option<undefined>, and we have no loss of information
            // if we make it an empty tuple
            return analysedType.tuple([]);

        case TypeKind.Null:
            return analysedType.tuple([])

        case TypeKind.Boolean:
            return analysedType.bool();

        case TypeKind.BigInt:
            return analysedType.u64();

        case TypeKind.Float64Array:
            return analysedType.f64();

        case TypeKind.Number:
            return analysedType.s32(); // For the same reason - as an example - Rust defaults to i32

        case TypeKind.String:
            return analysedType.str();

        case TypeKind.Symbol:
            throw new Error("unimplemented")

        case TypeKind.NonPrimitiveObject:
            throw new Error("unimplemented")

        case TypeKind.FunctionType:
            throw new Error("unimplemented")

        case TypeKind.Atomics:
            throw new TypeError("type is not supported in Golem");

        case TypeKind.Date:
            throw new Error("unimplemented")

        case TypeKind.RegExp:
            return analysedType.str();

        case TypeKind.Error:
            return analysedType.resultErr(analysedType.str());

        case TypeKind.Int8Array:
            return analysedType.list(analysedType.s8());

        case TypeKind.Uint8Array:
            throw new Error("unimplemented")

        case TypeKind.Uint8ClampedArray:
            throw new Error("unimplemented")

        case TypeKind.ArrayBuffer:
            throw new Error("unimplemented")

        case TypeKind.SharedArrayBuffer:
            return analysedType.list(analysedType.u8());

        case TypeKind.Int16Array:
            return analysedType.list(analysedType.s16());

        case TypeKind.Uint16Array:
            return analysedType.list(analysedType.u16());

        case TypeKind.Int32Array:
            return analysedType.list(analysedType.s32());

        case TypeKind.Uint32Array:
            return analysedType.list(analysedType.u32());

        case TypeKind.Float32Array:
            return analysedType.list(analysedType.f32());

        case TypeKind.BigInt64Array:
            return analysedType.list(analysedType.s64());

        case TypeKind.BigUint64Array:
            return analysedType.list(analysedType.u64());

        case TypeKind.Invalid:
            throw new Error("invalid type - cannot be converted to AnalysedType");

        case TypeKind.NumberLiteral:
            return analysedType.s32();

        case TypeKind.BigIntLiteral:
            return analysedType.u64();

        case TypeKind.StringLiteral:
            return analysedType.str();

        case TypeKind.Promise:
            const promiseType = type.getTypeArguments?.()[0];
            if (!promiseType) {
                throw new Error("Promise must have a type argument");
            }

            return constructAnalysedTypeFromTsType(promiseType);

        case TypeKind.PromiseDefinition:
            const promiseDefType = type.getTypeArguments?.()[0];

            if (!promiseDefType) {
                throw new Error("PromiseDefinition must have a type argument");
            }

            return analysedType.option(constructAnalysedTypeFromTsType(promiseDefType));

        case TypeKind.ObjectType:
            const obj = type as ObjectType;
            const fields = obj.getProperties().map(prop => {
                return analysedType.field(prop.name.toString(), constructAnalysedTypeFromTsType(prop.type));
            });
            return analysedType.record(fields);

        case TypeKind.TupleDefinition:
            const tupleTypes = type.getTypeArguments?.().map(constructAnalysedTypeFromTsType) || [];
            return analysedType.tuple(tupleTypes);

        case TypeKind.ArrayDefinition:
        case TypeKind.ReadonlyArrayDefinition:
            const elementType = type.getTypeArguments?.()[0];
            if (!elementType) {
                throw new Error("Array must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(elementType));
    }
}


function invalidTypeError(type: TsType): Result<AnalysedType, AgentError> {
    return {
        tag: "err",
        val: {
            tag: "invalid-type",
            val: `${type.name}`
        }
    }
}

function validType(analysedType: AnalysedType): Result<AnalysedType, AgentError> {
    return {
        tag: "ok",
        val: analysedType
    }
}


export function map<T, E, U>(
    result: Result<T, E>,
    fn: (val: T) => U
): Result<U, E> {
    return result.tag === 'ok' ? { tag: 'ok', val: fn(result.val) } : result;
}


export function flatMap<T, E, U>(
    result: Result<T, E>,
    fn: (val: T) => Result<U, E>
): Result<U, E> {
    return result.tag === 'ok' ? fn(result.val) : result;
}


function traverse<T, E, U>(
    arr: readonly  T[],
    fn: (item: T) => Result<U, E>
): Result<U[], E> {
    const results: U[] = [];
    for (const item of arr) {
        const res = fn(item);
        if (res.tag === 'err') {
            return res;
        }
        results.push(res.val);
    }
    return { tag: 'ok', val: results };
}


