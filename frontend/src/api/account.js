import request from '@/utils/request'

export default {
  // 邮箱/手机号、密码登录
  login: (data) =>
    request({
      url: '/v1/account/login',
      method: 'post',
      data: data
    }),
  register: (data) =>
    request({
      url: '/v1/account/register',
      method: 'post',
      data: data
    }),
  verification: (data) =>
    request({
      url: '/v1/account/verification',
      method: 'post',
      data: data
    }),
  changeVerification: (data) =>
    request({
      url: '/v1/account/change/verification',
      method: 'post',
      data: data
    }),
  loginVerification: (data) =>
    request({
      url: '/v1/account/login/verification',
      method: 'post',
      data: data
    })
}
// export function login(data) {
//   return request({
//     url: '/v1/account/login',
//     method: 'get',
//     params: data
//   })
// }
