import request from '@/utils/request'

export default {
  // 获取仓库列表
  getRepoList: (data) =>
    request({
      url: '/v1/repository/list',
      method: 'get',
      params: data
    }),
  createRepository: (data) =>
    request({
      url: '/v1/repository/create',
      method: 'post',
      data: data
    }),
  getMember: (data) =>
    request({
      url: '/v1/repository/member',
      method: 'get',
      params: data
    })
}
// export function login(data) {
//   return request({
//     url: '/v1/account/login',
//     method: 'get',
//     params: data
//   })
// }
