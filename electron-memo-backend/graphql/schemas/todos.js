// todo表
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInt
} = require('graphql');

const TodoController = require('../../controller/todo');

// 定义单个todo对象
let TodoType = new GraphQLObjectType({
	name: 'single_todo_type',
	description: '单个todo对象',
	fields: {
		_id: {
			type: GraphQLString
		},
		title: {
			type: GraphQLString
		},
		isDone: {
			type: GraphQLBoolean
		},
		builtinList: {
			type: new GraphQLList(GraphQLString)
		},
		customList: {
			type: new GraphQLList(GraphQLString)
		},
		steps: {
			type: new GraphQLList(GraphQLString)
		},
		times: {

		}
	}
});
// 定义todo列表对象
