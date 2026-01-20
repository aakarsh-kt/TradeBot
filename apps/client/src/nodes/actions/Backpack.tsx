import { Handle, Position } from "@xyflow/react"
import type { ActionNodeMetadata } from "common/types"

export const Backpack = ({
    data,
}: {
    data: {
        metadata: ActionNodeMetadata
    }
}) => {
    const { metadata } = data

    return (
        <div className="relative w-40 rounded-md border border-fuchsia-400/40 bg-linear-to-br from-[#0b1020] via-[#1a0b2e] to-[#2b0c3f] p-1.5 shadow-[0_0_0_1px_rgba(236,72,153,0.20),0_10px_30px_-18px_rgba(236,72,153,0.85)]">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <div className="text-[12px] font-semibold leading-4 truncate text-fuchsia-50">
                        {metadata.service}
                    </div>
                    <div className="text-[10px] text-fuchsia-200/80 truncate">
                        {metadata.asset ?? "—"}
                    </div>
                </div>
                <span className="shrink-0 rounded-md bg-fuchsia-500/15 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-fuchsia-200 border border-fuchsia-400/30">
                    BP
                </span>
            </div>

            <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <div className="rounded-md border border-fuchsia-400/20 bg-black/20 px-1.5 py-1">
                    <div className="text-[9px] text-fuchsia-200/70">Pos</div>
                    <div className="text-[11px] font-medium capitalize text-fuchsia-50">{metadata.pos ?? "—"}</div>
                </div>
                <div className="rounded-md border border-fuchsia-400/20 bg-black/20 px-1.5 py-1">
                    <div className="text-[9px] text-fuchsia-200/70">Qty</div>
                    <div className="text-[11px] font-medium text-fuchsia-50">{metadata.qty ?? "—"}</div>
                </div>
            </div>

            <Handle
                position={Position.Left}
                type="target"
                className="h-2! w-2! border-2! border-fuchsia-200/70! bg-black!"
            />
            <Handle
                position={Position.Right}
                type="source"
                className="h-2! w-2! border-2! border-fuchsia-200/70! bg-black!"
            />
        </div>
    )
}