<template>
  <div class="container">
    <div class="left-part">
      <SideBar></SideBar>
    </div>
    <div class="middle-part">
      <div class="list-title">{{}}</div>>
      <div class="todo-lists">
        <TodoItem></TodoItem>
      </div>
      <TodoAdd></TodoAdd>
    </div>
    <div v-if="setting" class="right-part">
      <TodoSet></TodoSet>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import TodoSet from "@/components/TodoSet";
import TodoItem from "@/components/TodoItem";
import TodoAdd from "@/components/TodoAdd";
export default {
  name: "Layout",
  components: {TodoAdd, TodoItem, TodoSet, SideBar},
  mounted() {
    console.log(window.ipcRender)
    window.ipcRender.send('todo-window')
  },
  data: function () {
    return {
      setting: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  .left-part {
    order: -1;
  }
  .middle-part {
    flex-grow: 1;
  }
  .right-part {

  }
}
</style>