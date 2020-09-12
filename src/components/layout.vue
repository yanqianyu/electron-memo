<template>
    <div class="container">
        <input type="text" class="todo-input" placeholder="请写下你的待办事项" v-model="newTodo" v-on:keydown.enter="addTodo">

        <div class="content">
            <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo"></todo-item>
        </div>

        <div class="filter-container">
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
    mounted() {
      window.ipcRender.send('todo-window')
    },
    created() {
        // todo: login成功后通过actions获取
        console.log("create layout")
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
<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
    }
    .todo-input {
        order: -1;
        width: 100%;
        font-size: 18px;
        margin-bottom: 16px;
        &:focus {
            // 伪类：获得焦点的元素
            outline: 0; // 轮廓线
        }
    }
    .content {
        flex-grow: 1;
        height: 200px;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        margin-bottom: 12px;
        align-items: flex-start; // flex 与交叉轴的起点对齐
        justify-content: space-between;
    }

</style>
