<template>
    <div class="todo-list">
        <div class="list-left-part">
            <!--自定义列表title可以点击编辑-->
            <div class="todo-title">
                <!--将文字内容赋值给隐藏的span，然后将input的宽度设置为span的宽度-->
                <span ref="spanTitle"></span>
                <!--禁止回车-->
                <input ref="inputTitle" :disabled="!canEdit" name="title" type="text" :value="title"
                       @input="changeWidth"
                       @change="changeListTitle($event.currentTarget.value)"/>
            </div>
            <!--@click.stop取消事件冒泡-->
            <div class="todo-list-container">
                <div @click.stop>
                    <todo-item v-bind:init-todo="todo" v-for="todo in todos" v-bind:key="todo.id"
                               @click.native="changeCurTodo(todo)"></todo-item>
                </div>
            </div>
            <div class="todo-add" @click.stop>
                <todo-add></todo-add>
            </div>
        </div>
        <div class="list-right-part" v-if="showTodoDetail">
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
	created() {
		this.curTodo = this.todos[0];
	},
	mounted() {
		this.$refs.inputTitle.style.width = this.$refs.inputTitle.value.length * 25 + "px";
	},
	computed: {
		todos: function () {
			return this.$store.getters.todosFilteredByLists;
		},
		canEdit: function () {
			let flag = this.$store.state.builtinLists.findIndex(item => item.id === this.$store.state.currentList);
			return flag === -1;
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
		},
		changeListTitle(newTitle) {
			this.$store.commit("updateCusList", {
				listid: this.listid, newTitle: newTitle
			});
		},
		changeWidth() {
			let input = this.$refs.inputTitle;
			let span = this.$refs.spanTitle;
			span.innerHTML = input.value;
			input.style.width = span.style.width + "px";
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
                padding: 1rem 0;
                text-align: left;
                order: -1;
                span {
                    position: absolute;
                    visibility: hidden;
                }
                input {
                    border: none;
                    font-size: 25px;
                    outline: none;
                }
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
