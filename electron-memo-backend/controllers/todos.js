// todo模块控制器

const Todo = require('../models/todos');
const jsonwebtoken = require('jsonwebtoken');
const {secret} = require('../config');

class TodoController {
	async findByUserId(ctx) {
		// 找到一个user的所有todo
		const userId = ctx.params.userId;
		const todos = await Todo.find(userId) || [];
		ctx.body = {
			todos
		};
	}

	async findByUserIdAndListId(ctx) {
		const userId = ctx.params.userId;
		const listId = ctx.params.listId;

		const todo = await Todo.find({
			userId: userId,
			listId: listId
		});

		if (!todo) {
			ctx.throw(404, '待办事项不存在');
		}

		ctx.body = {
			todo
		};
	}

	async findByTodoId(ctx) {
		const userId = ctx.params.userId;
		const todoId = ctx.params.todoId;

		const todo = await Todo.find({
			userId: userId,
			_id: todoId
		});

		if (!todo) {
			ctx.throw(404, '待办事项不存在');
		}

		ctx.body = {
			todo
		};
	}

	async create(ctx) {
		// 创建todo
		const todo = await new Todo(ctx.request.body).save();
		ctx.body = {
			todo
		};
	}

	async checkOwner(ctx, next) {
		if (ctx.params.userId !== ctx.state.user._id) {
			ctx.throw(403, '没有权限');
		}
		await next();
	}


	async update(ctx) {
		const todo = await Todo.findAndUpdate({
			userId: ctx.params.userId,
			_id: ctx.params.todoId
		}, ctx.request.body, {
			new: true
		});

		if (!todo) {
			ctx.throw(404, '待办事项不存在');
		}
		ctx.body = {
			todo
		};
	}

	async delete(ctx) {
		const todo = await Todo.findAndRemove({
			userId: ctx.params.userId,
			_id: ctx.params.todoId
		});

		if (!todo) {
			ctx.throw(404, '待办事项不存在');
		}

		ctx.statusCode = 204;
		ctx.message = '删除成功';
	}

	async upload(ctx) {
		const file = ctx.request.files.file;
		const basename = path.basename(file.path);    //获取图片名称（basename）
		// 更新对应的todo
		const todo = Todo.update({
			userId: ctx.params.userId,
			todoId: ctx.params.todoId
		}, {$push: {"file": `${ctx.origin}/public/uploads/${basename}`}});

		ctx.body = {
			todo: todo,
			url:`${ctx.origin}/public/uploads/${basename}`    //ctx.origin是域名
		};
	}
}

module.exports = new TodoController();
