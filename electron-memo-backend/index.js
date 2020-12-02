// 入口
const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const koaStatic = require("koa-static");

const app = new Koa();
const routing = require('./routes');

// 数据库连接
const mongoose = require('mongoose');
const {connectionStr} = require('./config');
mongoose.connect(
	connectionStr, // 数据库地址
	{useUnifiedTopology: true, useNewUrlParser: true},
	() => console.log("mongodb连接成功")
);
mongoose.connection.on('error', console.error);

router.get('/', async function (ctx) {
	ctx.body = {
		message: 'Hello World!'
	}
});

// 静态资源
app.use(koaStatic(path.join(__dirname, "public")));

// app.use(router.routes()).use(router.allowedMethods());
routing(app); // 路由处理

app.use(koaBody({
	multipart: true, // 支持文件上传
	encoding: 'gzip',
	formidable: {
		uploadDir: path.join(__dirname, 'public/uploads'), // 文件上传目录
		keepExtensions: true, // 保持文件的后缀
		maxFieldsSize: 2 * 1024  * 1024, // 文件上传大小
		onFileBegin: (name, file) => {
			// 文件上传之前的设置
			console.log(`name: ${name}`);
			console.log(file);
		}
	}
}));

// 错误处理
app.use(error({
	postFormat: (e, {stack, ...rest}) =>
		process.env.NODE_ENV === "production" ? rest : {stack, ...rest}
}));

// 参数校验
app.use(parameter(app));

export default app.listen(3000, () => {
	console.log("koa is listening in 3000")
});
