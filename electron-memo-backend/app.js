// 入口文件
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require("koa-bodyparser");
const {ApolloServer} = require('apollo-server-koa');
const {typeDefs, resolvers} = require('./graphql/index');

export const apolloServer = new ApolloServer({typeDefs, resolvers});
const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/test', (ctx, next) => {
	ctx.body = "test page";
});

app.use(router.routes())
	.use(router.allowedMethods());

app.use(apolloServer.getMiddleware());

app.listen(4000);
console.log('graphQL server listen port: ' + 4000);
