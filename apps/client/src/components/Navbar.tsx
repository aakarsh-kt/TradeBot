import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { clearAuth, isAuthed } from "../lib/auth"

export default function Navbar() {
    const navigate = useNavigate()
    const authed = isAuthed()

    return (
        <div className="h-1/12 sticky top-0 z-50 border-b  bg-amber-200 w-screen">
            <div className="h-max relative  flex px-8 items-center justify-between  py-3 ">
               
                    <div >
    
                    <Link to="/" className="group inline-flex items-center gap-2 font-semibold tracking-tight">
                        <span className="grid h-7 w-7 place-items-center rounded-md border bg-background/60 text-xs shadow-sm">
                            TB
                        </span>
                        <span className="leading-none">
                            Trading<span className="text-muted-foreground group-hover:text-foreground">Bot</span>
                        </span>
                    </Link>
                    </div>

                <nav className="flex items-center gap-2">
                    {authed ? (
                        <>
                            <Link
                                to="/"
                                className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                Workflow
                            </Link>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                    clearAuth()
                                    navigate("/signin")
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/signin"
                                className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                Sign in
                            </Link>
                            <Link to="/signup">
                                <Button size="sm" className="shadow-sm ">
                                    Sign up
                                </Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    )
}
