import http from '../http'

export function getEntity() {
    return http.get('/api/v1/entity/getEntity')
}