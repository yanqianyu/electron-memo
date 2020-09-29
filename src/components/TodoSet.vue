<template>
  <div class="todo-set">
    <div class="todo-title">
      <img src="../assets/icons/nodone.svg" v-if="!todo.isDone" class="done-button" onclick="changeDoneTodo">
      <img src="../assets/icons/done.svg" v-else onclick="changeDoneTodo">
      <!--editable-->
      {{todo.title}}
      <img src="../assets/icons/notImportant.svg" v-if="!todo.isImportant" class="star-button" onclick="changeImportant">
      <img src="../assets/icons/important.svg" v-else onclick="changeImportant">
    </div>

    <div class="todo-setting">
      <div class="add-step">
        <div class="todo-steps" v-for="step in todo.steps" :key="step.id">
          <img src="../assets/icons/nodone.svg" v-if="!step.isDone" onclick="changeDoneStep(step.id)">
          <img src="../assets/icons/done.svg" v-else onclick="changeDoneStep(step.id)">
          <!--editable-->
          {{step.content}}
          <img src="../assets/icons/cross.svg" onclick="deleteStep">
        </div>
        <div class="add-steps-input" onclick="addStep">
          <img src="../assets/icons/add.svg" class="add-button">
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
          <img src="../assets/icons/cross.svg">
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
          <div class="file" v-for="file in todo.files" :key="file.id">
            <img src="../assets/icons/cross.svg" class="delete-button" onclick="deleteFile">
          </div>
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
      <img src="../assets/icons/right.svg" class="claspe-button" onclick="changeColpase">
      <div class="create-time">{{todo.createTime}}</div>
      <img src="../assets/icons/delete.svg" class="delete-button" onclick="deleteTodo">
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
        title: "test",
        checklists: [],
        isDone: "",
        isImportant: false,
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
.todo-set {
  display: flex;
  flex-direction: column;
  .todo-title {
    order: -1;
    height: 50px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .todo-setting {
    flex-grow: 1;
    .add-step {
      .todo-steps {
        img {
          width: 25px;
          height: 25px;
        }
      }
      .add-steps-input {
        img {
          width: 25px;
          height: 25px;
        }
      }
    }

    .add-to-my-day {
      img {
        width: 20px;
        height: 20px;
      }
    }

    .time-set {
      .time-reminder {
        img {
          width: 20px;
          height: 20px;
        }
      }
      .time-add-ddl {
        img {
          width: 20px;
          height: 20px;
        }
      }
      .time-repeat {
        img {
          width: 20px;
          height: 20px;
        }
      }
    }

    .add-file {
      .file-lists {
        .file {
          img {
            width: 25px;
            height: 25px;
          }
        }
      }
      .add-file-button {
        img {
          width: 25px;
          height: 25px;
        }
      }
    }

    .add-notes {

    }
  }
  .buttom-bar {
    height: 40px;
    display: flex;
    flex-direction: row;
    img {
      width: 25px;
      height: 25px;
    }
    .claspe-button {
      order: -1;
    }
    .create-time {
      flex-grow: 1;
    }
    .delete-button {

    }
  }
}
</style>
