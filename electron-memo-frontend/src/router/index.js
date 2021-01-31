import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
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
				redirect: {
					name: "builtinList",
					query: {
						listid: "1"
					}
				}, // 默认路由
				meta: {
					requireAuth: false
				},
				children: [
					{
						path: "/builtinList", // listname作为参数决定子组件渲染的数据
						name: "builtinList",
						component: ToDoList
					},
					{
						path: "/customizeList",
						name: "customizeList",
						component: ToDoList
					},
					{
						path: "/search", // todo搜索结果
						name: "searchList",
						component: ToDoList
					}
				]
			},
			{
				path: "/login",
				name: "login",
				component: Login
			},
			{
				path: "/register",
				name: "register",
				component: Register
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
