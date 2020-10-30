<template>
    <div class="todo-list">
        <div class="list-left-part">
            <div class="todo-title">
                {{ title }}
            </div>
            <!--@click.stop取消事件冒泡-->
            <div class="todo-list-container">
                <div @click.stop>
                    <todo-item v-bind:init-todo="todo" v-for="todo in todos" v-bind:key="todo.id"
                               @click.native="changeCurTodo(todo)"></todo-item>
                </div>
            </div>
            <div class="todo-add" @click.stop>
                <todo-add list-type="listType"></todo-add>
            </div>
        </div>
        <!-- todo: transition-->
        <div class="list-right-part" v-if="showTodoDetail" @click.stop>
            <todo-set v-bind:init-todo="curTodo" v-on:no-show-todo-detail="noShowTodoDetail"></todo-set>
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
	beforeCreate() {
		// 获取路由中携带的参数 是url查询参数
		this.listid = this.$route.query.listid; // 这里的listid是字符串
		// 更改store中存储的currentList
		this.$store.commit("updateListFilter", this.listid);
		// 在store中查找对应的title
	},
	mounted() {
		// 给body增加点击事件
		document.addEventListener("click", () => {
			this.showTodoDetail = false;
		});
	},
	computed: {
		todos: function () {
			return this.$store.getters.todosFilteredByLists;
		}
	},
	data: function () {
		return {
			title: this.$store.getters.titleByList,
			listid: this.$route.query.listid,
			showTodoDetail: false, // 显示某个todo的详情， 点击非todo部分改为false
			curTodo: null // 当前点击的todo
		};
	},
	methods: {
		noShowTodoDetail() {
			this.showTodoDetail = false;
		},
		changeCurTodo(todo) {
			// 改变当前显示的todo set部分的信息
			this.curTodo = todo;
			this.showTodoDetail = true;
		}
	}
};
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
