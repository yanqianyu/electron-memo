<template>
    <div class="container">
        <input type="text" class="todo-input" placeholder="请写下你的待办事项" v-model="newTodo" v-on:keydown.enter="addTodo">
        
        <div class="content">
            <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo"></todo-item>
        </div>

        <div class="filter">
            <todo-filter></todo-filter>
        </div>
    </div>
</template>
<script>
import TodoItem from './item'
import TodoFilter from './filter'
export default {
    name: "todo-list",
    components: {
        TodoItem,
        TodoFilter
    },
    data: function() {
        return {
            newTodo: ''
        }
    },
    created() {

    },
    computed: {
        todosFiltered() {
            return this.$store.getters.todosFilter
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim().length == 0) {
                return
            }
            this.$store.dispatch('addTodo', {
                content: this.newTodo,
                isDone: false
            })
            this.newTodo = ''
        }
    }
}
</script>