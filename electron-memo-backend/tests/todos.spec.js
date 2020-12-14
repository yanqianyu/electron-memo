import server from '../index';
import request from 'supertest';

afterEach(() => {
	server.close();
});

describe('todo controller', () => {
	let token, userId, listId, todoId;
	test('after login', async () => {
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
		expect(getListsResp.body.lists.length()).toBe(1);
		listId = getListsResp.body.todoList._id;
	});

	test('create one todo', async () => {
		const createTodoWithoutTokenResp = await request(server)
			.post('/todos')
			.send({
				userId: userId,
				title: 'todo test',
				isDone: false,
				builtinList: [],
				customList: [listId],
				steps: []
			});
		expect(createTodoWithoutTokenResp.body.statusCode).toBe(403);

		const createTodoResp = await request(server)
			.set('Authorization', token)
			.post('/todos')
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
			.set('Authorization', token)
			.get('/todos/' + userId);

		expect(findWithUserIdResp.body.todos.length).toBe(1);
	});

	test('find todos by user id and list id', async () => {
		const findWithUserIdListIdResp = await request(server)
			.set('Authorization', token)
			.get('/todos/' + userId + '/' + listId);

		expect(findWithUserIdListIdResp.body.todos.length).toBe(1);
	});

	test('find todo by todo id', async () => {
		const findWithTodoIdResp = await request(server)
			.set('Authorization', token)
			.get('/todos/' + todoId);

		expect(findWithTodoIdResp.body.todos.length).toBe(1);
	});

	test('update a todo', async () => {
		const updateResp = await request(server)
			.set('Authorization', token)
			.patch('/todos/' + userId + '/' + todoId)
			.send({
				title: 'new Title'
			});
		expect(updateResp.body.todo._id).toBe(todoId);
		expect(updateResp.body.todo.title).toBe('new Title');
	});

	test('upload a file', async () => {
		const fileUploadResp = await request(server)
			.attach('', '')
			.set('Authorization', token)
			.post('/todos/' + userId + '/' + todoId);
		expect(fileUploadResp.body.todo.file.length).toBe(1);
	});

	test('delete a todo', async () => {
		const deleteResp = await request(server)
			.set('Authorization', token)
			.delete('/todos/' + listId);
		expect(deleteResp.body.statusCode).toBe(204);
	});

});
