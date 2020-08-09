import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:5000'

export const store = new Vuex.store({
    state: {
        filter: 'all',
        todos: []
    },
    getters: {
        todosFilter(state) {
            if (state.filter == 'all') {
                return state.todos
            } else if (state.filter == 'active') {
                return state.todos.filter(todo => !todo.isDone)
            } else if (state.filter == 'completed') {
                return state.todos.filter(todo => todo.isDone)
            }
            return state.todos
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                todo
            })
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id == todo.id)
            state.todos.splice(index, 1, {
                todo
            })
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex(item => item.id == id)
            state.todos.splice(index, 1)
        },
        updateFilter(state, filter) {
            state.filter = filter
        }
    },
    actions: {
        // 和后端api交互
        addTodo(context, todo) {
            axios.post('/todo/add', {
                todo
            }).then(res => {
                context.commit('addTodo', res.data)
            }).catch(err => {
                console.log(err)
            })
        },
        updateTodo(context, todo) {
            axios.post('/todo/edit', {
                todo
            }).then(res => {
                context.commit('updateTodo', res.data)
            }).catch(err => {
                console.log(err)
            })
        },
        deleteTodo(context, id) {
            axios.post('/todo/delete', {
                id
            }).then(res => {
                context.commit('deleteTodo', res.data)
            }).catch(err => {
                console.log(err)
            })
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter)
        }
    }
})