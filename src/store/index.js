import Vue from 'vue'
import Vuex from 'vuex'
import '../mock/mock'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        filter: 'all',
        todos: [],
        currentList: "", // 当前显示的是哪个list
        customLists: []  // 所有自定义的list
    },
    getters: {
        //
        todosByLists(state) {
            // 根据列表名获取todos
            return state.todos.filter(todo => todo.list === state.currentList);
        },
        logIn(state) {
            return state.token != null
        },
        todosFiltered(state) {
            if (state.filter === 'all') {
                return state.todos
            } else if (state.filter === 'active') {
                return state.todos.filter(todo => !todo.isDone)
            } else if (state.filter === 'completed') {
                return state.todos.filter(todo => todo.isDone)
            }
            return state.todos
        }
    },
    mutations: {
        login(state, token) {
            state.toekn = token
        },
        addTodo(state, todo) {
            state.todos.push(todo)
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id)
            state.todos.splice(index, 1, todo)
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex(item => item.id === id)
            state.todos.splice(index, 1)
        },
        updateFilter(state, filter) {
            state.filter = filter
        }
    },
    actions: {
        login(context, userInfo) {
            this.$axios.post('/todo/login', {
                email: userInfo.email,
                password: userInfo.password
            }).then(resp => {
                const token = resp.data.token
                localStorage.setItem('token', token)
                context.commit('login', token)
            }).catch(err => {
                console.log(err)
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
        updateFilter(context, filter) {
            context.commit('updateFilter', filter)
        }
    }
})
