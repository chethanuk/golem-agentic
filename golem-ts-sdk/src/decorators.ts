import {AgentMethod, DataSchema, AgentType, ElementSchema, DataValue} from 'golem:agent/common';
import {WitValue} from "golem:rpc/types@0.2.2";
import {AgentInternal} from "./agent-internal";
import {ResolvedAgent} from "./resolved-agent";
import {Metadata}  from "./type_metadata";
import {ClassType, ParameterInfo, Type} from "rttist";
import {getLocalClient, getRemoteClient} from "./client-generation";
import {BaseAgent} from "./base-agent";
import {agentInitiators} from "./agent-Initiator";
import {createUniqueAgentId} from "./agent-instance-counter";
import {createAgentName} from "./agent-name";
import {agentRegistry} from "./agent-registry";
import {constructWitTypeFromTsType} from "./mapping/types/ts-to-wit";
import {constructTsValueFromWitValue} from "./mapping/values/wit-to-ts";
import {constructWitValueFromTsValue} from "./mapping/values/ts-to-wit";


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
        tag: 'tuple',
        val: paramTypes.map((parameterInfo) => [parameterInfo.name, mapToParameterType(parameterInfo.type)])
    };
}

function buildOutputSchema(returnType: Type): DataSchema {
    return {
        tag: 'tuple',
        val: [["return-value", mapToParameterType(returnType)]]
    };
}


function mapToParameterType(type: Type): ElementSchema {
    const witType = constructWitTypeFromTsType(type)

    return {
        tag: 'component-model',
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


        const constructorSignatureInfo = (classType as ClassType).getConstructors()[0];

        const constructorParamInfos: readonly ParameterInfo[] =
            constructorSignatureInfo.getParameters();

        const constructorParamTypes =
            constructorParamInfos.map(paramInfo => constructWitTypeFromTsType(paramInfo.type));

        const constructorDataSchema: DataSchema = {
            tag: 'tuple',
            val: constructorParamTypes.map((paramType, idx) => {
                const paramName = constructorParamInfos[idx].name;
                return [paramName, {
                    tag: 'component-model',
                    val: paramType
                }];
            })
        }

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
            constructor: {
                name: className,
                description: `Constructs ${className}`,
                promptHint: 'Enter something...',
                inputSchema: constructorDataSchema
            },
            methods,
            dependencies: [],
        };

        agentRegistry.set(className, agentType);


        (ctor as any).createRemote = getRemoteClient(ctor);
        (ctor as any).createLocal = getLocalClient(ctor);

        agentInitiators.set(className, {
            initiate: (agentName: string, constructorParams: DataValue) => {

                // Fix, what if multiple constructors?
                const constructorInfo = (classType as ClassType).getConstructors()[0];

                const constructorParamTypes: readonly ParameterInfo[] =
                    constructorInfo.getParameters();

                const constructorParamWitValues = getWitValueFromDataValue(constructorParams);

                const convertedConstructorArgs = constructorParamWitValues.map((witVal, idx) => {
                    return constructTsValueFromWitValue(witVal, constructorParamTypes[idx].type)
                });

                const instance = new ctor(...convertedConstructorArgs);

                const uniqueAgentId = createUniqueAgentId(createAgentName(className));
                (instance as BaseAgent).getId = () => uniqueAgentId;

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

                        const argsWitValues = getWitValueFromDataValue(args);

                        const returnType: Type =
                            methodSignature.returnType;

                        const convertedArgs = argsWitValues.map((witVal, idx) => {
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

                        // Why is return value a tuple with a single element?
                        // why should it have a name?
                        // FIXME
                        return { tag: 'ok', val: getDataValueFromWitValueReturned(constructWitValueFromTsValue(result, returnType))};
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
function getWitValueFromDataValue(dataValue: DataValue): WitValue[] {
    if (dataValue.tag === 'tuple') {
        return dataValue.val.map((elem) => {
            if (elem.tag === 'component-model') {
                return elem.val;
            } else {
                throw new Error(`Unsupported element type: ${elem.tag}`);
            }
        })

    } else {
        throw new Error(`Unsupported DataValue type: ${dataValue.tag}`);
    }
}

// Why is return value a tuple with a single element?
// why should it have a name?
function getDataValueFromWitValueReturned(witValues: WitValue): DataValue {
   return {
        tag: 'tuple',
        val: [{
            tag: 'component-model',
            val: witValues
        }]
    }
}
