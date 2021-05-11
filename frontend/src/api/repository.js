import request from '@/utils/request'

export default {
  // 获取仓库列表
  getRepoList: (data) =>
    request({
      url: '/v1/repository/list',
      method: 'get',
      params: data
    }),
  getRepoInfo: (data) =>
    request({
      url: '/v1/repository/info',
      method: 'get',
      params: data
    }),
  createRepository: (data) =>
    request({
      url: '/v1/repository/create',
      method: 'post',
      data: data
    }),
  deleteRepository: (data) =>
    request({
      url: '/v1/repository/delete',
      method: 'post',
      data: data
    }),
  getMember: (data) =>
    request({
      url: '/v1/repository/member',
      method: 'get',
      params: data
    }),
  reviseInfo: (data) =>
    request({
      url: '/v1/repository/info',
      method: 'post',
      data: data
    }),
  addMember: (data) =>
    request({
      url: '/v1/repository/member/add',
      method: 'post',
      data: data
    }),
  memberType: (data) =>
    request({
      url: '/v1/repository/member/type',
      method: 'post',
      data: data
    }),
  deleteMember: (data) =>
    request({
      url: '/v1/repository/member/delete',
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
