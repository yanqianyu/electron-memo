// 用户列表模块控制器

const TodoList = require('../models/todolists');
const jsonwebtoken = require('jsonwebtoken');
const {secret} = require('../config');

class TodoListController {
	async find(ctx) {
		// 根据用户id查找所有的todo list
		const userId = ctx.params.userId;
		ctx.body = await TodoList.findById(userId);
	}

	async findById(ctx) {
		// 根据用户id和列表id查找对应的list
		const userId = ctx.params.userId;
		const listId = ctx.params.listId;

		const list = await TodoList.find({
			userId: userId,
			_id: listId
		});

		if (!list) {
			ctx.throw(404, '列表不存在');
		}

		ctx.body = list;
	}

	async create(ctx) {
		// 创建列表
		ctx.verifyParams({
			userId: {
				type: 'number', required: true
			},
			title: {
				type: 'string', required: true
			}
		});

		const todolist = await new TodoList(ctx.request.body).save();
		ctx.body = user;
	}

	async checkOwner(ctx, next) {
		if (ctx.params.userId !== ctx.state.userId) {
			ctx.throw(403, '没有权限');
		}
		await next();
	}

	async update(ctx) {
		// 更新列表信息
		ctx.verifyParams({
			userId: {
				type: 'number'
			},
			todoId: {
				type: 'number'
			},
			title: {
				type: 'string'
			}
		});

		const todolist = await TodoList.findAndUpdate({
			userId: ctx.params.userId,
			todoId: ctx.params.todoId
		}, ctx.params.body);

		if (!todolist) {
			ctx.throw(404, '列表不存在');
		}
		ctx.body = todolist;
	}
}
