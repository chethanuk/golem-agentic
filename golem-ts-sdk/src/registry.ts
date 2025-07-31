import 'reflect-metadata';
import {AgentMethod, DataSchema, AgentType, ParameterType} from 'golem:agent/common';
import {AgentInitiator} from "./agent_initiator";
import {WitValue} from "golem:rpc/types@0.2.1";
import {TSAgent} from "./ts_agent";
import {ResolvedAgent} from "./resolved_agent";
import {convertJsToWitValueUsingSchema} from "./conversions";

export const agentInitiators = new Map<string, AgentInitiator>();

export const agentRegistry = new Map<string, AgentType>();

const methodMetadata = new Map<string, Map<string, { prompt?: string; description?: string }>>();

function ensureMeta(target: any, method: string) {
    const className = target.constructor.name;
    if (!methodMetadata.has(className)) {
        methodMetadata.set(className, new Map());
    }
    const classMeta = methodMetadata.get(className)!;
    if (!classMeta.has(method)) {
        classMeta.set(method, {});
    }
    return classMeta.get(method)!;
}

export function Prompt(prompt: string) {
    return function (target: Object, propertyKey: string) {
        const meta = ensureMeta(target, propertyKey);
        meta.prompt = prompt;
    };
}

export function Description(desc: string) {
    return function (target: Object, propertyKey: string) {
        const meta = ensureMeta(target, propertyKey);
        meta.description = desc;
    };
}

export function AgentDefinition<T extends abstract new (...args: any[]) => any>(name?: string) {
    return function (BaseClass: T): T {
        const baseName = name ?? BaseClass.name;

        (BaseClass as any).__agent_base_name__ = baseName;

        return class extends (BaseClass as any) {
            constructor(...args: any[]) {
                super(...args);

                const concreteClass = this.constructor;
                const concreteName = concreteClass.name;

                if (agentRegistry.has(concreteName)) return;

                const methodNames = Object.getOwnPropertyNames(concreteClass.prototype)
                    .filter(m => m !== 'constructor' && typeof concreteClass.prototype[m] === 'function');

                const methods: AgentMethod[] = methodNames.map(methodName => {
                    // To be replaced with Rttis, but it requires generation of metadata
                    const paramTypes: Function[] = Reflect.getMetadata(
                        'design:paramtypes',
                        concreteClass.prototype,
                        methodName
                    ) ?? [];

                    const returnType: Function | undefined = Reflect.getMetadata(
                        'design:returntype',
                        concreteClass.prototype,
                        methodName
                    );

                    const baseMeta = methodMetadata.get(BaseClass.name)?.get(methodName) ?? {};

                    return {
                        name: methodName,
                        description: baseMeta.description ?? '',
                        promptHint: baseMeta.prompt ?? undefined,
                        inputSchema: buildInputSchema(paramTypes),
                        outputSchema: buildOutputSchema(returnType),
                    };
                });

                const agentType: AgentType = {
                    typeName: baseName,
                    description: concreteName,
                    agentConstructor: {
                        name: concreteName,
                        description: `Constructs ${concreteName}`,
                        promptHint: 'Enter something...',
                        inputSchema: defaultStringSchema()
                    },
                    methods,
                    requires: [],
                };

                agentRegistry.set(baseName, agentType);
            }
        } as any as T;
    };
}

function buildInputSchema(paramTypes: Function[]): DataSchema {
    return {
        tag: 'structured',
        val: {
            parameters: paramTypes.map(mapTypeToSchema)
        }
    };
}

function buildOutputSchema(returnType?: Function): DataSchema {
    return {
        tag: 'structured',
        val: {
            parameters: [mapTypeToSchema(returnType)]
        }
    };
}


// Temporary function, we need rttist to keep track of generic types
function mapTypeToSchema(type?: Function): ParameterType {
    console.log('mapTypeToSchema', type);
    switch (type) {
        case String:
            return { tag: 'wit', val: {
                nodes: [{
                    tag: "prim-string-type",
                }]}};

        default:
            return { tag: 'wit', val: {
                    nodes: [{
                        tag: "prim-string-type",
                    }]}};
    }
}

export function AgentImplementation() {
    return function <T extends new (...args: any[]) => any>(ctor: T) {

        const baseName = (ctor as any).__agent_base_name__;

        if (!baseName) {
            throw new Error(
                `Unable to determine base class name for ${ctor.name}` +
                `Ensure it extends a class decorated with @AgentDefinition.`
            );
        }

        agentInitiators.set(baseName, {
            initiate: (agentName: string, constructor_params: WitValue[]) => {
                const instance = new ctor(...constructor_params);

                const tsAgent: TSAgent = {
                    getId: () => `${baseName}--0`,
                    getDefinition: () => {
                        const def = agentRegistry.get(baseName);
                        if (!def) throw new Error(`AgentType not found for ${baseName}`);
                        return def;
                    },
                    invoke:  async (method, args) => {
                        const fn = instance[method];
                        if (!fn) throw new Error(`Method ${method} not found on agent ${baseName}`);

                        const def = agentRegistry.get(baseName);

                        const paramTypes: Function[] = Reflect.getMetadata(
                            'design:paramtypes',
                            Object.getPrototypeOf(instance),
                            method
                        ) ?? [];


                        const convertedArgs = args.map((witVal, idx) =>
                            convertWitValueToJs(witVal, paramTypes[idx])
                        );

                        const result = await fn.apply(instance, convertedArgs);

                        const methodDef = def?.methods.find(m => m.name === method);

                        const entriesAsStrings = Array.from(agentRegistry.entries()).map(
                            ([key, value]) => `Key: ${key}, Value: ${JSON.stringify(value, null, 2)}`
                        );

                        if (!methodDef) {
                            throw new Error(`Method ${method} not found in agent definition for ${baseName} ${def} ${def?.methods}. Available: ${ entriesAsStrings.join(", ")}`);
                        }

                        return convertJsToWitValueUsingSchema(result, methodDef.outputSchema);
                    }
                };

                return new ResolvedAgent(baseName, tsAgent);
            }
        });
    };
}


function convertWitValueToJs(value: WitValue, expectedType: Function): any {
    switch (expectedType) {
        case String:
            if (value.nodes[0].tag === 'prim-string') return value.nodes[0].val
            break;
    }
    throw new Error(`Cannot convert WitValue to ${expectedType.name}`);
}


function defaultStringSchema(): DataSchema {
    return {
        tag: 'structured',
        val: {
            parameters: [{
                tag: 'text',
                val: { languageCode: 'en' }
            }]
        }
    };
}
