import Login from "@/components/auth/Login";
import {store} from "@/store";
import Vue from "vue";
import Router from "vue-router";
import ToDoList from "../components/ToDoList";
import SideBar from "../components/SideBar";

Vue.use(Router);

export const router = new Router({
	routes:
		[
			{
				path: "/",
				name: "index",
				redirect: "/login",
				component: Login
			},
			{
				path: "/todo",
				name: "todo",
				component: SideBar,
				redirect: "/builtinList/myday", // 默认路由
				meta: {
					requireAuth: false
				},
				children: [
					{
						path: "/builtinList/:listname", // listname作为参数决定子组件渲染的数据
						name: "builtinList",
						component: ToDoList
					},
					{
						path: "/customizeList/:listname",
						name: "customizeList",
						component: ToDoList
					},
					{
						path: "/search/:entry", // todo搜索结果
						name: "searchList",
						component: ToDoList
					}
				]
			},
			{
				path: "/login",
				name: "login",
				component: Login
			}
		]
});
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)) {
		if (!store.getters.login) {
			next({
				path: "/login",
				query: {redirect: to.fullPath}
			});
		} else {
			next();
		}
	} else {
		// !!! 导航守卫
		next();
	}
});
