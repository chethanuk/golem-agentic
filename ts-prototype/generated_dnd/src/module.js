var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@rttist/core/dist/consts.js
var require_consts = __commonJS({
  "node_modules/@rttist/core/dist/consts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeIds = exports.ModuleIds = exports.CALLSITE_ARGS_TYPE_PROPERTY = exports.CALLSITE_TYPE_ARGS_PROPERTY = exports.PROTOTYPE_TYPE_INSTANCE_PROPERTY = exports.PROTOTYPE_TYPE_PROPERTY = void 0;
    exports.PROTOTYPE_TYPE_PROPERTY = "[[type]]";
    exports.PROTOTYPE_TYPE_INSTANCE_PROPERTY = "[[$type]]";
    exports.CALLSITE_TYPE_ARGS_PROPERTY = "[[csTArgs]]";
    exports.CALLSITE_ARGS_TYPE_PROPERTY = "[[csArgsT]]";
    exports.ModuleIds = {
      Native: "::native",
      Dynamic: "::dynamic",
      Invalid: "::invalid",
      RttistType: "@rttist/dist/Type",
      RttistModule: "@rttist/dist/Module"
    };
    exports.TypeIds = {
      Invalid: `${exports.ModuleIds.Invalid}::Invalid`,
      NonPrimitiveObject: "#object",
      Function: "#Function",
      Any: "#any",
      Unknown: "#unknown",
      Void: "#void",
      Never: "#never",
      Null: "#null",
      Undefined: "#undefined",
      Intrinsic: "#intrinsic",
      String: "#String",
      Number: "#Number",
      BigInt: "#BigInt",
      Boolean: "#Boolean",
      True: "#true",
      False: "#false",
      Date: "#Date",
      Error: "#Error",
      Symbol: "#Symbol",
      UniqueSymbol: "#UniqueSymbol",
      RegExp: "#RegExp",
      Int8Array: "#Int8Array",
      Uint8Array: "#Uint8Array",
      Uint8ClampedArray: "#Uint8ClampedArray",
      Int16Array: "#Int16Array",
      Uint16Array: "#Uint16Array",
      Int32Array: "#Int32Array",
      Uint32Array: "#Uint32Array",
      Float32Array: "#Float32Array",
      Float64Array: "#Float64Array",
      BigInt64Array: "#BigInt64Array",
      BigUint64Array: "#BigUint64Array",
      ArrayDefinition: "#Array",
      TupleDefinition: "#Tuple",
      ReadonlyArrayDefinition: "#ReadonlyArray",
      MapDefinition: "#Map",
      WeakMapDefinition: "#WeakMap",
      SetDefinition: "#Set",
      WeakSetDefinition: "#WeakSet",
      PromiseDefinition: "#Promise",
      GeneratorDefinition: "#Generator",
      AsyncGeneratorDefinition: "#AsyncGenerator",
      IteratorDefinition: "#Iterator",
      IterableDefinition: "#Iterable",
      IterableIteratorDefinition: "#IterableIterator",
      AsyncIteratorDefinition: "#AsyncIterator",
      AsyncIterableDefinition: "#AsyncIterable",
      AsyncIterableIteratorDefinition: "#AsyncIterableIterator",
      ArrayBuffer: "#ArrayBuffer",
      SharedArrayBuffer: "#SharedArrayBuffer",
      Atomics: "#Atomics",
      DataView: "#DataView"
    };
  }
});

// node_modules/@rttist/core/dist/declarations.js
var require_declarations = __commonJS({
  "node_modules/@rttist/core/dist/declarations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@rttist/core/dist/get-callsite-type-arguments.js
var require_get_callsite_type_arguments = __commonJS({
  "node_modules/@rttist/core/dist/get-callsite-type-arguments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCallsiteTypeArguments = getCallsiteTypeArguments;
    var consts_1 = require_consts();
    function getCallsiteTypeArguments(fn) {
      const callsiteArgs = fn[consts_1.CALLSITE_TYPE_ARGS_PROPERTY];
      fn[consts_1.CALLSITE_TYPE_ARGS_PROPERTY] = void 0;
      return callsiteArgs;
    }
  }
});

// node_modules/@rttist/core/dist/index.js
var require_dist = __commonJS({
  "node_modules/@rttist/core/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k2, k22) {
      if (k22 === void 0) k22 = k2;
      var desc = Object.getOwnPropertyDescriptor(m2, k2);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k2];
        } };
      }
      Object.defineProperty(o, k22, desc);
    } : function(o, m2, k2, k22) {
      if (k22 === void 0) k22 = k2;
      o[k22] = m2[k2];
    });
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_consts(), exports);
    __exportStar(require_declarations(), exports);
    __exportStar(require_get_callsite_type_arguments(), exports);
  }
});

// node_modules/reflect-metadata/Reflect.js
var Reflect2;
(function(Reflect3) {
  (function(factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect3);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect3;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter);
    function makeExporter(target, previous) {
      return function(key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, { configurable: true, writable: true, value });
        }
        if (previous)
          previous(key, value);
      };
    }
  })(function(exporter) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function";
    var supportsProto = { __proto__: [] } instanceof Array;
    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate ? function() {
        return MakeDictionary(/* @__PURE__ */ Object.create(null));
      } : supportsProto ? function() {
        return MakeDictionary({ __proto__: null });
      } : function() {
        return MakeDictionary({});
      },
      has: downLevel ? function(map, key) {
        return hasOwn.call(map, key);
      } : function(map, key) {
        return key in map;
      },
      get: downLevel ? function(map, key) {
        return hasOwn.call(map, key) ? map[key] : void 0;
      } : function(map, key) {
        return map[key];
      }
    };
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process["env"] && process["env"]["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var Metadata2 = new _WeakMap();
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsObject(target))
          throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
          throw new TypeError();
        if (IsNull(attributes))
          attributes = void 0;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsConstructor(target))
          throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }
    exporter("decorate", decorate);
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
          throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      return decorator;
    }
    exporter("metadata", metadata);
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    exporter("defineMetadata", defineMetadata);
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(
        target,
        propertyKey,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return false;
      if (!metadataMap.delete(metadataKey))
        return false;
      if (metadataMap.size > 0)
        return true;
      var targetMetadata = Metadata2.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0)
        return true;
      Metadata2.delete(target);
      return true;
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target) {
      for (var i2 = decorators.length - 1; i2 >= 0; --i2) {
        var decorator = decorators[i2];
        var decorated = decorator(target);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated))
            throw new TypeError();
          target = decorated;
        }
      }
      return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i2 = decorators.length - 1; i2 >= 0; --i2) {
        var decorator = decorators[i2];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated))
            throw new TypeError();
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function GetOrCreateMetadataMap(O2, P2, Create) {
      var targetMetadata = Metadata2.get(O2);
      if (IsUndefined(targetMetadata)) {
        if (!Create)
          return void 0;
        targetMetadata = new _Map();
        Metadata2.set(O2, targetMetadata);
      }
      var metadataMap = targetMetadata.get(P2);
      if (IsUndefined(metadataMap)) {
        if (!Create)
          return void 0;
        metadataMap = new _Map();
        targetMetadata.set(P2, metadataMap);
      }
      return metadataMap;
    }
    function OrdinaryHasMetadata(MetadataKey, O2, P2) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O2, P2);
      if (hasOwn2)
        return true;
      var parent = OrdinaryGetPrototypeOf(O2);
      if (!IsNull(parent))
        return OrdinaryHasMetadata(MetadataKey, parent, P2);
      return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O2, P2) {
      var metadataMap = GetOrCreateMetadataMap(
        O2,
        P2,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O2, P2) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O2, P2);
      if (hasOwn2)
        return OrdinaryGetOwnMetadata(MetadataKey, O2, P2);
      var parent = OrdinaryGetPrototypeOf(O2);
      if (!IsNull(parent))
        return OrdinaryGetMetadata(MetadataKey, parent, P2);
      return void 0;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O2, P2) {
      var metadataMap = GetOrCreateMetadataMap(
        O2,
        P2,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return void 0;
      return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O2, P2) {
      var metadataMap = GetOrCreateMetadataMap(
        O2,
        P2,
        /*Create*/
        true
      );
      metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O2, P2) {
      var ownKeys = OrdinaryOwnMetadataKeys(O2, P2);
      var parent = OrdinaryGetPrototypeOf(O2);
      if (parent === null)
        return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P2);
      if (parentKeys.length <= 0)
        return ownKeys;
      if (ownKeys.length <= 0)
        return parentKeys;
      var set = new _Set();
      var keys = [];
      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      return keys;
    }
    function OrdinaryOwnMetadataKeys(O2, P2) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(
        O2,
        P2,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k2 = 0;
      while (true) {
        var next = IteratorStep(iterator);
        if (!next) {
          keys.length = k2;
          return keys;
        }
        var nextValue = IteratorValue(next);
        try {
          keys[k2] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }
        k2++;
      }
    }
    function Type2(x2) {
      if (x2 === null)
        return 1;
      switch (typeof x2) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return x2 === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function IsUndefined(x2) {
      return x2 === void 0;
    }
    function IsNull(x2) {
      return x2 === null;
    }
    function IsSymbol(x2) {
      return typeof x2 === "symbol";
    }
    function IsObject(x2) {
      return typeof x2 === "object" ? x2 !== null : typeof x2 === "function";
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type2(input)) {
        case 0:
          return input;
        case 1:
          return input;
        case 2:
          return input;
        case 3:
          return input;
        case 4:
          return input;
        case 5:
          return input;
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== void 0) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result))
          throw new TypeError();
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    function OrdinaryToPrimitive(O2, hint) {
      if (hint === "string") {
        var toString_1 = O2.toString;
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O2);
          if (!IsObject(result))
            return result;
        }
        var valueOf = O2.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O2);
          if (!IsObject(result))
            return result;
        }
      } else {
        var valueOf = O2.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O2);
          if (!IsObject(result))
            return result;
        }
        var toString_2 = O2.toString;
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O2);
          if (!IsObject(result))
            return result;
        }
      }
      throw new TypeError();
    }
    function ToBoolean(argument) {
      return !!argument;
    }
    function ToString(argument) {
      return "" + argument;
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(
        argument,
        3
        /* String */
      );
      if (IsSymbol(key))
        return key;
      return ToString(key);
    }
    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    }
    function IsCallable(argument) {
      return typeof argument === "function";
    }
    function IsConstructor(argument) {
      return typeof argument === "function";
    }
    function IsPropertyKey(argument) {
      switch (Type2(argument)) {
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    }
    function GetMethod(V2, P2) {
      var func = V2[P2];
      if (func === void 0 || func === null)
        return void 0;
      if (!IsCallable(func))
        throw new TypeError();
      return func;
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method))
        throw new TypeError();
      var iterator = method.call(obj);
      if (!IsObject(iterator))
        throw new TypeError();
      return iterator;
    }
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    }
    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f)
        f.call(iterator);
    }
    function OrdinaryGetPrototypeOf(O2) {
      var proto = Object.getPrototypeOf(O2);
      if (typeof O2 !== "function" || O2 === functionPrototype)
        return proto;
      if (proto !== functionPrototype)
        return proto;
      var prototype = O2.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype)
        return proto;
      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function")
        return proto;
      if (constructor === O2)
        return proto;
      return constructor;
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];
      var MapIterator = (
        /** @class */
        function() {
          function MapIterator2(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return { value: result, done: false };
            }
            return { value: void 0, done: true };
          };
          MapIterator2.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return { value, done: true };
          };
          return MapIterator2;
        }()
      );
      return (
        /** @class */
        function() {
          function Map2() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map2.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map2.prototype.has = function(key) {
            return this._find(
              key,
              /*insert*/
              false
            ) >= 0;
          };
          Map2.prototype.get = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            return index >= 0 ? this._values[index] : void 0;
          };
          Map2.prototype.set = function(key, value) {
            var index = this._find(
              key,
              /*insert*/
              true
            );
            this._values[index] = value;
            return this;
          };
          Map2.prototype.delete = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            if (index >= 0) {
              var size = this._keys.length;
              for (var i2 = index + 1; i2 < size; i2++) {
                this._keys[i2 - 1] = this._keys[i2];
                this._values[i2 - 1] = this._values[i2];
              }
              this._keys.length--;
              this._values.length--;
              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map2.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map2.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map2.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map2.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map2.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map2.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map2.prototype._find = function(key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(void 0);
            }
            return this._cacheIndex;
          };
          return Map2;
        }()
      );
      function getKey(key, _2) {
        return key;
      }
      function getValue(_2, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    function CreateSetPolyfill() {
      return (
        /** @class */
        function() {
          function Set2() {
            this._map = new _Map();
          }
          Object.defineProperty(Set2.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set2.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set2.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set2.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set2.prototype.clear = function() {
            this._map.clear();
          };
          Set2.prototype.keys = function() {
            return this._map.keys();
          };
          Set2.prototype.values = function() {
            return this._map.values();
          };
          Set2.prototype.entries = function() {
            return this._map.entries();
          };
          Set2.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set2.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set2;
        }()
      );
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (
        /** @class */
        function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.get(table, this._key) : void 0;
          };
          WeakMap2.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              true
            );
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }()
      );
      function CreateUniqueKey() {
        var key;
        do
          key = "@@WeakMap@@" + CreateUUID();
        while (HashMap.has(keys, key));
        keys[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create)
            return void 0;
          Object.defineProperty(target, rootKey, { value: HashMap.create() });
        }
        return target[rootKey];
      }
      function FillRandomBytes(buffer, size) {
        for (var i2 = 0; i2 < size; ++i2)
          buffer[i2] = Math.random() * 255 | 0;
        return buffer;
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined")
            return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined")
            return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }
        return FillRandomBytes(new Array(size), size);
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE);
        data[6] = data[6] & 79 | 64;
        data[8] = data[8] & 191 | 128;
        var result = "";
        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8)
            result += "-";
          if (byte < 16)
            result += "0";
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    function MakeDictionary(obj) {
      obj.__ = void 0;
      delete obj.__;
      return obj;
    }
  });
})(Reflect2 || (Reflect2 = {}));

