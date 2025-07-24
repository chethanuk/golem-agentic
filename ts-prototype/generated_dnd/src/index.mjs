var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});

// node_modules/@rttist/core/dist/get-callsite-type-arguments.js
var require_get_callsite_type_arguments = __commonJS({
  "node_modules/@rttist/core/dist/get-callsite-type-arguments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getCallsiteTypeArguments = getCallsiteTypeArguments;
    var consts_1 = require_consts();
    function getCallsiteTypeArguments(fn) {
      const callsiteArgs = fn[consts_1.CALLSITE_TYPE_ARGS_PROPERTY];
      fn[consts_1.CALLSITE_TYPE_ARGS_PROPERTY] = void 0;
      return callsiteArgs;
    }
    __name(getCallsiteTypeArguments, "getCallsiteTypeArguments");
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
        desc = {
          enumerable: true,
          get: /* @__PURE__ */ __name(function() {
            return m2[k2];
          }, "get")
        };
      }
      Object.defineProperty(o, k22, desc);
    } : function(o, m2, k2, k22) {
      if (k22 === void 0) k22 = k2;
      o[k22] = m2[k2];
    });
    var __exportStar = exports && exports.__exportStar || function(m2, exports1) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m2, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __exportStar(require_consts(), exports);
    __exportStar(require_declarations(), exports);
    __exportStar(require_get_callsite_type_arguments(), exports);
  }
});

