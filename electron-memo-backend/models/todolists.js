// todo列表数据模型
const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const todoListSchema = new Schema({
	userId: {type: String, required: true},
	title: {type: String}
});

module.exports = model("TodoList", todoListSchema);
