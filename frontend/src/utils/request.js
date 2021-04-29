import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${store.getters.token}`
    return config
  },
  (error) => {
    Message({ type: 'error', message: error })
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     error.name = '401 未经授权'
    //     error.message = error.response.data.message
    //     store.dispatch('user/resetToken')
    //     router.push('/')
    //   } else if (error.response.status === 403) {
    //     error.name = '403 禁止访问'
    //     error.message = error.response.data.message
    //   } else if (error.response.status === 500) {
    //     error.name = '500 内部服务器错误'
    //     error.message = error.response.data.message
    //   } else {
    //     error.name = error.response.data.status + ' ' + error.response.data.error
    //     error.message = error.response.data.message
    //   }
    // } else {
    //   error.name = '错误'
    //   error.message = '网络异常'
    // }
    if (error.response.status === 401) {
      // store.dispatch('user/resetToken')
      router.push('/')
    }
    Message({ type: 'error', message: error.response.data.message })
    return Promise.reject(error)
  }
)

export default instance
