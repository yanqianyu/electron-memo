// todo表
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInt
} = require('graphql');

const TodoController = require('../../controller/todo');

// 定义单个文件对象
let fileType = new GraphQLObjectType({
	name: 'fileType',
	description: '文件对象',
	fields() {
		return {
			iconimg: {
				type: GraphQLString
			},
			filesize: {
				type: GraphQLInt
			},
			filename: {
				type: GraphQLString
			},
			data: {
				type: GraphQLString
			}
		}
	}
});

// 定义单个todo对象
let TodoType = new GraphQLObjectType({
	name: 'single_todo_type',
	description: '单个todo对象',
	fields() {
		return {
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
			reminder_time: {
				type: GraphQLString
			},
			ddl_time: {
				type: GraphQLString
			},
			repeat_time: {
				type: GraphQLString
			},
			files: {
				type: new GraphQLList(fileType)
			},
			createTime: {
				type: GraphQLString
			},
			notes: {
				type: GraphQLString
			}
		}
	}
});

// 定义todo列表对象
let todoList = {
	name: 'query todos list',
	type: new GraphQLList(TodoType),
	args: { // 定义参数
		id: {
			name: 'id',
			type: GraphQLString
		},
		name: {
			name: 'name',
			type: GraphQLString
		}
	}
};

module.exports = {
	todoList
};
