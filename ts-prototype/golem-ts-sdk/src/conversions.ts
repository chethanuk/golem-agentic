import { DataSchema } from 'golem:agent/common';
import {WitValue, WitTypeNode, WitNode, NodeIndex} from "golem:rpc/types@0.2.1";

export function convertJsToWitValueUsingSchema(value: any, schema: DataSchema): WitValue {
    if (schema.tag !== 'structured') {
        throw new Error(`Only 'structured' schema is supported`);
    }

    const param = schema.val.parameters[0];
    if (param.tag !== 'wit') {
        throw new Error(`Only 'wit' parameters are supported`);
    }

    const nodes: WitNode[] = [];
    convertToWitNodes(value, param.val.nodes, param.val.nodes.length - 1, nodes);
    return { nodes };
}

// This will be changed to how it is in wasm-rpc, changing to wasm-rpc value and convert to wit-value
function convertToWitNodes(
    value: any,
    typeNodes: WitTypeNode[],
    idx: NodeIndex,
    nodes: WitNode[]
): NodeIndex {
    const type = typeNodes[idx];

    const push = (node: WitNode): NodeIndex => {
        nodes.push(node);
        return nodes.length - 1;
    };

    switch (type.tag) {
        case 'prim-string-type':
            return push({ tag: 'prim-string', val: String(value) });

        case 'prim-bool-type':
            return push({ tag: 'prim-bool', val: Boolean(value) });

        case 'prim-u32-type':
            return push({ tag: 'prim-u32', val: Number(value) });

        case 'prim-u64-type':
            return push({ tag: 'prim-u64', val: Number(value) });

        case 'prim-s32-type':
            return push({ tag: 'prim-s32', val: Number(value) });

        case 'prim-s64-type':
            return push({ tag: 'prim-s64', val: Number(value) });

        case 'prim-f32-type':
            return push({ tag: 'prim-float32', val: Number(value) });

        case 'prim-f64-type':
            return push({ tag: 'prim-float64', val: Number(value) });

        case 'record-type': {
            const fieldIndices = type.val.map(([key, fieldIdx]) => {
                return convertToWitNodes(value[key], typeNodes, fieldIdx, nodes);
            });
            return push({ tag: 'record-value', val: fieldIndices });
        }

        case 'tuple-type': {
            const itemIndices = type.val.map((tIdx, i) =>
                convertToWitNodes(value[i], typeNodes, tIdx, nodes)
            );
            return push({ tag: 'tuple-value', val: itemIndices });
        }

        case 'list-type': {
            const itemIdxs = value.map((item: any) =>
                convertToWitNodes(item, typeNodes, type.val, nodes)
            );
            return push({ tag: 'list-value', val: itemIdxs });
        }

        case 'option-type': {
            if (value == null) {
                return push({ tag: 'option-value', val: undefined });
            } else {
                const inner = convertToWitNodes(value, typeNodes, type.val, nodes);
                return push({ tag: 'option-value', val: inner });
            }
        }

        case 'result-type': {
            if (value instanceof Error || (value && value.isErr)) {
                const errVal = convertToWitNodes(value.error ?? value, typeNodes, type.val[1]!, nodes);
                return push({ tag: 'result-value', val: { tag: 'err', val: errVal } });
            } else {
                const okVal = convertToWitNodes(value, typeNodes, type.val[0]!, nodes);
                return push({ tag: 'result-value', val: { tag: 'ok', val: okVal } });
            }
        }

        case 'variant-type': {
            const [variantName] = Object.entries(value)[0]; // assume { variantName: value }
            const index = type.val.findIndex(([name]) => name === variantName);
            const [, maybeNode] = type.val[index];
            const variantIdx = maybeNode !== undefined
                ? convertToWitNodes(value[variantName], typeNodes, maybeNode, nodes)
                : undefined;
            return push({ tag: 'variant-value', val: [index, variantIdx] });
        }

        case 'enum-type': {
            const index = type.val.indexOf(value);
            if (index === -1) throw new Error(`Invalid enum value: ${value}`);
            return push({ tag: 'enum-value', val: index });
        }

        case 'flags-type': {
            const bools = type.val.map(flag => Boolean(value[flag]));
            return push({ tag: 'flags-value', val: bools });
        }

        case 'handle-type': {
            return push({ tag: 'handle', val: [value.uri, value.id] });
        }

        default:
            throw new Error(`Unhandled type tag: ${(type as any).tag}`);
    }
}
