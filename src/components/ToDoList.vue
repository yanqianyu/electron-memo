<template>
    <div class="todo-list">
      <div class="list-left-part">
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
      <div class="list-right-part">
        <todo-set></todo-set>
      </div>
    </div>
</template>

<script>
    import TodoItem from "./TodoItem";
    import TodoAdd from "./TodoAdd";
    import TodoSet from "@/components/TodoSet";
    export default {
        name: "ToDoList",
        components: {TodoSet, TodoItem, TodoAdd},
        mounted() {
            // 获取路由中携带的参数
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
.todo-list {
  display: flex;
  flex-direction: row;
  .list-left-part {
    order: -1;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .todo-title {
      padding: 10px 0;
      font-size: 2rem;
      text-align: left;
      order: -1;
    }
    .todo-list-container {
      flex: 1;
    }
    .todo-add {
    }
  }
  .list-right-part {
    width: 200px;
  }
}
</style>
