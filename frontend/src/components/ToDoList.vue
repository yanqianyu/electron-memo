<template>
    <div class="todo-list">
        <div class="list-left-part">
            <!--自定义列表title可以点击编辑-->
            <div class="todo-title" v-if="!searchMode">
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
                    <todo-item v-bind:init-todo="todo" v-for="todo in todos" v-bind:key="todo._id"
                               @click.native="changeCurTodo(todo)"></todo-item>
                </div>
            </div>
            <div class="todo-add" @click.stop v-if="!searchMode">
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
	created() {
		this.curTodo = this.todos[0];
	},
	mounted() {
		this.$refs.inputTitle.style.width = this.$refs.inputTitle.value.length * 25 + "px";
	},
    props: {
		searchEntry: {
			type: String,
            default: ""
        }
    },
	computed: {
		searchMode: function() {
			return !!this.searchEntry;
        },
		todos: function () {
			if (!!this.searchEntry) {
				return this.$store.getters.todosFiltererBySearchEntry(this.searchEntry);
            }
			else {
				return this.$store.getters.todosFilteredByLists;
            }
		},
		canEdit: function () {
			let flag = this.$store.state.builtinLists.findIndex(item => item._id === this.$store.state.currentList);
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
			this.$store.dispatch("updateCusList", {
				listid: this.listid, newTitle: newTitle
			}).then(resp => {
				console.log(resp);
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
