import type { ReactNode } from "react"

export function AuthShell({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-[calc(100dvh-64px)] items-center justify-center px-4 py-10">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-linear-to-b from-emerald-500/12 via-background to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.06)_1px,transparent_0)] bg-size-[18px_18px]" />
            </div>
            {children}
        </div>
    )
}

export function AuthCard({ children }: { children: ReactNode }) {
    return (
        <div className="w-full max-w-md rounded-2xl border bg-background/70 p-6 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/50">
            {children}
        </div>
    )
}

export function AuthHeader({ title, subtitle, tag }: { title: string; subtitle?: string; tag?: string }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
                {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
            </div>
            {tag ? (
                <div className="hidden select-none rounded-lg border bg-background/60 px-2 py-1 text-[11px] text-muted-foreground sm:block">
                    {tag}
                </div>
            ) : null}
        </div>
    )
}

export function AuthError({ message }: { message: string }) {
    return (
        <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {message}
        </div>
    )
}
