import request from '@/utils/request'

export default {
  fileList: (data) =>
    request({
      url: '/v1/file/list',
      method: 'get',
      params: data
    }),
  folderPath: (data) =>
    request({
      url: '/v1/file/path',
      method: 'get',
      params: data
    }),
  deleteFile: (data) =>
    request({
      url: '/v1/file/delete',
      method: 'post',
      data: data
    }),
  newFolder: (data) =>
    request({
      url: '/v1/file/new/folder',
      method: 'post',
      data: data
    })
}
