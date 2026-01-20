import { Handle, Position } from "@xyflow/react"
import type { PriceMetaData } from "common/types"

export function PriceTrigger({
    data,
}: {
    data: {
        metadata: PriceMetaData
    }
}) {
    const { metadata } = data

    return (
        <div className="relative w-40">
            <div className="relative overflow-hidden rounded-md border border-cyan-300/25 bg-[#060b12] p-1.5 shadow-[0_16px_32px_-22px_rgba(34,211,238,0.75)]">
                {/* subtle grid */}
                <div className="pointer-events-none absolute inset-0 opacity-25 bg-[linear-gradient(rgba(34,211,238,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.10)_1px,transparent_1px)] bg-size-[10px_10px]" />

                <div className="relative flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <div className="text-[11px] font-semibold leading-4 truncate text-cyan-50">Price</div>
                        <div className="text-[10px] text-cyan-200/70 truncate">{metadata.asset ?? "—"}</div>
                    </div>
                    <span className="shrink-0 rounded-sm bg-cyan-300/10 px-1 py-0.5 text-[9px] font-semibold text-cyan-200 border border-cyan-300/20">
                        PX
                    </span>
                </div>

                <div className="relative mt-1.5 rounded-md border border-cyan-300/15 bg-black/35 px-1.5 py-1">
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] text-cyan-200/70">Target</span>
                        <span className="text-[11px] font-semibold text-cyan-50">{metadata.price ?? "—"}</span>
                    </div>
                    <div className="mt-0.5 h-px w-full bg-cyan-200/10" />
                    <div className="mt-0.5 text-[9px] text-cyan-200/60">market watch trigger</div>
                </div>
            </div>

            {/* Handle outside the clipped card */}
            <Handle
                position={Position.Right}
                type="source"
                className="h-2! w-2! border-2! border-cyan-200/80! bg-black!"
            />
        </div>
    )
}