// src/resolved_agent.ts
var ResolvedAgent = class {
  constructor(name, instance) {
    this.name = name;
    this.tsAgent = instance;
  }
  getId() {
    return `${this.name}--0`;
  }
  // Convert WitValue to TS
  invoke(methodName, args) {
    return this.tsAgent.invoke(methodName, args);
  }
  getDefinition() {
    return agentRegistry.get(this.name);
  }
};

// src/conversions.ts
function convertJsToWitValueUsingSchema(value, schema) {
  if (schema.tag !== "structured") {
    throw new Error(`Only 'structured' schema is supported`);
  }
  const param = schema.val.parameters[0];
  if (param.tag !== "wit") {
    throw new Error(`Only 'wit' parameters are supported`);
  }
  const nodes = [];
  convertToWitNodes(value, param.val.nodes, param.val.nodes.length - 1, nodes);
  return { nodes };
}
function convertToWitNodes(value, typeNodes, idx, nodes) {
  const type = typeNodes[idx];
  const push = (node) => {
    nodes.push(node);
    return nodes.length - 1;
  };
  switch (type.tag) {
    case "prim-string-type":
      return push({ tag: "prim-string", val: String(value) });
    case "prim-bool-type":
      return push({ tag: "prim-bool", val: Boolean(value) });
    case "prim-u32-type":
      return push({ tag: "prim-u32", val: Number(value) });
    case "prim-u64-type":
      return push({ tag: "prim-u64", val: Number(value) });
    case "prim-s32-type":
      return push({ tag: "prim-s32", val: Number(value) });
    case "prim-s64-type":
      return push({ tag: "prim-s64", val: Number(value) });
    case "prim-f32-type":
      return push({ tag: "prim-float32", val: Number(value) });
    case "prim-f64-type":
      return push({ tag: "prim-float64", val: Number(value) });
    case "record-type": {
      const fieldIndices = type.val.map(([key, fieldIdx]) => {
        return convertToWitNodes(value[key], typeNodes, fieldIdx, nodes);
      });
      return push({ tag: "record-value", val: fieldIndices });
    }
    case "tuple-type": {
      const itemIndices = type.val.map(
        (tIdx, i2) => convertToWitNodes(value[i2], typeNodes, tIdx, nodes)
      );
      return push({ tag: "tuple-value", val: itemIndices });
    }
    case "list-type": {
      const itemIdxs = value.map(
        (item) => convertToWitNodes(item, typeNodes, type.val, nodes)
      );
      return push({ tag: "list-value", val: itemIdxs });
    }
    case "option-type": {
      if (value == null) {
        return push({ tag: "option-value", val: void 0 });
      } else {
        const inner = convertToWitNodes(value, typeNodes, type.val, nodes);
        return push({ tag: "option-value", val: inner });
      }
    }
    case "result-type": {
      if (value instanceof Error || value && value.isErr) {
        const errVal = convertToWitNodes(value.error ?? value, typeNodes, type.val[1], nodes);
        return push({ tag: "result-value", val: { tag: "err", val: errVal } });
      } else {
        const okVal = convertToWitNodes(value, typeNodes, type.val[0], nodes);
        return push({ tag: "result-value", val: { tag: "ok", val: okVal } });
      }
    }
    case "variant-type": {
      const [variantName] = Object.entries(value)[0];
      const index = type.val.findIndex(([name]) => name === variantName);
      const [, maybeNode] = type.val[index];
      const variantIdx = maybeNode !== void 0 ? convertToWitNodes(value[variantName], typeNodes, maybeNode, nodes) : void 0;
      return push({ tag: "variant-value", val: [index, variantIdx] });
    }
    case "enum-type": {
      const index = type.val.indexOf(value);
      if (index === -1) throw new Error(`Invalid enum value: ${value}`);
      return push({ tag: "enum-value", val: index });
    }
    case "flags-type": {
      const bools = type.val.map((flag) => Boolean(value[flag]));
      return push({ tag: "flags-value", val: bools });
    }
    case "handle-type": {
      return push({ tag: "handle", val: [value.uri, value.id] });
    }
    default:
      throw new Error(`Unhandled type tag: ${type.tag}`);
  }
}

