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
	const opts = ctx.request.body;
	// 根据id查询
	const todos = await Todo.findOne({user_id: opts.id});
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
	const info = await Todo.findOneAndUpdate({user_id: opts.user_id, id: opts.id}, opts);
};

// 删除todo
const deleteTodo = async (ctx, next) => {
	// 根据id删除
	const opts = ctx.request.body;
	const info = await Todo.findOneAndDelete({user_id: opts.user_id, id: opts.id});
};

module.exports = {
	addTodo,
	fetchTodo,
	updateTodo,
	deleteTodo
};
