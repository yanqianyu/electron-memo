import server from '../index';
import request from 'supertest';

afterEach(() => {
	server.close();
});

describe('todolist controller', () => {
	test('after login get user\'s all list', async () => {
		// 每次请求都必须携带正确的token
	})
});
