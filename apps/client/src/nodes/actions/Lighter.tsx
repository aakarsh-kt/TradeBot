import { Handle, Position } from "@xyflow/react"
import type { ActionNodeMetadata } from "common/types"

export const Lighter = ({
    data,
}: {
    data: {
        metadata: ActionNodeMetadata
    }
}) => {
    const { metadata } = data

    return (
        <div className="relative w-40">
            <div className="relative overflow-hidden rounded-md border border-amber-300/30 bg-zinc-950 p-1.5 shadow-[0_16px_30px_-22px_rgba(252,211,77,0.85)]">
                {/* caution stripe */}
                <div className="pointer-events-none absolute -left-6 -top-6 h-10 w-[140%] rotate-[-14deg] bg-[repeating-linear-gradient(45deg,rgba(252,211,77,0.95),rgba(252,211,77,0.95)_8px,rgba(9,9,11,0.95)_8px,rgba(9,9,11,0.95)_16px)] opacity-90" />

                <div className="relative flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <div className="text-[12px] font-semibold leading-4 truncate text-amber-50">
                            {metadata.service}
                        </div>
                        <div className="text-[10px] text-amber-200/70 truncate">{metadata.asset ?? "—"}</div>
                    </div>
                    <span className="shrink-0 rounded-sm bg-black/60 px-1 py-0.5 text-[9px] font-semibold text-amber-200 border border-amber-300/30">
                        LTR
                    </span>
                </div>

                <div className="relative mt-1.5 grid grid-cols-2 gap-1">
                    <div className="rounded-md border border-amber-300/20 bg-black/50 px-1.5 py-1">
                        <div className="text-[9px] text-amber-200/70">Pos</div>
                        <div className="text-[11px] font-semibold capitalize text-amber-50">
                            {metadata.pos ?? "—"}
                        </div>
                    </div>
                    <div className="rounded-md border border-amber-300/20 bg-black/50 px-1.5 py-1">
                        <div className="text-[9px] text-amber-200/70">Qty</div>
                        <div className="text-[11px] font-semibold text-amber-50">{metadata.qty ?? "—"}</div>
                    </div>
                </div>
            </div>

            {/* Handles are siblings of the overflow-hidden card so they don't get clipped */}
            <Handle
                position={Position.Left}
                type="target"
                className="h-2! w-2! border-2! border-amber-200/80! bg-black!"
            />
            <Handle
                position={Position.Right}
                type="source"
                className="h-2! w-2! border-2! border-amber-200/80! bg-black!"
            />
        </div>
    )
}