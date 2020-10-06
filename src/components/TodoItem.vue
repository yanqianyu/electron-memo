<template>
  <div class="todo-item" @click="changeTodoSet">
    <div class="todo-done">
      <img v-if="!todo.isDone" src="../assets/icons/nodone.svg" v-on:click="changeDoneState">
      <img v-else src="../assets/icons/done.svg" v-on:click="changeDoneState">
    </div>

    <div class="todo-content">
      <div class="todo-title">{{todo.title}}</div>
      <div class="todo-info">
        <div class="todo-in-list">
          {{todo.customlist}}
        </div>
        <div class="todo-steps">
          <span>{{stepsProps}}</span>
        </div>
        <div class="todo-date">
          <img src="../assets/icons/calender.svg">
          <span v-if="outOfTime">{{todo.ddl}}</span>
          <span v-else>{{todo.ddl}}</span>
        </div>
        <div class="todo-file">
          <img src="../assets/icons/file.svg">
          <span>文件已附加</span>
        </div>
        <div class="todo-note">
          <img src="../assets/icons/note.svg">
          <span>备注</span>
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
  props: ['todo'],
  data: function () {
    return {
    }
  },
  computed: {
    outOtTime: function () {
      return false;
    },
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
    changeTodoSet() {
      // 改变当前显示的todo设置部分
      // 向父组件传值
      this.$emit("", this.todo);
    },
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
  margin: 5px;
  border: 2px solid bisque;
  display: flex;
  flex-direction: row;
  .todo-done {
    order: -1;
    // img -> todo-done center
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin: 5px;
      width: 30px;
      height: 30px;
    }
  }
  .todo-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .todo-title {
      order: -1;
      // text -> left
      text-align: left;
      margin: 0 5px;
      font-size: 1.5rem;
    }
    .todo-info {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      .todo-in-list {
        order: -1;
      }
      .todo-steps {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 5px;
        span {
          vertical-align: middle;
        }
      }
      .todo-date {
        margin: 0 5px;
        img {
          vertical-align: middle;
          width: 15px;
          height: 15px;
        }
        span {
          vertical-align: middle;
        }
      }
      .todo-file {
        margin: 0 5px;
        img {
          vertical-align: middle;
          width: 15px;
          height: 15px;
        }
        span {
          vertical-align: middle;
        }
      }
      .todo-note {
        margin: 0 5px;
        img {
          vertical-align: middle;
          width: 15px;
          height: 15px;
        }
        span {
          vertical-align: middle;
        }
      }
    }
  }
  .todo-important {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin: 5px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
