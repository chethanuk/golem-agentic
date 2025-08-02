import { WasmRpc } from 'golem:rpc/types@0.2.2';
import { getSelfMetadata } from 'golem:api/host@1.1.7';

/**
 * Represents a globally unique identifier for an agent instance.
 */
class AgentId {
    /**
     * Creates a new `AgentId` instance.
     *
     * @param agentContainerName - The name of the container (e.g., worker or module) in which the agent lives.
     * @param agentName - The name of the agent.
     *   This is typically a unique identifier for the agent type,
     *   and is used in coordination with the container name and
     *   sequence number to form a globally unique `AgentId`.
     * @param localAgentSeqNum - A numeric sequence number to distinguish multiple instances.
     */
    constructor(agentContainerName, agentName, localAgentSeqNum) {
        this.agentContainerName = agentContainerName;
        this.agentName = agentName;
        this.localAgentSeqNum = localAgentSeqNum;
    }
    toString() {
        return `${this.agentContainerName}--${this.agentName}--${this.localAgentSeqNum}`;
    }
    static fromString(s) {
        const parts = s.split("--");
        if (parts.length < 3) {
            throw new Error(`Invalid AgentId format: ${s}`);
        }
        const count = parseInt(parts.pop(), 10);
        const agentName = parts.pop();
        const workerName = parts.join("--");
        return new AgentId(workerName, agentName, count);
    }
}

const agentRegistry = new Map();
function getRegisteredAgents() {
    return Array.from(agentRegistry.values());
}

const agentInitiators = new Map();

/**
 * BaseAgent is the foundational class for defining agent implementations.
 *
 * All agents must extend this class and **must** be decorated with the `@Agent()` decorator.
 * Do **not** need to override the methods and manually implement them in this class.
 * The `@Agent()` decorator handles all runtime wiring (e.g., `getId()`, `createRemote()`, etc.).
 *
 * Example usage:
 *
 * ```ts
 * @Agent()
 * class AssistantAgent extends BaseAgent {
 *   @Prompt("Ask your question")
 *   @Description("This method allows the agent to answer your question")
 *   async ask(name: string): Promise<string> {
 *      return `Hello ${name}, I'm the assistant agent (${this.getId()})!`;
 *   }
 * }
 * ```
 */
class BaseAgent {
    /**
     * Returns the unique `AgentId` for this agent instance.
     *
     * This is automatically populated by the `@Agent()` decorator at runtime.
     *
     * @throws Will throw if accessed before the agent is initialized.
     */
    getId() {
        throw new Error("An agent ID will be created at runtime");
    }
    /**
     * Returns the `AgentType` metadata registered for this agent.
     *
     * This information is retrieved from the runtime agent registry and reflects
     * metadata defined via decorators like `@Agent()`, `@Prompt()`, etc.
     *
     * @throws Will throw if metadata is missing or the agent is not properly registered.
     */
    getAgentType() {
        const type = agentRegistry.get(this.constructor.name);
        if (!type) {
            throw new Error(`Agent type not found for ${this.constructor.name}`);
        }
        return type;
    }
    /**
     * Creates a remote client instance of this agent type.
     *
     * This remote client will communicate with an agent instance running
     * in a separate container, effectively offloading computation to that remote context.
     *
     * @param args - Constructor arguments for the agent
     * @returns A remote proxy instance of the agent
     *
     * @example
     * const remoteClient = MyAgent.createRemote("arg1", "arg2") where `arg1`, `arg2` are the constructor arguments
     * validated at compile time.
     */
    static createRemote(...args) {
        throw new Error("A remote client will be created at runtime");
    }
    /**
     * Creates a local instance of the agent within the current container.
     *
     * This method is preferred over directly calling `new MyAgent(arg1, arg2)` as it ensures
     * correct initialization, agent ID assignment, etc.
     *
     * @param args - Constructor arguments for the agent
     * @returns A locally instantiated agent
     *
     * @example
     * const localClient = MyAgent.createLocal("arg1", "arg2") where `arg1`, `arg2` are the constructor arguments
     * validated at compile time.;
     */
    static createLocal(...args) {
        throw new Error("A local client will be created at runtime");
    }
}

class ResolvedAgent {
    constructor(name, tsAgentInternal, originalInstance) {
        this.name = name;
        this.agentInternal = tsAgentInternal;
        this.classInstance = originalInstance;
    }
    getId() {
        return this.agentInternal.getId();
    }
    invoke(methodName, args) {
        return this.agentInternal.invoke(methodName, args);
    }
    getDefinition() {
        return agentRegistry.get(this.name);
    }
}

var dist = {};

var consts = {};

var hasRequiredConsts;

function requireConsts () {
	if (hasRequiredConsts) return consts;
	hasRequiredConsts = 1;
	(function (exports) {
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
		    RttistModule: "@rttist/dist/Module",
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
		    DataView: "#DataView",
		}; 
	} (consts));
	return consts;
}

var declarations = {};

var hasRequiredDeclarations;

function requireDeclarations () {
	if (hasRequiredDeclarations) return declarations;
	hasRequiredDeclarations = 1;
	Object.defineProperty(declarations, "__esModule", { value: true });
	return declarations;
}

var getCallsiteTypeArguments = {};

var hasRequiredGetCallsiteTypeArguments;

