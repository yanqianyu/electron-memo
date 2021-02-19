// 入口
const Koa = require('koa');
const koaBody = require('koa-body');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa();
const mongoose = require('mongoose');
const routing = require('./routes');

// 数据库连接
const { connectStr } = require('./db.config');

mongoose.connect(
  connectStr, // 数据库地址
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('mongodb连接成功'),
);
mongoose.connection.on('error', console.error);

const logsUtil = require('./utils/logs.js');

app.use(async (ctx, next) => {
  const start = new Date(); // 响应开始时间
  let intervals; // 响应间隔时间
  try {
    await next();
    intervals = new Date() - start;
    logsUtil.logResponse(ctx, intervals); // 记录响应日志
  } catch (error) {
    intervals = new Date() - start;
    logsUtil.logError(ctx, error, intervals);// 记录异常日志
  }
});

// 静态资源
app.use(koaStatic(path.join(__dirname, 'public')));

// 错误处理
app.use(error({
  postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }),
}));

app.use(koaBody({
  multipart: true, // 支持文件上传
  // encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, 'public/uploads'), // 文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
  },
}));

// 参数校验
app.use(parameter(app));

// 路由处理
// 路由处理放在解析的后面！如果解析的中间件放在后面，那么每一次的请求都没有执行解析
// app.use(router.routes()).use(router.allowedMethods());
routing(app);

// export default
app.listen(3000, () => {
  console.log('koa is listening in 3000');
});
