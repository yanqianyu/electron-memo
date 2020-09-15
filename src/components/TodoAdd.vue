<template>
  <div class="todo-add">
    <img src="../assets/icons/add.svg">
    <input type="text" placeholder="add you task" v-model="todo" v-on:keyup.enter="addTodo">
  </div>
</template>

<script>
export default {
  name: "TodoAdd",
  data: function () {
    return {
      todo: ""
    }
  },
  methods: {
    addTodo() {
      // todo
      this.todo.createTime = new Date();
      this.todo = ""
    }
  }
}
</script>

<style scoped>

</style>