<template>
  <div class="todo-set">
    <div class="todo-title">
      <button class="done-button" onclick="changeDoneTodo"></button>
      <!--editable-->
      {{todo.title}}
      <button class="star-button" onclick="changeImportant"></button>
    </div>

    <div class="todo-setting">
      <div class="add-step">
        <div class="todo-steps" v-for="step in todo.steps" :key="step.id">
          <button class="done-button" onclick="changeDoneStep(step.id)"></button>
          <!--editable-->
          {{step.content}}
          <button class="delete-button" onclick="deleteStep"></button>
        </div>
        <div class="add-steps-input" onclick="addStep">
          <button class="add-button"></button>
          <!-- todo-->
          <input type="text" placeholder="下一步" v-model="newStep" v-on:keyup.enter="addStep">
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
        <div class="time-reminder" ref="reminderBox" onclick="showReminder">
          <img src="../assets/icons/reminder.svg">
          <span>提醒我</span>
        </div>
        <div v-show="reminderShow">
          <ul>
            <li></li>
            <li></li>
            <!--todo-->
            <input type="date">
          </ul>
        </div>
        <div class="time-add-ddl" ref="ddlBox" onclick="showDDL">
          <img src="../assets/icons/calender.svg">
          <span>添加截止日期</span>
        </div>
        <div v-show="ddlShow">
          <ul>
            <li></li>
            <li></li>
            <!--todo-->
            <input type="date">
          </ul>
        </div>
        <div class="time-repeat" ref="repeatBox" onclick="showRepeat">
          <img src="../assets/icons/repeat.svg">
          <span>重复</span>
        </div>
        <div v-show="repeatShow">
          <ul>
            <li></li>
            <li></li>
            <!--todo-->
            <div class="repeat-choice">

            </div>
          </ul>
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
      <button class="claspe-button" onclick="changeColpase"></button>
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
        id: "",
        title: "",
        checklists: [],
        isDone: "",
        isImportant: "",
        steps: [
          {
            id: "",
            content: "",
            isDone: ""
          }
        ],
        times: {
          reminder: "",
          ddl: "",
          repeat: ""
        },
        files: [
          {
            id: "",
            content: ""
          }
        ],
        createTime: ""
      },
      isOnMyDay: false,
      reminderShow: false,
      ddlShow: false,
      repeatShow: false
    }
  },
  created() {

  },
  mounted() {
    // 通过target事件 判定 只要点击的不是包裹住按钮和内容区域的Div就让v-show为false
    let _this = this;
    document.addEventListener('click', function (e) {
      if(_this.$refs.reminderBox.contains(e.target)) {
        return ;
      }
      else {
        _this.reminderShow = false;
      }

      if(_this.$refs.ddlBox.contains(e.target)) {
        return ;
      }
      else {
        _this.ddlShow = false;
      }

      if(_this.$refs.repeatBox.contains(e.target)) {
        return ;
      }
      else {
        _this.repeatShow = false;
      }

    })
  },
  methods: {
    changeDoneTodo() {
      this.todo.isDone = !this.todo.isDone;
    },
    changeImportant() {
      this.todo.isImportant = !this.todo.isImportant;
    },
    changeDoneStep(step_id) {
      this.steps.forEach(function (step) {
        if (step.id === step_id) {
          step.isDone = !step.isDone
        }
      })
    },
    deleteStep(step_id) {
      this.steps.forEach(function (step, index) {
        if (step.id === step_id) {
          this.steps.splice(index)
        }
      })
    },
    addStep(value) {
      let max_id = 0;
      this.todo.steps.forEach(function (step) {
        if (step.id > max_id) {
          max_id = step.id;
        }
      })
      this.steps.push({
        id: max_id + 1,
        content: value,
        isDone: false
      })
    },
    changeAddMyDay() {
      this.isOnMyDay = !this.isOnMyDay
      if(this.isOnMyDay === true) {
        this.todo.checklists.push("Myday")
      }
      else {
        this.todo.checklists.forEach(function (list_name, index) {
          if (list_name === "MyDay") {
            this.todo.checklists.splice(index)
          }
        })
      }
    },
    showReminder() {
      this.reminderShow = !this.reminderShow;
    },
    showDDL() {
      this.ddlShow = !this.ddlShow;
    },
    showRepeat() {
      this.repeatShow = !this.repeatShow;
    },
    deleteFile(file_id) {
      this.files.forEach(function (file, index) {
        if (file.id === file_id) {
          this.files.splice(index);
        }
      })
    },
    addFile(file) {
      let max_id = 0
      this.files.forEach(function (file) {
        if (file.id > max_id) {
          max_id = file.id
        }
      })
      this.files.add({
        id: max_id + 1,
        content: file
      })
    },
    changeColpase() {

    },
    deleteTodo() {
      // show alert
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
