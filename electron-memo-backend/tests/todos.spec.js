import server from '../index';
import request from 'supertest';

afterEach(() => {
	server.close();
});

describe('todo controller', () => {
	let token, userId, listId, todoId;
	test('create one todo', async () => {
		// 登录
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;

		// 创建列表
		const createListResp = await request(server)
			.post('/todolist/' + userId)
			.set('Authorization', token)
			.send({
				userId: userId,
				title: 'new todolist'
			});
		expect(createListResp.body.todolist._id).toBeDefined();

		const getListsResp = await request(server)
			.get('/todolist/' + userId)
			.set("Authorization", token);
		expect(getListsResp.body.todolists.length).toBe(1);
		listId = getListsResp.body.todolists[0]._id;

		const createTodoWithoutTokenResp = await request(server)
			.post('/todos/' + userId)
			.send({
				userId: userId,
				title: 'todo test',
				isDone: false,
				builtinList: [],
				customList: [listId],
				steps: []
			});
		expect(createTodoWithoutTokenResp.statusCode).toBe(401);

		const createTodoResp = await request(server)
			.post('/todos/' + userId)
			.set('Authorization', token)
			.send({
				userId: userId,
				title: 'todo test',
				isDone: false,
				builtinList: [],
				customList: [listId],
				steps: []
			});
		expect(createTodoResp.body.todo._id).toBeDefined();
		expect(createTodoResp.body.todo.userId).toBe(userId);
	});


	test('find todos by user id', async () => {
		const findWithUserIdResp = await request(server)
			.get('/todos/' + userId)
			.set('Authorization', token);

		expect(findWithUserIdResp.body.todos.length).toBe(1);
	});

	test('find todos by user id and list id', async () => {
		const findWithUserIdListIdResp = await request(server)
			.get('/todos/' + userId + '/' + listId)
			.set('Authorization', token);

		expect(findWithUserIdListIdResp.body.todos.length).toBe(1);
	});

	test('find todo by todo id', async () => {
		const findWithTodoIdResp = await request(server)
			.get('/todos/' + todoId)
			.set('Authorization', token);

		expect(findWithTodoIdResp.body.todos.length).toBe(1);
	});

	test('update a todo', async () => {
		const updateResp = await request(server)
			.patch('/todos/' + userId + '/' + todoId)
			.set('Authorization', token)
			.send({
				title: 'new Title'
			});
		expect(updateResp.body.todo._id).toBe(todoId);
		expect(updateResp.body.todo.title).toBe('new Title');
	});

	test('upload a file', async () => {
		const fileUploadResp = await request(server)
			.attach('', '')
			.post('/todos/' + userId + '/' + todoId)
			.set('Authorization', token);
		expect(fileUploadResp.body.todo.file.length).toBe(1);
	});

	test('delete a todo', async () => {
		const deleteResp = await request(server)
			.delete('/todos/' + listId)
			.set('Authorization', token);
		expect(deleteResp.body.statusCode).toBe(204);
	});

});
