import http from '../http'

export function logout(): Promise<any> {
    // return http.get('/metadata/logout')
    return http.post('/api/admin/v1/logout', null)
}