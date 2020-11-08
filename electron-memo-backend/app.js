// 入口文件
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/test', (ctx, next) => {
	ctx.body = "test page";
});

app.use(router.routes())
	.use(router.allowedMethods());

app.listen(4000);
console.log('graphQL server listen port: ' + 4000);
