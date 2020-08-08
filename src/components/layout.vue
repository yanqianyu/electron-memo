<template>
    <div class="container">
        <input type="text" class="todo-input" placeholder="请写下你的待办事项" v-model="newTodo" v-on:keydown.enter="addTodo">
        
        <div class="content">
            <todo-item></todo-item>
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
    methods: {
        addTodo() {
            if (this.newTodo.trim().length == 0) {
                return
            }
            this.newTodo = ''
            
        }
    }
}
</script>