<template>
    <div class="bigbox">
        <!-- 搜索框 -->
        <input type="text" value="" placeholder="What needs to be done?" v-model="task" v-on:keydown.enter="addTodo">
        <ul>
            <li v-for="(todo, key) in todos" v-bind:key="key">
                <div>
                    <!-- checkbox绑定todo的状态 -->
                    <input type="checkbox" v-model="todo.status" v-on:click="toggleTaskStatus(key)">
                    <span>{{todo.content}}</span>
                    <!-- 删除todo事件 -->
                    <button v-on:click="deleteTodo(key)"></button>
                </div>
            </li>
        </ul>
        <!-- 选项卡 -->
        <div>
            <div>{{todoNums}} items left</div>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Note",
    data: function() {
        return {
            todos: [],
            task: "",
            todoNums: 0
        }
    },
    created: function() {
        // 从后台获取全部task
        this.todoNums = this.todos.length;
    },
    methods: {
        toggleTaskStatus: function(key) {
            this.todos[key].status = !this.todos[key].status;
            let todoNums = 0;
            this.todos.forEach(function(item) {
                if (item.status === false) {
                    todoNums++;
                }
            });
            this.todoNums = todoNums;
        },
        addTodo: function() {
            // 确保输入有内容
            if (this.task.length > 0) {
                var newTodo = {};
                newTodo.content = this.task;
                newTodo.status = false;
                this.todos.push(newTodo);
                // 清空文本框
                this.task = "";
                this.todoNums = this.todos.length;
            }
        },
        deleteTodo: function(key) {
            // 删除任务
            // 响应式原理
            this.todos.splice(key, 1);
            this.todoNums = this.todos.length;
        }
    }
}
</script>
<style scoped>
ul, li {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
</style>