import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'

const service = axios.create({
  baseURL: "/api/v1",
  timeout: 100000
})

// service.interceptors.request.use(
//   // config => {
//   //   if (config.method === "post") {
//   //     config.data = qs.stringify(config.data);
//   //     config.data = JSON.stringify(config.data);
//   //   }
//   //   return config
//   // },
//   error => {
//     return Promise.reject(error)
//   }
// )
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 403) {
    
      localStorage.removeItem("userLogin");
      document.cookie =
        "beegosessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        location.replace('/')

      return Promise.reject(response);
    } else {
      return Promise.resolve(response);
    }
  }

}, function (error) {

  // 对响应错误做点什么
  return Promise.reject(error.response.status);
});
// service.interceptors.response.use(
//   res => {
//     if (res.data.code ) {
//       // Message({
//       //   message: res.data.msg || 'Error',
//       //   type: 'error',
//       //   duration: 5 * 1000
//       // })
//       if (res.data.code === 2) {
//         MessageBox.confirm('Session timed out, please login again.', '', {
//           confirmButtonText: 'login',
//           cancelButtonText: 'cancel',
//           type: 'warning'
//         }).then(() => {
//           location.reload()
//         })
//       }
//       return Promise.reject(new Error(res.data.msg || 'Error'))
//     } else {
//       return res
//   },
//   error => {
//     console.log('err' + error) 
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
