import Vue from "vue";
import Vuex from "vuex";
import "../mock/mock";
import {builtins, todos} from "../mock/builtins";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		userId: localStorage.getItem("userId") || null,
		token: localStorage.getItem("token") || null,
		todos: todos,
		todoId: "", // 当前显示的是哪个todo
		currentList: "1", // 当前显示的是哪个list
		customLists: [], // 所有自定义的list
		builtinLists: builtins // 内置list
	},
	getters: {
		titleByList(state) {
			// 根据当前list获取对应的title
			let tmp = state.customLists.concat(state.builtinLists);
			let id = tmp.findIndex(item => {
				return item.id === state.currentList;
			});
			return tmp[id].name;
		},
		todosFilteredByLists(state) {
			// 根据列表id获取todos
			// 分builtinList和customList
			let id = state.builtinLists.findIndex(item => {
				return item.id === state.currentList;
			});
			if (id !== -1) {
				return state.todos.filter(todo => todo.builtinList.includes(state.currentList));
			}
			return state.todos.filter(todo => todo.customList.includes(state.currentList));
		},
		logIn(state) {
			return state.token != null;
		},
		noNameCustomListsSuffix(state) {
			// 无标题清单的最大后缀
			let tmp = [];
			for(let i = 0; i < state.customLists.length; i++) {
				if(state.customLists[i].name.indexOf("无标题清单") !== -1) {
					tmp.push(state.customLists[i].name);
				}
			}
			if(tmp.length === 0) {
				return "";
			}
			let max = 0;
			for(let i = 0; i < tmp.length; i++) {
				if(tmp[i] !== "无标题清单") {
					max = parseInt(tmp[i].substring(5)) > max ? parseInt(tmp[i].substring(5)) : max;
				}
			}

			return max + 1;
		}
	},
	mutations: {
		login(state, payload) {
			// 用户登陆
			state.token = payload.token;
			state.userId = payload.userId;
		},
		addTodo(state, todo) {
			// 增添todo的记录
			state.todos.push(todo);
		},
		updateTodo(state, todo) {
			// 更新todo的信息
			const index = state.todos.findIndex(item => item.id === todo.id);
			state.todos[index] = todo;
		},
		deleteTodo(state, id) {
			// 删除todo
			const index = state.todos.findIndex(item => item.id === id);
			state.todos.splice(index, 1);
		},
		updateListFilter(state, curList) {
			// 更新当前显示的list
			state.currentList = curList;
		},
		addCusList(state, newList) {
			// 增加新的自定义清单
			state.customLists.push(newList);
		},
		deleteCusList(state, list) {
			// todo: 删除一整个清单以及内部的todo
			const listIdx = state.customLists.findIndex(item => item.id === list.id);
			state.customLists.splice(listIdx, 1);
			state.todos = state.todos.filter(item => !item.checklists.includes(list.id));
		},
		updateCusList(state, changeInfo) {
			const listIdx = state.customLists.findIndex(item => item.id === changeInfo.listid);
			state.customLists[listIdx].name = changeInfo.newTitle;
		},
		uploadFile(state, fileInfo) {

		},
		deleteFile(state, fileInfo) {

		}
	},
	actions: {
		login(context, userInfo) {
			// 注册
			return new Promise((resolve, reject) => {
				this.$axios.post("/users/login", {
					email: userInfo.email,
					password: userInfo.password
				}).then(resp => {
					const token = "Bearer" + resp.body.token;
					const userId = resp.body._id;
					localStorage.setItem("token", token);
					localStorage.setItem("userId", userId);
					context.commit("login", {token, userId});
					resolve();
				}).catch(err => {
					reject(err);
				});
			})
		},
		register(context, userInfo) {
			// 登陆
			return new Promise((resolve, reject) => {
				this.$axios.post("/users/register", {
					email: userInfo.email,
					password: userInfo.password
				}).then(resp => {
					resolve();
				}).catch(err => {
					reject(err);
				});
			})
		},
		addTodo(context, todo) {
			// 新建todo
			return new Promise((resolve, reject) => {
				// https://vuex.vuejs.org/zh/guide/actions.html
				this.$axios.post("/todos/" + context.state.userId, {
					todo
				}).then(resp => {
					context.commit("addTodo", resp.body.todo);
					resolve();
				}).catch(err => {
					reject(err);
				});
			})
		},
		updateTodo(context, todo) {
			// 更新todo 除文件外
			return new Promise((resolve, reject) => {
				this.$axios.post('/todos/' + context.state.userId + '/' + context.state.todoId, {
					todo
				}).then(resp => {
					context.commit("updateTodo", resp.body.todo);
					resolve();
				}).catch(err => {
					reject(err);
				})
			});
		},
		deleteTodo(context, id) {
			// 删除todo
			return new Promise((resolve, reject) => {
				this.$axios.delete('/todos/' + context.state.userId + '/' + id, {

				}).then(resp => {
					const id = resp.body._id;
					context.commit("deleteTodo", id);
					resolve()
				}).catch(err => {
					reject(err);
				})
			})
		},
		updateListFilter(context, curList) {
			// 切换显示的清单
			context.commit("updateListFilter", curList);
		},
		addCusList(context, newList) {
			// 增加自定义清单
			return new Promise((resolve, reject) => {
				this.$axios.post('/todolist/' + context.state.userId, {
					newList
				}).then(resp => {
					context.commit("addCusList", resp.body.todolist);
					resolve();
				}).catch(err => {
					reject(err);
				})
			})
		},
		deleteCusList(context, list) {
			// 删除自定义清单
			return new Promise((resolve, reject) => {
				this.$axios.delete('/todolist/' + context.state.userId + '/' + list, {

				}).then(resp => {
					context.commit("deleteCusList", resp.body._id);
					resolve();
				}).catch(err => {
					reject(err);
				})
			});
		},
		updateCusList(context, oldList, newListName) {
			// 更新自定义清单
			return new Promise((resolve, reject) => {
				this.$axios.put('/todolist/' + context.state.userId + '/' + oldList, {
					_id: oldList,
					userId: context.state.userId,
					title: newListName
				}).then(resp => {
					context.commit("updateCusList", oldList, resp.body.todolist.title);
					resolve();
				}).catch(err => {
					reject(err);
				})
			})

		},
		uploadFile(context, file) {
			// 上传文件
			return new Promise((resolve, reject) => {
				const param = new FormData();
				param.append("file", file.data);
				this.$axios.post('/todos/upload/' + context.state.userId + '/' + context.state.todoId,
					param, {
					"Content-Type": "multipart/form-data"
				}).then(resp => {
					resolve();
				}).catch(err => {
					reject(err);
				})
			})
		},
		deleteFile(context, fileId) {
			// 删除文件
			return new Promise((resolve, reject) => {
				this.$axios.delete('/todos/upload/' + context.state.userId + '/' + context.state.todoId + '/' + fileId)
					.then(resp => {
						resolve();
					}).catch(err => {
						reject(err);
				})
			})
		}
	}
});
