type AuthState = {
    token: string | null
    userId: string | null
}

const TOKEN_KEY = "tb_token"
const USER_ID_KEY = "tb_userId"

export function getAuth(): AuthState {
    return {
        token: localStorage.getItem(TOKEN_KEY),
        userId: localStorage.getItem(USER_ID_KEY),
    }
}

export function setAuth(token: string, userId: string) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_ID_KEY, userId)
}

export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
}

export function isAuthed() {
    return Boolean(getAuth().token)
}
