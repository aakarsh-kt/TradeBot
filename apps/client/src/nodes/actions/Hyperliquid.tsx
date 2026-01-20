import { Handle, Position } from "@xyflow/react"
import type { ActionNodeMetadata } from "common/types"

export const Hyperliquid = ({
    data,
}: {
    data: {
        metadata: ActionNodeMetadata
    }
}) => {
    const { metadata } = data

    return (
        <div className="relative w-40">
            <div className="relative overflow-hidden rounded-md border border-cyan-200/25 bg-linear-to-br from-[#06121b] via-[#07240f] to-[#07222c] p-1.5 shadow-[0_0_0_1px_rgba(34,211,238,0.16),0_14px_34px_-22px_rgba(34,211,238,0.9)]">
                {/* hologram sheen */}
                <div className="pointer-events-none absolute -left-10 -top-10 h-20 w-[140%] rotate-[-18deg] bg-linear-to-r from-cyan-300/0 via-cyan-200/15 to-cyan-300/0" />

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <div className="size-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.95)]" />
                        <div className="min-w-0">
                            <div className="text-[11px] font-semibold leading-4 truncate text-cyan-50">
                                {metadata.service}
                            </div>
                            <div className="text-[10px] text-cyan-200/75 truncate">{metadata.asset ?? "—"}</div>
                        </div>
                    </div>
                    <span className="rounded-sm bg-cyan-300/10 px-1 py-0.5 text-[9px] font-semibold text-cyan-200 border border-cyan-200/20">
                        HLQ
                    </span>
                </div>

                <div className="relative mt-1.5 grid grid-cols-2 gap-1">
                    <div className="rounded-md border border-cyan-200/15 bg-black/25 px-1.5 py-1">
                        <div className="text-[9px] text-cyan-200/70">Pos</div>
                        <div className="text-[11px] font-semibold capitalize text-cyan-50">{metadata.pos ?? "—"}</div>
                    </div>
                    <div className="rounded-md border border-cyan-200/15 bg-black/25 px-1.5 py-1">
                        <div className="text-[9px] text-cyan-200/70">Qty</div>
                        <div className="text-[11px] font-semibold text-cyan-50">{metadata.qty ?? "—"}</div>
                    </div>
                </div>
            </div>

            {/* Handles are siblings of the overflow-hidden card so they don't get clipped */}
            <Handle
                position={Position.Left}
                type="target"
                className="h-2! w-2! border-2! border-cyan-200/80! bg-black!"
            />
            <Handle
                position={Position.Right}
                type="source"
                className="h-2! w-2! border-2! border-cyan-200/80! bg-black!"
            />
        </div>
    )
}