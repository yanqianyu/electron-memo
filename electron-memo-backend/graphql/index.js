const {gql} = require('apollo-server-koa');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const {storeFile} = require("./utils");

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
		file_id: String
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
		getTodoListByUserID(id: String): [TodoList]
		getTodoByUserID(id: String): [Todo]
	}
	type Mutation {
		addTodoList(id: String, user_id: String, name: String): TodoList
		addUser(id: String, user_id: String, name: String): User
		addTodo(id: String, user_id: String, title: String, isDone: Boolean, builtinLists: [String], customLists: [String], steps: [String], times: TimesInput, files: [FileInput], createTimes: Date, notes: String): Todo
		changeTodo(id: String, user_id: String, title: String, isDone: Boolean, builtinLists: [String], customLists: [String], steps: [String], times: TimesInput, files: [FileInput], createTimes: Date, notes: String): Todo
		changeTodoList(id: String, user_id: String, name: String): TodoList
		deleteTodoList(user_id: String, list_id: String): TodoList
		deleteTodo(id: String, user_id: String): Todo
		uploadFile(file: Upload!): Todo!
	}
	input TimesInput {
		reminder: Date,
		ddl: Date,
		repeat: Date
	}
	input FileInput {
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
		async uploadFile(parent, args, context) {
			// todo
			// file对应为id，todo中存的是file的ID？
			// file {filename, createReadStream, mimetype}
			const {user_id, todo_id, iconimg, filesize, filename, file} = args;
			const fileId = await storeFile(file).then(res => res);
			const newFile = {user_id: user_id, todo_id: todo_id, iconimg: iconimg, filesize: filesize, filename: filename, file_id: fileId};
			const oldFile = TodoModel.findOne({todo_id: todo_id, user_id: user_id}).files;
			oldFile.push(newFile);
			return TodoModel.findOneAndUpdate({id: todo_id, user_id: user_id}, {files: oldFile});
		},
		addTodoList: (parent, args, context) => {
			const {id, user_id, name} = args;
			return TodoListModel.create({id, user_id, name});
		},
		addUser: (parent, args, context) => {
			const {id, email, password} = args;
			return UserModel.create({id, email, password});
		},
		addTodo: (parent, args, context) => {
			const {id, user_id, title, isDone, builtinLists, customLists, steps, times, files, createTimes, notes} = args;
			return TodoModel.create({id, user_id, title, isDone, builtinLists, customLists, steps, times, files, createTimes, notes});
		},
		changeTodo: (parent, args, context) => {
			const {id, user_id, title, isDone, builtinLists, customLists, steps, times, files, createTimes, notes} = args;
			return TodoModel.findOneAndUpdate({id: id, user_id: user_id}, {title, isDone, builtinLists, customLists, steps, times, files, createTimes, notes});
		},
		changeTodoList: (parent, args, context) => {
			const {id, user_id, name} = args;
			return TodoListModel.findOneAndUpdate({id: id, user_id: user_id}, {name: name});
		},
		deleteTodoList: (parent, args, context) => {
			// 还要删掉list中所有的todo
			const {user_id, list_id} = args;
			TodoListModel.findOneAndDelete({id: list_id, user_id: String});
			// https://www.cnblogs.com/huiwenhua/p/11449044.html
			TodoModel.deleteMany({user_id: user_id, customLists: {$elemMatch: list_id}})
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
