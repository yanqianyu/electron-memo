import server from '../index';
import request from 'supertest';

// 所有测试跑完之后关闭server
afterEach(() => {
	server.close();
});


describe('user controller', () => {
	let id;
	test('register shoule be successful', async () => {
		const response = await request(server)
			.post('/users/register')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		console.log(response.body);
		expect(response.body._id).toBeDefined();
		id = response.body._id;
		expect(response.body.name).toBe('Yanqianyu');
		expect(response.body.password).toBe('1234');
	});

	test('user can not repeat', async () => {
		const response = await request(server)
			.post('/users/register')
			.send({
				name: 'Yanqianyu',
				password: '12345'
			});
		console.log(response.body);
		expect(response.statusCode).toBe(409);
		expect(response.msg).toBe('用户名已存在');
	});

	test('find user by id', async () => {
		const response = await request(server)
			.get('/users/' + id);
		console.log(response.body);
		expect(response.body.name).toBe('Yanqianyu');
	});

	test('find user by wrong id', async () => {
		const response = await request(server)
			.get('/users/' + '1234');
		console.log(response.body);
		expect(response.statusCode).toBe(404);
		expect(response.msg).toBe('用户不存在');
	});

	test('user login with wrong name', async () => {
		const response = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu4',
				password: '1234'
			});
		console.log(response.body);
		expect(response.statusCode).toBe(401);
		expect(response.msg).toBe('用户名或密码不正确');
	});

	test('user login with wrong pwd', async() => {
		const response = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '12345'
			});
		console.log(response.body);
		expect(response.statusCode).toBe(401);
		expect(response.msg).toBe('用户名或密码不正确');
	});

	test('user login', async () => {
		const response = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		console.log(response.body);
		expect(response.body.token).toBeDefined();
		expect(response.body._id).toBeDefined();
		expect(response.body.name).toBeDefined();
	});

});
