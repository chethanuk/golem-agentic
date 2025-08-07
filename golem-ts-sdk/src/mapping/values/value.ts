import {WitNode, WitValue} from "golem:rpc/types@0.2.2";

export type Value =
    | { kind: 'bool'; value: boolean }
    | { kind: 'u8'; value: number }
    | { kind: 'u16'; value: number }
    | { kind: 'u32'; value: number }
    | { kind: 'u64'; value: bigint }
    | { kind: 's8'; value: number }
    | { kind: 's16'; value: number }
    | { kind: 's32'; value: number }
    | { kind: 's64'; value: bigint }
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
    | { kind: 'handle'; uri: string; resourceId: bigint };


export function constructValueFromWitValue(wit: WitValue): Value {
    if (!wit.nodes.length) throw new Error("Empty nodes in WitValue");

    return buildTree(wit.nodes[wit.nodes.length - 1], wit.nodes);
}

function buildTree(node: WitNode, nodes: WitNode[]): Value {
    switch (node.tag) {
        case 'record-value':
            return {
                kind: 'record',
                value: node.val.map(idx => buildTree(nodes[idx], nodes)),
            };

        case 'variant-value': {
            const [caseIdx, maybeIndex] = node.val;
            if (maybeIndex !== undefined) {
                return {
                    kind: 'variant',
                    caseIdx,
                    caseValue: buildTree(nodes[maybeIndex], nodes),
                };
            } else {
                return {
                    kind: 'variant',
                    caseIdx,
                    caseValue: undefined,
                };
            }
        }

        case 'enum-value':
            return { kind: 'enum', value: node.val };

        case 'flags-value':
            return { kind: 'flags', value: node.val };

        case 'tuple-value':
            return {
                kind: 'tuple',
                value: node.val.map(idx => buildTree(nodes[idx], nodes)),
            };

        case 'list-value':
            return {
                kind: 'list',
                value: node.val.map(idx => buildTree(nodes[idx], nodes)),
            };

        case 'option-value':
            if (node.val === undefined) {
                return { kind: 'option', value: undefined };
            }
            return {
                kind: 'option',
                value: buildTree(nodes[node.val], nodes),
            };

        case 'result-value': {
            const res = node.val;
            if (res.tag === 'ok') {
                return {
                    kind: 'result',
                    value: {
                        ok: res.val !== undefined ? buildTree(nodes[res.val], nodes) : undefined,
                    },
                };
            } else {
                return {
                    kind: 'result',
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


export function constructWitValueFromValue(value: Value): WitValue {
    const nodes: WitNode[] = [];
    buildNodes(value, nodes);
    return { nodes: nodes };
}


function buildNodes(value: Value, nodes: WitNode[]): number {
    const push = (node: WitNode): number => {
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
            } else {
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
            throw new Error(`Unhandled kind: ${(value as any).kind}`);
    }
}
