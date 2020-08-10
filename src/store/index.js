import Vue from 'vue'
import Vuex from 'vuex'
import '../mock/mock'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: []
    },
    getters: {
        todosFilter(state) {
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
        addTodo(state, todo) {
            state.todos.push({
                todo
            })
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id)
            state.todos.splice(index, 1, {
                todo
            })
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
