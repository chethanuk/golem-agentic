import {
    AnalysedType, getNameFromAnalysedType,
    NameOptionTypePair,
    NameTypePair,
} from './analysed-type';
import {NamedWitTypeNode, NodeIndex, ResourceMode, WitTypeNode} from "golem:rpc/types@0.2.2";
import {WitType} from "golem:agent/common";
import {EnumType, Type, TypeAliasType, UnionType} from "rttist";
import {InterfaceType, ObjectType, Type as TsType, TypeKind} from "rttist";
import {analysedType} from "./analysed-type";

export function constructWitTypeFromTsType(type: Type) : WitType {
    const analysedType = constructAnalysedTypeFromTsType(type)

    const builder = new WitTypeBuilder();
    builder.add(analysedType);
    return builder.build();
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

export function constructAnalysedTypeFromTsType(type: TsType): AnalysedType {
    switch (type.kind) {
        case TypeKind.Intrinsic:
            throw new Error("intrinsic types are not supported in Golem");
        case TypeKind.Boolean:
            return analysedType.bool();
        case TypeKind.False:
            return analysedType.bool()
        case TypeKind.True:
            return analysedType.bool();
        case TypeKind.DataView:
            return analysedType.list(analysedType.u8());
        case TypeKind.MapDefinition:
            const mapKeyType = type.getTypeArguments?.()[0];
            const mapValueType = type.getTypeArguments?.()[1];
            const key = constructAnalysedTypeFromTsType(mapKeyType);
            const value = constructAnalysedTypeFromTsType(mapValueType);
            return analysedType.list(analysedType.tuple([key, value]));

        case TypeKind.WeakMapDefinition:
            const weakMapKeyType = type.getTypeArguments?.()[0];
            const weakMapValueType = type.getTypeArguments?.()[1];
            const weakKey = constructAnalysedTypeFromTsType(weakMapKeyType);
            const weakValue = constructAnalysedTypeFromTsType(weakMapValueType);
            return analysedType.list(analysedType.tuple([weakKey, weakValue]));

        case TypeKind.SetDefinition:
            throw new Error("set types are not supported in Golem");
        case TypeKind.WeakSetDefinition:
            const setType = type.getTypeArguments?.()[0];
            if (!setType) {
                throw new Error("Set must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(setType));

        case TypeKind.GeneratorDefinition:
            const genType = type.getTypeArguments?.()[0];
            if (!genType) {
                throw new Error("Generator must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(genType));
        case TypeKind.AsyncGeneratorDefinition:
            const generatorType = type.getTypeArguments?.()[0];
            if (!generatorType) {
                throw new Error("Generator must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(generatorType));

        case TypeKind.IteratorDefinition:
            const iteratorType = type.getTypeArguments?.()[0];
            if (!iteratorType) {
                throw new Error("Iterator must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(iteratorType));
        case TypeKind.IterableDefinition:
            const iterableType = type.getTypeArguments?.()[0];
            if (!iterableType) {
                throw new Error("Iterable must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(iterableType));
        case TypeKind.IterableIteratorDefinition:
            const iterableIteratorType = type.getTypeArguments?.()[0];
            if (!iterableIteratorType) {
                throw new Error("IterableIterator must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(iterableIteratorType));
        case TypeKind.AsyncIteratorDefinition:
            const asyncIteratorType = type.getTypeArguments?.()[0];
            if (!asyncIteratorType) {
                throw new Error("AsyncIterator must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(asyncIteratorType));
        case TypeKind.AsyncIterableDefinition:
            const asyncIterableType = type.getTypeArguments?.()[0];
            if (!asyncIterableType) {
                throw new Error("AsyncIterable must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(asyncIterableType));
        case TypeKind.AsyncIterableIteratorDefinition:
            const asyncIterableIteratorType = type.getTypeArguments?.()[0];
            if (!asyncIterableIteratorType) {
                throw new Error("AsyncIterableIterator must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(asyncIterableIteratorType));

        case TypeKind.Type:
            const typeArg = type.getTypeArguments?.()[0];
            if (!typeArg) {
                throw new Error("Array must have a type argument");
            }

            if (type.isArray()) {
                return analysedType.list(constructAnalysedTypeFromTsType(typeArg));
            }  else if (type.isTuple()) {
                const tupleTypes = type.getTypeArguments?.().map(constructAnalysedTypeFromTsType) || [];
                return analysedType.tuple(tupleTypes);
            } else {
                return constructAnalysedTypeFromTsType(typeArg);
            }

        // To be handled
        case TypeKind.Module:
            throw new Error("module type is not supported in Golem");

        case TypeKind.Namespace:
            throw new Error("namespace type is not supported in Golem");

        case TypeKind.Object:
            const object = type as ObjectType;
            const objectFields = object.getProperties().map(prop => {
                return analysedType.field(prop.name.toString(), constructAnalysedTypeFromTsType(prop.type));
            });
            return analysedType.record(objectFields);

        case TypeKind.Interface:
            const objectInterface = type as InterfaceType;
            const interfaceFields = objectInterface.getProperties().map(prop => {
                const propertyAnalysedType = constructAnalysedTypeFromTsType(prop.type);

                if (prop.optional) {
                    return analysedType.field(prop.name.toString(), analysedType.option(propertyAnalysedType));
                }

                return analysedType.field(prop.name.toString(), constructAnalysedTypeFromTsType(prop.type));
            });
            return analysedType.record(interfaceFields);

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
            throw new Error("template literal is not supported in Golem");
        case TypeKind.Intersection:
            throw new Error("intersection type is not supported in Golem");
        case TypeKind.ConditionalType:
            throw new Error("conditional type is not supported in Golem");
        case TypeKind.IndexedAccess:
            throw new Error("indexed access is not supported in Golem");
        case TypeKind.TypeParameter:
            throw new Error("type parameter is not supported in Golem");
        case TypeKind.Alias:
            const typeAlias = type as TypeAliasType;
            return constructAnalysedTypeFromTsType(typeAlias.target)
        case TypeKind.Method:
            throw new Error("method type is not supported in Golem");
        case TypeKind.Function:
            throw new Error("function type is not supported in Golem");
        case TypeKind.GeneratorFunction:
            throw new Error("generator function is not supported in Golem");
        case TypeKind.EnumLiteral:
            throw new Error("enum literal is not supported in Golem");
        case TypeKind.RegExpLiteral:
            throw new Error("regexp literal is not supported in Golem");
        case TypeKind.Enum:
            const enumType = type as EnumType;
            const cases = enumType.getEntries().map((entry) => entry[0])
            return analysedType.enum(cases);

        case TypeKind.UniqueSymbol:
            throw new Error("unique symbol is not supported in Golem");
        case TypeKind.ESSymbol:
            throw new Error("esymbol is not supported in Golem");
        case TypeKind.Generator:
            throw new Error("generator is not supported in Golem");
        case TypeKind.AsyncGenerator:
            throw new Error("async generator is not supported in Golem");
        case TypeKind.Iterator:
            throw new Error("iterator is not supported in Golem");
        case TypeKind.Iterable:
            throw new Error("iterable is not supported in Golem");
        case TypeKind.IterableIterator:
            throw new Error("iterable iterator is not supported in Golem");
        case TypeKind.AsyncIterator:
            throw new Error("async iterator is not supported in Golem");
        case TypeKind.AsyncIterable:
            throw new Error("async iterable is not supported in Golem");
        case TypeKind.AsyncIterableIterator:
            throw new Error("async iterable iterator is not supported in Golem");
        case TypeKind.Jsx:
            throw new Error("jsx is not supported in Golem");
        case TypeKind.TypeCtor:
            throw new Error("type constructor is not supported in Golem");
        case TypeKind.Unknown:
            return analysedType.tuple([]); // FIXME: Maybe we can disallow
        case TypeKind.Any:
            throw new Error("any type is not supported in Golem");
        case TypeKind.Never:
            throw new Error("never type is not supported in Golem");
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

        case TypeKind.BigInt:
            return analysedType.u64();

        case TypeKind.Float64Array:
            return analysedType.f64();

        case TypeKind.Number:
            return analysedType.s32(); // For the same reason - as an example - Rust defaults to i32

        case TypeKind.String:
            return analysedType.str();

        case TypeKind.Symbol:
            throw new Error("symbol is not supported in Golem");

        case TypeKind.NonPrimitiveObject:
            throw new Error("non-primitive object is not supported in Golem");

        case TypeKind.FunctionType:
            throw new Error("function type is not supported in Golem");

        case TypeKind.Atomics:
            throw new TypeError("type is not supported in Golem");

        case TypeKind.Date:
            throw new Error("date is not supported in Golem");

        case TypeKind.RegExp:
            return analysedType.str();

        case TypeKind.Error:
            return analysedType.resultErr(analysedType.str());

        case TypeKind.Int8Array:
            return analysedType.list(analysedType.s8());

        case TypeKind.Uint8Array:
            return analysedType.list(analysedType.u8());

        case TypeKind.Uint8ClampedArray:
            return analysedType.list(analysedType.u8());

        case TypeKind.ArrayBuffer:
            return analysedType.list(analysedType.u8());

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
           throw new Error("invalid type is not supported in Golem");

        case TypeKind.NumberLiteral:
            return analysedType.f64();
        case TypeKind.BigIntLiteral:
            return analysedType.s64();
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
            throw new Error("type is not supported in Golem");

        case TypeKind.ReadonlyArrayDefinition:
            const elementType = type.getTypeArguments?.()[0];
            if (!elementType) {
                throw new Error("Array must have a type argument");
            }
            return analysedType.list(constructAnalysedTypeFromTsType(elementType));
    }
}
