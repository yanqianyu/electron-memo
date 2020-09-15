<template>
  <div class="todo-item">
    <img src="../assets/icons/one.svg">
    <div class="todo-content">
      <div class="todo-title">{{todo.title}}</div>
      <div class="todo-info">
        <div class="todo-list">

        </div>
        <div class="todo-steps">

        </div>
        <div class="todo-date">

        </div>
        <div class="todo-file">

        </div>
        <div class="todo-note">

        </div>
      </div>
    </div>
    <img src="../assets/icons/important.svg">
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  data: function () {
    return {
      todo: {

      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>