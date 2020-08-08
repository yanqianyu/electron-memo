<template>
    <div class="todo-item">
        <input type="checkbox" v-model="todo.isDone" v-on:click="toggleTaskStatus(key)">
        <span>{{todo.content}}</span>
        <button v-on:click="deleteTodo(key)"></button>
    </div>
</template>
<script>
export default {
    name: "todo-item",
    props: {
        type: Object,
        required: true,
    },
    data: function() {
        return {
            'id': this.todo.id,
            'content': this.todo.content,
            'isDone': this.todo.isDone,
            'isDeleted': this.todo.isDeleted
        }
    },
    methods: {
        toggleTaskStatus: function() {

        },
        deleteTodo: function() {
            
        }
    }
}
</script>