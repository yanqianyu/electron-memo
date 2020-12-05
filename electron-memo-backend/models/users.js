// 用户数据模型
const mongoose = require("mongoose");

const {Schema, model} = mongoose;

// https://stackoverflow.com/questions/45952928/mongodb-error-document-must-have-an-id-before-saving
// If you have declared _id field explicitly in schema, you must initialize it explicitly
// If you have not declared it in schema, MongoDB will declare and initialize it.
const userSchema = new Schema({
	// _id: {type: Number, select: false},
	name: {type: String, required: true},
	password: {type: String, required: true, select: false}
});

module.exports = model("User", userSchema);
