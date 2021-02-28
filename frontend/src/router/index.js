import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import {store} from "@/store";
import Vue from "vue";
import Router from "vue-router";
import ToDoList from "../components/ToDoList";
import SideBar from "../components/SideBar";

// // https://blog.csdn.net/qq_42805569/article/details/111238634
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location, onResolve, onReject) {
// 	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
// 	return originalPush.call(this, location).catch(err => console.log(err));
// };

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
				}, // 默认路由
				meta: {
					requireAuth: true
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
		if (!store.getters.logIn) {
			next({
				path: "/login",
				query: {redirect: to.fullPath}
			});
		} else {
			// vuex的顺序好像在router beforeEach前
			next();
		}
	} else {
		// !!! 导航守卫
		next();
	}
});
