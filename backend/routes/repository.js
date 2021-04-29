/**
 * 路由 - 仓库
 */
const router = require('koa-router')();
const { baseURL } = require('../config');
const genRouter = require('../utils/router');
const {
  getListSchema,
  createSchema,
  deleteSchema,
  getInfoSchema,
  changeInfoSchema,
  getMemberSchema,
  addMemberSchema,
  delMemberSchema,
  changeTypeSchema,
} = require('../validator/repository');
const {
  getList,
  create,
  delRepo,
  getInfo,
  changeInfo,
  getMember,
  addMember,
  delMember,
  changeType,
} = require('../service/repository');

router.prefix(`${baseURL}/repository`);

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
 * 创建仓库
 */
router.post('/create', async (ctx) => {
  await genRouter({
    ctx,
    schema: createSchema,
    data: ctx.request.body,
    service: create,
  });
});

/**
 * 删除仓库
 */
router.post('/delete', async (ctx) => {
  await genRouter({
    ctx,
    schema: deleteSchema,
    data: ctx.request.body,
    service: delRepo,
  });
});

/**
 * 获取仓库信息
 */
router.get('/info', async (ctx) => {
  await genRouter({
    ctx,
    schema: getInfoSchema,
    data: ctx.query,
    service: getInfo,
  });
});

/**
 * 修改仓库信息
 */
router.post('/info', async (ctx) => {
  await genRouter({
    ctx,
    schema: changeInfoSchema,
    data: ctx.request.body,
    service: changeInfo,
  });
});

/**
 * 获取仓库成员列表
 */
router.get('/member', async (ctx) => {
  await genRouter({
    ctx,
    schema: getMemberSchema,
    data: ctx.query,
    service: getMember,
  });
});

/**
 * 添加成员
 */
router.post('/member/add', async (ctx) => {
  await genRouter({
    ctx,
    schema: addMemberSchema,
    data: ctx.request.body,
    service: addMember,
  });
});

/**
 * 删除成员
 */
router.post('/member/delete', async (ctx) => {
  await genRouter({
    ctx,
    schema: delMemberSchema,
    data: ctx.request.body,
    service: delMember,
  });
});

/**
 * 修改成员权限
 */
router.post('/member/type', async (ctx) => {
  await genRouter({
    ctx,
    schema: changeTypeSchema,
    data: ctx.request.body,
    service: changeType,
  });
});

module.exports = router;
