// 动态路由
/**
 * 遍历传入的菜单列表，拼接路由所需的数据path name title component
 */
// let data = [{
// 	listId: "", // 列表id
// 	name: "todo", // 要跳转的路由名称，不是路径
// 	icon: "icon", // icon类型
// 	title: "我的一天", // 文本内容
// 	isCustomize: false // 是否用户自定义
// }];

// 将菜单信息转成对应的路由信息 动态添加
export function menusToRoutes(data) {
	const result = [], children = [];
	result.push({
		path: "/todo",
		component: () => require("../components/SideBar"),
		children
	});
	data.forEach(item => {
		generateRoutes(children, item);
	});
	return result;
}

function generateRoutes(children, item) {
	item.forEach(e => {
		if (e.isCustomize) {
			children.push({
				path: "/customizeList",
				component: () => require("../components/ToDoList")
			});
		} else {
			children.push({
				path: "/builtinList",
				component: () => require("../components/ToDoList")
			});
		}
	});
}
