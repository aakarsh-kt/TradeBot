import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { setAuth } from "../lib/auth"
import { apiFetch } from "../lib/api"
import { AuthCard, AuthError, AuthHeader, AuthShell } from "../components/auth/AuthShell"

export default function SignIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    return (
        <AuthShell>
            <AuthCard>
                <AuthHeader title="Sign in" subtitle="Welcome back. Enter your credentials." tag="terminal" />

                <form
                    className="mt-6 space-y-4"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setError(null)
                        setLoading(true)
                        try {
                            const res = await apiFetch("/signin", {
                                method: "POST",
                                body: JSON.stringify({ username, password }),
                            })

                            const json = await res.json().catch(() => null)
                            if (!res.ok) {
                                setError(json?.message ?? "Failed to sign in")
                                return
                            }

                            setAuth(json.token, json.id)
                            navigate("/")
                        } catch {
                            setError("Network error")
                        } finally {
                            setLoading(false)
                        }
                    }}
                >
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="yourname"
                            autoComplete="username"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>

                    {error ? <AuthError message={error} /> : null}

                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Don’t have an account?{" "}
                        <Link className="text-foreground underline" to="/signup">
                            Sign up
                        </Link>
                    </p>
                </form>
            </AuthCard>
        </AuthShell>
    )
}
