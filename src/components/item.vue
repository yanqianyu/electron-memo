<template>
    <div class="todo-item">
        <input type="checkbox" v-model="todo.isDone" v-on:click="toggleTaskStatus">
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
            this.$axios.post('/todo/edit', {
                'id': this.todo.id,
                'content': this.todo.content,
                'isDone': !this.todo.isDone
            }).then(res => {
                this.$store.dispatch('updateTodo', res.data)
            }).catch(err => {
                console.log(err)
            })

        },
        deleteTodo: function(id) {
            this.$axios.post('/todo/delete', {
                id
            }).then(res => {
                this.$store.dispatch('deleteTodo', res.data.id)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="scss">
    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {

        }
        span {

        }
        button {

        }
    }
</style>
