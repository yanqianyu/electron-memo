const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
	id: String,
	user_id: String,
	name: String,
});

mongoose.model('TodoList', TodoListSchema);
