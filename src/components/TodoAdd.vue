<template>
  <div class="todo-add">
    <img src="../assets/icons/add.svg">
    <input type="text" placeholder="add you task" v-model="todo">
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

  }
}
</script>

<style scoped>

</style>