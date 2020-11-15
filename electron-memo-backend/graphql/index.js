const {gql} = require('apollo-server-koa');
const mongoose = require('mongoose');

const UserModel = mongoose.model('User');
const TodoModel = mongoose.model('Todo');
const TodoListModel = mongoose.model('TodoList');

const typeDefs = gql`
	type User {
		id: String,
		email: String,
		password: String
	}
	type TodoList {
		id: String,
		user_id: String,
		name: String
	}
	type Times {
		reminder: Date,
		ddl: Date,
		repeat: Date
	}
	type File {
		user_id: String,
		todo_id: String,
		id: String,
		iconimg: String,
		filesize: Int,
		filename: String,
		data: String
	}
	type Todo {
		id: String,
		user_id: String,
		title: String,
		isDone: Boolean,
		builtinLists: [String],
		customLists: [String],
		steps: [String],
		times: Times,
		files: [File],
		createTimes: Date,
		notes: String
	}
	type Query {
		getTodoListByUserID: [TodoList]
		getTodoByUserID: [Todo]
	}
	type Mutation {
		addTodoList(): TodoList
		addUser(): User
		addTodo(): Todo
		changeTodo(): Todo
		changeTodoList(): TodoList
		deleteTodoList(): TodoList
		deleteTodo(): Todo
	}
`;

const resolvers = {
	Query: {
		getTodoListByUserID: async (parent, args, context, info) => {
			return await TodoListModel.find({user_id: args.user_id});
		},
		getTodoByUserID: async (parent, args, context, info) => {
			return await TodoModel.find({user_id: args.user_id});
		}
	},
	Mutation: {
		addTodoList: (parent, args, context) => {
			const {id, user_id, name} = args;
			return TodoListModel.create({id, user_id, name});
		},
		addUser: (parent, args, context) => {
			const {id, email, password} = args;
			return UserModel.create({id, email, password});
		},
		addTodo: (parent, args, context) => {
			const {} = args.post;
			return TodoModel.create({});
		},
		changeTodo: (parent, args, context) => {
			const {} = args;
			return TodoModel.findOneAndUpdate();
		},
		changeTodoList: (parent, args, context) => {
			const {id, user_id} = args;
			return TodoListModel.findOneAndUpdate({id: is, user_id: user_id}, {});
		},
		deleteTodoList: () => {
			// 还要删掉list中所有的todo
		},
		deleteTodo: (parent, args, context) => {
			const {id, user_id} = args;
			return TodoModel.findOneAndDelete({id: id, user_id: user_id});
		}
	}
};

module.exports = {
	resolvers,
	typeDefs
};
