<template>
  <div class="todo-add">
    <img src="../assets/icons/add.svg">
    <input type="text" placeholder="add you task" v-model="todo" v-on:keyup.enter="addTodo">
  </div>
</template>

<script>
export default {
  name: "TodoAdd",
  props: ['listType'],
  data: function () {
    return {
      todo: ""
    }
  },
  methods: {
    addTodo() {
      // 向对应的列表增加item
      // todo: commit -> vuex
      this.todo.createTime = new Date();
      this.todo = ""
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-add {
  img {
    vertical-align: middle;
    width: 20px;
    size: 20px;
  }
  input {
    vertical-align: middle;
  }
}
</style>
