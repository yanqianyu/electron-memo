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
		const getListsResp = await request(server)
			.set("Authorization", token)
			.get('/todolist/' + userId);
		// todo 返回的是todolist数组
		expect(getListsResp.body.lists.length()).toBe(0);

		// 没有token
		const getListsNoTokenResp = await request(server)
			.get('/todolist/' + userId);
		// todo 返回的是todolist数组
		expect(getListsNoTokenResp.statusCode).toBe(403);
	});

	test('create a list', async () => {
		const createResp = await request(server)
			.set('Authorization', token)
			.post('/todolist/')
			.send({
				userId: userId,
				title: 'new todolist'
			});
		expect(createResp.body.todoList._id).toBeDefined();
		listId = createResp.body.todoList._id;
		expect(createResp.body.todoList.userId).toBe(userId);
		expect(createResp.body.todoList.title).toBe('new todolist');
	});

	test('get list by userid and listid', async () => {
		const getListByIdResp = await request(server)
			.set('Authorization', token)
			.get('/todolist/' + userId + '/' + listId);
		expect(getListByIdResp.body.todoList._id).toBe(listId);
		expect(getListByIdResp.body.todoList.userId).toBe(userId);
		expect(getListByIdResp.body.todoList.title).toBe('new todolist');
	});

	test('update a list', async () => {
		const updateListByIdResp = await request(server)
			.set('Authorization', token)
			.patch('/todolist/' + userId + '/' + listId)
			.send({
				listId: listId,
				userId: userId,
				title: 'new todolist name'
			});
		expect(updateListByIdResp.body.todoList._id).toBe(listId);
		expect(updateListByIdResp.body.todoList.userId).toBe(userId);
		expect(updateListByIdResp.body.todoList.title).toBe('new todolist name');
	});

	test('delete a list', async () => {
		const deletListByIdResp = await request(server)
			.set('Authorization', token)
			.delete('/todolist/' + userId + '/' + listId)
			.send({
				listId: listId,
				userId: userId,
				title: 'new todolist name'
			});
		expect(deletListByIdResp.body.statusCode).toBe(204);
		expect(deletListByIdResp.body.msg).toBe('删除成功');
	});
});