function requireGetCallsiteTypeArguments () {
	if (hasRequiredGetCallsiteTypeArguments) return getCallsiteTypeArguments;
	hasRequiredGetCallsiteTypeArguments = 1;
	Object.defineProperty(getCallsiteTypeArguments, "__esModule", { value: true });
	getCallsiteTypeArguments.getCallsiteTypeArguments = getCallsiteTypeArguments$1;
	const consts_1 = requireConsts();
	function getCallsiteTypeArguments$1(fn) {
	    const callsiteArgs = fn[consts_1.CALLSITE_TYPE_ARGS_PROPERTY];
	    fn[consts_1.CALLSITE_TYPE_ARGS_PROPERTY] = undefined;
	    return callsiteArgs;
	}
	return getCallsiteTypeArguments;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {
		var __createBinding = (dist && dist.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (dist && dist.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		__exportStar(requireConsts(), exports);
		__exportStar(requireDeclarations(), exports);
		__exportStar(requireGetCallsiteTypeArguments(), exports); 
	} (dist));
	return dist;
}

var distExports = requireDist();

var m={current:null,setScope(n){this.current=n;},doWithScope(n,e){let t=this.current;this.setScope(n);try{e();}finally{this.setScope(t);}}};var Se=null;function We(n){Se=n;}function j(){if(!Se)throw new Error("Type factory is not set");return Se}var Le=null;function Ye(n){Le=n;}function qe(){if(!Le)throw new Error("Type factory is not set");return Le}function*Re(){for(let n=0;n<100;n++)yield distExports.TypeIds.Invalid;}function ve(n,e,t){let a=n[distExports.CALLSITE_TYPE_ARGS_PROPERTY];if(n[distExports.CALLSITE_TYPE_ARGS_PROPERTY]=void 0,e!==void 0);return a||Re()}var De=Symbol.for("rttist/Type"),ke=Symbol.for("rttist/Module");function G(n){return n&&typeof n=="object"&&n.constructor.__type===De}function $(n){return n&&typeof n=="object"&&n.constructor.__type===ke}var W=class{constructor(e){this.metadataLibrary=m.current;if(!e)throw new Error("Invalid module reference.");this._reference=e;}get module(){return this._module??(this._module=this.metadataLibrary.resolveModule(this._reference)),this._module}};var y=class{constructor(e){this.metadataLibrary=m.current;if(!e)throw new Error("Invalid type reference.");this._reference=e;}get type(){return this._type??(this._type=this.metadataLibrary.resolveType(this._reference)),this._type}};var T=class{constructor(e){this.metadataLibrary=m.current;this._references=e,this.length=e.length;}get types(){return this._types??(this._types=Object.freeze(this._references.map(e=>this.metadataLibrary.resolveType(e)))),this._types}};var u=(r=>(r[r.Invalid=0]="Invalid",r[r.Unknown=1]="Unknown",r[r.Any=2]="Any",r[r.Never=3]="Never",r[r.Void=4]="Void",r[r.Undefined=5]="Undefined",r[r.Null=6]="Null",r[r.Intrinsic=7]="Intrinsic",r[r.Boolean=8]="Boolean",r[r.False=9]="False",r[r.True=10]="True",r[r.Number=11]="Number",r[r.BigInt=12]="BigInt",r[r.String=13]="String",r[r.Symbol=14]="Symbol",r[r.NonPrimitiveObject=15]="NonPrimitiveObject",r[r.ObjectType=16]="ObjectType",r[r.FunctionType=17]="FunctionType",r[r.Date=18]="Date",r[r.Error=19]="Error",r[r.RegExp=20]="RegExp",r[r.Int8Array=21]="Int8Array",r[r.Uint8Array=22]="Uint8Array",r[r.Uint8ClampedArray=23]="Uint8ClampedArray",r[r.Int16Array=24]="Int16Array",r[r.Uint16Array=25]="Uint16Array",r[r.Int32Array=26]="Int32Array",r[r.Uint32Array=27]="Uint32Array",r[r.Float32Array=28]="Float32Array",r[r.Float64Array=29]="Float64Array",r[r.BigInt64Array=30]="BigInt64Array",r[r.BigUint64Array=31]="BigUint64Array",r[r.ArrayBuffer=32]="ArrayBuffer",r[r.SharedArrayBuffer=33]="SharedArrayBuffer",r[r.Atomics=34]="Atomics",r[r.DataView=35]="DataView",r[r.ArrayDefinition=36]="ArrayDefinition",r[r.ReadonlyArrayDefinition=37]="ReadonlyArrayDefinition",r[r.TupleDefinition=38]="TupleDefinition",r[r.MapDefinition=39]="MapDefinition",r[r.WeakMapDefinition=40]="WeakMapDefinition",r[r.SetDefinition=41]="SetDefinition",r[r.WeakSetDefinition=42]="WeakSetDefinition",r[r.PromiseDefinition=43]="PromiseDefinition",r[r.GeneratorDefinition=44]="GeneratorDefinition",r[r.AsyncGeneratorDefinition=45]="AsyncGeneratorDefinition",r[r.IteratorDefinition=46]="IteratorDefinition",r[r.IterableDefinition=47]="IterableDefinition",r[r.IterableIteratorDefinition=48]="IterableIteratorDefinition",r[r.AsyncIteratorDefinition=49]="AsyncIteratorDefinition",r[r.AsyncIterableDefinition=50]="AsyncIterableDefinition",r[r.AsyncIterableIteratorDefinition=51]="AsyncIterableIteratorDefinition",r[r.Module=60]="Module",r[r.Namespace=61]="Namespace",r[r.Object=62]="Object",r[r.Interface=63]="Interface",r[r.Class=64]="Class",r[r.Union=65]="Union",r[r.Intersection=66]="Intersection",r[r.ConditionalType=67]="ConditionalType",r[r.IndexedAccess=68]="IndexedAccess",r[r.TypeParameter=69]="TypeParameter",r[r.Alias=70]="Alias",r[r.Method=71]="Method",r[r.Function=72]="Function",r[r.GeneratorFunction=73]="GeneratorFunction",r[r.NumberLiteral=74]="NumberLiteral",r[r.BigIntLiteral=75]="BigIntLiteral",r[r.StringLiteral=76]="StringLiteral",r[r.TemplateLiteral=77]="TemplateLiteral",r[r.EnumLiteral=78]="EnumLiteral",r[r.RegExpLiteral=79]="RegExpLiteral",r[r.Enum=80]="Enum",r[r.UniqueSymbol=81]="UniqueSymbol",r[r.ESSymbol=82]="ESSymbol",r[r.Promise=83]="Promise",r[r.Generator=84]="Generator",r[r.AsyncGenerator=85]="AsyncGenerator",r[r.Iterator=86]="Iterator",r[r.Iterable=87]="Iterable",r[r.IterableIterator=88]="IterableIterator",r[r.AsyncIterator=89]="AsyncIterator",r[r.AsyncIterable=90]="AsyncIterable",r[r.AsyncIterableIterator=91]="AsyncIterableIterator",r[r.Jsx=92]="Jsx",r[r.Type=93]="Type",r[r.TypeCtor=94]="TypeCtor",r))(u||{});var C=(a=>(a[a.None=0]="None",a[a.Getter=1]="Getter",a[a.Setter=2]="Setter",a))(C||{});var S=(a=>(a[a.Public=0]="Public",a[a.Private=1]="Private",a[a.Protected=2]="Protected",a))(S||{});var we=new Set([76,74,10,9,75,79,77]),Ee=new Set([13,8,11,12,14,81,6,5]);var Pe=(t=>(t[t.ES=0]="ES",t[t.Unique=1]="Unique",t))(Pe||{});function Y(n){return ((n||0)&24)>>3}function Xe(n){return ((n||0)&96)>>5}var Ne=(a=>(a[a.None=0]="None",a[a.Optional=1]="Optional",a[a.Rest=2]="Rest",a))(Ne||{}),lt=(o=>(o[o.Optional=1]="Optional",o[o.Static=2]="Static",o[o.Private=8]="Private",o[o.Protected=16]="Protected",o))(lt||{}),Ze=(t=>(t[t.None=0]="None",t[t.Readonly=1]="Readonly",t))(Ze||{}),Oe=(d=>(d[d.None=0]="None",d[d.Optional=1]="Optional",d[d.Readonly=2]="Readonly",d[d.Static=4]="Static",d[d.Private=8]="Private",d[d.Protected=16]="Protected",d[d.Getter=32]="Getter",d[d.Setter=64]="Setter",d))(Oe||{});var L=class L{constructor(e){this._isIterable=false;this.metadataLibrary=m.current;if(!e.module)throw new Error("Type must have a module.");this._id=e.id,this._kind=e.kind,this._name=e.name,this._exported=e.exported||false,this._moduleRef=new W(e.module),this._nullable=e.nullable||this.metadataLibrary.configuration.nullability||false,this._definitionRef=e.genericTypeDefinition?new y(e.genericTypeDefinition):void 0,this._isGenericTypeDefinition=e.isGenericTypeDefinition||false,this._typeArgumentsRef=new T(e.typeArguments||[]);}get id(){return this._id}get displayName(){return `<${u[this._kind]} ${this._name} [${this._id}]>`}get kind(){return this._kind}get module(){return this._moduleRef.module}get name(){return this._name}get exported(){return this._exported}get iterable(){return this._isIterable}get nullable(){return this._nullable}get genericTypeDefinition(){return this._isGenericTypeDefinition?this:this._definitionRef?.type}[Symbol.for("nodejs.util.inspect.custom")](){return this.toString()}is(e){if(e===void 0){let[t]=ve(this.is);e=this.metadataLibrary.resolveType(t);}return this._id===e._id}getTypeArguments(){return this._typeArgumentsRef.types}isGenericType(){return this._typeArgumentsRef.length>0}isGenericTypeDefinition(){return this._isGenericTypeDefinition}isTypeParameter(){return this._kind===69}isUnion(){return this._kind===65}isIntersection(){return this._kind===66}isClass(){return this._kind===64}isInterface(){return this._kind===63}isTypeAlias(){return this._kind===70}isLiteral(){return we.has(this._kind)}isUnionOrIntersection(){return this.isUnion()||this.isIntersection()}isArray(){return this.isGenericType()&&(this.genericTypeDefinition===L.ArrayDefinition||this.genericTypeDefinition===L.ReadonlyArrayDefinition)}isTuple(){return this.isGenericType()&&this.genericTypeDefinition===L.TupleDefinition}isEnum(){return this._kind===80}isConditional(){return this._kind===67}isObjectLike(){return this.isObject()||this.isClass()||this.isInterface()}isObject(){return this._kind===62}isTemplate(){return this._kind===77}isFunction(){return this._kind===72}isESSymbol(){return this._kind===82}isUniqueSymbol(){return this._kind===81}isInstantiable(){return this.isClass()||this.isFunction()}isPrimitive(){return Ee.has(this._kind)}isString(){return this._kind===13||this._kind===76||this._kind===77}isNumber(){return this._kind===11||this._kind===74}isBigInt(){return this._kind===12||this._kind===75}isBoolean(){return this._kind===8||this._kind===10||this._kind===9}isAny(){return this._kind===2}isNever(){return this._kind===3}isVoid(){return this._kind===4}isIntrinsic(){return this._kind===7}isUndefined(){return this._kind===5}isNull(){return this._kind===6}toString(){let e=this.getPropsToStringify();return `${this.displayName} {
    \`\`\`typeinfo
    typelib: ${this.metadataLibrary.name}
    module:  ${this.module.id}
    \`\`\``+(e.length?`
`:"")+this.stringifyProps(e,1)+`
}`}getPropsToStringify(){return []}stringifyProps(e,t){let a="    ".repeat(t);return e.map(o=>(Array.isArray(o)?this.stringifyProps(o,1):o).replace(/^/gm,a)).join(`
`)}};L.__type=De;var i=L;function V(){return typeof globalThis=="object"?globalThis:typeof window=="object"?window:global}function J(n,e){let t=V(),a=Symbol.for(n);return t[a]||(t[a]=e())}var Ue=class{constructor(){this.importMap={};}registerImporters(e){Object.keys(e).forEach(t=>{this.importMap[t]=e[t];});}import(e){return this.importMap[e]?.()??Promise.resolve(void 0)}},Ge=J("rttist/ModuleImporter",()=>new Ue);var H=class{constructor(e){this.metadataLibrary=m.current;this._references=e,this.length=e.length;}get modules(){return this._modules??(this._modules=Object.freeze(this._references.map(e=>this.metadataLibrary.resolveModule(e)))),this._modules}};var c=class{get id(){return this._id}constructor(e){this._id=e.id,this._import=e.import??(()=>Ge.import(e.id)),this.name=e.name,this.path=e.path,this._childrenRefs=new H(e.children||[]),this._types=Object.freeze((e.types||[]).map(t=>(t.module=e.id,j().create(t))));}getChildren(){return this._childrenRefs.modules}getTypes(){return this._types}import(){return this._import()}};c.__type=ke;var b=class{constructor(e){this.metadata=e,this.name=e.name,this.id=e.id,this._args=Object.freeze(e.args||[]);}getArguments(){return this._args}is(e){return e.id===this.id}};var X=class{get keyType(){return this._keyTypeRef.type}get type(){return this._typeRef.type}constructor(e){this.metadata=e,this._keyTypeRef=new y(e.key),this._typeRef=new y(e.type),this.readonly=(e.flags&1)!==0;}};var R=class{constructor(e){if(typeof e=="object"){if(this.key=e.key,this.kind=e.kind,e.kind===0){this.name=Symbol[e.key];return}this.name=Symbol.for(e.key);return}this.name=e;}isString(){return typeof this.name=="string"}isNumber(){return typeof this.name=="number"}isSymbol(){return typeof this.name=="symbol"}toString(){return this.isSymbol()?`Symbol.for('${this.key}')`:this.name.toString()}};var Q=class{get type(){return this._type.type}constructor(e){this.name=e.name,this._type=new y(e.type),this.optional=(e.flags&1)!==0,this.rest=(e.flags&2)!==0,this._decorators=Object.freeze((e.decorators||[]).map(t=>new b(t)));}getDecorators(){return this._decorators}toString(){return this.getDecorators().map(e=>"@"+e.name).join(" ")+(this.rest?"...":"")+`${this.name.toString()}${this.optional?"?":""}: ${this.type.displayName}`}};var I=class{get returnType(){return this._returnTypeRef.type}constructor(e){this.metadata=e,this._parameters=Object.freeze((e.parameters||[]).map(t=>new Q(t))),this._typeParametersRef=new T(e.typeParameters||[]),this._returnTypeRef=new y(e.returnType);}getParameters(){return this._parameters}getTypeParameters(){return this._typeParametersRef.types}toString(){return `(${this._parameters.map(t=>t.toString()).join(", ")}): ${this.returnType.displayName}`}};var Z=class{get name(){return this._name}get optional(){return this._optional}get accessModifier(){return this._accessModifier}constructor(e){this.metadata=e,this._name=new R(e.name),this._signatures=Object.freeze((e.signatures||[]).map(t=>new I(t))),this._decorators=Object.freeze((e.decorators||[]).map(t=>new b(t))),this._accessModifier=Y(e.flags),this._optional=(e.flags&1)!==0;}getDecorators(){return this._decorators}getSignatures(){return this._signatures}toString(){let e=this._signatures.map(t=>(this._accessModifier?S[this._accessModifier]+" ":"")+this._name.toString()+(this._optional?"?":"")+t.toString()).join(`
`);return this._decorators.map(t=>"@"+t.name).join(`
`)+e}};var z=class{get type(){return this._type.type}constructor(e){this.name=new R(e.name),this._type=new y(e.type),this._decorators=Object.freeze((e.decorators||[]).map(t=>new b(t))),this.metadata=e,this.accessModifier=Y(e.flags),this.accessor=Xe(e.flags),this.optional=(e.flags&1)!==0,this.readonly=(e.flags&2)!==0;}getDecorators(){return this._decorators}toString(){return this.getDecorators().map(e=>"@"+e.name).join(" ")+(this.accessor?C[this.accessor]+" ":"")+(this.accessModifier?S[this.accessModifier]+" ":"")+(this.readonly?"readonly ":"")+`${this.name.toString()}${this.optional?"?":""}: ${this.type.displayName}`}};function K(n){return Object.freeze((n.signatures||[]).map(e=>new I(e)))}function ze(n){return Object.freeze((n.properties||[]).map(e=>new z(e)))}function Ke(n){return Object.freeze((n.methods||[]).map(e=>new Z(e)))}function et(n){return Object.freeze((n.indexes||[]).map(e=>new X(e)))}var M=class extends i{constructor(e){super(e),this._properties=ze(e),this._methods=Ke(e),this._indexes=et(e),this._isIterable=this._properties?.some(t=>t.name.isSymbol()&&t.name.name===Symbol.iterator)||this._methods?.some(t=>t.name.isSymbol()&&t.name.name===Symbol.iterator);}getProperties(){return this._properties}getProperty(e){return this._properties.find(t=>t.name.name===e)}getIndexes(){return this._indexes}getMethods(){return this._methods}getMethod(e){return this._methods.find(t=>t.name.name===e)}getPropsToStringify(){return [...this._properties.map(e=>e.toString()),...this._methods.map(e=>e.toString())]}};var v=class extends M{get extends(){return this._extendsRef?.type}get implements(){return this._implementsRef.types}get abstract(){return this._abstract}constructor(e){super(e),this._ctor=e.ctor??(()=>this.module.import().then(t=>t?.[e.name])),this._implementsRef=new T(e.implements||[]),this._extendsRef=e.extends===void 0?void 0:new y(e.extends),this._constructors=Object.freeze((e.constructors??[]).map(t=>new I(t))),this._decorators=Object.freeze((e.decorators??[]).map(t=>new b(t))),this._abstract=e.abstract??false;}getCtor(){return this._ctor()}getConstructors(){return this._constructors}getDecorators(){return this._decorators}isSubclassOf(e){return e.isClass()&&(this.extends!==void 0&&(this.extends.is(e)||this.extends.isClass()&&this.extends.isSubclassOf(e)||this.extends.isGenericType()&&this.extends.genericTypeDefinition.isClass()&&this.extends.genericTypeDefinition.isSubclassOf(e))||this.isGenericType()&&(this.genericTypeDefinition.is(e)||this.genericTypeDefinition?.isClass()&&this.genericTypeDefinition.isSubclassOf(e)))}isDerivedFrom(e){return this.is(e)||this.extends?.isDerivedFrom(e)||this.implements.some(t=>t.isInterface()?t.isDerivedFrom(e):t.is(e))||false}};var ee=class extends i{get extends(){return this._extendsRef.type}get trueType(){return this._trueTypeRef.type}get falseType(){return this._falseTypeRef.type}constructor(e){super(e),this._extendsRef=new y(e.extends),this._trueTypeRef=new y(e.trueType),this._falseTypeRef=new y(e.falseType);}};var te=class extends i{constructor(e){super(e),this._entries=Object.entries(e.entries||{}).map(([t,a])=>Object.freeze([t,a]));}getEnumerators(){return this.getEntries().map(e=>e[0])}getValues(){return this.getEntries().map(e=>e[1])}getEntries(){return this._entries.slice()}};var D=class extends i{constructor(e){super(e),this._signatures=K(e);}getSignatures(){return this._signatures}};var re=class extends i{constructor(e){super(e),this._signatures=K(e);}getSignatures(){return this._signatures}};var ne=class extends M{get extends(){return this._extendsRef.types}constructor(e){super(e),this._extendsRef=new T(e.extends||[]);}isDerivedFrom(e){return this.is(e)||this.extends.some(t=>t.isInterface()?t.isDerivedFrom(e):t.is(e))||false}};var k=class extends i{get types(){return this._types.types}constructor(e){super(e),this._types=new T(e.types||[]);}toString(){return `${this.types.map(e=>e.toString()).join(this.operatorSymbol)}`}};var w=class extends k{constructor(t){super(t);this.operatorSymbol=" & ";}};var A=class extends i{constructor(e){super(e),this.value=this.parseValue(e.value);}isStringLiteral(){return this._kind===76}isNumberLiteral(){return this._kind===74}isBooleanLiteral(){return this._kind===10||this._kind===9}isBigIntLiteral(){return this._kind===75}isRegExpLiteral(){return this._kind===79}isTrue(){return this.kind===10}isFalse(){return this.kind===9}parseValue(e){switch(this._kind){case 76:return e+"";case 74:return Number(e);case 9:case 10:return e==="true"||e===true;case 75:return BigInt(e[e.length-1]==="n"?e.slice(0,-1):e);case 79:return new RegExp(e)}return e}toString(){return `${u[this._kind]}(${this.value})`}};var ae=class extends M{constructor(e){super(e);}};var ie=class extends i{constructor(e){super(e),this.head=e.head,this.templateSpans=e.templateSpans;}};var oe=class extends i{get constraint(){return this._constraint?.type}get default(){return this._default?.type}constructor(e){super(e),this._constraint=e.constraint?new y(e.constraint):void 0,this._default=e.default?new y(e.default):void 0;}};var E=class extends k{constructor(t){super(t);this.operatorSymbol=" | ";}};var se=class extends i{get key(){return this._key}get symbol(){return this._symbol}constructor(e){super(e),this._key=e.key,this._symbol=Symbol[e.key];}toString(){return "@@"+this._key}};var pe=class extends i{get key(){return this._key}get symbol(){return this._symbol}constructor(e){super(e),this._key=e.key,e.key!==void 0&&(this._symbol=Symbol.for(e.key));}hasKey(){return this._key!==void 0}};var ye=class extends i{get target(){return this._target.type}constructor(e){super(e),this._target=new y(e.target);}getPropsToStringify(){return [`target: ${this._target.type.id}`]}};var de=class extends i{get objectType(){return this._objectTypeRef.type}get indexType(){return this._indexTypeRef.type}constructor(e){super(e),this._objectTypeRef=new y(e.objectType),this._indexTypeRef=new y(e.indexType);}};var le=class extends i{constructor(e){super(e),this.value=this.parseValue(e.value),this.enumRef=new y(e.enum);}isStringLiteral(){return this._kind===76}isNumberLiteral(){return this._kind===74}parseValue(e){switch(this._kind){case 76:return e+"";case 74:return Number(e)}return e}};var h=class extends i{get genericTypeDefinition(){return this._definitionRef.type}constructor(e,t){t.genericTypeDefinition=e,super(t);}getTypeArguments(){return this._typeArgumentsRef.types}};var P=class extends h{constructor(e){super(distExports.TypeIds.PromiseDefinition,e);}},ce=class extends h{constructor(e){super(distExports.TypeIds.ArrayDefinition,e);}},me=class extends h{constructor(e){super(distExports.TypeIds.ReadonlyArrayDefinition,e);}},fe=class extends h{constructor(e){super(distExports.TypeIds.SetDefinition,e);}},ue=class extends h{constructor(e){super(distExports.TypeIds.WeakSetDefinition,e);}},Te=class extends h{constructor(e){super(distExports.TypeIds.MapDefinition,e);}},he=class extends h{constructor(e){super(distExports.TypeIds.WeakMapDefinition,e);}},be=class extends h{constructor(e){super(distExports.TypeIds.TupleDefinition,e);}};var ge=class extends i{};var Ae=class extends i{};var ct=1,Ie=class{static create(e,t,a){return new v({kind:64,id:`${ct++}#${e}`,name:t.name,typeArguments:a.map(p=>p.id),module:t.module.id,properties:t.getProperties().map(p=>p.metadata),indexes:t.getIndexes().map(p=>p.metadata),methods:t.getMethods().map(p=>p.metadata),constructors:t.getConstructors().map(p=>p.metadata),decorators:t.getDecorators(),ctor:t.getCtor,extends:t.extends?.id,exported:t.exported,implements:t.implements.map(p=>p.id),nullable:t.nullable,isGenericTypeDefinition:false,genericTypeDefinition:t.id,abstract:t.abstract})}};function mt(n){switch(n.kind){case 74:case 75:case 76:case 79:return new A(n);case 77:return new ie(n);case 81:return new pe(n);case 82:return new se(n);case 62:return new ae(n);case 63:return new ne(n);case 64:return new v(n);case 69:return new oe(n);case 70:return new ye(n);case 67:return new ee(n);case 68:return new de(n);case 60:return new Ae(n);case 61:return new ge(n);case 65:return new E(n);case 66:return new w(n);case 72:return new D(n);case 73:return new re(n);case 80:return new te(n);case 78:return new le(n);case 83:return new P(n)}return console.warn("Creating Type of unknown TypeKind.",n),new i(n)}var Me=class{static create(e){return mt(e)}};var xe=class n{constructor(e){this.metadataLibrary=e;this.createdTypes={};}getGenericClass(e,t){let a=this.metadataLibrary.getType(e);if(!a.isClass())return console.error("GenericTypeRegister.getGenericClass called for type which is not a ClassType."),class{};let o=n.getId(a,t),p=this.createdTypes[o];if(!p){let g=`${e.name}{${t.map(d=>d.name).join(",")}}`;this.createdTypes[o]=p={[g]:class extends e{}}[g];let f=qe().create(o,a,t);this.metadataLibrary.addType(f),p.prototype[distExports.PROTOTYPE_TYPE_INSTANCE_PROPERTY]=f,p.prototype[distExports.PROTOTYPE_TYPE_PROPERTY]=f.id;}return p}static getId(e,t){return `${e.id}{${t.map(a=>a.id).join(",")}}`}};var tt=false,Ce,rt,nt={},l={};function F(){return tt||(Ce=new i({kind:63,name:"Array",id:`#Array{${distExports.TypeIds.Any}}`,module:distExports.ModuleIds.Native,genericTypeDefinition:"#Array",typeArguments:[distExports.TypeIds.Any]}),rt=new D({kind:72,name:"Function",id:"#Function:unknown",module:distExports.ModuleIds.Native,signatures:[{parameters:[{name:"x",flags:2,type:Ce.id}],returnType:distExports.TypeIds.Unknown}]}),l={ArrayDefinition:s("Array","ArrayDefinition"),ReadonlyArrayDefinition:s("ReadonlyArray","ReadonlyArrayDefinition"),TupleDefinition:s("Tuple","TupleDefinition"),MapDefinition:s("Map","MapDefinition"),WeakMapDefinition:s("WeakMap","WeakMapDefinition"),SetDefinition:s("Set","SetDefinition"),WeakSetDefinition:s("WeakSet","WeakSetDefinition"),PromiseDefinition:s("Promise","PromiseDefinition"),GeneratorDefinition:s("Generator","GeneratorDefinition"),AsyncGeneratorDefinition:s("AsyncGenerator","AsyncGeneratorDefinition"),IteratorDefinition:s("Iterator","IteratorDefinition"),IterableDefinition:s("Iterable","IterableDefinition"),IterableIteratorDefinition:s("IterableIterator","IterableIteratorDefinition"),AsyncIteratorDefinition:s("AsyncIterator","AsyncIteratorDefinition"),AsyncIterableDefinition:s("AsyncIterable","AsyncIterableDefinition"),AsyncIterableIteratorDefinition:s("AsyncIterableIterator","AsyncIterableIteratorDefinition")},nt={Invalid:s("Invalid","Invalid",distExports.ModuleIds.Invalid),NonPrimitiveObject:s("object","NonPrimitiveObject"),Any:s("any","Any"),Unknown:s("unknown","Unknown"),Void:s("void","Void"),Never:s("never","Never"),Null:s("null","Null"),Undefined:s("undefined","Undefined"),Intrinsic:s("intrinsic","Intrinsic"),String:s("String","String"),Number:s("Number","Number"),BigInt:s("BigInt","BigInt"),Boolean:s("Boolean","Boolean"),True:new A({id:distExports.TypeIds.True,kind:10,name:"true",module:distExports.ModuleIds.Native,value:true}),False:new A({id:distExports.TypeIds.False,kind:9,name:"false",module:distExports.ModuleIds.Native,value:false}),Date:s("Date","Date"),Error:s("Error","Error"),Symbol:s("Symbol","Symbol"),UniqueSymbol:s("UniqueSymbol","UniqueSymbol"),RegExp:s("RegExp","RegExp"),Int8Array:s("Int8Array","Int8Array"),Uint8Array:s("Uint8Array","Uint8Array"),Uint8ClampedArray:s("Uint8ClampedArray","Uint8ClampedArray"),Int16Array:s("Int16Array","Int16Array"),Uint16Array:s("Uint16Array","Uint16Array"),Int32Array:s("Int32Array","Int32Array"),Uint32Array:s("Uint32Array","Uint32Array"),Float32Array:s("Float32Array","Float32Array"),Float64Array:s("Float64Array","Float64Array"),BigInt64Array:s("BigInt64Array","BigInt64Array"),BigUint64Array:s("BigUint64Array","BigUint64Array"),ArrayBuffer:s("ArrayBuffer","ArrayBuffer"),SharedArrayBuffer:s("SharedArrayBuffer","SharedArrayBuffer"),Atomics:s("Atomics","Atomics"),DataView:s("DataView","DataView"),ArrayDefinition:l.ArrayDefinition,ReadonlyArrayDefinition:l.ReadonlyArrayDefinition,TupleDefinition:l.TupleDefinition,MapDefinition:l.MapDefinition,WeakMapDefinition:l.WeakMapDefinition,SetDefinition:l.SetDefinition,WeakSetDefinition:l.WeakSetDefinition,PromiseDefinition:l.PromiseDefinition,GeneratorDefinition:l.GeneratorDefinition,AsyncGeneratorDefinition:l.AsyncGeneratorDefinition,IteratorDefinition:l.IteratorDefinition,IterableDefinition:l.IterableDefinition,IterableIteratorDefinition:l.IterableIteratorDefinition,AsyncIteratorDefinition:l.AsyncIteratorDefinition,AsyncIterableDefinition:l.AsyncIterableDefinition,AsyncIterableIteratorDefinition:l.AsyncIterableIteratorDefinition},tt=true),{AnyArray:Ce,UnknownFunction:rt,nativeTypes:nt,nativeGenericTypeDefinitions:l}}function s(n,e,t=distExports.ModuleIds.Native){let a=u[e],o=distExports.TypeIds[e],p=e.endsWith("Definition");if(o===void 0||a===void 0)throw new Error(`Invalid prop name. kind = ${a}, id = ${o}`);return new i({kind:a,name:n,id:o,module:t,isGenericTypeDefinition:p})}function it(n,e){if(n===void 0)return i.Undefined;if(n===null)return i.Null;if(typeof n=="string")return i.String;if(typeof n=="symbol")return i.Symbol;if(typeof n=="number")return i.Number;if(typeof n=="boolean")return i.Boolean;if(typeof n=="bigint")return i.BigInt;if(n instanceof Date)return i.Date;if(n instanceof Error)return i.Error;if(n instanceof RegExp)return i.RegExp;if(n instanceof Int8Array)return i.Int8Array;if(n instanceof Uint8Array)return i.Uint8Array;if(n instanceof Uint8ClampedArray)return i.Uint8ClampedArray;if(n instanceof Int16Array)return i.Int16Array;if(n instanceof Uint16Array)return i.Uint16Array;if(n instanceof Int32Array)return i.Int32Array;if(n instanceof Uint32Array)return i.Uint32Array;if(n instanceof Float32Array)return i.Float32Array;if(n instanceof Float64Array)return i.Float64Array;if(n instanceof BigInt64Array)return i.BigInt64Array;if(n instanceof BigUint64Array)return i.BigUint64Array;if(G(n))return i.Type;if($(n))return i.Module;if(n.constructor===void 0)return i.Unknown;if(n.constructor===Object)return i.NonPrimitiveObject;if(Array.isArray(n))return F().AnyArray;let t=n.prototype?.[distExports.PROTOTYPE_TYPE_INSTANCE_PROPERTY]||n.constructor.prototype[distExports.PROTOTYPE_TYPE_INSTANCE_PROPERTY];if(t!==void 0)return t;let a=n.prototype?.[distExports.PROTOTYPE_TYPE_PROPERTY]||n.constructor.prototype[distExports.PROTOTYPE_TYPE_PROPERTY]||n[distExports.PROTOTYPE_TYPE_PROPERTY]||void 0;return a!==void 0?e.resolveType(a):typeof n=="function"?F().UnknownFunction:i.Unknown}var Be="reflect-gettype-error-disable",Tt=/^([#@][^,|&]+?)\{(.+?)}(\?)?$/,ht=new Map([["#Promise",P],["#Array",ce],["#ReadonlyArray",me],["#Set",fe],["#WeakSet",ue],["#Map",Te],["#WeakMap",he],["#Tuple",be]]),_e=class{constructor(e,t,a){this.configuration=e;this.name=t;this.parentLibrary=a;this.modules=new Map;this.types=new Map;this.genericTypeRegister=new xe(this);this.aliases=new Map;if(!a&&new.target!==U)throw new Error("Cannot instantiate new MetadataLibrary without parent.");this.isGlobalMetadataLibrary=new.target===U,this.getType=this.getType.bind(this),this.resolveType=this.resolveType.bind(this),this.getGenericClass=this.getGenericClass.bind(this),this.constructGeneric=this.constructGeneric.bind(this);}asExpandable(){return this}toString(){return `${this.name} (${this.modules.size} modules, ${this.types.size} types) ${JSON.stringify(this.configuration,void 0,4)}`}[Symbol.for("nodejs.util.inspect.custom")](){return this.toString()}getGenericClass(e,...t){if(t.length===0){let a=distExports.getCallsiteTypeArguments(this.getGenericClass);if(a?.[0]!==void 0){let o=this.resolveType(a[0]);return this.genericTypeRegister.getGenericClass(e,o.isGenericType()?o.getTypeArguments():[])}}return this.genericTypeRegister.getGenericClass(e,t)}constructGeneric(e,t,a,o){let p=this.getGenericClass(e,...t.map(g=>G(g)?g:this.resolveType(g)));return o!==void 0&&(o=this.inheritNewTarget(o,p)),Reflect.construct(p,a,o??p)}inheritNewTarget(e,t){let a=e.name!==void 0?`${e.name}{}`:t.name,o={[a]:class{}}[a];return Object.setPrototypeOf(o.prototype,e.prototype),o.prototype[distExports.PROTOTYPE_TYPE_PROPERTY]=t.prototype[distExports.PROTOTYPE_TYPE_PROPERTY],o}findType(e){for(let[t,a]of this.types)if(e(a))return a;if(this.parentLibrary!==void 0)return this.parentLibrary.findType(e)}getTypes(){return Array.from(this.types.values()).concat(this.parentLibrary?.getTypes()??[])}findModule(e){for(let[t,a]of this.modules)if(e(a))return a;if(this.parentLibrary!==void 0)return this.parentLibrary.findModule(e)}getModules(){return Array.from(this.modules.values()).concat(this.parentLibrary?.getModules()??[])}resolveType(e){if(!e)throw new Error("Invalid type reference.");let t=this.types.get(e)??this.parentLibrary?.types.get(e);if(t!==void 0)return t;let a=this.handleAdhocType(e);return a||i.Invalid}resolveModule(e){if(!e)throw new Error("Invalid module reference.");return this.modules.get(e)??this.parentLibrary?.modules.get(e)??c.Invalid}addMetadata(e,t){if(this.parentLibrary){this.parentLibrary.addMetadata(e,t);return}m.doWithScope(this,()=>{let a=new c(e);this.addModule(a);});}clearMetadata(e){let t=`${e}/`;for(let a of this.types.keys())a.startsWith(t)&&(this.types.delete(a),this.parentLibrary?.types.delete(a));for(let a of this.modules.keys())a.startsWith(t)&&(this.modules.delete(a),this.parentLibrary?.modules.delete(a));}addModule(...e){if(this.parentLibrary){this.parentLibrary.addModule(...e);return}for(let t of e){if(!$(t))throw new Error("Given module is not an instance of the Module class.");if(t.id!==distExports.ModuleIds.Native&&t.id!==distExports.ModuleIds.Invalid&&this.modules.has(t.id))throw new Error(`Module with id '${t.id}' already exists.`);this.modules.set(t.id,t),this.addType(...t.getTypes());}}addType(...e){if(this.parentLibrary){this.parentLibrary.addType(...e);return}for(let t of e){if(!G(t))throw new Error("Given type is not an instance of the Type class.");if(!t.id)throw new Error("Given type has invalid id.");if(this.types.has(t.id)){if(t.id.slice(0,distExports.ModuleIds.Native.length)===distExports.ModuleIds.Native)continue;return}this.types.set(t.id,t);}}addAliases(e){if(this.parentLibrary){this.parentLibrary.addAliases(e);return}for(let[t,a]of Object.entries(e))this.aliases.set(t,a);}getType(...e){if(e.length)return it(e[0],this);let t=distExports.getCallsiteTypeArguments(this.getType);return t!==void 0?t.length===0||t[0]===void 0?i.Invalid:this.resolveType(t[0]):(V()[Be]||console.debug("[ERR] RTTIST: You are calling `getType()` function directly. More information at https://github.com/rttist/rttist/issues/17. To suppress this message, create field '"+Be+"' in global object (window | global | globalThis) eg. `window['"+Be+"'] = true;`"),i.Invalid)}createLiteralType(e){let t=e.slice(3,-1),a=t[t.length-1]==="n"?75:t[0]==="'"?76:t==="true"?10:t==="false"?9:t[0]==="/"?79:74;return new A({id:e,value:a===76?t.slice(1,-1):t,kind:a,module:distExports.ModuleIds.Native,name:t})}getTypeIdInfo(e){let t=e.match(Tt);if(t)return {type:t[1],arguments:t[2].split(","),nullable:t[3]==="?"}}handleAdhocType(e){if(e.slice(0,3)==="#L("){let o=this.createLiteralType(e);return this.addType(o),o}let t=this.getTypeIdInfo(e);if(!t)return;if(t.type==="#|"||t.type==="#&"){let o=new(t.type==="#|"?E:w)({id:e,module:distExports.ModuleIds.Native,name:t.type,kind:65,types:t.arguments,nullable:t.nullable});return this.addType(o),o}let a=ht.get(t.type);if(a){let o=new a({id:e,module:distExports.ModuleIds.Native,name:`${t.type.slice(1)}<'${t.arguments.length}>`,kind:93,typeArguments:t.arguments.map(p=>p)});return this.addType(o),o}if(t.type[0]==="@"){let o=new i({id:e,module:distExports.ModuleIds.Native,name:`${t.type.slice(1)}<'${t.arguments.length}>`,kind:93,typeArguments:t.arguments.map(p=>p),genericTypeDefinition:t.type});return this.addType(o),o}}},U=class extends _e{constructor(e){super(e,"Global metadata library");}};var B=J("rttist/Metadata",()=>new U({nullability:false}));We(Me);Ye(Ie);m.setScope(B);var{nativeTypes:pt,nativeGenericTypeDefinitions:Mt,AnyArray:xt,UnknownFunction:_t}=F();for(let[n,e]of Object.entries(pt).concat(Object.entries(Mt)))i[n]=e;c.Invalid=new c({id:distExports.ModuleIds.Invalid,name:"invalid",path:""});c.Dynamic=new c({id:distExports.ModuleIds.Dynamic,name:"dynamic",path:""});c.Native=new c({id:distExports.ModuleIds.Native,name:"native",path:""});B.addType(...Object.values(pt));B.addType(xt,_t);B.addModule(c.Native,c.Invalid,c.Dynamic);

const Metadata = new _e({
    nullability: false,
}, "@afsalthaj/golem-ts-sdk", B);

function getNameFromAnalysedType(typ) {
    switch (typ.kind) {
        case 'variant':
            return typ.value.name;
        case 'result':
            return typ.value.name;
        case 'option':
            return typ.value.name;
        case 'enum':
            return typ.value.name;
        case 'flags':
            return typ.value.name;
        case 'record':
            return typ.value.name;
        case 'tuple':
            return typ.value.name;
        case 'list':
            return typ.value.name;
        case 'handle':
            return typ.value.name;
        default:
            return undefined;
    }
}
const analysedType = {
    field: (name, typ) => ({ name, typ }),
    case: (name, typ) => ({ name, typ }),
    optCase: (name, typ) => ({ name, typ }),
    unitCase: (name) => ({ name }),
    bool: () => ({ kind: 'bool' }),
    str: () => ({ kind: 'str' }),
    chr: () => ({ kind: 'chr' }),
    f64: () => ({ kind: 'f64' }),
    f32: () => ({ kind: 'f32' }),
    u64: () => ({ kind: 'u64' }),
    s64: () => ({ kind: 's64' }),
    u32: () => ({ kind: 'u32' }),
    s32: () => ({ kind: 's32' }),
    u16: () => ({ kind: 'u16' }),
    s16: () => ({ kind: 's16' }),
    u8: () => ({ kind: 'u8' }),
    s8: () => ({ kind: 's8' }),
    list: (inner) => ({ kind: 'list', value: { name: undefined, inner } }),
    option: (inner) => ({ kind: 'option', value: { name: undefined, inner } }),
    tuple: (items) => ({ kind: 'tuple', value: { name: undefined, items } }),
    record: (fields) => ({ kind: 'record', value: { name: undefined, fields } }),
    flags: (names) => ({ kind: 'flags', value: { name: undefined, names } }),
    enum: (cases) => ({ kind: 'enum', value: { name: undefined, cases } }),
    variant: (cases) => ({ kind: 'variant', value: { name: undefined, cases } }),
    resultOk: (ok) => ({ kind: 'result', value: { name: undefined, ok } }),
    resultErr: (err) => ({ kind: 'result', value: { name: undefined, err } }),
    result: (ok, err) => ({ kind: 'result', value: { name: undefined, ok, err } }),
    handle: (resourceId, mode) => ({ kind: 'handle', value: { name: undefined, resourceId, mode } }),
};

function constructWitTypeFromTsType(type) {
    const analysedType = analysedTypeFromType(type);
    return constructFromAnalysedType(analysedType);
}
function constructFromAnalysedType(typ) {
    const builder = new WitTypeBuilder();
    builder.add(typ);
    return builder.build();
}
// Copied from wasm-rpc rust implementation
class WitTypeBuilder {
    constructor() {
        this.nodes = [];
        this.mapping = new Map();
    }
    add(typ) {
        const hash = JSON.stringify(typ);
        if (this.mapping.has(hash)) {
            return this.mapping.get(hash);
        }
        const idx = this.nodes.length;
        const boolType = { tag: 'prim-bool-type' };
        this.nodes.push({ name: undefined, type: boolType });
        const node = this.convert(typ);
        const name = getNameFromAnalysedType(typ);
        this.nodes[idx] = { name, type: node };
        this.mapping.set(hash, idx);
        return idx;
    }
    build() {
        return { nodes: this.nodes };
    }
    convert(typ) {
        switch (typ.kind) {
            case 'variant': {
                const cases = typ.value.cases.map((c) => [c.name, c.typ ? this.add(c.typ) : undefined]);
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
                const fields = typ.value.fields.map((f) => [f.name, this.add(f.typ)]);
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
            case 'str':
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
                const resId = typ.value.resourceId;
                const mode = typ.value.mode === 'owned' ? 'owned' : 'borrowed';
                return { tag: 'handle-type', val: [BigInt(resId), mode] };
            }
            default:
                throw new Error(`Unhandled AnalysedType kind: ${typ.kind}`);
        }
    }
}
function analysedTypeFromType(type) {
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
            const key = analysedTypeFromType(mapKeyType);
            const value = analysedTypeFromType(mapValueType);
            return analysedType.list(analysedType.tuple([key, value]));
        case u.WeakMapDefinition:
            const weakMapKeyType = type.getTypeArguments?.()[0];
            const weakMapValueType = type.getTypeArguments?.()[1];
            const weakKey = analysedTypeFromType(weakMapKeyType);
            const weakValue = analysedTypeFromType(weakMapValueType);
            return analysedType.list(analysedType.tuple([weakKey, weakValue]));
        case u.SetDefinition:
        case u.WeakSetDefinition:
            const setType = type.getTypeArguments?.()[0];
            if (!setType) {
                throw new Error("Set must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(setType));
        case u.GeneratorDefinition:
            const genType = type.getTypeArguments?.()[0];
            if (!genType) {
                throw new Error("Generator must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(genType));
        case u.AsyncGeneratorDefinition:
            const generatorType = type.getTypeArguments?.()[0];
            if (!generatorType) {
                throw new Error("Generator must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(generatorType));
        case u.IteratorDefinition:
            const iteratorType = type.getTypeArguments?.()[0];
            if (!iteratorType) {
                throw new Error("Iterator must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(iteratorType));
        case u.IterableDefinition:
            const iterableType = type.getTypeArguments?.()[0];
            if (!iterableType) {
                throw new Error("Iterable must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(iterableType));
        case u.IterableIteratorDefinition:
            const iterableIteratorType = type.getTypeArguments?.()[0];
            if (!iterableIteratorType) {
                throw new Error("IterableIterator must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(iterableIteratorType));
        case u.AsyncIteratorDefinition:
            const asyncIteratorType = type.getTypeArguments?.()[0];
            if (!asyncIteratorType) {
                throw new Error("AsyncIterator must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(asyncIteratorType));
        case u.AsyncIterableDefinition:
            const asyncIterableType = type.getTypeArguments?.()[0];
            if (!asyncIterableType) {
                throw new Error("AsyncIterable must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(asyncIterableType));
        case u.AsyncIterableIteratorDefinition:
            const asyncIterableIteratorType = type.getTypeArguments?.()[0];
            if (!asyncIterableIteratorType) {
                throw new Error("AsyncIterableIterator must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(asyncIterableIteratorType));
        case u.Type:
            const arg = type.getTypeArguments?.()[0];
            if (!arg) {
                throw new Error("Type must have a type argument");
            }
            return analysedTypeFromType(arg);
        // To be handled
        case u.Module:
        case u.Namespace:
        case u.Object:
        case u.Interface:
            const objectInterface = type;
            const interfaceFields = objectInterface.getProperties().map(prop => {
                return analysedType.field(prop.name.toString(), analysedTypeFromType(prop.type));
            });
            return analysedType.record(interfaceFields);
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
            return analysedType.s32(); // For the same reason - as an example - Rust defaults to i32
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
            return analysedTypeFromType(typeArgument);
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
            return analysedTypeFromType(promiseType);
        case u.PromiseDefinition:
            const promiseDefType = type.getTypeArguments?.()[0];
            if (!promiseDefType) {
                throw new Error("PromiseDefinition must have a type argument");
            }
            return analysedType.option(analysedTypeFromType(promiseDefType));
        case u.ObjectType:
            const obj = type;
            const fields = obj.getProperties().map(prop => {
                return analysedType.field(prop.name.toString(), analysedTypeFromType(prop.type));
            });
            return analysedType.record(fields);
        case u.TupleDefinition:
            const tupleTypes = type.getTypeArguments?.().map(analysedTypeFromType) || [];
            return analysedType.tuple(tupleTypes);
        case u.ArrayDefinition:
        case u.ReadonlyArrayDefinition:
            const elementType = type.getTypeArguments?.()[0];
            if (!elementType) {
                throw new Error("Array must have a type argument");
            }
            return analysedType.list(analysedTypeFromType(elementType));
    }
}

function constructWitValueFromTsValue(tsValue, tsType) {
    const value = constructValueFromTsValue(tsValue, tsType);
    return constructWitValueFromValue(value);
}
function constructTsValueFromWitValue(witValue, expectedType) {
    const wasmRpcValue = constructValueFromWitValue(witValue);
    return tsValueFromValue(wasmRpcValue, expectedType);
}
function constructValueFromTsValue(arg, type) {
    switch (type.kind) {
        case u.Invalid:
            throw new Error(`Unimplemented type invalid: ${type.kind}`);
        case u.Unknown:
            throw new Error(`Unimplemented type unknwn: ${type.kind}`);
        case u.Any:
            throw new Error(`Unimplemented type 3: ${type.kind}`);
        case u.Never:
            throw new Error(`Unimplemented type 4: ${type.kind}`);
        case u.Void:
            throw new Error(`Unimplemented type 5: ${type.kind}`);
        case u.Undefined:
            throw new Error(`Unimplemented type 6: ${type.kind}`);
        case u.Null:
            throw new Error(`Unimplemented type 7: ${type.kind}`);
        case u.Intrinsic:
            throw new Error(`Unimplemented type 8: ${type.kind}`);
        case u.Boolean:
            if (typeof arg === "boolean") {
                return { kind: "bool", value: arg };
            }
            else {
                throw new Error(`Expected boolean, got ${typeof arg}`);
            }
        case u.False:
            if (typeof arg === "boolean") {
                return { kind: "bool", value: arg };
            }
            else {
                throw new Error(`Expected boolean, got ${typeof arg}`);
            }
        case u.True:
            if (typeof arg === "boolean") {
                return { kind: "bool", value: arg };
            }
            else {
                throw new Error(`Expected boolean, got ${typeof arg}`);
            }
        case u.Number:
            if (typeof arg === "number") {
                return { kind: "f64", value: arg };
            }
            else {
                throw new Error(`Expected number, got ${typeof arg}`);
            }
        case u.BigInt:
            throw new Error(`Unimplemented type: ${type.kind}`);
        case u.String:
            if (typeof arg === "string") {
                return { kind: "string", value: arg };
            }
            else {
                throw new Error(`Expected string, got ${typeof arg}`);
            }
        case u.Symbol:
            throw new Error(`Unimplemented type 9: ${type.kind}`);
        case u.NonPrimitiveObject:
            throw new Error(`Unimplemented type 10: ${type.kind}`);
        case u.FunctionType:
            throw new Error(`Unimplemented type 11: ${type.kind}`);
        case u.Date:
            throw new Error(`Unimplemented type 12: ${type.kind}`);
        case u.Error:
            throw new Error(`Unimplemented type 13: ${type.kind}`);
        case u.RegExp:
            throw new Error(`Unimplemented type 14: ${type.kind}`);
        case u.Int8Array:
            throw new Error(`Unimplemented type 15: ${type.kind}`);
        case u.ArrayBuffer:
            throw new Error(`Unimplemented type 16: ${type.kind}`);
        case u.SharedArrayBuffer:
            throw new Error(`Unimplemented type 17: ${type.kind}`);
        case u.Atomics:
            throw new Error(`Unimplemented type 18: ${type.kind}`);
        case u.DataView:
            throw new Error(`Unimplemented type 19: ${type.kind}`);
        case u.ArrayDefinition:
            throw new Error(`Unimplemented type 20: ${type.kind}`);
        case u.ReadonlyArrayDefinition:
            throw new Error(`Unimplemented type 21: ${type.kind}`);
        case u.TupleDefinition:
            throw new Error(`Unimplemented type 22: ${type.kind}`);
        case u.MapDefinition:
            throw new Error(`Unimplemented type 22: ${type.kind}`);
        case u.WeakMapDefinition:
            throw new Error(`Unimplemented type 23: ${type.kind}`);
        case u.SetDefinition:
            throw new Error(`Unimplemented type 24: ${type.kind}`);
        case u.WeakSetDefinition:
            throw new Error(`Unimplemented type 25: ${type.kind}`);
        case u.PromiseDefinition:
            const promiseDefType = type;
            const promiseDefArgType = promiseDefType.getTypeArguments()[0];
            return constructValueFromTsValue(arg, promiseDefArgType);
        case u.GeneratorDefinition:
            throw new Error(`Unimplemented type 26: ${type.kind}`);
        case u.AsyncGeneratorDefinition:
            throw new Error(`Unimplemented type 27: ${type.kind}`);
        case u.IteratorDefinition:
            throw new Error(`Unimplemented type 28: ${type.kind}`);
        case u.IterableDefinition:
            throw new Error(`Unimplemented type 29: ${type.kind}`);
        case u.IterableIteratorDefinition:
            throw new Error(`Unimplemented type 30: ${type.kind}`);
        case u.AsyncIteratorDefinition:
            throw new Error(`Unimplemented type 31: ${type.kind}`);
        case u.AsyncIterableDefinition:
            throw new Error(`Unimplemented type 32: ${type.kind}`);
        case u.AsyncIterableIteratorDefinition:
            throw new Error(`Unimplemented type 33: ${type.kind}`);
        case u.Module:
            throw new Error(`Unimplemented type 34: ${type.kind}`);
        case u.Namespace:
            throw new Error(`Unimplemented type 35: ${type.kind}`);
        case u.Interface:
            if (typeof arg === "object" && arg !== null) {
                const innerType = type;
                const innerProperties = innerType.getProperties();
                const values = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(arg, key)) {
                        throw new Error(`Missing property '${key}' in value`);
                    }
                    const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                    values.push(fieldVal);
                }
                return { kind: "record", value: values };
            }
            else {
                throw new Error(`Expected object, got ${arg} which is ${typeof arg}`);
            }
        case u.Class:
            throw new Error(`Unimplemented type 36: ${type.kind}`);
        case u.Union:
            throw new Error(`Unimplemented type 37: ${type.kind}`);
        case u.Intersection:
            throw new Error(`Unimplemented type 38: ${type.kind}`);
        case u.ConditionalType:
            throw new Error(`Unimplemented type 39: ${type.kind}`);
        case u.IndexedAccess:
            throw new Error(`Unimplemented type 40: ${type.kind}`);
        case u.TypeParameter:
            throw new Error(`Unimplemented type 41: ${type.kind}`);
        case u.Alias:
            throw new Error(`Unimplemented type 42: ${type.kind}`);
        case u.Method:
            throw new Error(`Unimplemented type 43: ${type.kind}`);
        case u.Function:
            throw new Error(`Unimplemented type 44: ${type.kind}`);
        case u.GeneratorFunction:
            throw new Error(`Unimplemented type 45: ${type.kind}`);
        case u.NumberLiteral:
            throw new Error(`Unimplemented type 46: ${type.kind}`);
        case u.BigIntLiteral:
            throw new Error(`Unimplemented type 47: ${type.kind}`);
        case u.TemplateLiteral:
            throw new Error(`Unimplemented type 48: ${type.kind}`);
        case u.EnumLiteral:
            throw new Error(`Unimplemented type 49: ${type.kind}`);
        case u.RegExpLiteral:
            throw new Error(`Unimplemented type 50: ${type.kind}`);
        case u.Enum:
            throw new Error(`Unimplemented type 51: ${type.kind}`);
        case u.UniqueSymbol:
            throw new Error(`Unimplemented type 52: ${type.kind}`);
        case u.ESSymbol:
            throw new Error(`Unimplemented type 53: ${type.kind}`);
        case u.Promise:
            const promiseType = type;
            const argument = promiseType.getTypeArguments()[0];
            return constructValueFromTsValue(arg, argument);
        case u.Generator:
            throw new Error(`Unimplemented type 54: ${type.kind}`);
        case u.AsyncGenerator:
            throw new Error(`Unimplemented type 55: ${type.kind}`);
        case u.Iterator:
            throw new Error(`Unimplemented type 56: ${type.kind}`);
        case u.Iterable:
            throw new Error(`Unimplemented type 57: ${type.kind}`);
        case u.IterableIterator:
            throw new Error(`Unimplemented type 58: ${type.kind}`);
        case u.AsyncIterator:
            throw new Error(`Unimplemented type 59: ${type.kind}`);
        case u.AsyncIterable:
            throw new Error(`Unimplemented type 60: ${type.kind}`);
        case u.AsyncIterableIterator:
            throw new Error(`Unimplemented type 61: ${type.kind}`);
        case u.Jsx:
            throw new Error(`Unimplemented type 62: ${type.kind}`);
        case u.Type:
            const typeArg = type.getTypeArguments()[0];
            return constructValueFromTsValue(arg, typeArg);
        case u.TypeCtor:
            throw new Error(`Unimplemented type 63: ${type.kind}`);
        // Difference between Object and ObjectType to be determine
        case u.ObjectType:
            if (typeof arg === "object" && arg !== null) {
                const innerType = type;
                const innerProperties = innerType.getProperties();
                const values = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(arg, key)) {
                        throw new Error(`Missing property '${key}' in value`);
                    }
                    const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                    values.push(fieldVal);
                }
                return { kind: "record", value: values };
            }
            else {
                throw new Error(`Expected object, got ${typeof arg}`);
            }
        case u.Uint8Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u8", value: item })) };
            }
            else {
                throw new Error(`Expected Uint8Array, got ${typeof arg}`);
            }
        case u.Uint8ClampedArray:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u8", value: item })) };
            }
            else {
                throw new Error(`Expected Uint8ClampedArray, got ${typeof arg}`);
            }
        case u.Int16Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "s16", value: item })) };
            }
            else {
                throw new Error(`Expected Int16Array, got ${typeof arg}`);
            }
        case u.Uint16Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u16", value: item })) };
            }
            else {
                throw new Error(`Expected Uint16Array, got ${typeof arg}`);
            }
        case u.Int32Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "s32", value: item })) };
            }
            else {
                throw new Error(`Expected Int32Array, got ${typeof arg}`);
            }
        case u.Uint32Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u32", value: item })) };
            }
            else {
                throw new Error(`Expected Uint32Array, got ${typeof arg}`);
            }
        case u.Float32Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "f32", value: item })) };
            }
            else {
                throw new Error(`Expected Float32Array, got ${typeof arg}`);
            }
        case u.Float64Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "number")) {
                return { kind: "list", value: arg.map(item => ({ kind: "f64", value: item })) };
            }
            else {
                throw new Error(`Expected Float64Array, got ${typeof arg}`);
            }
        case u.BigInt64Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "bigint")) {
                return { kind: "list", value: arg.map(item => ({ kind: "s64", value: item })) };
            }
            else {
                throw new Error(`Expected BigInt64Array, got ${typeof arg}`);
            }
        case u.BigUint64Array:
            if (Array.isArray(arg) && arg.every(item => typeof item === "bigint")) {
                return { kind: "list", value: arg.map(item => ({ kind: "u64", value: item })) };
            }
            else {
                throw new Error(`Expected BigUint64Array, got ${typeof arg}`);
            }
        case u.Object:
            if (typeof arg === "object" && arg !== null) {
                const innerType = type;
                const innerProperties = innerType.getProperties();
                const values = [];
                for (const prop of innerProperties) {
                    const key = prop.name.toString();
                    if (!Object.prototype.hasOwnProperty.call(arg, key)) {
                        throw new Error(`Missing property '${key}' in value`);
                    }
                    const fieldVal = constructValueFromTsValue(arg[key], prop.type);
                    values.push(fieldVal);
                }
                return { kind: "record", value: values };
            }
            else {
                throw new Error(`Expected object, got ${typeof arg}`);
            }
        case u.StringLiteral:
            if (typeof arg === "string") {
                return { kind: "string", value: arg };
            }
            else {
                throw new Error(`Expected string literal, got ${typeof arg}`);
            }
    }
}
function tsValueFromValue(wasmRpcValue, expectedType) {
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
            if (wasmRpcValue.kind === 'option') {
                return null;
            }
            else {
                throw new Error(`Unrecognized value for ${wasmRpcValue.kind}`);
            }
        case u.Intrinsic:
            break;
        case u.Boolean:
            if (wasmRpcValue.kind === 'bool') {
                return wasmRpcValue.value;
            }
            else {
                throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
            }
        case u.False:
            if (wasmRpcValue.kind === 'bool') {
                return wasmRpcValue.value;
            }
            else {
                throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
            }
        case u.True:
            if (wasmRpcValue.kind === 'bool') {
                return wasmRpcValue.value;
            }
            else {
                throw new Error(`Expected boolean, obtained value ${wasmRpcValue}`);
            }
        case u.Number:
            if (wasmRpcValue.kind === 'f64') {
                return wasmRpcValue.value;
            }
            else if (wasmRpcValue.kind === 'u8' || wasmRpcValue.kind === 'u16' || wasmRpcValue.kind === 'u32' || wasmRpcValue.kind === 'u64') {
                return wasmRpcValue.value;
            }
            else if (wasmRpcValue.kind === 's8' || wasmRpcValue.kind === 's16' || wasmRpcValue.kind === 's32' || wasmRpcValue.kind === 's64') {
                return wasmRpcValue.value;
            }
            else {
                throw new Error(`Expected number, obtained value ${wasmRpcValue}`);
            }
        case u.BigInt:
            if (wasmRpcValue.kind == 'u64') {
                return wasmRpcValue.value;
            }
            else {
                throw new Error(`Expected number, obtained value ${wasmRpcValue}`);
            }
        case u.String:
            if (wasmRpcValue.kind === 'string') {
                return wasmRpcValue.value;
            }
            else {
                throw new Error(`Expected string, obtained value ${wasmRpcValue}`);
            }
        case u.Symbol:
            throw new Error(`Unrecognized type for ${wasmRpcValue.kind}`);
        case u.NonPrimitiveObject:
            if (wasmRpcValue.kind == 'record') {
                const fieldValues = wasmRpcValue.value;
                const expectedTypeFields = expectedType.getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name = field.name.toString();
                    const expectedFieldType = field.type;
                    acc[name] = tsValueFromValue(fieldValues[idx], expectedFieldType);
                    return acc;
                }, {});
            }
            else {
                throw new Error(`Expected object, obtained value ${wasmRpcValue}`);
            }
        case u.ObjectType:
            if (wasmRpcValue.kind === 'record') {
                const fieldValues = wasmRpcValue.value;
                const expectedTypeFields = expectedType.getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name = field.name.toString();
                    const expectedFieldType = field.type;
                    acc[name] = tsValueFromValue(fieldValues[idx], expectedFieldType);
                    return acc;
                }, {});
            }
            else {
                throw new Error(`Expected object, obtained value ${wasmRpcValue}`);
            }
        case u.FunctionType:
            throw new Error(`Unrecognized type for ${wasmRpcValue.kind}`);
        case u.Date:
            if (wasmRpcValue.kind === 'string') {
                return new Date(wasmRpcValue.value);
            }
            else {
                throw new Error(`Expected date, obtained value ${wasmRpcValue}`);
            }
        case u.Error:
            if (wasmRpcValue.kind === 'result') {
                if (wasmRpcValue.value.err !== undefined) {
                    if (wasmRpcValue.value.err.kind == 'string') {
                        return new Error(wasmRpcValue.value.err.value);
                    }
                    else {
                        throw new Error(`Expected error string, obtained value ${wasmRpcValue.value.err}`);
                    }
                }
                else {
                    throw new Error(`Expected error, obtained value ${wasmRpcValue}`);
                }
            }
            else {
                throw new Error(`Expected error, obtained value ${wasmRpcValue}`);
            }
        case u.RegExp:
            if (wasmRpcValue.kind === 'string') {
                return new RegExp(wasmRpcValue.value);
            }
            else {
                throw new Error(`Expected RegExp, obtained value ${wasmRpcValue}`);
            }
        case u.Int8Array:
            if (wasmRpcValue.kind === 'list') {
                return new Int8Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Int8Array, obtained value ${wasmRpcValue}`);
            }
        case u.Uint8Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint8Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Uint8Array, obtained value ${wasmRpcValue}`);
            }
        case u.Uint8ClampedArray:
            if (wasmRpcValue.kind === 'list') {
                return new Uint8ClampedArray(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Uint8ClampedArray, obtained value ${wasmRpcValue}`);
            }
        case u.Int16Array:
            if (wasmRpcValue.kind === 'list') {
                return new Int16Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Int16Array, obtained value ${wasmRpcValue}`);
            }
        case u.Uint16Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint16Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Uint16Array, obtained value ${wasmRpcValue}`);
            }
        case u.Int32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Int32Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Int32Array, obtained value ${wasmRpcValue}`);
            }
        case u.Uint32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Uint32Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Uint32Array, obtained value ${wasmRpcValue}`);
            }
        case u.Float32Array:
            if (wasmRpcValue.kind === 'list') {
                return new Float32Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Float32Array, obtained value ${wasmRpcValue}`);
            }
        case u.Float64Array:
            if (wasmRpcValue.kind === 'list') {
                return new Float64Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.Number)));
            }
            else {
                throw new Error(`Expected Float64Array, obtained value ${wasmRpcValue}`);
            }
        case u.BigInt64Array:
            if (wasmRpcValue.kind === 'list') {
                return new BigInt64Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.BigInt)));
            }
            else {
                throw new Error(`Expected BigInt64Array, obtained value ${wasmRpcValue}`);
            }
        case u.BigUint64Array:
            if (wasmRpcValue.kind === 'list') {
                return new BigUint64Array(wasmRpcValue.value.map(v => tsValueFromValue(v, i.BigInt)));
            }
            else {
                throw new Error(`Expected BigUint64Array, obtained value ${wasmRpcValue}`);
            }
        case u.ArrayBuffer:
            if (wasmRpcValue.kind === 'list') {
                const byteArray = wasmRpcValue.value.map(v => {
                    const convertedValue = tsValueFromValue(v, i.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new Uint8Array(byteArray).buffer;
            }
            else {
                throw new Error(`Expected ArrayBuffer, obtained value ${wasmRpcValue}`);
            }
        case u.SharedArrayBuffer:
            if (wasmRpcValue.kind === 'list') {
                const byteArray = wasmRpcValue.value.map(v => {
                    const convertedValue = tsValueFromValue(v, i.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new Uint8Array(byteArray).buffer;
            }
            else {
                throw new Error(`Expected SharedArrayBuffer, obtained value ${wasmRpcValue}`);
            }
        case u.Atomics:
            break;
        case u.DataView:
            if (wasmRpcValue.kind === 'list') {
                const byteArray = wasmRpcValue.value.map(v => {
                    const convertedValue = tsValueFromValue(v, i.Number);
                    if (typeof convertedValue !== 'number') {
                        throw new Error(`Expected number, obtained value ${convertedValue}`);
                    }
                    return convertedValue;
                });
                return new DataView(new Uint8Array(byteArray).buffer);
            }
            else {
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
            if (wasmRpcValue.kind === 'record') {
                const fieldValues = wasmRpcValue.value;
                const expectedTypeFields = expectedType.getProperties();
                return expectedTypeFields.reduce((acc, field, idx) => {
                    const name = field.name.toString();
                    const expectedFieldType = field.type;
                    acc[name] = tsValueFromValue(fieldValues[idx], expectedFieldType);
                    return acc;
                }, {});
            }
            else {
                throw new Error(`Expected object, obtained value ${wasmRpcValue}`);
            }
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
            if (wasmRpcValue.kind === 'string') {
                return wasmRpcValue.value;
            }
            else {
                throw new Error(`Unrecognized value for ${wasmRpcValue.kind}`);
            }
        case u.Promise:
            const innerType = expectedType.getTypeArguments()[0];
            return tsValueFromValue(wasmRpcValue, innerType);
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
            const arg = expectedType.getTypeArguments?.()[0];
            if (!arg) {
                throw new Error("Type must have a type argument");
            }
            return tsValueFromValue(wasmRpcValue, arg);
        case u.TypeCtor:
            break;
    }
}
function constructValueFromWitValue(wit) {
    if (!wit.nodes.length)
        throw new Error("Empty nodes in WitValue");
    return buildTree(wit.nodes[0], wit.nodes);
}
function buildTree(node, nodes) {
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
            const res = node.val;
            if (res.tag === "ok") {
                return {
                    kind: "result",
                    value: {
                        ok: res.val !== undefined ? buildTree(nodes[res.val], nodes) : undefined,
                    },
                };
            }
            else {
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
            throw new Error(`Unhandled tag: ${node.tag}`);
    }
}
function constructWitValueFromValue(value) {
    const nodes = [];
    buildNodes(value, nodes);
    return { nodes: nodes };
}
function buildNodes(value, nodes) {
    const push = (node) => {
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
            }
            else {
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
            throw new Error(`Unhandled kind: ${value.kind}`);
    }
}

function getLocalClient(ctor) {
    return (...args) => {
        const agentName = ctor.name;
        const agentInitiator = agentInitiators.get(agentName);
        const agentConstructorDependencies = Metadata.getTypes().filter((type) => type.isClass() && type.name === agentName)[0];
        const constructor = agentConstructorDependencies.getConstructors()[0];
        const parameters = constructor.getParameters();
        const parameterWitValues = args.map((fnArg, index) => {
            const typ = parameters[index].type;
            return constructWitValueFromTsValue(fnArg, typ);
        });
        // Currently handling only wit value
        const dataValue = {
            tag: "tuple",
            val: parameterWitValues.map((param) => {
                return {
                    tag: "component-model",
                    val: param
                };
            })
        };
        // We ensure to create every agent using agentInitiator
        const resolvedAgent = agentInitiator.initiate(agentName, dataValue);
        if (resolvedAgent.tag === "err") {
            // FIXME: LocalClient shouldn't fail
            throw new Error("Failed to create agent: " + JSON.stringify(resolvedAgent.val));
        }
        else {
            const instance = resolvedAgent.val.classInstance;
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
        }
    };
}
function getRemoteClient(ctor) {
    return (...args) => {
        const instance = new ctor(...args);
        const metadata = Metadata.getTypes().filter((type) => type.isClass() && type.name === ctor.name)[0];
        agentRegistry.get(ctor.name);
        // getAgentComponent in code_first branch to be implemented
        // until then using self metadata
        const componentId = getSelfMetadata().workerId.componentId;
        const rpc = WasmRpc.ephemeral(componentId);
        const result = rpc.invokeAndAwait("golem:simulated-agentic-typescript/simulated-agent-ts.{weather-agent.new}", []);
        const resourceWitValues = result.tag === "err"
            ? (() => { throw new Error("Failed to create resource: " + JSON.stringify(result.val) + " " + JSON.stringify(componentId) + " should be the same as " + JSON.stringify(componentId)); })()
            : result.val;
        const resourceValue = constructValueFromWitValue(resourceWitValues);
        const resourceVal = (() => {
            switch (resourceValue.kind) {
                case "tuple":
                    return resourceValue.value[0];
                default:
                    throw new Error("Unsupported kind: " + resourceValue.kind);
            }
        })();
        const workerId = getWorkerName(resourceVal, componentId);
        const resourceWitValue = constructWitValueFromValue(resourceVal);
        return new Proxy(instance, {
            get(target, prop) {
                const val = target[prop];
                if (typeof val === "function") {
                    const signature = metadata.getMethod(prop)?.getSignatures()[0];
                    const paramInfo = signature.getParameters();
                    const returnType = signature.returnType;
                    return (...fnArgs) => {
                        const functionName = `golem:simulated-agentic-typescript/simulated-agent.{[method]{${ctor.name}.{${prop.toString()}}`;
                        const parameterWitValues = fnArgs.map((fnArg, index) => {
                            const typ = paramInfo[index].type;
                            return constructWitValueFromTsValue(fnArg, typ);
                        });
                        const inputArgs = [resourceWitValue, ...parameterWitValues];
                        const invokeRpc = new WasmRpc(workerId);
                        const rpcResult = invokeRpc.invokeAndAwait(functionName, inputArgs);
                        const rpcWitValue = rpcResult.tag === "err"
                            ? (() => { throw new Error("Failed to invoke function: " + JSON.stringify(result.val)); })()
                            : result.val;
                        return constructTsValueFromWitValue(rpcWitValue, returnType);
                    };
                }
                return val;
            }
        });
    };
}
function getWorkerName(value, componentId) {
    if (value.kind === 'handle') {
        const parts = value.uri.split('/');
        const workerName = parts[parts.length - 1];
        if (!workerName) {
            throw new Error("Worker name not found in URI");
        }
        return { componentId, workerName };
    }
    throw new Error(`Expected value to be a handle, but got: ${JSON.stringify(value)}`);
}

/**
 * Maintains a counter for each agent type to ensure unique IDs for each instance.
 */
const agentInstanceSequence = new Map();
/**
 * Creates a unique `AgentId` for an agent instance based on its name and the current worker's metadata.
 * Creation of a unique ID will increment the sequence number for that agent type.
 * @param agentName
 */
function createUniqueAgentId(agentName) {
    const current = agentInstanceSequence.get(agentName) ?? 0;
    agentInstanceSequence.set(agentName, current + 1);
    const count = agentInstanceSequence.get(agentName);
    const workerName = getSelfMetadata().workerId.workerName;
    return new AgentId(workerName, agentName, count);
}

function createAgentName(name) {
    return name;
}

const methodMetadata = new Map();
function ensureMeta(target, method) {
    const className = target.constructor.name;
    if (!methodMetadata.has(className)) {
        methodMetadata.set(className, new Map());
    }
    const classMeta = methodMetadata.get(className);
    if (!classMeta.has(method)) {
        classMeta.set(method, {});
    }
    return classMeta.get(method);
}
function Prompt(prompt) {
    return function (target, propertyKey) {
        const meta = ensureMeta(target, propertyKey);
        meta.prompt = prompt;
    };
}
function Description(desc) {
    return function (target, propertyKey) {
        const meta = ensureMeta(target, propertyKey);
        meta.description = desc;
    };
}
function buildInputSchema(paramTypes) {
    return {
        tag: 'tuple',
        val: paramTypes.map((parameterInfo) => [parameterInfo.name, mapToParameterType(parameterInfo.type)])
    };
}
function buildOutputSchema(returnType) {
    return {
        tag: 'tuple',
        val: [["return-value", mapToParameterType(returnType)]]
    };
}
function mapToParameterType(type) {
    const witType = constructWitTypeFromTsType(type);
    return {
        tag: 'component-model',
        val: witType
    };
}
function Agent$1() {
    return function (ctor) {
        const className = ctor.name;
        if (agentRegistry.has(className))
            return ctor;
        let classType = Metadata.getTypes().filter((type) => type.isClass() && type.name == className)[0];
        let filteredType = classType;
        let methodNames = filteredType.getMethods();
        const methods = methodNames.map(methodInfo => {
            const signature = methodInfo.getSignatures()[0];
            const parameters = signature.getParameters();
            const returnType = signature.returnType;
            const methodName = methodInfo.name.toString();
            const baseMeta = methodMetadata.get(className)?.get(methodName) ?? {};
            const inputSchema = buildInputSchema(parameters);
            const outputSchema = buildOutputSchema(returnType);
            return {
                name: methodName,
                description: baseMeta.description ?? '',
                promptHint: baseMeta.prompt ?? '',
                inputSchema: inputSchema,
                outputSchema: outputSchema
            };
        });
        const agentType = {
            typeName: className,
            description: className,
            constructor: {
                name: className,
                description: `Constructs ${className}`,
                promptHint: 'Enter something...',
                inputSchema: defaultStringSchema()
            },
            methods,
            dependencies: [],
        };
        agentRegistry.set(className, agentType);
        ctor.createRemote = getRemoteClient(ctor);
        ctor.createLocal = getLocalClient(ctor);
        agentInitiators.set(className, {
            initiate: (agentName, constructorParams) => {
                // Fix, what if multiple constructors?
                const methodInfo = classType.getConstructors()[0];
                const constructorParamTypes = methodInfo.getParameters();
                const constructorParamWitValues = getWitValueFromDataValue(constructorParams);
                const convertedConstructorArgs = constructorParamWitValues.map((witVal, idx) => {
                    return constructTsValueFromWitValue(witVal, constructorParamTypes[idx].type);
                });
                const instance = new ctor(...convertedConstructorArgs);
                const uniqueAgentId = createUniqueAgentId(createAgentName(className));
                instance.getId = () => uniqueAgentId;
                const agentInternal = {
                    getId: () => {
                        return uniqueAgentId;
                    },
                    getAgentType: () => {
                        const def = agentRegistry.get(className);
                        if (!def)
                            throw new Error(`AgentType not found for ${className}`);
                        return def;
                    },
                    invoke: async (method, args) => {
                        const fn = instance[method];
                        if (!fn)
                            throw new Error(`Method ${method} not found on agent ${className}`);
                        const def = agentRegistry.get(className);
                        const methodInfo = classType.getMethod(method);
                        const methodSignature = methodInfo.getSignatures()[0];
                        const paramTypes = methodSignature.getParameters();
                        const argsWitValues = getWitValueFromDataValue(args);
                        const returnType = methodSignature.returnType;
                        const convertedArgs = argsWitValues.map((witVal, idx) => {
                            return constructTsValueFromWitValue(witVal, paramTypes[idx].type);
                        });
                        const result = await fn.apply(instance, convertedArgs);
                        const methodDef = def?.methods.find(m => m.name === method);
                        if (!methodDef) {
                            const entriesAsStrings = Array.from(agentRegistry.entries()).map(([key, value]) => `Key: ${key}, Value: ${JSON.stringify(value, null, 2)}`);
                            throw new Error(`Method ${method} not found in agent definition for ${className} ${def} ${def?.methods}. Available: ${entriesAsStrings.join(", ")}`);
                        }
                        // Why is return value a tuple with a single element?
                        // why should it have a name?
                        // FIXME
                        return { tag: 'ok', val: getDataValueFromWitValueReturned(constructWitValueFromTsValue(result, returnType)) };
                    }
                };
                return {
                    tag: 'ok',
                    val: new ResolvedAgent(className, agentInternal, instance)
                };
            }
        });
    };
}
// FIXME: in the next verison, handle all dataValues
function getWitValueFromDataValue(dataValue) {
    if (dataValue.tag === 'tuple') {
        return dataValue.val.map((elem) => {
            if (elem.tag === 'component-model') {
                return elem.val;
            }
            else {
                throw new Error(`Unsupported element type: ${elem.tag}`);
            }
        });
    }
    else {
        throw new Error(`Unsupported DataValue type: ${dataValue.tag}`);
    }
}
// Why is return value a tuple with a single element?
// why should it have a name?
function getDataValueFromWitValueReturned(witValues) {
    return {
        tag: 'tuple',
        val: [{
                tag: 'component-model',
                val: witValues
            }]
    };
}
function defaultStringSchema() {
    return {
        tag: 'tuple',
        val: [
            ["test-name", {
                    tag: 'unstructured-text',
                    val: { restrictions: [{ languageCode: 'en' }] }
                }]
        ]
    };
}

/// Registry
const agents = new Map();
// Component export
class Agent {
    async getId() {
        return this.resolvedAgent.getId().toString();
    }
    async invoke(methodName, input) {
        return this.resolvedAgent.invoke(methodName, input);
    }
    async getDefinition() {
        this.resolvedAgent.getDefinition();
    }
    static async create(agentType, input) {
        console.log("Agent constructor called", agentType, input);
        const initiator = agentInitiators.get(agentType);
        if (!initiator) {
            const entries = Array.from(agentInitiators.keys());
            throw new Error(`No implementation found for agent: ${agentType}. Valid entries are ${entries.join(", ")}`);
        }
        const initiateResult = initiator.initiate(agentType, input);
        if (initiateResult.tag == "ok") {
            const agent = new Agent();
            agent.resolvedAgent = initiateResult.val;
            agents.set(initiateResult.val.getId(), agent);
            return {
                tag: "ok",
                val: agent
            };
        }
        else {
            return {
                tag: "err",
                val: initiateResult.val
            };
        }
    }
}
async function getAgent(agentType, agentId) {
    console.log("getAgent called", agentId);
    const typedAgentId = AgentId.fromString(agentId);
    const agent = agents.get(typedAgentId);
    if (!agent) {
        // FIXME: Fix WIT to return a Promise<Result<Agent, AgentError>>
        throw new Error(`Agent with ID ${agentId} not found`);
    }
    return agent;
}
async function discoverAgents() {
    console.log("discoverAgents called");
    return Array.from(agents.values());
}
async function discoverAgentTypes() {
    console.log("discoverAgentTypes called");
    return getRegisteredAgents();
}
const guest = {
    getAgent,
    discoverAgents,
    discoverAgentTypes,
    Agent
};

export { Agent$1 as Agent, AgentId, BaseAgent, Description, Metadata, Prompt, agents, guest };
//# sourceMappingURL=index.mjs.map
