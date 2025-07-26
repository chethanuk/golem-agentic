import {WitNode, WitValue} from "golem:rpc/types@0.2.1";

export type Value =
    | { kind: 'bool'; value: boolean }
    | { kind: 'u8'; value: number }
    | { kind: 'u16'; value: number }
    | { kind: 'u32'; value: number }
    | { kind: 'u64'; value: number }
    | { kind: 's8'; value: number }
    | { kind: 's16'; value: number }
    | { kind: 's32'; value: number }
    | { kind: 's64'; value: number }
    | { kind: 'f32'; value: number }
    | { kind: 'f64'; value: number }
    | { kind: 'char'; value: string }
    | { kind: 'string'; value: string }
    | { kind: 'list'; value: Value[] }
    | { kind: 'tuple'; value: Value[] }
    | { kind: 'record'; value: Value[] }
    | { kind: 'variant'; caseIdx: number; caseValue?: Value }
    | { kind: 'enum'; value: number }
    | { kind: 'flags'; value: boolean[] }
    | { kind: 'option'; value?: Value }
    | { kind: 'result'; value: { ok?: Value; err?: Value } }
    | { kind: 'handle'; uri: string; resourceId: number };


export function fromWitValue(wit: WitValue): Value {
    if (!wit.nodes.length) throw new Error("Empty nodes in WitValue");
    return buildTree(wit.nodes[0], wit.nodes);
}


function buildTree(node: WitNode, nodes: WitNode[]): Value {
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
            const res: { tag: "ok"; val: number | undefined } | { tag: "err"; val: number | undefined } = node.val;

            if (res.tag === "ok") {
                return {
                    kind: "result",
                    value: {
                        ok: res.val !== undefined ? buildTree(nodes[res.val], nodes) : undefined,
                    },
                };
            } else {
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
            throw new Error(`Unhandled tag: ${(node as any).tag}`);
    }
}
