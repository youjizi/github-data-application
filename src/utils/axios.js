import axios from 'axios';

// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 5000,
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => {
    // 确保返回的数据不为null
    if (res.data === null) {
        return Promise.reject(new Error('返回数据为空'));
    }
    return res.data
}, e => {
    // 统一错误处理
    let message = '';
    if (e.response) {
        switch (e.response.status) {
            case 400:
                message = '请求错误';
                break;
            case 401:
                message = '未授权访问';
                break;
            case 404:
                message = '请求地址不存在';
                break;
            default:
                message = '服务器错误';
        }
    } else {
        message = e.message || '网络错误';
    }
    return Promise.reject(new Error(message));
})

export default httpInstance