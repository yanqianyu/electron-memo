<template>
  <div class="todo-item">
    <div class="todo-done">
      <img v-if="!todo.isDone" src="../assets/icons/nodone.svg" v-on:click="changeDoneState">
      <img v-else src="../assets/icons/done.svg" v-on:click="changeDoneState">
    </div>
    
    <div class="todo-content">
      <div class="todo-title">{{todo.title}}</div>
      <div class="todo-info">
        <div class="todo-list">
          {{todo.customlist}}
        </div>
        <div class="todo-steps">
          {{stepsProps}}
        </div>
        <div class="todo-date">
          <span v-if="outOfTime">{{todo.ddl}}</span>
          <span v-else>{{todo.ddl}}</span>
        </div>
        <div class="todo-file">
          <img src="../assets/icons/file.svg">
          <span>ile has attached.</span>
        </div>
        <div class="todo-note">
          <img src="../assets/icons/note.svg">
          <span>bei zhu</span>
        </div>
      </div>
    </div>
    <div class="todo-important">
      <img v-if="!todo.isImportant" src="../assets/icons/notImportant.svg" v-on:click="changeImportantState">
      <img v-else src="../assets/icons/important.svg" v-on:click="changeImportantState">
    </div>

  </div>
</template>

<script>
export default {
  name: "TodoItem",
  data: function () {
    return {
      todo: {
        isDone: "",
        customlist: "",
        isImportant: "",
        steps: [{
          id: "",
          content: "",
          isDone: ""
        }],
        ddl: "",
        notes: "",
        files: ""
      }
    }
  },
  computed: {
    stepsProps: function () {
      let count = this.todo.steps.reduce(function (prev, cur) {
        if(cur.isDone === true) {
          prev += 1;
        }
        return prev;
      }, 0);
      return count + "/" + this.todo.steps.length;
    },
    outOfTime: function () {
      let date = new Date();
      // true -> out of time
      return this.todo.ddl < date;
    }
  },
  methods: {
    changeDoneState() {
      this.todo.isDone = !this.todo.isDone;
      // todo: commit to vuex
    },
    changeImportantState() {
      this.todo.isImportant = !this.todo.isImportant;
      // todo: commit to vuex
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  flex-direction: row;
  .todo-done {
    order: -1;
  }
  .todo-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .todo-important {

  }
}
</style>