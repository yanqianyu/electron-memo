<template>
  <div class="todo-set">
    <div class="todo-title">
      <button class="confirm-button" onclick="changeConfirmTodo"></button>
      <!--editable-->
      {{todo.title}}
      <button class="star-button" onclick="changeImportant"></button>
    </div>

    <div class="todo-setting">
      <div class="add-step">
        <div class="todo-steps" v-for="step in todo.steps" :key="step.id">
          <button class="confirm-button" onclick="changeConfirmStep"></button>
          <!--editable-->
          {{step.content}}
          <button class="delete-button" onclick="deleteStep"></button>
        </div>
        <div class="add-steps-input" onclick="addStep">
          <button class="add-button"></button>
          <input type="text" placeholder="下一步" v-model="newStep">
        </div>
      </div>

      <div class="add-to-my-day" onclick="changeAddMyDay">
        <div v-if="isOnMyDay">
          <img src="../assets/icons/myday.svg">
          添加到"我的一天"
        </div>
        <div v-else>
          <img src="../assets/icons/myday.svg">
          已添加到"我的一天"
          <img src="../assets/icons/delete.svg">
        </div>
      </div>

      <div class="time-set">
        <div class="time-reminder" onclick="showReminder">
          <img src="../assets/icons/reminder.svg">
          提醒我
        </div>
        <div class="time-add-ddl" onclick="showDDL">
          <img src="../assets/icons/calender.svg">
          添加截止日期
        </div>
        <div class="time-repeat" onclick="showRepeat">
          <img src="../assets/icons/repeat.svg">
          重复
        </div>
      </div>

      <div class="add-file">
        <div class="file-lists">
          <div class="file" v-for="file in todo.files" :key="file"></div>
          <button class="delete-button" onclick="deleteFile"></button>
        </div>
        <div class="add-file-button" onclick="addFile">
          <img src="../assets/icons/file.svg">
          添加文件
        </div>
      </div>

      <div class="add-notes">
        <textarea cols="25" rows="5" v-model="notes">添加备注</textarea>
      </div>
    </div>

    <div class="buttom-bar">
      <button class="claspe-button" onclick="chanegColpase"></button>
      <div class="create-time">{{todo.createTime}}</div>
      <button class="delete-button" onclick="deleteTodo"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoSet",
  data: function () {
    return {
      newStep: "",
      notes: "",
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
    changeConfirmTodo() {

    },
    changeImportant() {

    },
    changeConfirmStep() {

    },
    deleteStep() {

    },
    addStep() {

    },
    changeAddMyDay() {

    },
    showReminder() {

    },
    showDDL() {

    },
    showRepeat() {

    },
    deleteFile() {

    },
    addFile() {

    },
    chanegColpase() {

    },
    deleteTodo() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
