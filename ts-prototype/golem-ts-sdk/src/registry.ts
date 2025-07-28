import 'reflect-metadata';
import {AgentMethod, DataSchema, AgentType, ParameterType} from 'golem:agent/common';
import {AgentInitiator} from "./agent_initiator";
import {WitValue} from "golem:rpc/types@0.2.1";
import {AgentInternal} from "./ts_agent";
import {ResolvedAgent} from "./resolved_agent";
import {convertJsToWitValueUsingSchema} from "./conversions";
import {Metadata} from "./type_metadata";
import {ClassType, ParameterInfo, Type} from "rttist";
import {mapTypeToAnalysedType} from "./type_mapping";
import {WitTypeBuilder} from "./wit_type_builder";
import {convertToTsValue} from "./value_mapping";
import {fromWitValue} from "./value";
import {getLocalClient} from "./clients";

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

export function AgentImpl() {
    return function <T extends new (...args: any[]) => any>(ctor: T){

        const className = ctor.name;

        if (agentRegistry.has(className)) return ctor;

        let classType =
            Metadata.getTypes().filter((type) => type.isClass() && type.name == className)[0];

        let filteredType = (classType as ClassType);
        let methodNames = filteredType.getMethods();

        const methods: AgentMethod[] = methodNames.map(methodInfo => {
            const signature = methodInfo.getSignatures()[0];

            const parameters = signature.getParameters();

            const returnType: Type = signature.returnType;

            const methodName = methodInfo.name.toString();

            const baseMeta =
                methodMetadata.get(className)?.get(methodName) ?? {};

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
            typeName: className,
            description: className,
            agentConstructor: {
                name: className,
                description: `Constructs ${className}`,
                promptHint: 'Enter something...',
                inputSchema: defaultStringSchema()
            },
            methods,
            requires: [],
        };

        agentRegistry.set(className, agentType);

        (ctor as any).createRemote = (...args: any[]) => {
            const instance = new ctor(...args);
            return new Proxy(instance, {
                get(target, prop) {
                    const val = target[prop];
                    if (typeof val === "function") {
                        return (...fnArgs: any[]) => {
                            console.log(`[Remote] ${ctor.name}.${String(prop)}(${fnArgs})`);
                            return Promise.resolve(`<<remote ${String(prop)} result>>`);
                        };
                    }
                    return val;
                }
            });
        };

        (ctor as any).createLocal = getLocalClient(ctor);

        agentInitiators.set(className, {
            initiate: (agentName: string, constructor_params: WitValue[]) => {
                const instance = new ctor(...constructor_params);

                const tsAgent: AgentInternal = {
                    getId: () => `${className}--0`,
                    getDefinition: () => {
                        const def = agentRegistry.get(className);
                        if (!def) throw new Error(`AgentType not found for ${className}`);
                        return def;
                    },
                    invoke:  async (method, args) => {
                        const fn = instance[method];
                        if (!fn) throw new Error(`Method ${method} not found on agent ${className}`);

                        const def = agentRegistry.get(className);

                        const methodInfo = (classType as ClassType).getMethod(method)!;

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

                            throw new Error(`Method ${method} not found in agent definition for ${className} ${def} ${def?.methods}. Available: ${ entriesAsStrings.join(", ")}`);
                        }

                        return convertJsToWitValueUsingSchema(result, methodDef.outputSchema);
                    }
                };

                return new ResolvedAgent(className, tsAgent);
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
