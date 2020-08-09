<template>
    <div class="todo-item">
        <input type="checkbox" v-model="todo.isDone" v-on:click="toggleTaskStatus(key)">
        <span>{{todo.content}}</span>
        <button v-on:click="deleteTodo(todo.id)"></button>
    </div>
</template>
<script>
export default {
    name: "todo-item",
    props: {
        todo: {
            type: Object,
            required: true,
        }
    },
    data: function() {
        return {
            'id': this.todo.id,
            'content': this.todo.content,
            'isDone': this.todo.isDone
        }
    },
    methods: {
        toggleTaskStatus: function() {
            this.$store.dispatch('updateTodo', {
                'id': this.todo.id,
                'content': this.todo.content,
                'isDone': !this.todo.isDone
            })
        },
        deleteTodo: function(id) {
            this.$store.dispatch('deleteTodo', id)
        }
    }
}
</script>