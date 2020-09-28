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
            this.listType = this.$route.params.listname;
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
