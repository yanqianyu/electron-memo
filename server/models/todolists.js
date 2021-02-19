// todo列表数据模型
const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const todoListSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	isCustomize: {type: Boolean, default: true},
	title: {type: String},
	icon: {type: String}
});

module.exports = model("TodoList", todoListSchema);
