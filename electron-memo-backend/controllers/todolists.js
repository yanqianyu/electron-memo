// 用户列表模块控制器

const jsonwebtoken = require('jsonwebtoken');
const TodoList = require('../models/todolists');
const Todo = require('../models/todos');
const { secret } = require('../db.config');

class TodoListController {
  async findByUserId(ctx) {
    // 根据用户id查找所有的todo list
    const { userId } = ctx.params;
    const todolists = await TodoList.find({ userId }) || [];
    ctx.body = {
      todolists,
    };
  }

  async findByListId(ctx) {
    // 根据用户id和列表id查找对应的list
    const { userId } = ctx.params;
    const { listId } = ctx.params;

    const todolist = await TodoList.find({
      userId,
      _id: listId,
    });

    if (!todolist) {
      ctx.throw(404, '列表不存在');
    }

    ctx.body = {
      todolist,
    };
  }

  async create(ctx) {
    // 创建列表
    ctx.verifyParams({
      userId: {
        type: 'string', required: true,
      },
      title: {
        type: 'string', required: true,
      },
      isCustomize: {
        type: 'boolean'
      }
    });

    // 不允许重名清单
    const todolistSameName = await TodoList.find({
      title: ctx.request.body.title,
    });

    if (todolistSameName.length > 0) {
      ctx.throw(403, '重复的列表名');
    } else {
      const todolist = await new TodoList(ctx.request.body).save();
      ctx.body = {
        todolist,
      };
    }
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
        type: 'string',
      },
      _id: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
    });

    // 默认情况下，findOneAndUpdate 返回的是更新前的数据
    const todolist = await TodoList.findOneAndUpdate({
      userId: ctx.params.userId,
      _id: ctx.params.listId,
    }, ctx.request.body, {
      new: true,
    });

    if (!todolist) {
      ctx.throw(404, '列表不存在');
    }
    ctx.body = {
      todolist,
    };
  }

  async delete(ctx) {
    // 删除列表以及列表中的todo
    const todolist = await TodoList.find({
      userId: ctx.params.userId,
      _id: ctx.params.listId,
    });

    if (!todolist) {
      ctx.throw(404, '列表不存在');
    }

    const todoList = await Todo.deleteOne({
      userId: ctx.params.userId,
      _id: ctx.params.listId,
    });

    // 删除列表中的todo
    const todos = await Todo.deleteMany({
      userId: ctx.params.userId,
      $or: [
        {
          customList: { $elemMatch: { $eq: ctx.params.listId } },
        },
        {
          builtinList: { $elemMatch: { $eq: ctx.params.listId } },
        },
      ],
    });

    if (todoList && todos) {
      ctx.statusCode = 204;
      ctx.body = {
        message: '删除成功',
      };
    }
  }
}

module.exports = new TodoListController();
