// todo列表数据模型
const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const todoListSchema = new Schema({
	_id: {type: Number, select: false},
	useId: {type: Number, required: true},
	title: {type: String}
});

module.exports = model("TodoList", todoListSchema);
