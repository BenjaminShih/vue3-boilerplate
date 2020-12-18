import http from '../http'

export function logout(): Promise<any> {
    return http.get('/metadata/logout')
}