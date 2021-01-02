// todo模块控制器

const Todo = require("../models/todos");
const fs = require("fs");
const jsonwebtoken = require("jsonwebtoken");
const {secret} = require("../db.config");
const path = require("path");

class TodoController {
	async findByUserId(ctx) {
		// 找到一个user的所有todo
		const userId = ctx.params.userId;
		const todos = await Todo.find({userId: userId}) || [];
		ctx.body = {
			todos
		};
	}

	async findByUserIdAndListId(ctx) {
		// 某用户某列表下的所有todo
		const userId = ctx.params.userId;
		const listId = ctx.params.listId;

		const todos = await Todo.find({
			userId: userId,
			$or: [
				{
					customList: {$elemMatch: {$eq: listId}}
				},
				{
					builtinList: {$elemMatch: {$eq: listId}}
				}
			]
		});

		if (!todos) {
			ctx.throw(404, "无法获取待办事项");
		}

		ctx.body = {
			todos
		};
	}

	async findByTodoId(ctx) {
		const userId = ctx.params.userId;
		const todoId = ctx.params.todoId;

		const todo = await Todo.findOne({
			userId: userId,
			_id: todoId
		});

		if (!todo) {
			ctx.throw(404, "待办事项不存在");
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
			ctx.throw(403, "没有权限");
		}
		await next();
	}


	async update(ctx) {
		const todo = await Todo.findOneAndUpdate({
			userId: ctx.params.userId,
			_id: ctx.params.todoId
		}, ctx.request.body, {
			new: true
		});

		if (!todo) {
			ctx.throw(404, "待办事项不存在");
		}
		ctx.body = {
			todo
		};
	}

	async delete(ctx) {
		const todo = await Todo.findOneAndDelete({
			userId: ctx.params.userId,
			_id: ctx.params.todoId
		});

		if (!todo) {
			ctx.throw(404, "待办事项不存在");
		}

		// https://github.com/koajs/koa/issues/905
		// ctx.statusCode = 204;
		ctx.body = {
			message: "删除成功"
		};
	}

	async upload(ctx) {
		const file = ctx.request.files.file;
		const newname = file.path.split("/").pop();
		console.log(newname);

		// 更新对应的todo
		const todo = await Todo.findOneAndUpdate({
				userId: ctx.params.userId,
				_id: ctx.params.todoId
			},
			{
				$push: {"files": {path: `${ctx.origin}/public/uploads/${newname}`}}
			},
			{
				new: true
			}); //ctx.origin是域名

		if (todo) {
			ctx.body = {
				todo: todo,
			};
		} else {
			ctx.throw("404", "上传失败");
		}
	}

	asyns deleteFile(ctx) {

	}
}

module.exports = new TodoController();
