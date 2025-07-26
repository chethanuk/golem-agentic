import {
    AnalysedType,
    NameOptionTypePair,
    NameTypePair,
} from './analysed_type';
import {NodeIndex, ResourceMode, WitTypeNode} from "golem:rpc/types@0.2.1";
import {WitType} from "golem:agent/common";

export class WitTypeBuilder {
    private nodes: WitTypeNode[] = [];
    private mapping = new Map<string, number>();

    static buildWitType(typ: AnalysedType): WitType {
        const builder = new WitTypeBuilder();
        builder.add(typ);
        return builder.build();
    }

    add(typ: AnalysedType): NodeIndex {
        const hash = JSON.stringify(typ);
        if (this.mapping.has(hash)) {
            return this.mapping.get(hash)!;
        }

        const idx = this.nodes.length;
        this.nodes.push({ tag: 'prim-bool-type' });

        const node: WitTypeNode = this.convert(typ);
        this.nodes[idx] = node;
        this.mapping.set(hash, idx);
        return idx;
    }

    build(): WitType {
        return { nodes: this.nodes };
    }

    private convert(typ: AnalysedType): WitTypeNode {
        switch (typ.kind) {
            case 'variant': {
                const cases: [string, NodeIndex | undefined][] = typ.value.cases.map(
                    (c: NameOptionTypePair) => [c.name, c.typ ? this.add(c.typ) : undefined],
                );
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
                const fields: [string, NodeIndex][] = typ.value.fields.map(
                    (f: NameTypePair) => [f.name, this.add(f.typ)],
                );
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

            case 'handle': {
                const resId: number = typ.value.resourceId;
                const mode: ResourceMode =
                    typ.value.mode === 'owned' ? 'owned' : 'borrowed';
                return { tag: 'handle-type', val: [resId, mode] };
            }

            default:
                throw new Error(`Unhandled AnalysedType kind: ${(typ as any).kind}`);
        }
    }
}
