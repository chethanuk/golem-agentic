import 'reflect-metadata';
import {AgentMethod, DataSchema, AgentType, ParameterType} from 'golem:agent/common';
import {AgentInitiator} from "./agent_initiator";
import {WitValue} from "golem:rpc/types@0.2.1";
import {TSAgent} from "./ts_agent";
import {ResolvedAgent} from "./resolved_agent";
import {convertJsToWitValueUsingSchema} from "./conversions";
import {Metadata} from "./type_metadata";
import {ClassType, ParameterInfo, Type} from "rttist";
import {mapTypeToAnalysedType} from "./type_mapping";
import {WitTypeBuilder} from "./wit_type_builder";
import {convertToTsValue} from "./value_mapping";
import {fromWitValue} from "./value";

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

                let classType =
                    Metadata.getTypes().filter((type) => type.isClass() && type.name == baseName)[0];

                let filteredType = (classType as ClassType);
                let methodNames = filteredType.getMethods();


                const methods: AgentMethod[] = methodNames.map(methodInfo => {
                    const signature = methodInfo.getSignatures()[0];

                    const parameters = signature.getParameters();

                    const returnType: Type = signature.returnType;

                    const methodName = methodInfo.name.toString();

                    const baseMeta =
                        methodMetadata.get(BaseClass.name)?.get(methodName) ?? {};

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

function buildInputSchema(paramTypes: readonly ParameterInfo[]): DataSchema {
    return {
        tag: 'structured',
        val: {
            parameters: paramTypes.map((parameterInfo) => mapToParameterType(parameterInfo.type))
        }
    };
}

function buildOutputSchema(returnType: Type): DataSchema {
    return {
        tag: 'structured',
        val: {
            parameters: [mapToParameterType(returnType)]
        }
    };
}


function mapToParameterType(type: Type): ParameterType {
    const analysedType = mapTypeToAnalysedType(type)
    const witType = WitTypeBuilder.buildWitType(analysedType)

    return {
        tag: 'wit',
        val: witType
    };

}

export function AgentImplementation() {
    return function <T extends new (...args: any[]) => any>(ctor: T) {

        const baseName = (ctor as any).__agent_base_name__;

        const agentClass =
            Metadata.getTypes().filter((type) => type.isClass() && type.name == baseName)[0] as ClassType;

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

                        const methodInfo = agentClass.getMethod(method)!;

                        const paramTypes: readonly ParameterInfo[] =
                            methodInfo.getSignatures()[0].getParameters();


                        const convertedArgs = args.map((witVal, idx) => {
                            return convertToTsValue(fromWitValue(witVal), paramTypes[idx].type)
                        });

                        const result = await fn.apply(instance, convertedArgs);

                        const methodDef = def?.methods.find(m => m.name === method);

                        if (!methodDef) {
                            const entriesAsStrings = Array.from(agentRegistry.entries()).map(
                                ([key, value]) => `Key: ${key}, Value: ${JSON.stringify(value, null, 2)}`
                            );

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
