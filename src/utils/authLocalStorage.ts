import {TOKEN} from "../constants/token";

export function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN)
    }
}

export function setToken(value: string) {
    if (typeof window !== 'undefined') {
        return localStorage.setItem(TOKEN, value)
    }
}

export function removeToken() {
    if (typeof window !== 'undefined') {
        return localStorage.removeItem(TOKEN)
    }
}


export function getAuthHeader() {
    const token = getToken()
    return token ? {Authorization: `Bearer ${token}`} : {}
}
