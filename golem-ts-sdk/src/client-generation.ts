import {Metadata}  from "./type_metadata";
import {ClassType} from "rttist";
import {WasmRpc, WitValue, WorkerId} from "golem:rpc/types@0.2.1";
import {ComponentId, getAgentComponent} from "golem:api/host@1.1.7";
import {agentInitiators} from "./agent-Initiator";
import {
    constructTsValueFromWitValue,
    constructValueFromWitValue,
    constructWitValueFromTsValue, constructWitValueFromValue, Value
} from "./mapping/value-mapping";
import {agentRegistry} from "./agent-registry";

export function getLocalClient<T extends new (...args: any[]) => any>(ctor: T) {
    return (...args: any[]) => {
        const agentName = ctor.name;

        const agentInitiator = agentInitiators.get(agentName)!;

        const agentConstructorDependencies = Metadata.getTypes().filter(
            (type) => type.isClass() && type.name === agentName
        )[0] as ClassType;

        const constructor = agentConstructorDependencies.getConstructors()[0];

        const parameters = constructor.getParameters();

        const parameterWitValues = args.map((fnArg, index) => {
            const typ = parameters[index].type;
            return constructWitValueFromTsValue(fnArg, typ);
        })

        // We ensure to create every agent using agentInitiator
        const resolvedAgent = agentInitiator.initiate(agentName, parameterWitValues) // convert args to wit value
        const instance = resolvedAgent.classInstance;

        return new Proxy(instance, {
            get(target, prop) {
                const val = target[prop];
                if (typeof val === "function") {
                    return (...fnArgs: any[]) => {
                        console.log(`[Local] ${ctor.name}.${String(prop)}(${fnArgs})`);
                        return val.apply(target, fnArgs);
                    };
                }
                return val;
            }
        });

    }
}

export function getRemoteClient<T extends new (...args: any[]) => any>(ctor: T) {
    return (...args: any[]) => {
        const instance = new ctor(...args);
        const metadata = Metadata.getTypes().filter(
            (type) => type.isClass() && type.name === ctor.name
        )[0];

        const agentType = agentRegistry.get(ctor.name)!;

        const componentId = getAgentComponent(agentType.typeName)!;

        const rpc = WasmRpc.ephemeral(componentId);

        const result =
            rpc.invokeAndAwait( "golem:simulated-agentic-typescript/simulated-agent-ts.{weather-agent.new}", []);

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

        const resourceWitValue =
            constructWitValueFromValue(resourceVal);

        return new Proxy(instance, {
            get(target, prop) {

                const val = target[prop];

                if (typeof val === "function") {
                    const signature =
                        (metadata as ClassType).getMethod(prop)?.getSignatures()[0]!;

                    const paramInfo = signature.getParameters();
                    const returnType = signature.returnType;

                    return (...fnArgs: any[]) => {
                        const functionName = `golem:simulated-agentic-typescript/simulated-agent.{[method]{${ctor.name}.{${prop.toString()}}`;
                        const parameterWitValues = fnArgs.map((fnArg, index) => {
                            const typ = paramInfo[index].type;
                            return constructWitValueFromTsValue(fnArg, typ);
                        })
                        const inputArgs: WitValue[] = [resourceWitValue, ...parameterWitValues];
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


function getWorkerName(value: Value, componentId: ComponentId): WorkerId {
    if (value.kind === 'handle') {
        const parts = value.uri.split('/');
        const workerName = parts[parts.length - 1];
        if (!workerName) {
            throw new Error("Worker name not found in URI");
        }
        return {componentId, workerName};
    }

    throw new Error(`Expected value to be a handle, but got: ${JSON.stringify(value)}`);
}