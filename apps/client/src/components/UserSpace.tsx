

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { apiFetch } from "../lib/api"
import type { Edge, Node_Type } from "common/types";

type WorkflowListItem = {
    _id: string
    userId: string
    nodes?: Node_Type[]
    edges?: Edge[]
}

export const UserSpace = () => {
    const navigate = useNavigate()


    const [workflows, setWorkflows] = useState<WorkflowListItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [username,setUsername] = useState<string>("")


    useEffect(() => {
        async function getUsername(){
            try{
                const response  = await apiFetch("/user",{
                    method:"GET"
                })
                const json = await response.json().catch(()=>null)
                if(json){
                    setUsername(()=>json.username);
                }
            }
            catch(e){
                console.log(e,"NO user found")
            }
        }
        getUsername();
        let cancelled = false
        async function load() {
            setLoading(true)
            setError(null)
            try {
                const response = await apiFetch("/getWorkflows", {
                    method: "GET",
                })
                const json = await response.json().catch(() => null)
                console.log(json.workflows)
                if (!response.ok) {
                    setError(json?.message ?? "Failed to load workflows")
                    return
                }

                if (!cancelled) {
                    setWorkflows(json?.workflows ?? [])
                }

            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load workflows")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
            <div className="relative overflow-hidden rounded-2xl border bg-background/70 p-6 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/50">
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
                    <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/12 blur-3xl" />
                    <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-violet-500/12 blur-3xl" />
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Dashboard</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{username}</h1>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button
                            className="shadow-sm"
                            onClick={() => {
                                navigate("/workflow/new")
                            }}
                        >
                            + New workflow
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            Open builder
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <section className="rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/50 lg:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-base font-semibold">Your workflows</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Pick up where you left off.</p>
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => navigate("/workflow/new")}>
                            Create
                        </Button>
                    </div>

                    <div className="mt-4">
                        {loading ? (
                            <div className="text-sm text-muted-foreground">Loading workflows…</div>
                        ) : error ? (
                            <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                                {error}
                            </div>
                        ) : workflows.length === 0 ? (
                            <div className="rounded-xl border border-dashed p-6">
                                <p className="text-sm text-muted-foreground">
                                    No workflows yet. Create your first one to get started.
                                </p>
                                <div className="mt-3">
                                    <Button onClick={() => navigate("/workflow/new")}>Create workflow</Button>
                                </div>
                            </div>
                        ) : (
                            <ul className="grid gap-3 sm:grid-cols-2">
                                {workflows.map((wf) => (
                                    <li key={wf._id}>
                                        <button
                                            className="group w-full rounded-xl border bg-background/50 p-4 text-left transition-colors hover:bg-muted"
                                            onClick={() => navigate(`/workflow/${wf._id}`)}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="font-medium tracking-tight">Workflow {wf._id.slice(0, 6)}…</div>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        {wf.nodes?.length ?? 0} nodes • {wf.edges?.length ?? 0} edges
                                                    </div>
                                                </div>
                                                <div className="text-xs text-muted-foreground group-hover:text-foreground">Open →</div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

                <aside className="rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/50">
                    <h2 className="text-base font-semibold">Quick actions</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Common tasks</p>

                    <div className="mt-4 grid gap-3">
                        <button
                            className="rounded-xl border bg-background/50 p-4 text-left transition-colors hover:bg-muted"
                            onClick={() => navigate("/workflow/new")}
                        >
                            <div className="text-sm font-medium">Build a new automation</div>
                            <div className="mt-1 text-xs text-muted-foreground">Start with a trigger and add actions.</div>
                        </button>

                        <button
                            className="rounded-xl border bg-background/50 p-4 text-left transition-colors hover:bg-muted"
                            onClick={async () => {
                          
                                await apiFetch("/nodes")
                            }}
                        >
                            <div className="text-sm font-medium">Refresh available nodes</div>
                            <div className="mt-1 text-xs text-muted-foreground">Pull the latest actions/triggers.</div>
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    )
}