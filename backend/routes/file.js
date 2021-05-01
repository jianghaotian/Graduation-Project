/**
 * 路由 - 文件
 */
const router = require('koa-router')();
const { baseURL } = require('../config');
const genRouter = require('../utils/router');
const {
  getListSchema,
  uploadSchema,
  newFolderSchema,
  renameFileSchema,
  deleteFileSchema,
} = require('../validator/file');
const {
  getList,
  uploadFile,
  newFolder,
  renameFile,
  deleteFile,
  downloadFile,
} = require('../service/file');

router.prefix(`${baseURL}/file`);

/**
 * 获取仓库列表
 */
router.get('/list', async (ctx) => {
  await genRouter({
    ctx,
    schema: getListSchema,
    data: ctx.query,
    service: getList,
  });
});

/**
 * 上传文件
 */
router.post('/upload', async (ctx) => {
  await genRouter({
    ctx,
    schema: uploadSchema,
    data: ctx.request.body,
    files: ctx.request.files,
    service: uploadFile,
  });
});

/**
 * 上传文件
 */
router.post('/new/folder', async (ctx) => {
  await genRouter({
    ctx,
    schema: newFolderSchema,
    data: ctx.request.body,
    service: newFolder,
  });
});

/**
 * 文件重命名
 */
router.post('/rename', async (ctx) => {
  await genRouter({
    ctx,
    schema: renameFileSchema,
    data: ctx.request.body,
    service: renameFile,
  });
});

/**
 * 删除文件
 */
router.post('/delete', async (ctx) => {
  await genRouter({
    ctx,
    schema: deleteFileSchema,
    data: ctx.request.body,
    service: deleteFile,
  });
});

/**
 * 下载文件
 */
router.get('/download/:uid', async (ctx) => {
  await downloadFile(ctx.params, ctx.state.jwt?.id, ctx);
});

module.exports = router;
