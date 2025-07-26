import {ObjectType, PromiseType, Type, TypeKind} from "rttist";
import {analysedType, AnalysedType} from "./analysed_type";

// mapTypeToSchema runs only during initialization and hence
// it's safe to convert to a proper type such as Analysed type
// and then convert it back to WitType following the rules of Golem's wasm-rpc
// rust implementations
export function mapTypeToAnalysedType(type: Type): AnalysedType {
    switch (type.kind) {
        case TypeKind.Intrinsic:
        case TypeKind.False:
            return analysedType.bool()
        case TypeKind.True:
            return analysedType.bool();
        case TypeKind.DataView:
            return analysedType.list(analysedType.u8());
        case TypeKind.MapDefinition:
            const mapKeyType = type.getTypeArguments?.()[0];
            const mapValueType = type.getTypeArguments?.()[1];
            const key = mapTypeToAnalysedType(mapKeyType);
            const value = mapTypeToAnalysedType(mapValueType);
            return analysedType.list(analysedType.tuple([key, value]));

        case TypeKind.WeakMapDefinition:
            const weakMapKeyType = type.getTypeArguments?.()[0];
            const weakMapValueType = type.getTypeArguments?.()[1];
            const weakKey = mapTypeToAnalysedType(weakMapKeyType);
            const weakValue = mapTypeToAnalysedType(weakMapValueType);
            return analysedType.list(analysedType.tuple([weakKey, weakValue]));

        case TypeKind.SetDefinition:
        case TypeKind.WeakSetDefinition:
            const setType = type.getTypeArguments?.()[0];
            if (!setType) {
                throw new Error("Set must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(setType));

        case TypeKind.GeneratorDefinition:
            const genType = type.getTypeArguments?.()[0];
            if (!genType) {
                throw new Error("Generator must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(genType));
        case TypeKind.AsyncGeneratorDefinition:
            const generatorType = type.getTypeArguments?.()[0];
            if (!generatorType) {
                throw new Error("Generator must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(generatorType));

        case TypeKind.IteratorDefinition:
            const iteratorType = type.getTypeArguments?.()[0];
            if (!iteratorType) {
                throw new Error("Iterator must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(iteratorType));
        case TypeKind.IterableDefinition:
            const iterableType = type.getTypeArguments?.()[0];
            if (!iterableType) {
                throw new Error("Iterable must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(iterableType));
        case TypeKind.IterableIteratorDefinition:
            const iterableIteratorType = type.getTypeArguments?.()[0];
            if (!iterableIteratorType) {
                throw new Error("IterableIterator must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(iterableIteratorType));
        case TypeKind.AsyncIteratorDefinition:
            const asyncIteratorType = type.getTypeArguments?.()[0];
            if (!asyncIteratorType) {
                throw new Error("AsyncIterator must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(asyncIteratorType));
        case TypeKind.AsyncIterableDefinition:
            const asyncIterableType = type.getTypeArguments?.()[0];
            if (!asyncIterableType) {
                throw new Error("AsyncIterable must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(asyncIterableType));
        case TypeKind.AsyncIterableIteratorDefinition:
            const asyncIterableIteratorType = type.getTypeArguments?.()[0];
            if (!asyncIterableIteratorType) {
                throw new Error("AsyncIterableIterator must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(asyncIterableIteratorType));

        case TypeKind.Type:
           const arg = type.getTypeArguments?.()[0];
            if (!arg) {
                throw new Error("Type must have a type argument");
            }

            return mapTypeToAnalysedType(arg);


        // To be handled
        case TypeKind.Module:
        case TypeKind.Namespace:
        case TypeKind.Object:
        case TypeKind.Interface:
        case TypeKind.Class:
        case TypeKind.Union:
        case TypeKind.TemplateLiteral:
        case TypeKind.Intersection:
        case TypeKind.ConditionalType:
        case TypeKind.IndexedAccess:
        case TypeKind.TypeParameter:
        case TypeKind.Alias:
        case TypeKind.Method:
        case TypeKind.Function:
        case TypeKind.GeneratorFunction:
        case TypeKind.EnumLiteral:
        case TypeKind.RegExpLiteral:
        case TypeKind.Enum:
        case TypeKind.UniqueSymbol:
        case TypeKind.ESSymbol:
        case TypeKind.Generator:
        case TypeKind.AsyncGenerator:
        case TypeKind.Iterator:
        case TypeKind.Iterable:
        case TypeKind.IterableIterator:
        case TypeKind.AsyncIterator:
        case TypeKind.AsyncIterable:
        case TypeKind.AsyncIterableIterator:
        case TypeKind.Jsx:
        case TypeKind.TypeCtor:
        case TypeKind.Unknown:
        case TypeKind.Any:
        case TypeKind.Never:
        case TypeKind.Void:
            throw new TypeError("unsupported type in Golem " + type.kind);

        case TypeKind.Undefined:
            throw new TypeError("undefined type is not supported in Golem");

        case TypeKind.Null:
            return analysedType.option(analysedType.str());

        case TypeKind.Boolean:
            return analysedType.bool();

        case TypeKind.BigInt:
        case TypeKind.Float64Array:
            return analysedType.f64();

        case TypeKind.Number:
            return analysedType.f64();

        case TypeKind.String:
            return analysedType.str();

        case TypeKind.Symbol:
        case TypeKind.NonPrimitiveObject:
        case TypeKind.FunctionType:
        case TypeKind.Atomics:
            throw new TypeError("type is not supported in Golem");

        case TypeKind.Date:
        case TypeKind.RegExp:
            return analysedType.str();

        case TypeKind.Error:
            return analysedType.resultErr(analysedType.str());

        case TypeKind.Int8Array:
            return analysedType.list(analysedType.s8());

        case TypeKind.Uint8Array:
        case TypeKind.Uint8ClampedArray:
        case TypeKind.ArrayBuffer:
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
            const typeArgument = type.getTypeArguments?.()[0];
            if (!typeArgument) {
                throw new Error("Promise must have a type argument");
            }
            return mapTypeToAnalysedType(typeArgument);


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

            return mapTypeToAnalysedType(promiseType);

        case TypeKind.PromiseDefinition:
            const promiseDefType = type.getTypeArguments?.()[0];

            if (!promiseDefType) {
                throw new Error("PromiseDefinition must have a type argument");
            }

            return analysedType.option(mapTypeToAnalysedType(promiseDefType));

        case TypeKind.ObjectType:
            const obj = type as ObjectType;
            const fields = obj.getProperties().map(prop => {
                return analysedType.field(prop.name.toString(), mapTypeToAnalysedType(prop.type));
            });
            return analysedType.record(fields);

        case TypeKind.TupleDefinition:
            const tupleTypes = type.getTypeArguments?.().map(mapTypeToAnalysedType) || [];
            return analysedType.tuple(tupleTypes);

        case TypeKind.ArrayDefinition:
        case TypeKind.ReadonlyArrayDefinition:
            const elementType = type.getTypeArguments?.()[0];
            if (!elementType) {
                throw new Error("Array must have a type argument");
            }
            return analysedType.list(mapTypeToAnalysedType(elementType));


    }
}
