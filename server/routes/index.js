const fs = require('fs');

// 项目模块多，对应的模块也多，如果一个个去注册太麻烦，
// 使用fs模块遍历读取routes下的所有的路由文件，统一注册
module.exports = app => {
	fs.readdirSync(__dirname).forEach(file => {
		if (file === 'index.js') {
			return;
		}
		const route = require(`./${file}`);
		app.use(route.routes()).use(route.allowedMethods());
	});
};
