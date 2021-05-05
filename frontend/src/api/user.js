import request from '@/utils/request'

export default {
  info: () =>
    request({
      url: '/v1/user/info',
      method: 'get'
    })
}
