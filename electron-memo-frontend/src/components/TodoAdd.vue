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
			// 首先判断当前列表是不是builtin
			// 所有不在customlist的todo都默认是task，同样的不在task中的todo一定是customlist中的
			let flag = this.$store.state.builtinLists.findIndex(item => item.id === this.$store.state.currentList);
			let taskid = this.$store.state.builtinLists[this.$store.state.builtinLists.findIndex(item => item.name === "任务")].id;
			let newTodo = {
				title: this.todo,
				isDone: false,
				builtinList: flag === -1 ? [] : (this.$store.state.currentList === taskid ? [taskid] : [this.$store.state.currentList, taskid]),
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
			this.$store.dispatch('addTodo', newTodo).then(resp => {
			    console.log("add todo")
            }).catch(err => {
                console.log(err);
            });

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
