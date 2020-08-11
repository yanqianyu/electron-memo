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
        this.$axios.get('/todo/list')
                    .then(res => {
                        res.data.forEach(item => this.$store.dispatch('addTodo', item))
                    })
                    .catch(err => {
                        console.log(err)
                    })
    },
    computed: {
        todosFiltered() {
            return this.$store.getters.todosFiltered
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim().length === 0) {
                return
            }
            this.$axios.post('/todo/add', {
                content: this.newTodo,
                isDone: false
            }).then(res => {
                this.$store.dispatch('addTodo', res.data)
            }).catch(err => {
                console.log(err)
            })

            this.newTodo = ''
        }
    }
}
</script>
