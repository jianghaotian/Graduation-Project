import request from '@/utils/request'

export default {
  info: () =>
    request({
      url: '/v1/user/info',
      method: 'get'
    }),
  changeName: (data) =>
    request({
      url: '/v1/user/info',
      method: 'post',
      data: data
    }),
  changeEmail: (data) =>
    request({
      url: '/v1/user/change/email',
      method: 'post',
      data: data
    }),
  changePhone: (data) =>
    request({
      url: '/v1/user/change/phone',
      method: 'post',
      data: data
    }),
  userList: (data) =>
    request({
      url: '/v1/user/search',
      method: 'get',
      params: data
    })
}
