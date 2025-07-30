import {AgentMethod, DataSchema, AgentType, ParameterType} from 'golem:agent/common';
import {WitValue} from "golem:rpc/types@0.2.1";
import {AgentInternal} from "./ts-agent";
import {ResolvedAgent} from "./resolved-agent";
import {Metadata}  from "./type_metadata";
import {ClassType, ParameterInfo, Type} from "rttist";
import {constructWitTypeFromTsType} from "./mapping/type-mapping";
import {getLocalClient, getRemoteClient} from "./client-generation";
import {BaseAgent} from "./base-agent";
import {agents, findAgentByName} from "./index";
import {agentInitiators, agentRegistry} from "./index";
import {createUniqueAgentId} from "./agent-instance-counter";
import {createAgentName} from "./agent-name";
import {constructTsValueFromWitValue, constructWitValueFromTsValue} from "./mapping/value-mapping";


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
    const witType = constructWitTypeFromTsType(type)

    return {
        tag: 'wit',
        val: witType
    };

}

export function Agent() {
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


        (ctor as any).createRemote = getRemoteClient(ctor);
        (ctor as any).createLocal = getLocalClient(ctor);

        // Unfortunately, the AgentId type matching in reflection is not working properly,
        // TODO; something to fix
        const agentDependencies =
            filteredType.getProperties().filter(prop => prop.type.name == "AssistantAgent");

        const agentIdProps =
            filteredType.getProperties().filter(prop => prop.name.toString() == "agentId");

        agentInitiators.set(className, {
            initiate: (agentName: string, constructorParams: WitValue[]) => {

                // Fix, what if multiple constructors?
                const methodInfo = (classType as ClassType).getConstructors()[0];

                const constructorParamTypes: readonly ParameterInfo[] =
                    methodInfo.getParameters();

                const convertedConstructorArgs = constructorParams.map((witVal, idx) => {
                    return constructTsValueFromWitValue(witVal, constructorParamTypes[idx].type)
                });

                const instance = new ctor(...convertedConstructorArgs);

                // Only when the agent is created, we create a unique ID for it
                const uniqueAgentId =
                    createUniqueAgentId(createAgentName(className));

                (instance as BaseAgent).getId = () => uniqueAgentId;

                if (agentDependencies.length === 1) {
                    const agentDependency = agentDependencies[0];

                    if ((instance as any)[agentDependency.name.toString()] === undefined) {
                        const agentInstance = findAgentByName(agentDependency.type.name.toString());

                        if (!agentInstance) {
                            throw new Error(`Agent dependency ${agentDependency.name.toString()} not found for ${className} ` + ` ${agents.entries()}`);
                        }

                        (instance as any)[agentDependency.name.toString()] =
                            agentInstance.resolvedAgent.originalInstance;
                    }
                }

                if (agentIdProps.length === 1) {
                    const agentIdProp = agentIdProps[0];

                    if ((instance as any)[agentIdProp.name.toString()] === undefined) {
                        const uniqueAgentId = createUniqueAgentId(createAgentName(className));
                        (instance as any)[agentIdProp.name.toString()] = uniqueAgentId;
                        (instance as BaseAgent).getId = () => uniqueAgentId;
                    }
                } else {
                    const uniqueAgentId = createUniqueAgentId(createAgentName(className));
                    (instance as BaseAgent).getId = () => uniqueAgentId;
                }

                const agentInternal: AgentInternal = {
                    getId: () => {
                        return uniqueAgentId;
                    },
                    getAgentType: () => {
                        const def = agentRegistry.get(className);
                        if (!def) throw new Error(`AgentType not found for ${className}`);
                        return def;
                    },
                    invoke:  async (method, args) => {
                        const fn = instance[method];
                        if (!fn) throw new Error(`Method ${method} not found on agent ${className}`);

                        const def = agentRegistry.get(className);

                        const methodInfo = (classType as ClassType).getMethod(method)!;

                        const methodSignature = methodInfo.getSignatures()[0];

                        const paramTypes: readonly ParameterInfo[] =
                            methodSignature.getParameters();

                        const returnType: Type =
                            methodSignature.returnType;

                        const convertedArgs = args.map((witVal, idx) => {
                            return constructTsValueFromWitValue(witVal, paramTypes[idx].type)
                        });

                        const result = await fn.apply(instance, convertedArgs);

                        const methodDef = def?.methods.find(m => m.name === method);

                        if (!methodDef) {
                            const entriesAsStrings = Array.from(agentRegistry.entries()).map(
                                ([key, value]) => `Key: ${key}, Value: ${JSON.stringify(value, null, 2)}`
                            );

                            throw new Error(`Method ${method} not found in agent definition for ${className} ${def} ${def?.methods}. Available: ${ entriesAsStrings.join(", ")}`);
                        }

                        return constructWitValueFromTsValue(result, returnType);
                    }
                };

                return new ResolvedAgent(className, agentInternal, instance);
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
