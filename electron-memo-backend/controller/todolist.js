// todolist 业务逻辑控制
const mongoose = require('mongoose');
const TodoList = mongoose.model('TodoList');
const Todo = mongoose.model('Todo');

// 保存list
const addList = async (ctx, next) => {
	const opts = ctx.request.body;
	const todoList = new TodoList(opts);

	const addInfo = await todoList.save();
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

// 更改list
const updateList = async (ctx, next) => {
	const opts = ctx.require.body;
	const info = await TodoList.findOneAndUpdate({user_id: opts.user_id, id: opts.id}, opts);
	console.log(info);
	if (info) {
		ctx.body = {
			success: true,
			info: info
		}
	} else {
		ctx.body = {
			success: false
		}
	}
};

// 删除list
const deleteList = async (ctx, next) => {
	// 要顺便删掉list中的todo
	const opts = ctx.require.body;
	const listDeleteInfo = await TodoList.findByIdAndDelete({user_id: opts.user_id, id: opts.id});
	const todoDeleteInfo = await Todo.deleteMany({user_id: opts.user_id, customLists: {$elemMatch: opts.id}});

	console.log(listDeleteInfo);
	console.log(todoDeleteInfo);
	if (listDeleteInfo && todoDeleteInfo) {
		ctx.body = {
			success: true,
			listDeleteInfo: listDeleteInfo,
			todoDeleteInfo: todoDeleteInfo
		}
	} else {
		ctx.body = {
			success: false
		}
	}
};

// 获取list
const fetchList = async (ctx, next) => {
	const opts = ctx.request.body;
	// 根据id查询
	const todoList = await TodoList.find({user_id: opts.id});
	if (todoList) {
		ctx.body = {
			success: true,
			data: todoList
		}
	} else {
		ctx.body = {
			success: false
		}
	}
};

module.exports = {
	addList,
	fetchList,
	updateList,
	deleteList
};
