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

		console.log(createTodoResp.body);
		expect(createTodoResp.body.todo._id).toBeDefined();
		expect(createTodoResp.body.todo.userId).toBe(userId);
		// expect(createTodoResp.body.todo.times).toBeDefined();
	});


	test('find todos by user id', async () => {
		// 登录
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;

		const findWithUserIdResp = await request(server)
			.get('/todos/' + userId)
			.set('Authorization', token);

		expect(findWithUserIdResp.body.todos.length).toBe(1);
	});

	test('find todos by user id and list id', async () => {
		// 登录
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		listId = '5fdf041f1d6ae93f98e2c0d0';
		const findWithUserIdListIdResp = await request(server)
			.get('/todos/todosByList/' + userId + '/' + listId)
			.set('Authorization', token);

		expect(findWithUserIdListIdResp.body.todos.length).toBe(1);
	});

	test('create a todo in a list', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		listId = "5fdf348e5528096451914fa4";

		const createTodoResp = await request(server)
			.post('/todos/' + userId)
			.send({
				userId: userId,
				title: 'todo test',
				isDone: false,
				builtinList: [],
				customList: [listId],
				steps: []
			})
			.set('Authorization', token);
		expect(createTodoResp.body.todo._id).toBeDefined();
		expect(createTodoResp.body.todo.userId).toBe(userId);
	});

	test('find todo by todo id', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		todoId = '5fdf041f1d6ae93f98e2c0d1';
		const findWithTodoIdResp = await request(server)
			.get('/todos/todoById/' + userId + '/' + todoId)
			.set('Authorization', token);

		console.log(findWithTodoIdResp.body.todo);

		expect(findWithTodoIdResp.body.todo._id).toEqual(todoId);
	});

	test('update a todo', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		todoId = "5fe32e75dbe3dfc53dce510b";
		const updateResp = await request(server)
			.patch('/todos/' + userId + '/' + todoId)
			.set('Authorization', token)
			.send({
				title: 'new Title',
				steps: [{content: 'step one'}],
				times: {
					reminder: Date.now()
				}
			});
		console.log(updateResp.body);
		expect(updateResp.body.todo._id).toBe(todoId);
		expect(updateResp.body.todo.title).toBe('new Title');
		expect(updateResp.body.todo.steps.length).toBe(1);
		expect(updateResp.body.todo.times).toBeDefined();
	});

	test('upload a file', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		todoId = "5fdf348e5528096451914fa5";

		// attach的第一个参数对应const file = ctx.request.files.file;中的file
		const fileUploadResp = await request(server)
			.post('/todos/upload/' + userId + '/' + todoId)
			.set('Authorization', token)
			.set('Content-Type', 'multipart/form-data')
			.attach('file', '/Users/YanQianyu/Desktop/myfrontprojects/electron-memo/electron-memo-backend/tests/test.md');
		console.log(fileUploadResp.body);

		expect(fileUploadResp.body.todo.files.length).toBe(1);
	});

	test('delete a todo', async () => {
		const loginResp = await request(server)
			.post('/users/login')
			.send({
				name: 'Yanqianyu',
				password: '1234'
			});
		token = 'Bearer ' + loginResp.body.token;
		userId = loginResp.body._id;
		todoId = "5fe3362985bc3cc9a2a2f37e";

		const deleteResp = await request(server)
			.delete('/todos/' + userId + '/' + todoId)
			.set('Authorization', token);

		console.log(deleteResp.body);
		expect(deleteResp.statusCode).toBe(200);
		expect(deleteResp.body.message).toBe("删除成功");

		const delete2Resp = await request(server)
			.delete('/todos/' + userId + '/' + todoId)
			.set('Authorization', token);

		console.log(delete2Resp.body);
		expect(delete2Resp.statusCode).toBe(404);
		expect(delete2Resp.body.message).toBe("待办事项不存在");
	});

});
