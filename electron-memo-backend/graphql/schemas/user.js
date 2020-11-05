const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} = require('graphql');

// 用户逻辑控制
const UserController = require('../../controller/user');

const UserOutputType = new GraphQLObjectType({
	name: 'user_operage_type',
	fields() {
		return {
			name: {
				type: GraphQLString
			},
			token: {
				type: GraphQLString
			}
		}
	}
});

const postLogin = {
	description: 'postlogin',
	type: UserOutputType,
	args: {
		username: {
			name: 'username',
			type: GraphQLString
		},
		password: {
			name: 'password',
			type: GraphQLString
		}
	}
};

module.exports = {
	postLogin
};
