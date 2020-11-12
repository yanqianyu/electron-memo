// user业务逻辑控制
const mongoose = require('mongoose');
const User = mongoose.model('User');

// 用户注册
const addUser = async (ctx, next) => {
	const opts = ctx.require.body;
	const user = new User(opts);

	const addInfo = await user.save();
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

//  用户查询/登录
const queryUser = async (ctx, next) => {
	// token权限
	const opts = ctx.request.body;

};
