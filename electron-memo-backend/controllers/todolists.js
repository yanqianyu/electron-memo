// 用户列表模块控制器

const TodoList = require('../models/todolists');
const Todo = require('../models/todos');
const jsonwebtoken = require('jsonwebtoken');
const {secret} = require('../config');

class TodoListController {
	async findByUserId(ctx) {
		// 根据用户id查找所有的todo list
		const userId = ctx.params.userId;
		const todolists = await TodoList.find({userId: userId}) || [];
		ctx.body = {
			todolists
		};
	}

	async findByListId(ctx) {
		// 根据用户id和列表id查找对应的list
		const userId = ctx.params.userId;
		const listId = ctx.params.listId;

		const todolist = await TodoList.find({
			userId: userId,
			_id: listId
		});

		if (!todolist) {
			ctx.throw(404, '列表不存在');
		}

		ctx.body = {
			todolist
		};
	}

	async create(ctx) {
		// 创建列表
		ctx.verifyParams({
			userId: {
				type: 'string', required: true
			},
			title: {
				type: 'string', required: true
			}
		});

		// todo: 对于重名列表要怎么办
		const todolist = await new TodoList(ctx.request.body).save();
		ctx.body = {
			todolist
		};
	}

	async checkOwner(ctx, next) {
		if (ctx.params.userId !== ctx.state.user._id) {
			ctx.throw(403, '没有权限');
		}
		await next();
	}

	async update(ctx) {
		// 更新列表信息
		ctx.verifyParams({
			userId: {
				type: 'string'
			},
			_id: {
				type: 'string'
			},
			title: {
				type: 'string'
			}
		});

		// 默认情况下，findOneAndUpdate 返回的是更新前的数据
		const todolist = await TodoList.findOneAndUpdate({
			userId: ctx.params.userId,
			_id: ctx.params.listId
		}, ctx.request.body, {
			new: true
		});

		if (!todolist) {
			ctx.throw(404, '列表不存在');
		}
		ctx.body = {
			todolist
		};
	}

	async delete(ctx) {
		// 删除列表以及列表中的todo
		// todo 先find再delete
		const todolist = await TodoList.deleteOne({
			userId: ctx.params.userId,
			_id: ctx.params.listId
		});

		if (!todolist) {
			ctx.throw(404, '列表不存在');
		}

		// 删除列表中的todo
		const todos = await Todo.deleteMany({
			userId: ctx.params.userId,
			_id: ctx.params.listId
		});

		// todo
		if (todos) {
			ctx.statusCode = 204;
			ctx.message = '删除成功';
		}
	}
}

module.exports = new TodoListController();
