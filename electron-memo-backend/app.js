// 入口文件
const Koa = require('koa');
const {ApolloServer, gql} = require('apollo-server-koa'); // graphql-koa插件
const schema = require('./graphql/index.js'); // 自定义的GraphQL的表

const app = new Koa();
// 创建GraphQL server
const server = new ApolloServer({
	schema,
	context: ({ctx}) => {}
});

server.applyMiddleware({app}); // apollo server使用koa中间件
app.listen(9527, () => {
	console.log(`server runnign success at ${server.graphqlPath}`)
});
