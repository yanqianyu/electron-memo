import Vue from "vue";
import Vuex from "vuex";
import axios from "../http/api";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		userId: localStorage.getItem("userId") || null,
		token: localStorage.getItem("token") || null,
		todos: [],
		currentList: null, // 当前显示的是哪个list
		customLists: [], // 所有自定义的list
		builtinLists: [] // 内置list
	},
	getters: {
		todosFiltererBySearchEntry(state) {
			return function (searchEntry) {
				return state.todos.filter(todo => {
					return todo.title.includes(searchEntry);
				})
			}
		},
		titleByList(state) {
			// 根据当前list获取对应的title
			let tmp = state.customLists.concat(state.builtinLists);
			let id = tmp.findIndex(item => {
				return item._id === state.currentList;
			});
			return tmp[id].title;
		},
		todosFilteredByLists(state) {
			// 根据列表id获取todos
			// 分builtinList和customList
			let id = state.builtinLists.findIndex(item => {
				return item._id === state.currentList;
			});
			if (id !== -1) {
				return state.todos.filter(todo => todo.builtinList.includes(state.currentList));
			}
			return state.todos.filter(todo => todo.customList.includes(state.currentList));
		},
		logIn(state) {
			return state.token !== null;
		},
		noNameCustomListsSuffix(state) {
			// 无标题清单的最大后缀
			let tmp = [];
			for(let i = 0; i < state.customLists.length; i++) {
				if(state.customLists[i].title.indexOf("无标题清单") !== -1) {
					tmp.push(state.customLists[i].title);
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
		getAllTodo(state, todos) {
			state.todos = todos;
		},
		getAllList(state, todolist) {
			todolist.forEach(e => {
				if (e.isCustomize) {
					state.customLists.push(e);
				}
				else {
					state.builtinLists.push(e);
				}
			});
		},
		addTodo(state, todo) {
			// 增添todo的记录
			state.todos.push(todo);
		},
		updateTodo(state, todo) {
			// 更新todo的信息
			const index = state.todos.findIndex(item => item._id === todo._id);
			if (index !== -1) {
				state.todos[index] = todo;
			}
		},
		deleteTodo(state, id) {
			// 删除todo
			const index = state.todos.findIndex(item => item._id === id);
			if (index !== -1) {
				state.todos.splice(index, 1);
			}
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
			const listIdx = state.customLists.findIndex(item => item._id === list);
			if (listIdx !== -1) {
				state.customLists.splice(listIdx, 1);
				state.todos = state.todos.filter(item => !item.customList.includes(list));
			}
		},
		updateCusList(state, changeInfo) {
			const listIdx = state.customLists.findIndex(item => item._id === changeInfo._id);
			if (listIdx !== -1) {
				state.customLists[listIdx].title = changeInfo.title;
			}
		},
		uploadFile(state, file) {
			const todoIdx = state.todos.findIndex(item => item._id === file.todoId);
			if (todoIdx !== -1) {
				state.todos[todoIdx].files.push(file);
			}
		},
		deleteFile(state, fileInfo) {
			const todoIdx = state.todos.findIndex(item => item._id === fileInfo.todoId);
			if (todoIdx !== -1) {
				const fileIdx = state.todos[todoIdx].files.findIndex(item => item._id === fileInfo._id);
				if (fileIdx !== -1) {
					state.todos[todoIdx].files.splice(fileIdx, 1);
				}
			}
		}
	},
	actions: {
		login(context, userInfo) {
			// 注册
			return new Promise((resolve, reject) => {
				axios.post("/users/login", {
					email: userInfo.email,
					password: userInfo.password
				}).then(resp => {
					const token = "Bearer " + resp.data.token;
					const userId = resp.data._id;
					// todo: access token, refresh token
					localStorage.setItem("token", token);
					localStorage.setItem("userId", userId);
					context.commit("login", {token, userId});
					resolve("success");
				}).catch(err => {
					// 登陆失败
					reject(err);
					let payload = {
						token: null,
						userId: null
					};
					context.commit("login", payload);
				});
			});
		},
		register(context, userInfo) {
			// 登陆
			return new Promise((resolve, reject) => {
				axios.post("/users/register", {
					email: userInfo.email,
					password: userInfo.password
				}).then(resp => {
					resolve(resp);
				}).catch(err => {
					reject(err);
				});
			});
		},
		getAllList(context) {
			// 获取所有的列表
			return new Promise((resolve, reject) => {
				axios.get("/todolist/" + context.state.userId).then(resp => {
					context.commit("getAllList", resp.data.todolists);
					resolve(resp);
				}).catch(err => {
					console.log(err);
					reject(err);
				});
			});
		},
		getAllTodo(context) {
			// 获取所有的todo
			return new Promise((resolve, reject) => {
				axios.get("/todos/" + context.state.userId).then(resp => {
					context.commit("getAllTodo", resp.data.todos);
					resolve(resp);
				}).catch(err => {
					console.log(err);
					reject(err);
				});
			});
		},
		addTodo(context, todo) {
			// 新建todo
			return new Promise((resolve, reject) => {
				// https://vuex.vuejs.org/zh/guide/actions.html
				axios.post("/todos/" + context.state.userId, todo).then(resp => {
					context.commit("addTodo", resp.data.todo);
					resolve("add todo");
				}).catch(err => {
					reject(err);
				});
			});
		},
		updateTodo(context, todo) {
			// 更新todo 除文件外
			return new Promise((resolve, reject) => {
				axios.patch("/todos/" + context.state.userId + "/" + todo._id, todo).then(resp => {
					context.commit("updateTodo", resp.data.todo);
					resolve(resp);
				}).catch(err => {
					reject(err);
				});
			});
		},
		deleteTodo(context, id) {
			// 删除todo
			return new Promise((resolve, reject) => {
				axios.delete("/todos/" + context.state.userId + "/" + id).then(resp => {
					context.commit("deleteTodo", id);
					resolve();
				}).catch(err => {
					reject(err);
				});
			});
		},
		updateListFilter(context, curList) {
			// 切换显示的清单
			context.commit("updateListFilter", curList);
		},
		addCusList(context, newList) {
			// 增加自定义清单
			return new Promise((resolve, reject) => {
				axios.post("/todolist/" + context.state.userId, newList).then(resp => {
					context.commit("addCusList", resp.data.todolist);
					resolve(resp);
				}).catch(err => {
					reject(err);
				});
			});
		},
		deleteCusList(context, list) {
			// 删除自定义清单
			return new Promise((resolve, reject) => {
				axios.delete("/todolist/" + context.state.userId + "/" + list).then(resp => {
					context.commit("deleteCusList", list);
					resolve(resp);
				}).catch(err => {
					reject(err);
				});
			});
		},
		updateCusList(context, payload) {
			// 更新自定义清单
			return new Promise((resolve, reject) => {
				axios.patch("/todolist/" + context.state.userId + "/" + payload.listid, {
					_id: payload.listid,
					userId: context.state.userId,
					title: payload.newTitle
				}).then(resp => {
					context.commit("updateCusList", resp.data.todolist);
					resolve("update list");
				}).catch(err => {
					reject(err);
				});
			});

		},
		uploadFile(context, file) {
			// 上传文件
			return new Promise((resolve, reject) => {
				const param = new FormData();
				param.append("file", file.file);
				axios.post("/todos/upload/" + context.state.userId + "/" + file.todoId,
					param, {
						"Content-Type": "multipart/form-data"
					}).then(resp => {
					// filename filesize fileid todoid
					let fileObj = resp.data.file;
					if (file.file.iconimg) {
						fileObj.iconimg = file.file.iconimg;
					}
					context.commit("uploadFile", fileObj);
					resolve(resp);
				}).catch(err => {
					reject(err);
				});
			});
		},
		deleteFile(context, file) {
			// 删除文件
			return new Promise((resolve, reject) => {
				axios.delete("/todos/files/" + context.state.userId + "/" + file.todoId + "/" + file._id)
					.then(resp => {
						context.commit("deleteFile", file);
						resolve(resp);
					}).catch(err => {
						reject(err);
					});
			});
		}
	}
});
