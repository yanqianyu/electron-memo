// todo数据模型

const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const todoSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		require: true
	},
	title: {type: String},
	isDone: {type: Boolean},
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
	steps: [
		{
			_id: {type: String},
			content: {type: String}
		}
	],
	// todo
	times: {
		reminder: {type: Date},
		ddl: {type: Date},
		repeat: {type: Date}
	},
	files: [
		{
			type: String
		}
	],
	createTime: {type: Date},
	notes: {type: String}
});

module.exports = model("Todo", todoSchema);
