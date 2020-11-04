// 自定义的GraphQL表
const {todoList} = require('./schemas/todos');
const {postLogin} = require('./schemas/user');

const {GraphQLSchema, GraphQLObjectType} = require('graphql');

// 总查询对象
let queryObj = new GraphQLObjectType({
	name: 'query',
	fields: () => ({
		todoList: todoList
	})
});

// 总体变更对象
let mutationObj = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		postLogin: postLogin
	})
});

// GraphQL总表
let schema = new GraphQLSchema({
	query: queryObj,
	mutation: mutationObj
});

module.exports = schema;
