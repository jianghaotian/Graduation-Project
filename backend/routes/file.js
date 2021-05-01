/**
 * 路由 - 文件
 */
const router = require('koa-router')();
const { baseURL } = require('../config');
const genRouter = require('../utils/router');
const {
  getListSchema,
  uploadSchema,
} = require('../validator/file');
const {
  getList,
  uploadFile,
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

module.exports = router;
