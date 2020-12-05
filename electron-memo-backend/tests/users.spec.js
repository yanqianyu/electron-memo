import server from '../index';
import request from 'supertest';

// 所有测试跑完之后关闭server
afterEach(() => {
	server.close();
});

test('register shoule be successful', async () => {
	const response = await request(server)
						.post('/users/register')
						.send({
							name: 'Yanqianyu4',
							password: '1234'
						});
	console.log(response.body);
	expect(response.body.name).toBe('Yanqianyu4');
	expect(response.body.password).toBe('1234');
});
