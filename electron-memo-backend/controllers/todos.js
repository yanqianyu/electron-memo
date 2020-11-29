// todo模块控制器

const Todo = require('../models/todos');
const jsonwebtoken = require('jsonwebtoken');
const {secret} = require('../config');

class TodoController {
	async findByUserId(ctx) {
		const userId = ctx.params.userId;
		ctx.body = await Todo.findById(userId);
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

		ctx.body = todo;
	}

	async create(ctx) {
		// 创建todo
		const todo = await new Todo(ctx.request.body).save();
		ctx.body = todo;
	}

	async checkOwner(ctx, next) {
		if (ctx.params.userId !== ctx.state.userId) {
			ctx.throw(403, '没有权限');
		}
		await next();
	}


	async update(ctx) {
		const todo = await Todo.findAndUpdate({
			userId: ctx.params.userId,
			todoId: ctx.params.todoId
		}, ctx.params.body);

		if (!todo) {
			ctx.throw(404, '待办事项不存在');
		}
		ctx.body = todo;
	}

	async delete(ctx) {
		const todo = await Todo.findAndRemove({
			userId: ctx.params.userId,
			todoId: ctx.params.todoId
		});

		if (!todo) {
			ctx.throw(404, '待办事项不存在');
		}

		ctx.status = 204;
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
			url:`${ctx.origin}/public/uploads/${basename}`    //ctx.origin是域名
		};
	}
}

module.exports = new TodoController();
