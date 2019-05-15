
import { get, post } from './http'

// 获取用户资料
async function userInfo (data) {
  return post('api/user/info', data)
}
// 获得靓号列表
async function prettyNumber (data) {
  return get('/api/open-member/qg-number-lists', data)
}

// 获取
export {
  userInfo,
  prettyNumber
}
