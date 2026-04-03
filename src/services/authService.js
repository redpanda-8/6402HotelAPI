import { request } from "./apiClient";

const sigIn = (payload) => {
    return request('/api/auth/signin',{
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

const signUp = (payload) => {
    return request('/api/auth/signup',{
        method: 'POST',
        body: JSON.stringify(payload)
    });
}

export const authService = {
    sigIn,
    signUp
}