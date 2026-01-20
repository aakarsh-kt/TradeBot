import { getAuth } from "./auth"

const DEFAULT_BASE_URL = "http://localhost:3000"

export function getBaseUrl() {
    // Optional override: VITE_API_URL=http://localhost:3000
    return import.meta.env.VITE_API_URL ?? DEFAULT_BASE_URL
}

export async function apiFetch(path: string, init: RequestInit = {}) {
    const { token } = getAuth()
    console.log(path,init)
    const headers = new Headers(init.headers)
    headers.set("Content-Type", "application/json")

    if (token) {
        // NOTE: your backend's authMiddleware currently verifies the whole header string.
        // If you change backend to expect Bearer tokens later, update this line.
        headers.set("authorization", token)
    }

    return fetch(`${getBaseUrl()}${path}`, {
        ...init,
        headers,
    })
}
