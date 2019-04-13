import axios from 'axios'
import router from '@/router'
import { getToken } from '@/utils/auth'

var http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
http.interceptors.request.use(function (config) {
  // 我们可以针对非 /login 请求统一加 token
  if (config.url !== '/login') {
    // config.headers.Authorization = window.localStorage.getItem('token')
    config.headers.Authorization = getToken()
  }
  return config // 这句代码就是允许请求通过的规则
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  if (response.data.meta.status === 401) {
    // router.replace(`/login?redirect=${router.history.current.fullPath}`)
    return router.replace(`/login?redirect=${router.currentRoute.fullPath}`)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
export default http
