import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { apiFetch } from "../lib/api"
import { AuthCard, AuthError, AuthHeader, AuthShell } from "../components/auth/AuthShell"

export default function SignUp() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    return (
        <AuthShell>
            <AuthCard>
                <AuthHeader title="Create account" subtitle="Sign up to start building workflows." tag="onboarding" />

                <form
                    className="mt-6 space-y-4"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setError(null)
                        setLoading(true)
                        try {
                            const res = await apiFetch("/signup", {
                                method: "POST",
                                body: JSON.stringify({ username, password }),
                            })

                            const json = await res.json().catch(() => null)
                            if (!res.ok) {
                                setError(json?.message ?? "Failed to sign up")
                                return
                            }

                            // backend returns { id } for signup; redirect to signin
                            navigate("/signin")
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
                            autoComplete="new-password"
                        />
                    </div>

                    {error ? <AuthError message={error} /> : null}

                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? "Creating…" : "Create account"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link className="text-foreground underline" to="/signin">
                            Sign in
                        </Link>
                    </p>
                </form>
            </AuthCard>
        </AuthShell>
    )
}
