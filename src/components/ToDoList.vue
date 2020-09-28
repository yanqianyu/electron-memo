<template>
    <div class="todo-list">
        <div class="todo-title">
            {{title}}
        </div>
        <div class="todo-list-container">
            <todo-item></todo-item>
        </div>
        <div class="todo-add">
            <todo-add list-type="listType"></todo-add>
        </div>
    </div>
</template>

<script>
    import TodoItem from "./TodoItem";
    import TodoAdd from "./TodoAdd";
    export default {
        name: "ToDoList",
        components: {TodoItem, TodoAdd},
        mounted() {
            // 获取路由中携带的参数
            console.log(this.$route.params.listname);
            this.listType = this.$route.params.listname;
            this.title = this.listType;
        },
        data: function () {
            return {
                title: "我的一天",
                listType: "myday"
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
