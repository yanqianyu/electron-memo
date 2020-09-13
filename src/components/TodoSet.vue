<template>
  <div class="todo-set">
    <div class="todo-title">
      <button></button>
      {{todo.title}}
      <button></button>
    </div>

    <div class="add-step">
      <div class="todo-steps" v-for="step in todo.steps" :key="step.id">
        <button></button>
        {{step.content}}
        <button></button>
      </div>
      <div class="add-steps-input">
        <button></button>
        <input type="text" placeholder="add steps">
      </div>
    </div>

    <div class="add-to-my-day">
      <div v-if="isOnMyDay">
        <img src="../assets/icons/">
      </div>
      <div v-else>
        <img src="../assets/icons">
        <img src="../assets/icons/delete.svg">
      </div>
    </div>

    <div class="time-set">
      <div class="time-reminder">
        <img src="../assets/icons/reminder.svg">

      </div>
      <div class="time-add-ddl">
        <img src="../assets/icons/calender.svg">

      </div>
      <div class="time-repeat">
        <img src="../assets/icons/repeat.svg">

      </div>
    </div>

    <div class="add-file">
      <div class="file-lists">
        <div class="file" v-for="file in todo.files" :key="file"></div>
        <button></button>
      </div>
      <div class="add-file-button">
        <img src="../assets/icons/file.svg">

      </div>
    </div>

    <div class="add-notes">

    </div>

    <div class="buttom-bar">
      <button></button>
      <div class="create-time">{{todo.createTime}}</div>
      <button></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoSet",
  data: function () {
    return {
      todo: {
        title: "",
        isDone: "",
        isImportant: "",
        steps: [
          {}
        ],
        times: {
          reminder: "",
          ddl: "",
          repeat: ""
        },
        files: [

        ],
        createTime: ""
      },
      isOnMyDay: false
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>