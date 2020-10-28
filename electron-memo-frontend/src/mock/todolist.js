import Mock from "mockjs";

// 定义需要的数据
let todos = [];
const COUNT = [1, 2, 3, 4, 5];
for (let i = 0; i < COUNT.length; i++) {
	todos.push({
		id: i,
		content: Mock.Random.first(),
		isDone: Mock.Random.boolean()
	});
}

export {
	todos
};
