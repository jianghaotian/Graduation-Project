import request from '@/utils/request'

export default {
  fileList: (data) =>
    request({
      url: '/v1/file/list',
      method: 'get',
      params: data
    })
}
