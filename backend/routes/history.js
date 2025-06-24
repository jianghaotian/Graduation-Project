/**
 * 路由 - 操作历史
 */
const router = require('koa-router')();
const { baseURL } = require('../config');
const genRouter = require('../utils/router');
const {
  getListSchema,
} = require('../validator/history');
const {
  getList,
} = require('../service/history');

router.prefix(`${baseURL}/history`);

/**
 * 获取操作历史列表
 */
router.get('/list', async (ctx) => {
  await genRouter({
    ctx,
    schema: getListSchema,
    data: ctx.query,
    service: getList,
  });
});

module.exports = router;
