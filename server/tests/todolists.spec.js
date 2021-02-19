import server from '../index';
import request from 'supertest';

afterEach(() => {
	server.close();
});

describe('todolist controller', () => {
	let token, userId, listId;
	test('after login get user\'s all list', async () => {
		// 每次请求都必须携带正确的token
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		// https://github.com/visionmedia/supertest/issues/398
		const getListsResp = await request(server)
			.get('/todolist/' + userId)
			.set("Authorization", token);
		// 返回的是todolist数组
		expect(getListsResp.body.todolists.length).toBe(2);

		// 没有token
		const getListsNoTokenResp = await request(server)
			.get('/todolist/' + userId);
		expect(getListsNoTokenResp.statusCode).toBe(401);
	});

	test('create a list', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		const createResp = await request(server)
			.post('/todolist/' + userId)
			.set('Authorization', token)
			.send({
				userId: userId,
				title: 'new todolist'
			});
		expect(createResp.body.todolist._id).toBeDefined();
		listId = createResp.body.todolist._id;
		expect(createResp.body.todolist.userId).toBe(userId);
		expect(createResp.body.todolist.title).toBe('new todolist');
	});

	test('get list by userid and listid', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		const getListByIdResp = await request(server)
			.get('/todolist/' + userId + '/' + listId)
			.set('Authorization', token);
		expect(getListByIdResp.body.todolist._id).toBe(listId);
		expect(getListByIdResp.body.todolist.userId).toBe(userId);
		expect(getListByIdResp.body.todolist.title).toBe('new todolist');
	});

	test('update a list', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		listId = "5fda1d5ae60b2e499b29f040";
		const updateListByIdResp = await request(server)
			.patch('/todolist/' + userId + '/' + listId)
			.set('Authorization', token)
			.send({
				_id: listId,
				userId: userId,
				title: 'new todolist name'
			});
		expect(updateListByIdResp.body.todolist._id).toBe(listId);
		expect(updateListByIdResp.body.todolist.userId).toBe(userId);
		expect(updateListByIdResp.body.todolist.title).toBe('new todolist name');
	});

	test('delete a list', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		listId = "5fda1d036597f6494a720a13";
		const deletListByIdResp = await request(server)
			.delete('/todolist/' + userId + '/' + listId)
			.set('Authorization', token)
			.send({
				_id: listId,
				userId: userId,
				title: 'new todolist'
			});
		expect(deletListByIdResp.statusCode).toBe(204);
		expect(deletListByIdResp.body.message).toBe('删除成功');
	});
});
