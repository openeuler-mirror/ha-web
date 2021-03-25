import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
  baseURL: Vue.prototype.api_base_url,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
      config.data = JSON.stringify(config.data);
    }
    return config
  },
  error => {
    console.log(error) 
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    if (res.data.code !== 0) {
      // Message({
      //   message: res.data.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      if (res.data.code === 2) {
        MessageBox.confirm('Session timed out, please login again.', '', {
          confirmButtonText: 'login',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.data.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) 
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
