import axios from 'axios'
import QS from 'qs'
import Bus from '@/Bus'

axios.defaults.baseURL = ''
// 超时时间
axios.defaults.timeout = 5000

// post 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem('config.userBaseInfoKey') || 'sYPjD7x2TVX7DcSyBUlRKAgtSSDSIEM0'
    token && (config.headers.Authorization = 'Bearer ' + token)

    if (config.url !== '/api/pay/status') {
      Bus.$emit('loading', true)
    }
    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    Bus.$emit('loading', false)
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    Bus.$emit('loading', false)
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          window.qaqgame && qaqgame.checkLogin && qaqgame.checkLogin(true, null)
          break
        // 其他错误，直接抛出错误提示
        default:
          console.error('网络错误，请刷新页面或稍后重试！')
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      if (res.data.code === 200) {
        resolve(res.data['data'])
      } else {
        // window.$toast(res.data.message)
        reject(res.data)
      }
    }).catch(err => {
      // window.$toast('网络错误，请刷新或稍后重试！')
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        if (res.data.code === 200) {
          resolve(res.data['data'])
        } else {
          // window.$toast(res.data.message)
          reject(res.data)
        }
      })
      .catch(err => {
        // window.$toast('网络错误，请刷新或稍后重试！')
        reject(err.data)
      })
  })
}