// src/index.ts
import { AgentDefinition, AgentImplementation, Prompt, Description } from "golem-ts-sdk";

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
var m = {
  current: null,
  setScope(n2) {
    this.current = n2;
  },
  doWithScope(n2, e) {
    let t = this.current;
    this.setScope(n2);
    try {
      e();
    } finally {
      this.setScope(t);
    }
  }
};
var Se = null;
function We(n2) {
  Se = n2;
}
__name(We, "We");
function j() {
  if (!Se) throw new Error("Type factory is not set");
  return Se;
}
__name(j, "j");
var Le = null;
function Ye(n2) {
  Le = n2;
}
__name(Ye, "Ye");
function qe() {
  if (!Le) throw new Error("Type factory is not set");
  return Le;
}
__name(qe, "qe");
function* Re() {
  for (let n2 = 0; n2 < 100; n2++) yield import_core2.TypeIds.Invalid;
}
__name(Re, "Re");
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
__name(ve, "ve");
var De = Symbol.for("rttist/Type");
var ke = Symbol.for("rttist/Module");
function G(n2) {
  return n2 && typeof n2 == "object" && n2.constructor.__type === De;
}
__name(G, "G");
function $(n2) {
  return n2 && typeof n2 == "object" && n2.constructor.__type === ke;
}
__name($, "$");
var W = class {
  static {
    __name(this, "W");
  }
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
  static {
    __name(this, "y");
  }
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
  static {
    __name(this, "T");
  }
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
var we = /* @__PURE__ */ new Set([
  76,
  74,
  10,
  9,
  75,
  79,
  77
]);
var Ee = /* @__PURE__ */ new Set([
  13,
  8,
  11,
  12,
  14,
  81,
  6,
  5
]);
var Pe = ((t) => (t[t.ES = 0] = "ES", t[t.Unique = 1] = "Unique", t))(Pe || {});
function Y(n2) {
  return ((n2 || 0) & 24) >> 3;
}
__name(Y, "Y");
function Xe(n2) {
  return ((n2 || 0) & 96) >> 5;
}
__name(Xe, "Xe");
var Ne = ((a) => (a[a.None = 0] = "None", a[a.Optional = 1] = "Optional", a[a.Rest = 2] = "Rest", a))(Ne || {});
var lt = ((o) => (o[o.Optional = 1] = "Optional", o[o.Static = 2] = "Static", o[o.Private = 8] = "Private", o[o.Protected = 16] = "Protected", o))(lt || {});
var Ze = ((t) => (t[t.None = 0] = "None", t[t.Readonly = 1] = "Readonly", t))(Ze || {});
var Oe = ((d) => (d[d.None = 0] = "None", d[d.Optional = 1] = "Optional", d[d.Readonly = 2] = "Readonly", d[d.Static = 4] = "Static", d[d.Private = 8] = "Private", d[d.Protected = 16] = "Protected", d[d.Getter = 32] = "Getter", d[d.Setter = 64] = "Setter", d))(Oe || {});
var L = class L2 {
  static {
    __name(this, "L");
  }
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
__name(V, "V");
function J(n2, e) {
  let t = V(), a = Symbol.for(n2);
  return t[a] || (t[a] = e());
}
__name(J, "J");
var Ue = class {
  static {
    __name(this, "Ue");
  }
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
  static {
    __name(this, "H");
  }
  constructor(e) {
    this.metadataLibrary = m.current;
    this._references = e, this.length = e.length;
  }
  get modules() {
    return this._modules ?? (this._modules = Object.freeze(this._references.map((e) => this.metadataLibrary.resolveModule(e)))), this._modules;
  }
};
var c = class {
  static {
    __name(this, "c");
  }
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
  static {
    __name(this, "b");
  }
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
  static {
    __name(this, "X");
  }
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
  static {
    __name(this, "R");
  }
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
  static {
    __name(this, "Q");
  }
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
  static {
    __name(this, "I");
  }
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
  static {
    __name(this, "Z");
  }
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
  static {
    __name(this, "z");
  }
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
__name(K, "K");
function ze(n2) {
  return Object.freeze((n2.properties || []).map((e) => new z(e)));
}
__name(ze, "ze");
function Ke(n2) {
  return Object.freeze((n2.methods || []).map((e) => new Z(e)));
}
__name(Ke, "Ke");
function et(n2) {
  return Object.freeze((n2.indexes || []).map((e) => new X(e)));
}
__name(et, "et");
var M = class extends i {
  static {
    __name(this, "M");
  }
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
    return [
      ...this._properties.map((e) => e.toString()),
      ...this._methods.map((e) => e.toString())
    ];
  }
};
var v = class extends M {
  static {
    __name(this, "v");
  }
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
  static {
    __name(this, "ee");
  }
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
  static {
    __name(this, "te");
  }
  constructor(e) {
    super(e), this._entries = Object.entries(e.entries || {}).map(([t, a]) => Object.freeze([
      t,
      a
    ]));
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
  static {
    __name(this, "D");
  }
  constructor(e) {
    super(e), this._signatures = K(e);
  }
  getSignatures() {
    return this._signatures;
  }
};
var re = class extends i {
  static {
    __name(this, "re");
  }
  constructor(e) {
    super(e), this._signatures = K(e);
  }
  getSignatures() {
    return this._signatures;
  }
};
var ne = class extends M {
  static {
    __name(this, "ne");
  }
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
  static {
    __name(this, "k");
  }
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
  static {
    __name(this, "w");
  }
  constructor(t) {
    super(t);
    this.operatorSymbol = " & ";
  }
};
var A = class extends i {
  static {
    __name(this, "A");
  }
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
  static {
    __name(this, "ae");
  }
  constructor(e) {
    super(e);
  }
};
var ie = class extends i {
  static {
    __name(this, "ie");
  }
  constructor(e) {
    super(e), this.head = e.head, this.templateSpans = e.templateSpans;
  }
};
var oe = class extends i {
  static {
    __name(this, "oe");
  }
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
  static {
    __name(this, "E");
  }
  constructor(t) {
    super(t);
    this.operatorSymbol = " | ";
  }
};
var se = class extends i {
  static {
    __name(this, "se");
  }
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
  static {
    __name(this, "pe");
  }
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
  static {
    __name(this, "ye");
  }
  get target() {
    return this._target.type;
  }
  constructor(e) {
    super(e), this._target = new y(e.target);
  }
  getPropsToStringify() {
    return [
      `target: ${this._target.type.id}`
    ];
  }
};
var de = class extends i {
  static {
    __name(this, "de");
  }
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
  static {
    __name(this, "le");
  }
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
  static {
    __name(this, "h");
  }
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
  static {
    __name(this, "P");
  }
  constructor(e) {
    super(import_core3.TypeIds.PromiseDefinition, e);
  }
};
var ce = class extends h {
  static {
    __name(this, "ce");
  }
  constructor(e) {
    super(import_core3.TypeIds.ArrayDefinition, e);
  }
};
var me = class extends h {
  static {
    __name(this, "me");
  }
  constructor(e) {
    super(import_core3.TypeIds.ReadonlyArrayDefinition, e);
  }
};
var fe = class extends h {
  static {
    __name(this, "fe");
  }
  constructor(e) {
    super(import_core3.TypeIds.SetDefinition, e);
  }
};
var ue = class extends h {
  static {
    __name(this, "ue");
  }
  constructor(e) {
    super(import_core3.TypeIds.WeakSetDefinition, e);
  }
};
var Te = class extends h {
  static {
    __name(this, "Te");
  }
  constructor(e) {
    super(import_core3.TypeIds.MapDefinition, e);
  }
};
var he = class extends h {
  static {
    __name(this, "he");
  }
  constructor(e) {
    super(import_core3.TypeIds.WeakMapDefinition, e);
  }
};
var be = class extends h {
  static {
    __name(this, "be");
  }
  constructor(e) {
    super(import_core3.TypeIds.TupleDefinition, e);
  }
};
var ge = class extends i {
  static {
    __name(this, "ge");
  }
};
var Ae = class extends i {
  static {
    __name(this, "Ae");
  }
};
var ct = 1;
var Ie = class {
  static {
    __name(this, "Ie");
  }
  static create(e, t, a) {
    return new v({
      kind: 64,
      id: `${ct++}#${e}`,
      name: t.name,
      typeArguments: a.map((p) => p.id),
      module: t.module.id,
      properties: t.getProperties().map((p) => p.metadata),
      indexes: t.getIndexes().map((p) => p.metadata),
      methods: t.getMethods().map((p) => p.metadata),
      constructors: t.getConstructors().map((p) => p.metadata),
      decorators: t.getDecorators(),
      ctor: t.getCtor,
      extends: t.extends?.id,
      exported: t.exported,
      implements: t.implements.map((p) => p.id),
      nullable: t.nullable,
      isGenericTypeDefinition: false,
      genericTypeDefinition: t.id,
      abstract: t.abstract
    });
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
__name(mt, "mt");
var Me = class {
  static {
    __name(this, "Me");
  }
  static create(e) {
    return mt(e);
  }
};
var xe = class n {
  static {
    __name(this, "n");
  }
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
      this.createdTypes[o] = p = {
        [g]: class extends e {
        }
      }[g];
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
  return tt || (Ce = new i({
    kind: 63,
    name: "Array",
    id: `#Array{${import_core7.TypeIds.Any}}`,
    module: import_core7.ModuleIds.Native,
    genericTypeDefinition: "#Array",
    typeArguments: [
      import_core7.TypeIds.Any
    ]
  }), rt = new D({
    kind: 72,
    name: "Function",
    id: "#Function:unknown",
    module: import_core7.ModuleIds.Native,
    signatures: [
      {
        parameters: [
          {
            name: "x",
            flags: 2,
            type: Ce.id
          }
        ],
        returnType: import_core7.TypeIds.Unknown
      }
    ]
  }), l = {
    ArrayDefinition: s("Array", "ArrayDefinition"),
    ReadonlyArrayDefinition: s("ReadonlyArray", "ReadonlyArrayDefinition"),
    TupleDefinition: s("Tuple", "TupleDefinition"),
    MapDefinition: s("Map", "MapDefinition"),
    WeakMapDefinition: s("WeakMap", "WeakMapDefinition"),
    SetDefinition: s("Set", "SetDefinition"),
    WeakSetDefinition: s("WeakSet", "WeakSetDefinition"),
    PromiseDefinition: s("Promise", "PromiseDefinition"),
    GeneratorDefinition: s("Generator", "GeneratorDefinition"),
    AsyncGeneratorDefinition: s("AsyncGenerator", "AsyncGeneratorDefinition"),
    IteratorDefinition: s("Iterator", "IteratorDefinition"),
    IterableDefinition: s("Iterable", "IterableDefinition"),
    IterableIteratorDefinition: s("IterableIterator", "IterableIteratorDefinition"),
    AsyncIteratorDefinition: s("AsyncIterator", "AsyncIteratorDefinition"),
    AsyncIterableDefinition: s("AsyncIterable", "AsyncIterableDefinition"),
    AsyncIterableIteratorDefinition: s("AsyncIterableIterator", "AsyncIterableIteratorDefinition")
  }, nt = {
    Invalid: s("Invalid", "Invalid", import_core7.ModuleIds.Invalid),
    NonPrimitiveObject: s("object", "NonPrimitiveObject"),
    Any: s("any", "Any"),
    Unknown: s("unknown", "Unknown"),
    Void: s("void", "Void"),
    Never: s("never", "Never"),
    Null: s("null", "Null"),
    Undefined: s("undefined", "Undefined"),
    Intrinsic: s("intrinsic", "Intrinsic"),
    String: s("String", "String"),
    Number: s("Number", "Number"),
    BigInt: s("BigInt", "BigInt"),
    Boolean: s("Boolean", "Boolean"),
    True: new A({
      id: import_core7.TypeIds.True,
      kind: 10,
      name: "true",
      module: import_core7.ModuleIds.Native,
      value: true
    }),
    False: new A({
      id: import_core7.TypeIds.False,
      kind: 9,
      name: "false",
      module: import_core7.ModuleIds.Native,
      value: false
    }),
    Date: s("Date", "Date"),
    Error: s("Error", "Error"),
    Symbol: s("Symbol", "Symbol"),
    UniqueSymbol: s("UniqueSymbol", "UniqueSymbol"),
    RegExp: s("RegExp", "RegExp"),
    Int8Array: s("Int8Array", "Int8Array"),
    Uint8Array: s("Uint8Array", "Uint8Array"),
    Uint8ClampedArray: s("Uint8ClampedArray", "Uint8ClampedArray"),
    Int16Array: s("Int16Array", "Int16Array"),
    Uint16Array: s("Uint16Array", "Uint16Array"),
    Int32Array: s("Int32Array", "Int32Array"),
    Uint32Array: s("Uint32Array", "Uint32Array"),
    Float32Array: s("Float32Array", "Float32Array"),
    Float64Array: s("Float64Array", "Float64Array"),
    BigInt64Array: s("BigInt64Array", "BigInt64Array"),
    BigUint64Array: s("BigUint64Array", "BigUint64Array"),
    ArrayBuffer: s("ArrayBuffer", "ArrayBuffer"),
    SharedArrayBuffer: s("SharedArrayBuffer", "SharedArrayBuffer"),
    Atomics: s("Atomics", "Atomics"),
    DataView: s("DataView", "DataView"),
    ArrayDefinition: l.ArrayDefinition,
    ReadonlyArrayDefinition: l.ReadonlyArrayDefinition,
    TupleDefinition: l.TupleDefinition,
    MapDefinition: l.MapDefinition,
    WeakMapDefinition: l.WeakMapDefinition,
    SetDefinition: l.SetDefinition,
    WeakSetDefinition: l.WeakSetDefinition,
    PromiseDefinition: l.PromiseDefinition,
    GeneratorDefinition: l.GeneratorDefinition,
    AsyncGeneratorDefinition: l.AsyncGeneratorDefinition,
    IteratorDefinition: l.IteratorDefinition,
    IterableDefinition: l.IterableDefinition,
    IterableIteratorDefinition: l.IterableIteratorDefinition,
    AsyncIteratorDefinition: l.AsyncIteratorDefinition,
    AsyncIterableDefinition: l.AsyncIterableDefinition,
    AsyncIterableIteratorDefinition: l.AsyncIterableIteratorDefinition
  }, tt = true), {
    AnyArray: Ce,
    UnknownFunction: rt,
    nativeTypes: nt,
    nativeGenericTypeDefinitions: l
  };
}
__name(F, "F");
function s(n2, e, t = import_core7.ModuleIds.Native) {
  let a = u[e], o = import_core7.TypeIds[e], p = e.endsWith("Definition");
  if (o === void 0 || a === void 0) throw new Error(`Invalid prop name. kind = ${a}, id = ${o}`);
  return new i({
    kind: a,
    name: n2,
    id: o,
    module: t,
    isGenericTypeDefinition: p
  });
}
__name(s, "s");
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
__name(it, "it");
var Be = "reflect-gettype-error-disable";
var Tt = /^([#@][^,|&]+?)\{(.+?)}(\?)?$/;
var ht = /* @__PURE__ */ new Map([
  [
    "#Promise",
    P
  ],
  [
    "#Array",
    ce
  ],
  [
    "#ReadonlyArray",
    me
  ],
  [
    "#Set",
    fe
  ],
  [
    "#WeakSet",
    ue
  ],
  [
    "#Map",
    Te
  ],
  [
    "#WeakMap",
    he
  ],
  [
    "#Tuple",
    be
  ]
]);
var _e = class {
  static {
    __name(this, "_e");
  }
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
    let a = e.name !== void 0 ? `${e.name}{}` : t.name, o = {
      [a]: class {
      }
    }[a];
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
    return new A({
      id: e,
      value: a === 76 ? t.slice(1, -1) : t,
      kind: a,
      module: import_core4.ModuleIds.Native,
      name: t
    });
  }
  getTypeIdInfo(e) {
    let t = e.match(Tt);
    if (t) return {
      type: t[1],
      arguments: t[2].split(","),
      nullable: t[3] === "?"
    };
  }
  handleAdhocType(e) {
    if (e.slice(0, 3) === "#L(") {
      let o = this.createLiteralType(e);
      return this.addType(o), o;
    }
    let t = this.getTypeIdInfo(e);
    if (!t) return;
    if (t.type === "#|" || t.type === "#&") {
      let o = new (t.type === "#|" ? E : w)({
        id: e,
        module: import_core4.ModuleIds.Native,
        name: t.type,
        kind: 65,
        types: t.arguments,
        nullable: t.nullable
      });
      return this.addType(o), o;
    }
    let a = ht.get(t.type);
    if (a) {
      let o = new a({
        id: e,
        module: import_core4.ModuleIds.Native,
        name: `${t.type.slice(1)}<'${t.arguments.length}>`,
        kind: 93,
        typeArguments: t.arguments.map((p) => p)
      });
      return this.addType(o), o;
    }
    if (t.type[0] === "@") {
      let o = new i({
        id: e,
        module: import_core4.ModuleIds.Native,
        name: `${t.type.slice(1)}<'${t.arguments.length}>`,
        kind: 93,
        typeArguments: t.arguments.map((p) => p),
        genericTypeDefinition: t.type
      });
      return this.addType(o), o;
    }
  }
};
var U = class extends _e {
  static {
    __name(this, "U");
  }
  constructor(e) {
    super(e, "Global metadata library");
  }
};
var B = J("rttist/Metadata", () => new U({
  nullability: false
}));
var Oi = {
  metadata: Symbol.for("__Rttist.metadata__")
};
We(Me);
Ye(Ie);
m.setScope(B);
var { nativeTypes: pt, nativeGenericTypeDefinitions: Mt, AnyArray: xt, UnknownFunction: _t } = F();
for (let [n2, e] of Object.entries(pt).concat(Object.entries(Mt))) i[n2] = e;
c.Invalid = new c({
  id: import_core8.ModuleIds.Invalid,
  name: "invalid",
  path: ""
});
c.Dynamic = new c({
  id: import_core8.ModuleIds.Dynamic,
  name: "dynamic",
  path: ""
});
c.Native = new c({
  id: import_core8.ModuleIds.Native,
  name: "native",
  path: ""
});
B.addType(...Object.values(pt));
B.addType(xt, _t);
B.addModule(c.Native, c.Invalid, c.Dynamic);

// src/index.ts
function _ts_decorate(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k2, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k2, v2);
}
__name(_ts_metadata, "_ts_metadata");
var AssistantAgent = class AssistantAgent2 {
  static {
    __name(this, "AssistantAgent");
  }
};
_ts_decorate([
  Prompt("Ask your question"),
  Description("This method allows the agent to answer your question"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String
  ]),
  _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AssistantAgent.prototype, "ask", null);
AssistantAgent = _ts_decorate([
  AgentDefinition()
], AssistantAgent);
var AssistantAgentImpl = class AssistantAgentImpl2 extends AssistantAgent {
  static {
    __name(this, "AssistantAgentImpl");
  }
  ask(name) {
    const weather = new WeatherAgentImpl();
    return weather.getWeather(name);
  }
};
AssistantAgentImpl = _ts_decorate([
  AgentImplementation()
], AssistantAgentImpl);
var WeatherAgent = class WeatherAgent2 {
  static {
    __name(this, "WeatherAgent");
  }
};
_ts_decorate([
  Prompt("Get weather"),
  Description("Weather forecast weather for you"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String
  ]),
  _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], WeatherAgent.prototype, "getWeather", null);
WeatherAgent = _ts_decorate([
  AgentDefinition()
], WeatherAgent);
var WeatherAgentImpl = class WeatherAgentImpl2 extends WeatherAgent {
  static {
    __name(this, "WeatherAgentImpl");
  }
  getWeather(name) {
    B.getTypes().forEach((type) => {
      console.log(type.name);
    });
    return Promise.resolve(`Weather in ${name} is sunny`);
  }
};
WeatherAgentImpl = _ts_decorate([
  AgentImplementation()
], WeatherAgentImpl);
