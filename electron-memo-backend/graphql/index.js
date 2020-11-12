const {gql} = require('apollo-server-koa');
const mongoose = require('mongoose');

const UserModel = mongoose.model('User');
const TodoModel = mongoose.model('Todo');

const typeDefs = gql`
	type User {
		id: String,
		email: String,
		password: String
	}
	type Todo {
		id: String,
		user_id: String,
		title: String,
		isDone: Boolean,
		builtinLists: [String],
		customLists: [String],
		steps: [String],
		createTimes: Date,
		notes: String
	}
`;

const resolvers = {
	Query: {

	},
	Mutation: {

	}
};

module.exports = {
	resolvers,
	typeDefs
}
