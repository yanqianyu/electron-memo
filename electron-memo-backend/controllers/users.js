// 用户模块控制器，用于处理业务逻辑

const User = require('../models/users');
const jsonwebtoken = require("jsonwebtoken");
const {secret} = require("../db.config");

class UserController {
	async find(ctx) {
		// 查询用户列表 分页
		const {per_page = 10} = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page, 1);
		ctx.body = await User.find({name: new RegExp(ctx.query.q)})
			.limit(perPage)
			.skip(page * perPage);
	}

	async findById(ctx) {
		const user = await User.findById(ctx.params.id);
		if (!user) {
			ctx.throw(404, '用户不存在');
		}
		ctx.body = user;
	}

	async create(ctx) {
		// 创建用户
		// 校验参数，如果和所需参数不同，会直接返回422
		ctx.verifyParams({
			email: {
				type: 'string', required: true
			},
			password: {
				type: 'string', required: true
			}
		});

		const {email} = ctx.request.body;
		const repeatedUser = await User.findOne({email});
		if (repeatedUser) {
			ctx.throw(409, '用户名已存在');
		}
		const user = await new User(ctx.request.body).save();
		ctx.body = user;
	}

	async checkOwner(ctx, next) {
		// 判断用户身份合法性
		if (ctx.params.id !== ctx.state.user._id) {
			ctx.throw(403, '没有权限');
		}
		await next();
	}

	async login(ctx) {
		// 登录
		ctx.verifyParams({
			email: {type: "string", required: true},
			password: {type: "string", required: true}
		});
		const user = await User.findOne(ctx.request.body);
		if (!user) {
			ctx.throw(401, "用户名或密码不正确");
		}

		const {_id, email} = user;
		const token = jsonwebtoken.sign({_id, email}, secret, {expiresIn: "1d"});
		ctx.body = {_id, email, token};
	}
}

module.exports = new UserController();
