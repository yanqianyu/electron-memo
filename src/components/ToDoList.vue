<template>
    <div class="todo-list">
        <div class="list-left-part">
            <div class="todo-title">
                {{title}}
            </div>
            <!--@click.stop取消事件冒泡-->
            <div class="todo-list-container" @click.stop>
                <todo-item v-bind:todo="todo" v-for="todo in todos" v-bind:key="todo.id" v-on:click="changeCurTodo"></todo-item>
            </div>
            <div class="todo-add">
                <todo-add list-type="listType"></todo-add>
            </div>
        </div>
        <div class="list-right-part" v-if="showTodoDetail" @click.stop>
            <todo-set v-bind:todo-item="curTodo"></todo-set>
        </div>
    </div>
</template>

<script>
    import TodoItem from "./TodoItem";
    import TodoAdd from "./TodoAdd";
    import TodoSet from "@/components/TodoSet";

    export default {
        name: "ToDoList",
        components: {TodoSet, TodoItem, TodoAdd},
        mounted() {
            // 获取路由中携带的参数 是url的最后一部分
            this.listType = this.$route.params.listname;
            // 更改store中存储的currentList
            this.$store.commit("updateList", this.listType);
            // 在store中查找对应的title
            this.title = this.$store.getters.titleByList;

            // 给body增加点击事件
            document.addEventListener('click', () => {
                this.showTodoDetail = false;
            })
        },
        data: function () {
            return {
                title: "我的一天",
                listType: "myday",
                todos: this.$store.getters.todosFilteredByLists,
                showTodoDetail: false, // 显示某个todo的详情， 点击非todo部分改为false
                curTodo: null // 当前点击的todo
            }
        },
        methods: {
            changeCurTodo(todo) {
              // 改变当前显示的todo set部分的信息
              this.showTodoDetail = true;
              this.curTodo = todo
            }
        }
    }
</script>

<style lang="scss" scoped>
    .todo-list {
        display: flex;
        flex-direction: row;

        .list-left-part {
            order: -1;
            flex-grow: 1;
            display: flex;
            flex-direction: column;

            .todo-title {
                padding: 10px 0;
                font-size: 2rem;
                text-align: left;
                order: -1;
            }

            .todo-list-container {
                flex: 1;
            }

            .todo-add {
            }
        }

        .list-right-part {
            width: 300px;
        }
    }
</style>
