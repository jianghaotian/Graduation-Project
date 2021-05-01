const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt');
const path = require('path');
const { getUuid } = require('./utils/uuid');
const { baseURL, jwtConfig: { jwtSecret } } = require('./config');
const res = require('./utils/res');

const app = new Koa();

// 应用程序初始化
// eslint-disable-next-line no-console
console.log('application initialization...');

// 处理 401 404 500
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      // 身份验证失败
      res.authenticationErr(ctx, err);
    } else {
      // Internal Server Error
      res.serverErr(ctx, err);
      // eslint-disable-next-line no-console
      console.error(err, ctx);
    }
  }
  if (parseInt(ctx.status, 10) === 404) {
    res.notFoundErr(ctx);
  }
});

// 中间件
app.use(logger());
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 5 * 1024 * 1024,
    onFileBegin: (name, file) => {
      // console.log(`name: ${name}`);
      // console.log(file);
      const uuid = getUuid();
      // eslint-disable-next-line no-param-reassign
      file.path = `${path.join(__dirname, 'files')}/${uuid}`;
      // eslint-disable-next-line no-param-reassign
      file.uuid = uuid;
    },
  },
}));

// koaJwt 忽略的url 正则表达式
const jwtUnlessReg = new RegExp(`^${baseURL}/account`);
app.use(koaJwt({ secret: jwtSecret, key: 'jwt' }).unless({ path: [jwtUnlessReg] }));

// 引入路由
const accountRoute = require('./routes/account');
const userRoute = require('./routes/user');
const repositoryRoute = require('./routes/repository');
const fileRoute = require('./routes/file');

// 配置路由
app.use(accountRoute.routes(), accountRoute.allowedMethods());
app.use(userRoute.routes(), userRoute.allowedMethods());
app.use(repositoryRoute.routes(), repositoryRoute.allowedMethods());
app.use(fileRoute.routes(), fileRoute.allowedMethods());

// 应用程序初始化完成
// eslint-disable-next-line no-console
console.log('application initialization --- OK');

// 错误处理
app.on('error', (err, ctx) => {
  // eslint-disable-next-line no-console
  console.error(err, ctx);
});

module.exports = app;
