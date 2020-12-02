import server from '../index';
import request from 'supertest';

// 所有测试跑完之后关闭server
afterEach(() => {
	server.close();
});

test('register', async () => {
	const reponse = await request(server.callback())
						.post('/users/register')
						.send({
							name: 'Yanqianyu',
							password: '1234'
						});
	expect(response.body.name).toBe('Yanqianyu');
	expect(response.body.password).toBe('1234');
});
