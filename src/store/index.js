import Vue from 'vue'
import Vuex from 'vuex'
import '../mock/mock'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        todos: [],
        currentList: "", // 当前显示的是哪个list
        customLists: [], // 所有自定义的list
        builtinLists: [] // 内置list
    },
    getters: {
        todosFilteredByLists(state) {
            // 根据列表名获取todos
            return state.todos.filter(todo => todo.checklists.includes(state.currentList));
        },
        logIn(state) {
            return state.token != null;
        },
        noNameCustomListsSuffix(state) {
            // 无标题清单的最大后缀
            let tmp = state.customLists.filter(list => list.name.indexOf('无标题清单') !== -1)
                .map(list => parseInt(list.name.substring(5)));
            tmp.sort();
            return tmp[tmp.length - 1] + 1;
        }
    },
    mutations: {
        login(state, token) {
            state.toekn = token;
        },
        addTodo(state, todo) {
            // 增添todo的记录
            state.todos.push(todo);
        },
        updateTodo(state, todo) {
            // 更新todo的信息
            const index = state.todos.findIndex(item => item.id === todo.id);
            state.todos.splice(index, 1, todo);
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
        updateCusList(state, oldList, newListName) {
            // todo: 更新自定义清单的信息（主要是名字）
            const listIdx = state.customLists.findIndex(item => item.id === oldList.id);
            state.customLists[listIdx].name = newListName;
        }
    },
    actions: {
        login(context, userInfo) {
            this.$axios.post('/todo/login', {
                email: userInfo.email,
                password: userInfo.password
            }).then(resp => {
                const token = resp.data.token;
                localStorage.setItem('token', token);
                context.commit('login', token);
            }).catch(err => {
                console.log(err);
            })
        },
        // 和后端api交互
        addTodo(context, todo) {
            context.commit('addTodo', todo)
        },
        updateTodo(context, todo) {
            context.commit('updateTodo', todo)
        },
        deleteTodo(context, id) {
            context.commit('deleteTodo', id)
        },
        updateList(context, curList) {
            // 切换显示的清单
            context.commit('updateListFilter', curList)
        },
        addCusList(context, newList) {
            // 增加自定义清单
            context.commit('addCusList', newList)
        },
        deleteCusList(context, list) {
            // 删除自定义清单
            context.commit('deleteCusList', list)
        },
        updateCusList(context, oldList, newListName) {
            // 更新自定义清单
            context.commit('updateCusList', oldList, newListName)
        }
    }
});
