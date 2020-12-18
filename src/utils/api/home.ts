import http from '../http'

export function getPersonalInfo(): Promise<any> {
    return http.get('/eg-uaa/open/api/user/v1/getPersonalInfo')
}