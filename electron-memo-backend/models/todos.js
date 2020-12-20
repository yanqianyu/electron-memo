// todo数据模型

const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const step = new Schema({
	content: {type: String}
});

const times = new Schema({
	reminder: {
		type: Date,
		default: null
	},
	ddl: {
		type: Date,
		default: null
	},
	repeat: {
		type: Date,
		default: null
	},
});

const todoSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		require: true
	},
	title: {
		type: String, require: true
	},
	isDone: {
		type: Boolean, default: false
	},
	builtinList: [
		{
			type: Schema.Types.ObjectId,
			ref: "TodoList"
		}
	],
	customList: [
		{
			type: Schema.Types.ObjectId,
			ref: "TodoList"
		}
	],
	steps: [ step ],
	times: times,
	files: [
		{
			type: String
		}
	],
	createTime: {
		type: Date,
		default: Date.now()
	},
	notes: {
		type: String,
		default: null
	}
});

module.exports = model("Todo", todoSchema);
