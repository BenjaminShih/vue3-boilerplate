import axios, { AxiosRequestConfig } from 'axios'

const http = axios.create();

// 添加请求拦截器
http.interceptors.request.use((config: AxiosRequestConfig) => {
    config.url = process.env.NODE_ENV === 'production' ?
        process.env.API_PREFIX || '' :
        '/api' + config.url
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
});

export default http
