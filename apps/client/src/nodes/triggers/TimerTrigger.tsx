import { Handle, Position } from "@xyflow/react";
import type { TimerMetaData } from "common/types";



export function TimerTrigger({ data }: {
    data: {
        metadata: TimerMetaData
    },

}) {

    const seconds = data.metadata.time
    const hours = seconds ? seconds / 3600 : undefined

    return (
        <div className="relative w-40">
            <div className="relative overflow-hidden rounded-md border border-violet-300/20 bg-[#0b0714] p-1.5 shadow-[0_18px_36px_-24px_rgba(168,85,247,0.9)]">
                {/* rings */}
                <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full border border-violet-300/10" />
                <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full border border-violet-300/10" />
                <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full border border-violet-300/10" />

                <div className="relative flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <div className="text-[11px] font-semibold leading-4 truncate text-violet-50">Timer</div>
                        <div className="text-[10px] text-violet-200/70 truncate">
                            every {hours !== undefined ? `${hours}h` : "—"}
                        </div>
                    </div>
                    <span className="shrink-0 rounded-sm bg-violet-300/10 px-1 py-0.5 text-[9px] font-semibold text-violet-200 border border-violet-300/20">
                        ⏱
                    </span>
                </div>

                <div className="relative mt-1.5 flex items-end justify-between rounded-md border border-violet-300/15 bg-black/30 px-1.5 py-1">
                    <div className="text-[9px] text-violet-200/70">Interval</div>
                    <div className="text-[12px] font-semibold leading-4 text-violet-50">
                        {hours !== undefined ? `${hours}h` : "—"}
                    </div>
                </div>
            </div>

            {/* Handle outside the clipped card */}
            <Handle
                position={Position.Right}
                type="source"
                className="h-2! w-2! border-2! border-violet-200/80! bg-black!"
            />
        </div>
    )
}