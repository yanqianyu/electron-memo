<template>
    <div class="todo-add">
        <img src="../assets/icons/add.svg">
        <input type="text" placeholder="add you task" v-model="todo" v-on:keyup.enter="addTodo">
    </div>
</template>

<script>
export default {
	name: "TodoAdd",
	data: function () {
		return {
			todo: ""
		};
	},
	methods: {
		addTodo() {
			// 向对应的列表增加item
			// todo: commit -> vuex
			// 首先判断当前列表是不是builtin
			let flag = this.$store.state.builtinLists.findIndex(item => item.id === this.$store.state.currentList);
			let newTodo = {
				id: 5,
				title: this.todo,
				isDone: false,
				isImportant: false,
				builtinList: flag === -1 ? [] : [this.$store.state.currentList],
				customList: flag === -1 ? [this.$store.state.currentList] : [],
				steps: [],
				times: {
					reminder: null,
					ddl: null,
					repeat: null
				},
				files: [],
				createTime: new Date(),
				notes: null
			};
			this.$store.commit("addTodo", newTodo);

			this.todo = "";
		}
	}
};
</script>

<style lang="scss" scoped>
    .todo-add {
        display: flex;
        flex-direction: row;
        padding: 5px;
        margin: 15px;
        border: 1px solid palegreen;
        border-radius: 10px;

        img {
            margin: 5px;
            order: -1;
            vertical-align: middle;
            width: 25px;
            size: 25px;
        }

        input {
            flex-grow: 1;
            vertical-align: middle;
            border: 0;
            border-radius: 10px;
            outline: none;
            padding-left: 5px;
        }

        input::placeholder {
            font-size: 18px;
        }
    }
</style>
