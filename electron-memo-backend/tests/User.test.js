import {resolvers, typeDefs} from '../graphql/index';
import {createTestClient} from "apollo-server-testing";
import {apolloServer} from "../app";
const {gql} = require('apollo-server-koa');

jest.mock('koa', () => {
	const Koa = jest.requireActual('koa');
	Koa.prototype.listen = () => null;
	return {
		default: Koa,
		__esModule: true
	};
});

describe('test add user', () => {
	it('', () => {
		const testClient = createTestClient(apolloServer);
		const addUser = gql`
			mutation {
				
			}
		`;
	})
});