// node_modules/rttist/dist/esm/index.js
var import_core = __toESM(require_dist(), 1);
var import_core2 = __toESM(require_dist(), 1);
var import_core3 = __toESM(require_dist(), 1);
var import_core4 = __toESM(require_dist(), 1);
var import_core5 = __toESM(require_dist(), 1);
var import_core6 = __toESM(require_dist(), 1);
var import_core7 = __toESM(require_dist(), 1);
var import_core8 = __toESM(require_dist(), 1);
var import_core9 = __toESM(require_dist(), 1);
var import_core10 = __toESM(require_dist(), 1);
var m = { current: null, setScope(n2) {
  this.current = n2;
}, doWithScope(n2, e) {
  let t = this.current;
  this.setScope(n2);
  try {
    e();
  } finally {
    this.setScope(t);
  }
} };
var Se = null;
function We(n2) {
  Se = n2;
}
function j() {
  if (!Se) throw new Error("Type factory is not set");
  return Se;
}
var Le = null;
function Ye(n2) {
  Le = n2;
}
function qe() {
  if (!Le) throw new Error("Type factory is not set");
  return Le;
}
function* Re() {
  for (let n2 = 0; n2 < 100; n2++) yield import_core2.TypeIds.Invalid;
}
function ve(n2, e, t) {
  let a = n2[import_core.CALLSITE_TYPE_ARGS_PROPERTY];
  if (n2[import_core.CALLSITE_TYPE_ARGS_PROPERTY] = void 0, e !== void 0 && e.length > 0) {
    let o = Math.max(e.length, a?.length ?? 0), p = n2[import_core.CALLSITE_ARGS_TYPE_PROPERTY];
    n2[import_core.CALLSITE_ARGS_TYPE_PROPERTY] = void 0;
    let g = p?.map((f) => {
      if (f?.constructor === Object) {
        let d = j().create(f);
        return t?.asExpandable().addType(d), d.id;
      }
      return f;
    }) ?? [];
    return function* () {
      for (let f = 0; f < o; f++) {
        let d = a?.[f];
        d !== void 0 && (yield d);
        let $e = g[f];
        if ($e === void 0) {
          yield import_core.TypeIds.Invalid;
          continue;
        }
        let yt = e[f];
        yield yt?.($e) ?? import_core.TypeIds.Invalid;
      }
      yield* Re();
    }();
  }
  return a || Re();
}
var De = Symbol.for("rttist/Type");
var ke = Symbol.for("rttist/Module");
function G(n2) {
  return n2 && typeof n2 == "object" && n2.constructor.__type === De;
}
function $(n2) {
  return n2 && typeof n2 == "object" && n2.constructor.__type === ke;
}
var W = class {
  constructor(e) {
    this.metadataLibrary = m.current;
    if (!e) throw new Error("Invalid module reference.");
    this._reference = e;
  }
  get module() {
    return this._module ?? (this._module = this.metadataLibrary.resolveModule(this._reference)), this._module;
  }
};
var y = class {
  constructor(e) {
    this.metadataLibrary = m.current;
    if (!e) throw new Error("Invalid type reference.");
    this._reference = e;
  }
  get type() {
    return this._type ?? (this._type = this.metadataLibrary.resolveType(this._reference)), this._type;
  }
};
var T = class {
  constructor(e) {
    this.metadataLibrary = m.current;
    this._references = e, this.length = e.length;
  }
  get types() {
    return this._types ?? (this._types = Object.freeze(this._references.map((e) => this.metadataLibrary.resolveType(e)))), this._types;
  }
};
var u = ((r) => (r[r.Invalid = 0] = "Invalid", r[r.Unknown = 1] = "Unknown", r[r.Any = 2] = "Any", r[r.Never = 3] = "Never", r[r.Void = 4] = "Void", r[r.Undefined = 5] = "Undefined", r[r.Null = 6] = "Null", r[r.Intrinsic = 7] = "Intrinsic", r[r.Boolean = 8] = "Boolean", r[r.False = 9] = "False", r[r.True = 10] = "True", r[r.Number = 11] = "Number", r[r.BigInt = 12] = "BigInt", r[r.String = 13] = "String", r[r.Symbol = 14] = "Symbol", r[r.NonPrimitiveObject = 15] = "NonPrimitiveObject", r[r.ObjectType = 16] = "ObjectType", r[r.FunctionType = 17] = "FunctionType", r[r.Date = 18] = "Date", r[r.Error = 19] = "Error", r[r.RegExp = 20] = "RegExp", r[r.Int8Array = 21] = "Int8Array", r[r.Uint8Array = 22] = "Uint8Array", r[r.Uint8ClampedArray = 23] = "Uint8ClampedArray", r[r.Int16Array = 24] = "Int16Array", r[r.Uint16Array = 25] = "Uint16Array", r[r.Int32Array = 26] = "Int32Array", r[r.Uint32Array = 27] = "Uint32Array", r[r.Float32Array = 28] = "Float32Array", r[r.Float64Array = 29] = "Float64Array", r[r.BigInt64Array = 30] = "BigInt64Array", r[r.BigUint64Array = 31] = "BigUint64Array", r[r.ArrayBuffer = 32] = "ArrayBuffer", r[r.SharedArrayBuffer = 33] = "SharedArrayBuffer", r[r.Atomics = 34] = "Atomics", r[r.DataView = 35] = "DataView", r[r.ArrayDefinition = 36] = "ArrayDefinition", r[r.ReadonlyArrayDefinition = 37] = "ReadonlyArrayDefinition", r[r.TupleDefinition = 38] = "TupleDefinition", r[r.MapDefinition = 39] = "MapDefinition", r[r.WeakMapDefinition = 40] = "WeakMapDefinition", r[r.SetDefinition = 41] = "SetDefinition", r[r.WeakSetDefinition = 42] = "WeakSetDefinition", r[r.PromiseDefinition = 43] = "PromiseDefinition", r[r.GeneratorDefinition = 44] = "GeneratorDefinition", r[r.AsyncGeneratorDefinition = 45] = "AsyncGeneratorDefinition", r[r.IteratorDefinition = 46] = "IteratorDefinition", r[r.IterableDefinition = 47] = "IterableDefinition", r[r.IterableIteratorDefinition = 48] = "IterableIteratorDefinition", r[r.AsyncIteratorDefinition = 49] = "AsyncIteratorDefinition", r[r.AsyncIterableDefinition = 50] = "AsyncIterableDefinition", r[r.AsyncIterableIteratorDefinition = 51] = "AsyncIterableIteratorDefinition", r[r.Module = 60] = "Module", r[r.Namespace = 61] = "Namespace", r[r.Object = 62] = "Object", r[r.Interface = 63] = "Interface", r[r.Class = 64] = "Class", r[r.Union = 65] = "Union", r[r.Intersection = 66] = "Intersection", r[r.ConditionalType = 67] = "ConditionalType", r[r.IndexedAccess = 68] = "IndexedAccess", r[r.TypeParameter = 69] = "TypeParameter", r[r.Alias = 70] = "Alias", r[r.Method = 71] = "Method", r[r.Function = 72] = "Function", r[r.GeneratorFunction = 73] = "GeneratorFunction", r[r.NumberLiteral = 74] = "NumberLiteral", r[r.BigIntLiteral = 75] = "BigIntLiteral", r[r.StringLiteral = 76] = "StringLiteral", r[r.TemplateLiteral = 77] = "TemplateLiteral", r[r.EnumLiteral = 78] = "EnumLiteral", r[r.RegExpLiteral = 79] = "RegExpLiteral", r[r.Enum = 80] = "Enum", r[r.UniqueSymbol = 81] = "UniqueSymbol", r[r.ESSymbol = 82] = "ESSymbol", r[r.Promise = 83] = "Promise", r[r.Generator = 84] = "Generator", r[r.AsyncGenerator = 85] = "AsyncGenerator", r[r.Iterator = 86] = "Iterator", r[r.Iterable = 87] = "Iterable", r[r.IterableIterator = 88] = "IterableIterator", r[r.AsyncIterator = 89] = "AsyncIterator", r[r.AsyncIterable = 90] = "AsyncIterable", r[r.AsyncIterableIterator = 91] = "AsyncIterableIterator", r[r.Jsx = 92] = "Jsx", r[r.Type = 93] = "Type", r[r.TypeCtor = 94] = "TypeCtor", r))(u || {});
var C = ((a) => (a[a.None = 0] = "None", a[a.Getter = 1] = "Getter", a[a.Setter = 2] = "Setter", a))(C || {});
var S = ((a) => (a[a.Public = 0] = "Public", a[a.Private = 1] = "Private", a[a.Protected = 2] = "Protected", a))(S || {});
var we = /* @__PURE__ */ new Set([76, 74, 10, 9, 75, 79, 77]);
var Ee = /* @__PURE__ */ new Set([13, 8, 11, 12, 14, 81, 6, 5]);
var Pe = ((t) => (t[t.ES = 0] = "ES", t[t.Unique = 1] = "Unique", t))(Pe || {});
function Y(n2) {
  return ((n2 || 0) & 24) >> 3;
}
function Xe(n2) {
  return ((n2 || 0) & 96) >> 5;
}
var Ne = ((a) => (a[a.None = 0] = "None", a[a.Optional = 1] = "Optional", a[a.Rest = 2] = "Rest", a))(Ne || {});
var lt = ((o) => (o[o.Optional = 1] = "Optional", o[o.Static = 2] = "Static", o[o.Private = 8] = "Private", o[o.Protected = 16] = "Protected", o))(lt || {});
var Ze = ((t) => (t[t.None = 0] = "None", t[t.Readonly = 1] = "Readonly", t))(Ze || {});
var Oe = ((d) => (d[d.None = 0] = "None", d[d.Optional = 1] = "Optional", d[d.Readonly = 2] = "Readonly", d[d.Static = 4] = "Static", d[d.Private = 8] = "Private", d[d.Protected = 16] = "Protected", d[d.Getter = 32] = "Getter", d[d.Setter = 64] = "Setter", d))(Oe || {});
var L = class L2 {
  constructor(e) {
    this._isIterable = false;
    this.metadataLibrary = m.current;
    if (!e.module) throw new Error("Type must have a module.");
    this._id = e.id, this._kind = e.kind, this._name = e.name, this._exported = e.exported || false, this._moduleRef = new W(e.module), this._nullable = e.nullable || this.metadataLibrary.configuration.nullability || false, this._definitionRef = e.genericTypeDefinition ? new y(e.genericTypeDefinition) : void 0, this._isGenericTypeDefinition = e.isGenericTypeDefinition || false, this._typeArgumentsRef = new T(e.typeArguments || []);
  }
  get id() {
    return this._id;
  }
  get displayName() {
    return `<${u[this._kind]} ${this._name} [${this._id}]>`;
  }
  get kind() {
    return this._kind;
  }
  get module() {
    return this._moduleRef.module;
  }
  get name() {
    return this._name;
  }
  get exported() {
    return this._exported;
  }
  get iterable() {
    return this._isIterable;
  }
  get nullable() {
    return this._nullable;
  }
  get genericTypeDefinition() {
    return this._isGenericTypeDefinition ? this : this._definitionRef?.type;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
  is(e) {
    if (e === void 0) {
      let [t] = ve(this.is);
      e = this.metadataLibrary.resolveType(t);
    }
    return this._id === e._id;
  }
  getTypeArguments() {
    return this._typeArgumentsRef.types;
  }
  isGenericType() {
    return this._typeArgumentsRef.length > 0;
  }
  isGenericTypeDefinition() {
    return this._isGenericTypeDefinition;
  }
  isTypeParameter() {
    return this._kind === 69;
  }
  isUnion() {
    return this._kind === 65;
  }
  isIntersection() {
    return this._kind === 66;
  }
  isClass() {
    return this._kind === 64;
  }
  isInterface() {
    return this._kind === 63;
  }
  isTypeAlias() {
    return this._kind === 70;
  }
  isLiteral() {
    return we.has(this._kind);
  }
  isUnionOrIntersection() {
    return this.isUnion() || this.isIntersection();
  }
  isArray() {
    return this.isGenericType() && (this.genericTypeDefinition === L2.ArrayDefinition || this.genericTypeDefinition === L2.ReadonlyArrayDefinition);
  }
  isTuple() {
    return this.isGenericType() && this.genericTypeDefinition === L2.TupleDefinition;
  }
  isEnum() {
    return this._kind === 80;
  }
  isConditional() {
    return this._kind === 67;
  }
  isObjectLike() {
    return this.isObject() || this.isClass() || this.isInterface();
  }
  isObject() {
    return this._kind === 62;
  }
  isTemplate() {
    return this._kind === 77;
  }
  isFunction() {
    return this._kind === 72;
  }
  isESSymbol() {
    return this._kind === 82;
  }
  isUniqueSymbol() {
    return this._kind === 81;
  }
  isInstantiable() {
    return this.isClass() || this.isFunction();
  }
  isPrimitive() {
    return Ee.has(this._kind);
  }
  isString() {
    return this._kind === 13 || this._kind === 76 || this._kind === 77;
  }
  isNumber() {
    return this._kind === 11 || this._kind === 74;
  }
  isBigInt() {
    return this._kind === 12 || this._kind === 75;
  }
  isBoolean() {
    return this._kind === 8 || this._kind === 10 || this._kind === 9;
  }
  isAny() {
    return this._kind === 2;
  }
  isNever() {
    return this._kind === 3;
  }
  isVoid() {
    return this._kind === 4;
  }
  isIntrinsic() {
    return this._kind === 7;
  }
  isUndefined() {
    return this._kind === 5;
  }
  isNull() {
    return this._kind === 6;
  }
  toString() {
    let e = this.getPropsToStringify();
    return `${this.displayName} {
    \`\`\`typeinfo
    typelib: ${this.metadataLibrary.name}
    module:  ${this.module.id}
    \`\`\`` + (e.length ? `
` : "") + this.stringifyProps(e, 1) + `
}`;
  }
  getPropsToStringify() {
    return [];
  }
  stringifyProps(e, t) {
    let a = "    ".repeat(t);
    return e.map((o) => (Array.isArray(o) ? this.stringifyProps(o, 1) : o).replace(/^/gm, a)).join(`
`);
  }
};
L.__type = De;
var i = L;
function V() {
  return typeof globalThis == "object" ? globalThis : typeof window == "object" ? window : global;
}
function J(n2, e) {
  let t = V(), a = Symbol.for(n2);
  return t[a] || (t[a] = e());
}
var Ue = class {
  constructor() {
    this.importMap = {};
  }
  registerImporters(e) {
    Object.keys(e).forEach((t) => {
      this.importMap[t] = e[t];
    });
  }
  import(e) {
    return this.importMap[e]?.() ?? Promise.resolve(void 0);
  }
};
var Ge = J("rttist/ModuleImporter", () => new Ue());
var H = class {
  constructor(e) {
    this.metadataLibrary = m.current;
    this._references = e, this.length = e.length;
  }
  get modules() {
    return this._modules ?? (this._modules = Object.freeze(this._references.map((e) => this.metadataLibrary.resolveModule(e)))), this._modules;
  }
};
var c = class {
  get id() {
    return this._id;
  }
  constructor(e) {
    this._id = e.id, this._import = e.import ?? (() => Ge.import(e.id)), this.name = e.name, this.path = e.path, this._childrenRefs = new H(e.children || []), this._types = Object.freeze((e.types || []).map((t) => (t.module = e.id, j().create(t))));
  }
  getChildren() {
    return this._childrenRefs.modules;
  }
  getTypes() {
    return this._types;
  }
  import() {
    return this._import();
  }
};
c.__type = ke;
var b = class {
  constructor(e) {
    this.metadata = e, this.name = e.name, this.id = e.id, this._args = Object.freeze(e.args || []);
  }
  getArguments() {
    return this._args;
  }
  is(e) {
    return e.id === this.id;
  }
};
var X = class {
  get keyType() {
    return this._keyTypeRef.type;
  }
  get type() {
    return this._typeRef.type;
  }
  constructor(e) {
    this.metadata = e, this._keyTypeRef = new y(e.key), this._typeRef = new y(e.type), this.readonly = (e.flags & 1) !== 0;
  }
};
var R = class {
  constructor(e) {
    if (typeof e == "object") {
      if (this.key = e.key, this.kind = e.kind, e.kind === 0) {
        this.name = Symbol[e.key];
        return;
      }
      this.name = Symbol.for(e.key);
      return;
    }
    this.name = e;
  }
  isString() {
    return typeof this.name == "string";
  }
  isNumber() {
    return typeof this.name == "number";
  }
  isSymbol() {
    return typeof this.name == "symbol";
  }
  toString() {
    return this.isSymbol() ? `Symbol.for('${this.key}')` : this.name.toString();
  }
};
var Q = class {
  get type() {
    return this._type.type;
  }
  constructor(e) {
    this.name = e.name, this._type = new y(e.type), this.optional = (e.flags & 1) !== 0, this.rest = (e.flags & 2) !== 0, this._decorators = Object.freeze((e.decorators || []).map((t) => new b(t)));
  }
  getDecorators() {
    return this._decorators;
  }
  toString() {
    return this.getDecorators().map((e) => "@" + e.name).join(" ") + (this.rest ? "..." : "") + `${this.name.toString()}${this.optional ? "?" : ""}: ${this.type.displayName}`;
  }
};
var I = class {
  get returnType() {
    return this._returnTypeRef.type;
  }
  constructor(e) {
    this.metadata = e, this._parameters = Object.freeze((e.parameters || []).map((t) => new Q(t))), this._typeParametersRef = new T(e.typeParameters || []), this._returnTypeRef = new y(e.returnType);
  }
  getParameters() {
    return this._parameters;
  }
  getTypeParameters() {
    return this._typeParametersRef.types;
  }
  toString() {
    return `(${this._parameters.map((t) => t.toString()).join(", ")}): ${this.returnType.displayName}`;
  }
};
var Z = class {
  get name() {
    return this._name;
  }
  get optional() {
    return this._optional;
  }
  get accessModifier() {
    return this._accessModifier;
  }
  constructor(e) {
    this.metadata = e, this._name = new R(e.name), this._signatures = Object.freeze((e.signatures || []).map((t) => new I(t))), this._decorators = Object.freeze((e.decorators || []).map((t) => new b(t))), this._accessModifier = Y(e.flags), this._optional = (e.flags & 1) !== 0;
  }
  getDecorators() {
    return this._decorators;
  }
  getSignatures() {
    return this._signatures;
  }
  toString() {
    let e = this._signatures.map((t) => (this._accessModifier ? S[this._accessModifier] + " " : "") + this._name.toString() + (this._optional ? "?" : "") + t.toString()).join(`
`);
    return this._decorators.map((t) => "@" + t.name).join(`
`) + e;
  }
};
var z = class {
  get type() {
    return this._type.type;
  }
  constructor(e) {
    this.name = new R(e.name), this._type = new y(e.type), this._decorators = Object.freeze((e.decorators || []).map((t) => new b(t))), this.metadata = e, this.accessModifier = Y(e.flags), this.accessor = Xe(e.flags), this.optional = (e.flags & 1) !== 0, this.readonly = (e.flags & 2) !== 0;
  }
  getDecorators() {
    return this._decorators;
  }
  toString() {
    return this.getDecorators().map((e) => "@" + e.name).join(" ") + (this.accessor ? C[this.accessor] + " " : "") + (this.accessModifier ? S[this.accessModifier] + " " : "") + (this.readonly ? "readonly " : "") + `${this.name.toString()}${this.optional ? "?" : ""}: ${this.type.displayName}`;
  }
};
function K(n2) {
  return Object.freeze((n2.signatures || []).map((e) => new I(e)));
}
function ze(n2) {
  return Object.freeze((n2.properties || []).map((e) => new z(e)));
}
function Ke(n2) {
  return Object.freeze((n2.methods || []).map((e) => new Z(e)));
}
function et(n2) {
  return Object.freeze((n2.indexes || []).map((e) => new X(e)));
}
var M = class extends i {
  constructor(e) {
    super(e), this._properties = ze(e), this._methods = Ke(e), this._indexes = et(e), this._isIterable = this._properties?.some((t) => t.name.isSymbol() && t.name.name === Symbol.iterator) || this._methods?.some((t) => t.name.isSymbol() && t.name.name === Symbol.iterator);
  }
  getProperties() {
    return this._properties;
  }
  getProperty(e) {
    return this._properties.find((t) => t.name.name === e);
  }
  getIndexes() {
    return this._indexes;
  }
  getMethods() {
    return this._methods;
  }
  getMethod(e) {
    return this._methods.find((t) => t.name.name === e);
  }
  getPropsToStringify() {
    return [...this._properties.map((e) => e.toString()), ...this._methods.map((e) => e.toString())];
  }
};
var v = class extends M {
  get extends() {
    return this._extendsRef?.type;
  }
  get implements() {
    return this._implementsRef.types;
  }
  get abstract() {
    return this._abstract;
  }
  constructor(e) {
    super(e), this._ctor = e.ctor ?? (() => this.module.import().then((t) => t?.[e.name])), this._implementsRef = new T(e.implements || []), this._extendsRef = e.extends === void 0 ? void 0 : new y(e.extends), this._constructors = Object.freeze((e.constructors ?? []).map((t) => new I(t))), this._decorators = Object.freeze((e.decorators ?? []).map((t) => new b(t))), this._abstract = e.abstract ?? false;
  }
  getCtor() {
    return this._ctor();
  }
  getConstructors() {
    return this._constructors;
  }
  getDecorators() {
    return this._decorators;
  }
  isSubclassOf(e) {
    return e.isClass() && (this.extends !== void 0 && (this.extends.is(e) || this.extends.isClass() && this.extends.isSubclassOf(e) || this.extends.isGenericType() && this.extends.genericTypeDefinition.isClass() && this.extends.genericTypeDefinition.isSubclassOf(e)) || this.isGenericType() && (this.genericTypeDefinition.is(e) || this.genericTypeDefinition?.isClass() && this.genericTypeDefinition.isSubclassOf(e)));
  }
  isDerivedFrom(e) {
    return this.is(e) || this.extends?.isDerivedFrom(e) || this.implements.some((t) => t.isInterface() ? t.isDerivedFrom(e) : t.is(e)) || false;
  }
};
var ee = class extends i {
  get extends() {
    return this._extendsRef.type;
  }
  get trueType() {
    return this._trueTypeRef.type;
  }
  get falseType() {
    return this._falseTypeRef.type;
  }
  constructor(e) {
    super(e), this._extendsRef = new y(e.extends), this._trueTypeRef = new y(e.trueType), this._falseTypeRef = new y(e.falseType);
  }
};
var te = class extends i {
  constructor(e) {
    super(e), this._entries = Object.entries(e.entries || {}).map(([t, a]) => Object.freeze([t, a]));
  }
  getEnumerators() {
    return this.getEntries().map((e) => e[0]);
  }
  getValues() {
    return this.getEntries().map((e) => e[1]);
  }
  getEntries() {
    return this._entries.slice();
  }
};
var D = class extends i {
  constructor(e) {
    super(e), this._signatures = K(e);
  }
  getSignatures() {
    return this._signatures;
  }
};
var re = class extends i {
  constructor(e) {
    super(e), this._signatures = K(e);
  }
  getSignatures() {
    return this._signatures;
  }
};
var ne = class extends M {
  get extends() {
    return this._extendsRef.types;
  }
  constructor(e) {
    super(e), this._extendsRef = new T(e.extends || []);
  }
  isDerivedFrom(e) {
    return this.is(e) || this.extends.some((t) => t.isInterface() ? t.isDerivedFrom(e) : t.is(e)) || false;
  }
};
var k = class extends i {
  get types() {
    return this._types.types;
  }
  constructor(e) {
    super(e), this._types = new T(e.types || []);
  }
  toString() {
    return `${this.types.map((e) => e.toString()).join(this.operatorSymbol)}`;
  }
};
var w = class extends k {
  constructor(t) {
    super(t);
    this.operatorSymbol = " & ";
  }
};
var A = class extends i {
  constructor(e) {
    super(e), this.value = this.parseValue(e.value);
  }
  isStringLiteral() {
    return this._kind === 76;
  }
  isNumberLiteral() {
    return this._kind === 74;
  }
  isBooleanLiteral() {
    return this._kind === 10 || this._kind === 9;
  }
  isBigIntLiteral() {
    return this._kind === 75;
  }
  isRegExpLiteral() {
    return this._kind === 79;
  }
  isTrue() {
    return this.kind === 10;
  }
  isFalse() {
    return this.kind === 9;
  }
  parseValue(e) {
    switch (this._kind) {
      case 76:
        return e + "";
      case 74:
        return Number(e);
      case 9:
      case 10:
        return e === "true" || e === true;
      case 75:
        return BigInt(e[e.length - 1] === "n" ? e.slice(0, -1) : e);
      case 79:
        return new RegExp(e);
    }
    return e;
  }
  toString() {
    return `${u[this._kind]}(${this.value})`;
  }
};
var ae = class extends M {
  constructor(e) {
    super(e);
  }
};
var ie = class extends i {
  constructor(e) {
    super(e), this.head = e.head, this.templateSpans = e.templateSpans;
  }
};
var oe = class extends i {
  get constraint() {
    return this._constraint?.type;
  }
  get default() {
    return this._default?.type;
  }
  constructor(e) {
    super(e), this._constraint = e.constraint ? new y(e.constraint) : void 0, this._default = e.default ? new y(e.default) : void 0;
  }
};
var E = class extends k {
  constructor(t) {
    super(t);
    this.operatorSymbol = " | ";
  }
};
var se = class extends i {
  get key() {
    return this._key;
  }
  get symbol() {
    return this._symbol;
  }
  constructor(e) {
    super(e), this._key = e.key, this._symbol = Symbol[e.key];
  }
  toString() {
    return "@@" + this._key;
  }
};
var pe = class extends i {
  get key() {
    return this._key;
  }
  get symbol() {
    return this._symbol;
  }
  constructor(e) {
    super(e), this._key = e.key, e.key !== void 0 && (this._symbol = Symbol.for(e.key));
  }
  hasKey() {
    return this._key !== void 0;
  }
};
var ye = class extends i {
  get target() {
    return this._target.type;
  }
  constructor(e) {
    super(e), this._target = new y(e.target);
  }
  getPropsToStringify() {
    return [`target: ${this._target.type.id}`];
  }
};
var de = class extends i {
  get objectType() {
    return this._objectTypeRef.type;
  }
  get indexType() {
    return this._indexTypeRef.type;
  }
  constructor(e) {
    super(e), this._objectTypeRef = new y(e.objectType), this._indexTypeRef = new y(e.indexType);
  }
};
var le = class extends i {
  constructor(e) {
    super(e), this.value = this.parseValue(e.value), this.enumRef = new y(e.enum);
  }
  isStringLiteral() {
    return this._kind === 76;
  }
  isNumberLiteral() {
    return this._kind === 74;
  }
  parseValue(e) {
    switch (this._kind) {
      case 76:
        return e + "";
      case 74:
        return Number(e);
    }
    return e;
  }
};
var h = class extends i {
  get genericTypeDefinition() {
    return this._definitionRef.type;
  }
  constructor(e, t) {
    t.genericTypeDefinition = e, super(t);
  }
  getTypeArguments() {
    return this._typeArgumentsRef.types;
  }
};
var P = class extends h {
  constructor(e) {
    super(import_core3.TypeIds.PromiseDefinition, e);
  }
};
var ce = class extends h {
  constructor(e) {
    super(import_core3.TypeIds.ArrayDefinition, e);
  }
};
var me = class extends h {
  constructor(e) {
    super(import_core3.TypeIds.ReadonlyArrayDefinition, e);
  }
};
var fe = class extends h {
  constructor(e) {
    super(import_core3.TypeIds.SetDefinition, e);
  }
};
var ue = class extends h {
  constructor(e) {
    super(import_core3.TypeIds.WeakSetDefinition, e);
  }
};
var Te = class extends h {
  constructor(e) {
    super(import_core3.TypeIds.MapDefinition, e);
  }
};
var he = class extends h {
  constructor(e) {
    super(import_core3.TypeIds.WeakMapDefinition, e);
  }
};
var be = class extends h {
  constructor(e) {
    super(import_core3.TypeIds.TupleDefinition, e);
  }
};
var ge = class extends i {
};
var Ae = class extends i {
};
var ct = 1;
var Ie = class {
  static create(e, t, a) {
    return new v({ kind: 64, id: `${ct++}#${e}`, name: t.name, typeArguments: a.map((p) => p.id), module: t.module.id, properties: t.getProperties().map((p) => p.metadata), indexes: t.getIndexes().map((p) => p.metadata), methods: t.getMethods().map((p) => p.metadata), constructors: t.getConstructors().map((p) => p.metadata), decorators: t.getDecorators(), ctor: t.getCtor, extends: t.extends?.id, exported: t.exported, implements: t.implements.map((p) => p.id), nullable: t.nullable, isGenericTypeDefinition: false, genericTypeDefinition: t.id, abstract: t.abstract });
  }
};
function mt(n2) {
  switch (n2.kind) {
    case 74:
    case 75:
    case 76:
    case 79:
      return new A(n2);
    case 77:
      return new ie(n2);
    case 81:
      return new pe(n2);
    case 82:
      return new se(n2);
    case 62:
      return new ae(n2);
    case 63:
      return new ne(n2);
    case 64:
      return new v(n2);
    case 69:
      return new oe(n2);
    case 70:
      return new ye(n2);
    case 67:
      return new ee(n2);
    case 68:
      return new de(n2);
    case 60:
      return new Ae(n2);
    case 61:
      return new ge(n2);
    case 65:
      return new E(n2);
    case 66:
      return new w(n2);
    case 72:
      return new D(n2);
    case 73:
      return new re(n2);
    case 80:
      return new te(n2);
    case 78:
      return new le(n2);
    case 83:
      return new P(n2);
  }
  return console.warn("Creating Type of unknown TypeKind.", n2), new i(n2);
}
var Me = class {
  static create(e) {
    return mt(e);
  }
};
var xe = class n {
  constructor(e) {
    this.metadataLibrary = e;
    this.createdTypes = {};
  }
  getGenericClass(e, t) {
    let a = this.metadataLibrary.getType(e);
    if (!a.isClass()) return console.error("GenericTypeRegister.getGenericClass called for type which is not a ClassType."), class {
    };
    let o = n.getId(a, t), p = this.createdTypes[o];
    if (!p) {
      let g = `${e.name}{${t.map((d) => d.name).join(",")}}`;
      this.createdTypes[o] = p = { [g]: class extends e {
      } }[g];
      let f = qe().create(o, a, t);
      this.metadataLibrary.addType(f), p.prototype[import_core5.PROTOTYPE_TYPE_INSTANCE_PROPERTY] = f, p.prototype[import_core5.PROTOTYPE_TYPE_PROPERTY] = f.id;
    }
    return p;
  }
  static getId(e, t) {
    return `${e.id}{${t.map((a) => a.id).join(",")}}`;
  }
};
var tt = false;
var Ce;
var rt;
var nt = {};
var l = {};
function F() {
  return tt || (Ce = new i({ kind: 63, name: "Array", id: `#Array{${import_core7.TypeIds.Any}}`, module: import_core7.ModuleIds.Native, genericTypeDefinition: "#Array", typeArguments: [import_core7.TypeIds.Any] }), rt = new D({ kind: 72, name: "Function", id: "#Function:unknown", module: import_core7.ModuleIds.Native, signatures: [{ parameters: [{ name: "x", flags: 2, type: Ce.id }], returnType: import_core7.TypeIds.Unknown }] }), l = { ArrayDefinition: s("Array", "ArrayDefinition"), ReadonlyArrayDefinition: s("ReadonlyArray", "ReadonlyArrayDefinition"), TupleDefinition: s("Tuple", "TupleDefinition"), MapDefinition: s("Map", "MapDefinition"), WeakMapDefinition: s("WeakMap", "WeakMapDefinition"), SetDefinition: s("Set", "SetDefinition"), WeakSetDefinition: s("WeakSet", "WeakSetDefinition"), PromiseDefinition: s("Promise", "PromiseDefinition"), GeneratorDefinition: s("Generator", "GeneratorDefinition"), AsyncGeneratorDefinition: s("AsyncGenerator", "AsyncGeneratorDefinition"), IteratorDefinition: s("Iterator", "IteratorDefinition"), IterableDefinition: s("Iterable", "IterableDefinition"), IterableIteratorDefinition: s("IterableIterator", "IterableIteratorDefinition"), AsyncIteratorDefinition: s("AsyncIterator", "AsyncIteratorDefinition"), AsyncIterableDefinition: s("AsyncIterable", "AsyncIterableDefinition"), AsyncIterableIteratorDefinition: s("AsyncIterableIterator", "AsyncIterableIteratorDefinition") }, nt = { Invalid: s("Invalid", "Invalid", import_core7.ModuleIds.Invalid), NonPrimitiveObject: s("object", "NonPrimitiveObject"), Any: s("any", "Any"), Unknown: s("unknown", "Unknown"), Void: s("void", "Void"), Never: s("never", "Never"), Null: s("null", "Null"), Undefined: s("undefined", "Undefined"), Intrinsic: s("intrinsic", "Intrinsic"), String: s("String", "String"), Number: s("Number", "Number"), BigInt: s("BigInt", "BigInt"), Boolean: s("Boolean", "Boolean"), True: new A({ id: import_core7.TypeIds.True, kind: 10, name: "true", module: import_core7.ModuleIds.Native, value: true }), False: new A({ id: import_core7.TypeIds.False, kind: 9, name: "false", module: import_core7.ModuleIds.Native, value: false }), Date: s("Date", "Date"), Error: s("Error", "Error"), Symbol: s("Symbol", "Symbol"), UniqueSymbol: s("UniqueSymbol", "UniqueSymbol"), RegExp: s("RegExp", "RegExp"), Int8Array: s("Int8Array", "Int8Array"), Uint8Array: s("Uint8Array", "Uint8Array"), Uint8ClampedArray: s("Uint8ClampedArray", "Uint8ClampedArray"), Int16Array: s("Int16Array", "Int16Array"), Uint16Array: s("Uint16Array", "Uint16Array"), Int32Array: s("Int32Array", "Int32Array"), Uint32Array: s("Uint32Array", "Uint32Array"), Float32Array: s("Float32Array", "Float32Array"), Float64Array: s("Float64Array", "Float64Array"), BigInt64Array: s("BigInt64Array", "BigInt64Array"), BigUint64Array: s("BigUint64Array", "BigUint64Array"), ArrayBuffer: s("ArrayBuffer", "ArrayBuffer"), SharedArrayBuffer: s("SharedArrayBuffer", "SharedArrayBuffer"), Atomics: s("Atomics", "Atomics"), DataView: s("DataView", "DataView"), ArrayDefinition: l.ArrayDefinition, ReadonlyArrayDefinition: l.ReadonlyArrayDefinition, TupleDefinition: l.TupleDefinition, MapDefinition: l.MapDefinition, WeakMapDefinition: l.WeakMapDefinition, SetDefinition: l.SetDefinition, WeakSetDefinition: l.WeakSetDefinition, PromiseDefinition: l.PromiseDefinition, GeneratorDefinition: l.GeneratorDefinition, AsyncGeneratorDefinition: l.AsyncGeneratorDefinition, IteratorDefinition: l.IteratorDefinition, IterableDefinition: l.IterableDefinition, IterableIteratorDefinition: l.IterableIteratorDefinition, AsyncIteratorDefinition: l.AsyncIteratorDefinition, AsyncIterableDefinition: l.AsyncIterableDefinition, AsyncIterableIteratorDefinition: l.AsyncIterableIteratorDefinition }, tt = true), { AnyArray: Ce, UnknownFunction: rt, nativeTypes: nt, nativeGenericTypeDefinitions: l };
}
function s(n2, e, t = import_core7.ModuleIds.Native) {
  let a = u[e], o = import_core7.TypeIds[e], p = e.endsWith("Definition");
  if (o === void 0 || a === void 0) throw new Error(`Invalid prop name. kind = ${a}, id = ${o}`);
  return new i({ kind: a, name: n2, id: o, module: t, isGenericTypeDefinition: p });
}
function it(n2, e) {
  if (n2 === void 0) return i.Undefined;
  if (n2 === null) return i.Null;
  if (typeof n2 == "string") return i.String;
  if (typeof n2 == "symbol") return i.Symbol;
  if (typeof n2 == "number") return i.Number;
  if (typeof n2 == "boolean") return i.Boolean;
  if (typeof n2 == "bigint") return i.BigInt;
  if (n2 instanceof Date) return i.Date;
  if (n2 instanceof Error) return i.Error;
  if (n2 instanceof RegExp) return i.RegExp;
  if (n2 instanceof Int8Array) return i.Int8Array;
  if (n2 instanceof Uint8Array) return i.Uint8Array;
  if (n2 instanceof Uint8ClampedArray) return i.Uint8ClampedArray;
  if (n2 instanceof Int16Array) return i.Int16Array;
  if (n2 instanceof Uint16Array) return i.Uint16Array;
  if (n2 instanceof Int32Array) return i.Int32Array;
  if (n2 instanceof Uint32Array) return i.Uint32Array;
  if (n2 instanceof Float32Array) return i.Float32Array;
  if (n2 instanceof Float64Array) return i.Float64Array;
  if (n2 instanceof BigInt64Array) return i.BigInt64Array;
  if (n2 instanceof BigUint64Array) return i.BigUint64Array;
  if (G(n2)) return i.Type;
  if ($(n2)) return i.Module;
  if (n2.constructor === void 0) return i.Unknown;
  if (n2.constructor === Object) return i.NonPrimitiveObject;
  if (Array.isArray(n2)) return F().AnyArray;
  let t = n2.prototype?.[import_core6.PROTOTYPE_TYPE_INSTANCE_PROPERTY] || n2.constructor.prototype[import_core6.PROTOTYPE_TYPE_INSTANCE_PROPERTY];
  if (t !== void 0) return t;
  let a = n2.prototype?.[import_core6.PROTOTYPE_TYPE_PROPERTY] || n2.constructor.prototype[import_core6.PROTOTYPE_TYPE_PROPERTY] || n2[import_core6.PROTOTYPE_TYPE_PROPERTY] || void 0;
  return a !== void 0 ? e.resolveType(a) : typeof n2 == "function" ? F().UnknownFunction : i.Unknown;
}
var Be = "reflect-gettype-error-disable";
var Tt = /^([#@][^,|&]+?)\{(.+?)}(\?)?$/;
var ht = /* @__PURE__ */ new Map([["#Promise", P], ["#Array", ce], ["#ReadonlyArray", me], ["#Set", fe], ["#WeakSet", ue], ["#Map", Te], ["#WeakMap", he], ["#Tuple", be]]);
var _e = class {
  constructor(e, t, a) {
    this.configuration = e;
    this.name = t;
    this.parentLibrary = a;
    this.modules = /* @__PURE__ */ new Map();
    this.types = /* @__PURE__ */ new Map();
    this.genericTypeRegister = new xe(this);
    this.aliases = /* @__PURE__ */ new Map();
    if (!a && new.target !== U) throw new Error("Cannot instantiate new MetadataLibrary without parent.");
    this.isGlobalMetadataLibrary = new.target === U, this.getType = this.getType.bind(this), this.resolveType = this.resolveType.bind(this), this.getGenericClass = this.getGenericClass.bind(this), this.constructGeneric = this.constructGeneric.bind(this);
  }
  asExpandable() {
    return this;
  }
  toString() {
    return `${this.name} (${this.modules.size} modules, ${this.types.size} types) ${JSON.stringify(this.configuration, void 0, 4)}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
  getGenericClass(e, ...t) {
    if (t.length === 0) {
      let a = (0, import_core4.getCallsiteTypeArguments)(this.getGenericClass);
      if (a?.[0] !== void 0) {
        let o = this.resolveType(a[0]);
        return this.genericTypeRegister.getGenericClass(e, o.isGenericType() ? o.getTypeArguments() : []);
      }
    }
    return this.genericTypeRegister.getGenericClass(e, t);
  }
  constructGeneric(e, t, a, o) {
    let p = this.getGenericClass(e, ...t.map((g) => G(g) ? g : this.resolveType(g)));
    return o !== void 0 && (o = this.inheritNewTarget(o, p)), Reflect.construct(p, a, o ?? p);
  }
  inheritNewTarget(e, t) {
    let a = e.name !== void 0 ? `${e.name}{}` : t.name, o = { [a]: class {
    } }[a];
    return Object.setPrototypeOf(o.prototype, e.prototype), o.prototype[import_core4.PROTOTYPE_TYPE_PROPERTY] = t.prototype[import_core4.PROTOTYPE_TYPE_PROPERTY], o;
  }
  findType(e) {
    for (let [t, a] of this.types) if (e(a)) return a;
    if (this.parentLibrary !== void 0) return this.parentLibrary.findType(e);
  }
  getTypes() {
    return Array.from(this.types.values()).concat(this.parentLibrary?.getTypes() ?? []);
  }
  findModule(e) {
    for (let [t, a] of this.modules) if (e(a)) return a;
    if (this.parentLibrary !== void 0) return this.parentLibrary.findModule(e);
  }
  getModules() {
    return Array.from(this.modules.values()).concat(this.parentLibrary?.getModules() ?? []);
  }
  resolveType(e) {
    if (!e) throw new Error("Invalid type reference.");
    let t = this.types.get(e) ?? this.parentLibrary?.types.get(e);
    if (t !== void 0) return t;
    let a = this.handleAdhocType(e);
    return a || i.Invalid;
  }
  resolveModule(e) {
    if (!e) throw new Error("Invalid module reference.");
    return this.modules.get(e) ?? this.parentLibrary?.modules.get(e) ?? c.Invalid;
  }
  addMetadata(e, t) {
    if (this.parentLibrary) {
      this.parentLibrary.addMetadata(e, t);
      return;
    }
    m.doWithScope(this, () => {
      let a = new c(e);
      this.addModule(a);
    });
  }
  clearMetadata(e) {
    let t = `${e}/`;
    for (let a of this.types.keys()) a.startsWith(t) && (this.types.delete(a), this.parentLibrary?.types.delete(a));
    for (let a of this.modules.keys()) a.startsWith(t) && (this.modules.delete(a), this.parentLibrary?.modules.delete(a));
  }
  addModule(...e) {
    if (this.parentLibrary) {
      this.parentLibrary.addModule(...e);
      return;
    }
    for (let t of e) {
      if (!$(t)) throw new Error("Given module is not an instance of the Module class.");
      if (t.id !== import_core4.ModuleIds.Native && t.id !== import_core4.ModuleIds.Invalid && this.modules.has(t.id)) throw new Error(`Module with id '${t.id}' already exists.`);
      this.modules.set(t.id, t), this.addType(...t.getTypes());
    }
  }
  addType(...e) {
    if (this.parentLibrary) {
      this.parentLibrary.addType(...e);
      return;
    }
    for (let t of e) {
      if (!G(t)) throw new Error("Given type is not an instance of the Type class.");
      if (!t.id) throw new Error("Given type has invalid id.");
      if (this.types.has(t.id)) {
        if (t.id.slice(0, import_core4.ModuleIds.Native.length) === import_core4.ModuleIds.Native) continue;
        return;
      }
      this.types.set(t.id, t);
    }
  }
  addAliases(e) {
    if (this.parentLibrary) {
      this.parentLibrary.addAliases(e);
      return;
    }
    for (let [t, a] of Object.entries(e)) this.aliases.set(t, a);
  }
  getType(...e) {
    if (e.length) return it(e[0], this);
    let t = (0, import_core4.getCallsiteTypeArguments)(this.getType);
    return t !== void 0 ? t.length === 0 || t[0] === void 0 ? i.Invalid : this.resolveType(t[0]) : (V()[Be] || console.debug("[ERR] RTTIST: You are calling `getType()` function directly. More information at https://github.com/rttist/rttist/issues/17. To suppress this message, create field '" + Be + "' in global object (window | global | globalThis) eg. `window['" + Be + "'] = true;`"), i.Invalid);
  }
  createLiteralType(e) {
    let t = e.slice(3, -1), a = t[t.length - 1] === "n" ? 75 : t[0] === "'" ? 76 : t === "true" ? 10 : t === "false" ? 9 : t[0] === "/" ? 79 : 74;
    return new A({ id: e, value: a === 76 ? t.slice(1, -1) : t, kind: a, module: import_core4.ModuleIds.Native, name: t });
  }
  getTypeIdInfo(e) {
    let t = e.match(Tt);
    if (t) return { type: t[1], arguments: t[2].split(","), nullable: t[3] === "?" };
  }
  handleAdhocType(e) {
    if (e.slice(0, 3) === "#L(") {
      let o = this.createLiteralType(e);
      return this.addType(o), o;
    }
    let t = this.getTypeIdInfo(e);
    if (!t) return;
    if (t.type === "#|" || t.type === "#&") {
      let o = new (t.type === "#|" ? E : w)({ id: e, module: import_core4.ModuleIds.Native, name: t.type, kind: 65, types: t.arguments, nullable: t.nullable });
      return this.addType(o), o;
    }
    let a = ht.get(t.type);
    if (a) {
      let o = new a({ id: e, module: import_core4.ModuleIds.Native, name: `${t.type.slice(1)}<'${t.arguments.length}>`, kind: 93, typeArguments: t.arguments.map((p) => p) });
      return this.addType(o), o;
    }
    if (t.type[0] === "@") {
      let o = new i({ id: e, module: import_core4.ModuleIds.Native, name: `${t.type.slice(1)}<'${t.arguments.length}>`, kind: 93, typeArguments: t.arguments.map((p) => p), genericTypeDefinition: t.type });
      return this.addType(o), o;
    }
  }
};
var U = class extends _e {
  constructor(e) {
    super(e, "Global metadata library");
  }
};
var B = J("rttist/Metadata", () => new U({ nullability: false }));
var Oi = { metadata: Symbol.for("__Rttist.metadata__") };
We(Me);
Ye(Ie);
m.setScope(B);
var { nativeTypes: pt, nativeGenericTypeDefinitions: Mt, AnyArray: xt, UnknownFunction: _t } = F();
for (let [n2, e] of Object.entries(pt).concat(Object.entries(Mt))) i[n2] = e;
c.Invalid = new c({ id: import_core8.ModuleIds.Invalid, name: "invalid", path: "" });
c.Dynamic = new c({ id: import_core8.ModuleIds.Dynamic, name: "dynamic", path: "" });
c.Native = new c({ id: import_core8.ModuleIds.Native, name: "native", path: "" });
B.addType(...Object.values(pt));
B.addType(xt, _t);
B.addModule(c.Native, c.Invalid, c.Dynamic);

// src/type_metadata.ts
var Metadata = new _e({
  nullability: false
}, "@user-code", B);

// src/analysed_type.ts
var analysedType = {
  field: (name, typ) => ({ name, typ }),
  case: (name, typ) => ({ name, typ }),
  optCase: (name, typ) => ({ name, typ }),
  unitCase: (name) => ({ name }),
  bool: () => ({ kind: "bool" }),
  str: () => ({ kind: "str" }),
  chr: () => ({ kind: "chr" }),
  f64: () => ({ kind: "f64" }),
  f32: () => ({ kind: "f32" }),
  u64: () => ({ kind: "u64" }),
  s64: () => ({ kind: "s64" }),
  u32: () => ({ kind: "u32" }),
  s32: () => ({ kind: "s32" }),
  u16: () => ({ kind: "u16" }),
  s16: () => ({ kind: "s16" }),
  u8: () => ({ kind: "u8" }),
  s8: () => ({ kind: "s8" }),
  list: (inner) => ({ kind: "list", value: { inner } }),
  option: (inner) => ({ kind: "option", value: { inner } }),
  tuple: (items) => ({ kind: "tuple", value: { items } }),
  record: (fields) => ({ kind: "record", value: { fields } }),
  flags: (names) => ({ kind: "flags", value: { names } }),
  enum: (cases) => ({ kind: "enum", value: { cases } }),
  variant: (cases) => ({ kind: "variant", value: { cases } }),
  resultOk: (ok) => ({ kind: "result", value: { ok } }),
  resultErr: (err) => ({ kind: "result", value: { err } }),
  result: (ok, err) => ({ kind: "result", value: { ok, err } }),
  handle: (resourceId, mode) => ({ kind: "handle", value: { resourceId, mode } })
};

// src/type_mapping.ts
function mapTypeToAnalysedType(type) {
  switch (type.kind) {
    case u.Intrinsic:
    case u.False:
      return analysedType.bool();
    case u.True:
      return analysedType.bool();
    case u.DataView:
      return analysedType.list(analysedType.u8());
    case u.MapDefinition:
      const mapKeyType = type.getTypeArguments?.()[0];
      const mapValueType = type.getTypeArguments?.()[1];
      const key = mapTypeToAnalysedType(mapKeyType);
      const value = mapTypeToAnalysedType(mapValueType);
      return analysedType.list(analysedType.tuple([key, value]));
    case u.WeakMapDefinition:
      const weakMapKeyType = type.getTypeArguments?.()[0];
      const weakMapValueType = type.getTypeArguments?.()[1];
      const weakKey = mapTypeToAnalysedType(weakMapKeyType);
      const weakValue = mapTypeToAnalysedType(weakMapValueType);
      return analysedType.list(analysedType.tuple([weakKey, weakValue]));
    case u.SetDefinition:
    case u.WeakSetDefinition:
      const setType = type.getTypeArguments?.()[0];
      if (!setType) {
        throw new Error("Set must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(setType));
    case u.GeneratorDefinition:
      const genType = type.getTypeArguments?.()[0];
      if (!genType) {
        throw new Error("Generator must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(genType));
    case u.AsyncGeneratorDefinition:
      const generatorType = type.getTypeArguments?.()[0];
      if (!generatorType) {
        throw new Error("Generator must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(generatorType));
    case u.IteratorDefinition:
      const iteratorType = type.getTypeArguments?.()[0];
      if (!iteratorType) {
        throw new Error("Iterator must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(iteratorType));
    case u.IterableDefinition:
      const iterableType = type.getTypeArguments?.()[0];
      if (!iterableType) {
        throw new Error("Iterable must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(iterableType));
    case u.IterableIteratorDefinition:
      const iterableIteratorType = type.getTypeArguments?.()[0];
      if (!iterableIteratorType) {
        throw new Error("IterableIterator must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(iterableIteratorType));
    case u.AsyncIteratorDefinition:
      const asyncIteratorType = type.getTypeArguments?.()[0];
      if (!asyncIteratorType) {
        throw new Error("AsyncIterator must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(asyncIteratorType));
    case u.AsyncIterableDefinition:
      const asyncIterableType = type.getTypeArguments?.()[0];
      if (!asyncIterableType) {
        throw new Error("AsyncIterable must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(asyncIterableType));
    case u.AsyncIterableIteratorDefinition:
      const asyncIterableIteratorType = type.getTypeArguments?.()[0];
      if (!asyncIterableIteratorType) {
        throw new Error("AsyncIterableIterator must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(asyncIterableIteratorType));
    case u.Type:
      const arg = type.getTypeArguments?.()[0];
      if (!arg) {
        throw new Error("Type must have a type argument");
      }
      return mapTypeToAnalysedType(arg);
    // To be handled
    case u.Module:
    case u.Namespace:
    case u.Object:
    case u.Interface:
    case u.Class:
    case u.Union:
    case u.TemplateLiteral:
    case u.Intersection:
    case u.ConditionalType:
    case u.IndexedAccess:
    case u.TypeParameter:
    case u.Alias:
    case u.Method:
    case u.Function:
    case u.GeneratorFunction:
    case u.EnumLiteral:
    case u.RegExpLiteral:
    case u.Enum:
    case u.UniqueSymbol:
    case u.ESSymbol:
    case u.Generator:
    case u.AsyncGenerator:
    case u.Iterator:
    case u.Iterable:
    case u.IterableIterator:
    case u.AsyncIterator:
    case u.AsyncIterable:
    case u.AsyncIterableIterator:
    case u.Jsx:
    case u.TypeCtor:
    case u.Unknown:
    case u.Any:
    case u.Never:
    case u.Void:
      throw new TypeError("unsupported type in Golem " + type.kind);
    case u.Undefined:
      throw new TypeError("undefined type is not supported in Golem");
    case u.Null:
      return analysedType.option(analysedType.str());
    case u.Boolean:
      return analysedType.bool();
    case u.BigInt:
    case u.Float64Array:
      return analysedType.f64();
    case u.Number:
      return analysedType.f64();
    case u.String:
      return analysedType.str();
    case u.Symbol:
    case u.NonPrimitiveObject:
    case u.FunctionType:
    case u.Atomics:
      throw new TypeError("type is not supported in Golem");
    case u.Date:
    case u.RegExp:
      return analysedType.str();
    case u.Error:
      return analysedType.resultErr(analysedType.str());
    case u.Int8Array:
      return analysedType.list(analysedType.s8());
    case u.Uint8Array:
    case u.Uint8ClampedArray:
    case u.ArrayBuffer:
    case u.SharedArrayBuffer:
      return analysedType.list(analysedType.u8());
    case u.Int16Array:
      return analysedType.list(analysedType.s16());
    case u.Uint16Array:
      return analysedType.list(analysedType.u16());
    case u.Int32Array:
      return analysedType.list(analysedType.s32());
    case u.Uint32Array:
      return analysedType.list(analysedType.u32());
    case u.Float32Array:
      return analysedType.list(analysedType.f32());
    case u.BigInt64Array:
      return analysedType.list(analysedType.s64());
    case u.BigUint64Array:
      return analysedType.list(analysedType.u64());
    case u.Invalid:
      const typeArgument = type.getTypeArguments?.()[0];
      if (!typeArgument) {
        throw new Error("Promise must have a type argument");
      }
      return mapTypeToAnalysedType(typeArgument);
    case u.NumberLiteral:
      return analysedType.f64();
    case u.BigIntLiteral:
      return analysedType.s64();
    case u.StringLiteral:
      return analysedType.str();
    case u.Promise:
      const promiseType = type.getTypeArguments?.()[0];
      if (!promiseType) {
        throw new Error("Promise must have a type argument");
      }
      return mapTypeToAnalysedType(promiseType);
    case u.PromiseDefinition:
      const promiseDefType = type.getTypeArguments?.()[0];
      if (!promiseDefType) {
        throw new Error("PromiseDefinition must have a type argument");
      }
      return analysedType.option(mapTypeToAnalysedType(promiseDefType));
    case u.ObjectType:
      const obj = type;
      const fields = obj.getProperties().map((prop) => {
        return analysedType.field(prop.name.toString(), mapTypeToAnalysedType(prop.type));
      });
      return analysedType.record(fields);
    case u.TupleDefinition:
      const tupleTypes = type.getTypeArguments?.().map(mapTypeToAnalysedType) || [];
      return analysedType.tuple(tupleTypes);
    case u.ArrayDefinition:
    case u.ReadonlyArrayDefinition:
      const elementType = type.getTypeArguments?.()[0];
      if (!elementType) {
        throw new Error("Array must have a type argument");
      }
      return analysedType.list(mapTypeToAnalysedType(elementType));
  }
}

// src/wit_type_builder.ts
var WitTypeBuilder = class _WitTypeBuilder {
  constructor() {
    this.nodes = [];
    this.mapping = /* @__PURE__ */ new Map();
  }
  static buildWitType(typ) {
    const builder = new _WitTypeBuilder();
    builder.add(typ);
    return builder.build();
  }
  add(typ) {
    const hash = JSON.stringify(typ);
    if (this.mapping.has(hash)) {
      return this.mapping.get(hash);
    }
    const idx = this.nodes.length;
    this.nodes.push({ tag: "prim-bool-type" });
    const node = this.convert(typ);
    this.nodes[idx] = node;
    this.mapping.set(hash, idx);
    return idx;
  }
  build() {
    return { nodes: this.nodes };
  }
  convert(typ) {
    switch (typ.kind) {
      case "variant": {
        const cases = typ.value.cases.map(
          (c2) => [c2.name, c2.typ ? this.add(c2.typ) : void 0]
        );
        return { tag: "variant-type", val: cases };
      }
      case "result": {
        const ok = typ.value.ok ? this.add(typ.value.ok) : void 0;
        const err = typ.value.err ? this.add(typ.value.err) : void 0;
        return { tag: "result-type", val: [ok, err] };
      }
      case "option": {
        const inner = this.add(typ.value.inner);
        return { tag: "option-type", val: inner };
      }
      case "enum":
        return { tag: "enum-type", val: typ.value.cases };
      case "flags":
        return { tag: "flags-type", val: typ.value.names };
      case "record": {
        const fields = typ.value.fields.map(
          (f) => [f.name, this.add(f.typ)]
        );
        return { tag: "record-type", val: fields };
      }
      case "tuple": {
        const elements = typ.value.items.map((item) => this.add(item));
        return { tag: "tuple-type", val: elements };
      }
      case "list": {
        const inner = this.add(typ.value.inner);
        return { tag: "list-type", val: inner };
      }
      case "str":
        return { tag: "prim-string-type" };
      case "chr":
        return { tag: "prim-char-type" };
      case "f64":
        return { tag: "prim-f64-type" };
      case "f32":
        return { tag: "prim-f32-type" };
      case "u64":
        return { tag: "prim-u64-type" };
      case "s64":
        return { tag: "prim-s64-type" };
      case "u32":
        return { tag: "prim-u32-type" };
      case "s32":
        return { tag: "prim-s32-type" };
      case "u16":
        return { tag: "prim-u16-type" };
      case "s16":
        return { tag: "prim-s16-type" };
      case "u8":
        return { tag: "prim-u8-type" };
      case "s8":
        return { tag: "prim-s8-type" };
      case "bool":
        return { tag: "prim-bool-type" };
      case "handle": {
        const resId = typ.value.resourceId;
        const mode = typ.value.mode === "owned" ? "owned" : "borrowed";
        return { tag: "handle-type", val: [resId, mode] };
      }
      default:
        throw new Error(`Unhandled AnalysedType kind: ${typ.kind}`);
    }
  }
};

// src/value_mapping.ts
function convertToTsValue(wasmRpcValue, expectedType) {
  switch (expectedType.kind) {
    case u.Invalid:
      break;
    case u.Unknown:
      break;
    case u.Any:
      break;
    case u.Never:
      break;
    case u.Void:
      break;
    case u.Undefined:
      break;
    case u.Null:
      if (wasmRpcValue.kind === "option") {
        return null;
      } else {
        throw new Error(`Unrecognized value for ${wasmRpcValue.kind}`);
      }
    case u.Intrinsic:
      break;
    case u.Boolean:
      if (wasmRpcValue.kind === "bool") {
        return wasmRpcValue.value;
      } else {
        throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
      }
    case u.False:
      if (wasmRpcValue.kind === "bool") {
        return wasmRpcValue.value;
      } else {
        throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
      }
    case u.True:
      if (wasmRpcValue.kind === "bool") {
        return wasmRpcValue.value;
      } else {
        throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
      }
    case u.Number:
      if (wasmRpcValue.kind === "f64") {
        return wasmRpcValue.value;
      } else if (wasmRpcValue.kind === "u8" || wasmRpcValue.kind === "u16" || wasmRpcValue.kind === "u32" || wasmRpcValue.kind === "u64") {
        return wasmRpcValue.value;
      } else if (wasmRpcValue.kind === "s8" || wasmRpcValue.kind === "s16" || wasmRpcValue.kind === "s32" || wasmRpcValue.kind === "s64") {
        return wasmRpcValue.value;
      } else {
        throw new Error(`Expected number, obtained value ${wasmRpcValue}`);
      }
    case u.BigInt:
      if (wasmRpcValue.kind == "u64") {
        return wasmRpcValue.value;
      } else {
        throw new Error(`Expected number, obtained value ${wasmRpcValue}`);
      }
    case u.String:
      if (wasmRpcValue.kind === "string") {
        return wasmRpcValue.value;
      } else {
        throw new Error(`Expected string, obtained value ${wasmRpcValue}`);
      }
    case u.Symbol:
      throw new Error(`Unrecognized type for ${wasmRpcValue.kind}`);
    case u.NonPrimitiveObject:
      if (wasmRpcValue.kind == "record") {
        const fieldValues = wasmRpcValue.value;
        const expectedTypeFields = expectedType.getProperties();
        return expectedTypeFields.reduce((acc, field, idx) => {
          const name = field.name.toString();
          const expectedFieldType = field.type;
          acc[name] = convertToTsValue(fieldValues[idx], expectedFieldType);
          return acc;
        }, {});
      } else {
        throw new Error(`Expected object, obtained value ${wasmRpcValue}`);
      }
    case u.ObjectType:
      if (wasmRpcValue.kind === "record") {
        const fieldValues = wasmRpcValue.value;
        const expectedTypeFields = expectedType.getProperties();
        return expectedTypeFields.reduce((acc, field, idx) => {
          const name = field.name.toString();
          const expectedFieldType = field.type;
          acc[name] = convertToTsValue(fieldValues[idx], expectedFieldType);
          return acc;
        }, {});
      } else {
        throw new Error(`Expected object, obtained value ${wasmRpcValue}`);
      }
    case u.FunctionType:
      throw new Error(`Unrecognized type for ${wasmRpcValue.kind}`);
    case u.Date:
      if (wasmRpcValue.kind === "string") {
        return new Date(wasmRpcValue.value);
      } else {
        throw new Error(`Expected date, obtained value ${wasmRpcValue}`);
      }
    case u.Error:
      if (wasmRpcValue.kind === "result") {
        if (wasmRpcValue.value.err !== void 0) {
          if (wasmRpcValue.value.err.kind == "string") {
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
    case u.RegExp:
      if (wasmRpcValue.kind === "string") {
        return new RegExp(wasmRpcValue.value);
      } else {
        throw new Error(`Expected RegExp, obtained value ${wasmRpcValue}`);
      }
    case u.Int8Array:
      if (wasmRpcValue.kind === "list") {
        return new Int8Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Int8Array, obtained value ${wasmRpcValue}`);
      }
    case u.Uint8Array:
      if (wasmRpcValue.kind === "list") {
        return new Uint8Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Uint8Array, obtained value ${wasmRpcValue}`);
      }
    case u.Uint8ClampedArray:
      if (wasmRpcValue.kind === "list") {
        return new Uint8ClampedArray(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Uint8ClampedArray, obtained value ${wasmRpcValue}`);
      }
    case u.Int16Array:
      if (wasmRpcValue.kind === "list") {
        return new Int16Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Int16Array, obtained value ${wasmRpcValue}`);
      }
    case u.Uint16Array:
      if (wasmRpcValue.kind === "list") {
        return new Uint16Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Uint16Array, obtained value ${wasmRpcValue}`);
      }
    case u.Int32Array:
      if (wasmRpcValue.kind === "list") {
        return new Int32Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Int32Array, obtained value ${wasmRpcValue}`);
      }
    case u.Uint32Array:
      if (wasmRpcValue.kind === "list") {
        return new Uint32Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Uint32Array, obtained value ${wasmRpcValue}`);
      }
    case u.Float32Array:
      if (wasmRpcValue.kind === "list") {
        return new Float32Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Float32Array, obtained value ${wasmRpcValue}`);
      }
    case u.Float64Array:
      if (wasmRpcValue.kind === "list") {
        return new Float64Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.Number)));
      } else {
        throw new Error(`Expected Float64Array, obtained value ${wasmRpcValue}`);
      }
    case u.BigInt64Array:
      if (wasmRpcValue.kind === "list") {
        return new BigInt64Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.BigInt)));
      } else {
        throw new Error(`Expected BigInt64Array, obtained value ${wasmRpcValue}`);
      }
    case u.BigUint64Array:
      if (wasmRpcValue.kind === "list") {
        return new BigUint64Array(wasmRpcValue.value.map((v2) => convertToTsValue(v2, i.BigInt)));
      } else {
        throw new Error(`Expected BigUint64Array, obtained value ${wasmRpcValue}`);
      }
    case u.ArrayBuffer:
      if (wasmRpcValue.kind === "list") {
        const byteArray = wasmRpcValue.value.map((v2) => {
          const convertedValue = convertToTsValue(v2, i.Number);
          if (typeof convertedValue !== "number") {
            throw new Error(`Expected number, obtained value ${convertedValue}`);
          }
          return convertedValue;
        });
        return new Uint8Array(byteArray).buffer;
      } else {
        throw new Error(`Expected ArrayBuffer, obtained value ${wasmRpcValue}`);
      }
    case u.SharedArrayBuffer:
      if (wasmRpcValue.kind === "list") {
        const byteArray = wasmRpcValue.value.map((v2) => {
          const convertedValue = convertToTsValue(v2, i.Number);
          if (typeof convertedValue !== "number") {
            throw new Error(`Expected number, obtained value ${convertedValue}`);
          }
          return convertedValue;
        });
        return new Uint8Array(byteArray).buffer;
      } else {
        throw new Error(`Expected SharedArrayBuffer, obtained value ${wasmRpcValue}`);
      }
    case u.Atomics:
      break;
    case u.DataView:
      if (wasmRpcValue.kind === "list") {
        const byteArray = wasmRpcValue.value.map((v2) => {
          const convertedValue = convertToTsValue(v2, i.Number);
          if (typeof convertedValue !== "number") {
            throw new Error(`Expected number, obtained value ${convertedValue}`);
          }
          return convertedValue;
        });
        return new DataView(new Uint8Array(byteArray).buffer);
      } else {
        throw new Error(`Expected DataView, obtained value ${wasmRpcValue}`);
      }
    case u.ArrayDefinition:
      break;
    case u.ReadonlyArrayDefinition:
      break;
    case u.TupleDefinition:
      break;
    case u.MapDefinition:
      break;
    case u.WeakMapDefinition:
      break;
    case u.SetDefinition:
      break;
    case u.WeakSetDefinition:
      break;
    case u.PromiseDefinition:
      break;
    case u.GeneratorDefinition:
      break;
    case u.AsyncGeneratorDefinition:
      break;
    case u.IteratorDefinition:
      break;
    case u.IterableDefinition:
      break;
    case u.IterableIteratorDefinition:
      break;
    case u.AsyncIteratorDefinition:
      break;
    case u.AsyncIterableDefinition:
      break;
    case u.AsyncIterableIteratorDefinition:
      break;
    case u.Module:
      break;
    case u.Namespace:
      break;
    case u.Object:
      break;
    case u.Interface:
      break;
    case u.Class:
      break;
    case u.Union:
      break;
    case u.Intersection:
      break;
    case u.ConditionalType:
      break;
    case u.IndexedAccess:
      break;
    case u.TypeParameter:
      break;
    case u.Alias:
      break;
    case u.Method:
      break;
    case u.Function:
      break;
    case u.GeneratorFunction:
      break;
    case u.NumberLiteral:
      break;
    case u.BigIntLiteral:
      break;
    case u.StringLiteral:
      if (wasmRpcValue.kind === "string") {
        return wasmRpcValue.value;
      } else {
        throw new Error(`Unrecognized value for ${wasmRpcValue.kind}`);
      }
    case u.TemplateLiteral:
      break;
    case u.EnumLiteral:
      break;
    case u.RegExpLiteral:
      break;
    case u.Enum:
      break;
    case u.UniqueSymbol:
      break;
    case u.ESSymbol:
      break;
    case u.Promise:
      break;
    case u.Generator:
      break;
    case u.AsyncGenerator:
      break;
    case u.Iterator:
      break;
    case u.Iterable:
      break;
    case u.IterableIterator:
      break;
    case u.AsyncIterator:
      break;
    case u.AsyncIterable:
      break;
    case u.AsyncIterableIterator:
      break;
    case u.Jsx:
      break;
    case u.Type:
      break;
    case u.TypeCtor:
      break;
  }
}

// src/value.ts
function fromWitValue(wit) {
  if (!wit.nodes.length) throw new Error("Empty nodes in WitValue");
  return buildTree(wit.nodes[0], wit.nodes);
}
function buildTree(node, nodes) {
  switch (node.tag) {
    case "record-value":
      return {
        kind: "record",
        value: node.val.map((i2) => buildTree(nodes[i2], nodes))
      };
    case "variant-value": {
      const [caseIdx, maybeIndex] = node.val;
      return {
        kind: "variant",
        caseIdx,
        caseValue: maybeIndex !== void 0 ? buildTree(nodes[maybeIndex], nodes) : void 0
      };
    }
    case "enum-value":
      return { kind: "enum", value: node.val };
    case "flags-value":
      return { kind: "flags", value: node.val };
    case "tuple-value":
      return {
        kind: "tuple",
        value: node.val.map((i2) => buildTree(nodes[i2], nodes))
      };
    case "list-value":
      return {
        kind: "list",
        value: node.val.map((i2) => buildTree(nodes[i2], nodes))
      };
    case "option-value":
      return {
        kind: "option",
        value: node.val !== void 0 ? buildTree(nodes[node.val], nodes) : void 0
      };
    case "result-value": {
      const res = node.val;
      if (res.tag === "ok") {
        return {
          kind: "result",
          value: {
            ok: res.val !== void 0 ? buildTree(nodes[res.val], nodes) : void 0
          }
        };
      } else {
        return {
          kind: "result",
          value: {
            err: res.val !== void 0 ? buildTree(nodes[res.val], nodes) : void 0
          }
        };
      }
    }
    case "prim-u8":
      return { kind: "u8", value: node.val };
    case "prim-u16":
      return { kind: "u16", value: node.val };
    case "prim-u32":
      return { kind: "u32", value: node.val };
    case "prim-u64":
      return { kind: "u64", value: node.val };
    case "prim-s8":
      return { kind: "s8", value: node.val };
    case "prim-s16":
      return { kind: "s16", value: node.val };
    case "prim-s32":
      return { kind: "s32", value: node.val };
    case "prim-s64":
      return { kind: "s64", value: node.val };
    case "prim-float32":
      return { kind: "f32", value: node.val };
    case "prim-float64":
      return { kind: "f64", value: node.val };
    case "prim-char":
      return { kind: "char", value: node.val };
    case "prim-bool":
      return { kind: "bool", value: node.val };
    case "prim-string":
      return { kind: "string", value: node.val };
    case "handle": {
      const [uri, resourceId] = node.val;
      return {
        kind: "handle",
        uri: uri.value,
        resourceId
      };
    }
    default:
      throw new Error(`Unhandled tag: ${node.tag}`);
  }
}

// src/registry.ts
var agentInitiators = /* @__PURE__ */ new Map();
var agentRegistry = /* @__PURE__ */ new Map();
var methodMetadata = /* @__PURE__ */ new Map();
function ensureMeta(target, method) {
  const className = target.constructor.name;
  if (!methodMetadata.has(className)) {
    methodMetadata.set(className, /* @__PURE__ */ new Map());
  }
  const classMeta = methodMetadata.get(className);
  if (!classMeta.has(method)) {
    classMeta.set(method, {});
  }
  return classMeta.get(method);
}
function Prompt(prompt) {
  return function(target, propertyKey) {
    const meta = ensureMeta(target, propertyKey);
    meta.prompt = prompt;
  };
}
function Description(desc) {
  return function(target, propertyKey) {
    const meta = ensureMeta(target, propertyKey);
    meta.description = desc;
  };
}
function buildInputSchema(paramTypes) {
  return {
    tag: "structured",
    val: {
      parameters: paramTypes.map((parameterInfo) => mapToParameterType(parameterInfo.type))
    }
  };
}
function buildOutputSchema(returnType) {
  return {
    tag: "structured",
    val: {
      parameters: [mapToParameterType(returnType)]
    }
  };
}
function mapToParameterType(type) {
  const analysedType2 = mapTypeToAnalysedType(type);
  const witType = WitTypeBuilder.buildWitType(analysedType2);
  return {
    tag: "wit",
    val: witType
  };
}
function AgentImpl() {
  return function(ctor) {
    const className = ctor.name;
    if (agentRegistry.has(className)) return ctor;
    let classType = Metadata.getTypes().filter((type) => type.isClass() && type.name == className)[0];
    let filteredType = classType;
    let methodNames = filteredType.getMethods();
    const methods = methodNames.map((methodInfo) => {
      const signature = methodInfo.getSignatures()[0];
      const parameters = signature.getParameters();
      const returnType = signature.returnType;
      const methodName = methodInfo.name.toString();
      const baseMeta = methodMetadata.get(className)?.get(methodName) ?? {};
      const inputSchema = buildInputSchema(parameters);
      const outputSchema = buildOutputSchema(returnType);
      return {
        name: methodName,
        description: baseMeta.description ?? "",
        promptHint: baseMeta.prompt ?? "",
        inputSchema,
        outputSchema
      };
    });
    const agentType = {
      typeName: className,
      description: className,
      agentConstructor: {
        name: className,
        description: `Constructs ${className}`,
        promptHint: "Enter something...",
        inputSchema: defaultStringSchema()
      },
      methods,
      requires: []
    };
    agentRegistry.set(className, agentType);
    ctor.createRemote = (...args) => {
      const instance = new ctor(...args);
      return new Proxy(instance, {
        get(target, prop) {
          const val = target[prop];
          if (typeof val === "function") {
            return (...fnArgs) => {
              console.log(`[Remote] ${ctor.name}.${String(prop)}(${fnArgs})`);
              return Promise.resolve(`<<remote ${String(prop)} result>>`);
            };
          }
          return val;
        }
      });
    };
    ctor.createLocal = (...args) => {
      const instance = new ctor(...args);
      return new Proxy(instance, {
        get(target, prop) {
          const val = target[prop];
          if (typeof val === "function") {
            return (...fnArgs) => {
              console.log(`[Local] ${ctor.name}.${String(prop)}(${fnArgs})`);
              return val.apply(target, fnArgs);
            };
          }
          return val;
        }
      });
    };
    agentInitiators.set(className, {
      initiate: (agentName, constructor_params) => {
        const instance = new ctor(...constructor_params);
        const tsAgent = {
          getId: () => `${className}--0`,
          getDefinition: () => {
            const def = agentRegistry.get(className);
            if (!def) throw new Error(`AgentType not found for ${className}`);
            return def;
          },
          invoke: async (method, args) => {
            const fn = instance[method];
            if (!fn) throw new Error(`Method ${method} not found on agent ${className}`);
            const def = agentRegistry.get(className);
            const methodInfo = classType.getMethod(method);
            const paramTypes = methodInfo.getSignatures()[0].getParameters();
            const convertedArgs = args.map((witVal, idx) => {
              return convertToTsValue(fromWitValue(witVal), paramTypes[idx].type);
            });
            const result = await fn.apply(instance, convertedArgs);
            const methodDef = def?.methods.find((m2) => m2.name === method);
            if (!methodDef) {
              const entriesAsStrings = Array.from(agentRegistry.entries()).map(
                ([key, value]) => `Key: ${key}, Value: ${JSON.stringify(value, null, 2)}`
              );
              throw new Error(`Method ${method} not found in agent definition for ${className} ${def} ${def?.methods}. Available: ${entriesAsStrings.join(", ")}`);
            }
            return convertJsToWitValueUsingSchema(result, methodDef.outputSchema);
          }
        };
        return new ResolvedAgent(className, tsAgent);
      }
    });
  };
}
function defaultStringSchema() {
  return {
    tag: "structured",
    val: {
      parameters: [{
        tag: "text",
        val: { languageCode: "en" }
      }]
    }
  };
}

// src/agent.ts
var Agent = class {
  getId() {
    return agentRegistry.get(this.constructor.name)?.typeName ?? `${this.constructor.name}--0`;
  }
  getAgentType() {
    const type = agentRegistry.get(this.constructor.name);
    if (!type) {
      throw new Error(`Agent type not found for ${this.constructor.name}`);
    }
    return type;
  }
  static createRemote(...args) {
    throw new Error("this is automatically implemented");
  }
  static createLocal(...args) {
    throw new Error("this is automatically implemented");
  }
};

// src/index.ts
function getRegisteredAgents() {
  return Array.from(agentRegistry.values());
}
var Agent2 = class {
  constructor(name, params) {
    console.log("Agent constructor called", name, params);
    const initiator = agentInitiators.get(name);
    if (!initiator) {
      const entries = Array.from(agentInitiators.keys());
      throw new Error(`No implementation found for agent: ${name}. Valid entries are ${entries.join(", ")}`);
    }
    this.resolvedAgent = initiator.initiate(name, params);
  }
  async getId() {
    return this.resolvedAgent.getId();
  }
  async invoke(methodName, args) {
    return this.resolvedAgent.invoke(methodName, args).then((result) => {
      if (result.nodes[0].tag == "prim-string") {
        return {
          tag: "emit",
          val: result.nodes[0].val
          // only for testing
        };
      } else {
        throw new Error("Unrecognized method");
      }
    });
  }
  async getDefinition() {
    this.resolvedAgent.getDefinition();
  }
};
async function getAgent(agentId) {
  console.log("getAgent called", agentId);
  return {
    agentId,
    agentName: "dummy-agent",
    agentHandle: 1
  };
}
async function discoverAgents() {
  console.log("discoverAgents called");
  return [
    {
      agentId: "dummy-agent-id",
      agentName: "dummy-agent",
      agentHandle: 1
    }
  ];
}
async function discoverAgentTypes() {
  console.log("discoverAgentTypes called");
  return getRegisteredAgents();
}
var guest = {
  getAgent,
  discoverAgents,
  discoverAgentTypes,
  Agent: Agent2
};
export {
  Agent,
  AgentImpl,
  Description,
  Metadata,
  Prompt,
  agentRegistry,
  getRegisteredAgents,
  guest
};
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
