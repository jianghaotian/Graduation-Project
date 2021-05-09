import request from '@/utils/request'

export default {
  historyList: (data) =>
    request({
      url: '/v1/history/list',
      method: 'get',
      params: data
    })
}
