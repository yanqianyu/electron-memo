// todo业务逻辑控制
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

// 保存todo信息
const addTodo = async (ctx, next) => {
	// 获取请求的数据
	const opts = ctx.request.body;
	const todo = new Todo(opts);

	const addInfo = await todo.save();
	console.log(addInfo);
	if (addInfo) {
		ctx.body = {
			success: true,
			info: addInfo
		}
	} else {
		ctx.body = {
			success: false
		}
	}
};

// 获取todos
const fetchTodo = async (ctx, next) => {
	const todos = await Todo.find({});
	if (todos.length) {
		ctx.body = {
			success: true,
			data: todos
		}
	} else {
		ctx.body = {
			success: false
		}
	}
};

// 更新todo
const updateTodo = async (ctx, next) => {
	// 获取请求的数据
	const opts = ctx.request.body;
};

// 删除todo
const deleteTodo = async (ctx, next) => {

};

module.exports = {
	addTodo,
	fetchTodo,
	updateTodo,
	deleteTodo
};
