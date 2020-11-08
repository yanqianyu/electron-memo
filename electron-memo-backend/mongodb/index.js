const mongoose = require('mongoose');
const config = require('../config');

// 引入model
require('./schema/todo');
require('./schema/user');

// 链接mongdb
export const database = () => {
	mongoose.set('debug', true);

	mongoose.connect(config.dbPath);

	mongoose.connection.on('disconnected', () => {
		mongoose.connect(config.dbPath);
	});

	mongoose.connection.on('error', err => {
		console.log(err);
	});

	mongoose.connection.on('open', async () => {
		console.log('Connected to MongDB ', config.dbPath);
	});
};


