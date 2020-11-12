const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	id: String,
	user_id: String,
	title: String,
	isDone: Boolean,
	builtinLists: [String],
	customLists: [String],
	steps: [String],
	times: {
		reminder: {
			type: Date,
			default: null
		},
		ddl: {
			type: null,
			default: null
		},
		repeat: {
			type: null,
			default: null
		}
	},
	files: [],
	createTime: Date,
	notes: String
});

mongoose.model('Todo', TodoSchema);
