<template>
    <div class="todo-item">
        <div class="todo-done">
            <img v-if="!todo.isDone" src="../assets/icons/nodone.svg" v-on:click.stop="changeDoneState">
            <img v-else src="../assets/icons/done.svg" v-on:click.stop="changeDoneState">
        </div>

        <div class="todo-content">
            <div class="todo-title">{{todo.title}}</div>
            <div class="todo-info">
                <div class="todo-in-list">
                    {{listInfo}}
                </div>
                <div class="todo-steps" v-if="todo.steps.length > 0">
                    <span>{{stepsProps}}</span>
                </div>
                <div class="todo-remind" v-if="todo.times.reminder">
                    <img src="../assets/icons/reminder.svg">
                    <span>{{remindInfo}}</span>
                </div>
                <div class="todo-date" v-if="todo.times.ddl">
                    <img src="../assets/icons/calender.svg">
                    <span v-if="outOfTime">{{ddlInfo}}</span>
                    <span v-else>{{ddlInfo}}</span>
                </div>
                <div class="todo-file" v-if="haveFiles">
                    <img src="../assets/icons/file.svg">
                    <span>文件已附加</span>
                </div>
                <div class="todo-note" v-if="todo.notes">
                    <img src="../assets/icons/note.svg">
                    <span>备注</span>
                </div>
            </div>
        </div>

        <div class="todo-important">
            <img v-if="!isImportant" src="../assets/icons/notImportant.svg" v-on:click.stop="changeImportantState">
            <img v-else src="../assets/icons/important.svg" v-on:click.stop="changeImportantState">
        </div>

    </div>
</template>

<script>
export default {
	name: "TodoItem",
	props: {
		initTodo: Object
	},
	data: function () {
		return {
			todo: this.initTodo // 在子组件中修改值会commit到vuex中？
		};
	},
	computed: {
		isImportant() {
			let idx = this.$store.state.builtinLists.findIndex(item => item.name === "重要");
			let id = this.$store.state.builtinLists[idx].id;
			return this.todo.builtinList.includes(id);
		},
		listInfo: function () {
			// 除去现在所显示的list本身
			let tmp = [];
			for(let i = 0; i < this.$store.state.builtinLists.length; i++) {
				if(this.$store.state.builtinLists[i].id !== this.$store.state.currentList) {
					if(this.todo.builtinList.includes(this.$store.state.builtinLists[i].id)) {
						tmp.push(this.$store.state.builtinLists[i].name);
					}
				}
			}

			for(let i = 0; i < this.$store.state.customLists.length; i++) {
				if(this.$store.state.customLists[i].id !== this.$store.state.currentList) {
					if(this.todo.customList.includes(this.$store.state.customLists[i].id)) {
						tmp.push(this.$store.state.customLists[i].name);
					}
				}
			}
			if (tmp.length === 0) {
				return "";
			}
			return tmp.join(" • ");
		},
		stepsProps: function () {
			let count = this.todo.steps.reduce(function (prev, cur) {
				if (cur.isDone === true) {
					prev += 1;
				}
				return prev;
			}, 0);
			return count + "/" + this.todo.steps.length;
		},
		remindInfo: function() {
			let date = this.todo.times.reminder;
			return date.getFullYear().toString().padStart(4, "0") + "年"
                + (date.getMonth() + 1).toString().padStart(2, "0") + "月"
                + date.getDate().toString().padStart(2, "0") + "日";
		},
		ddlInfo: function() {
			let date = this.todo.times.ddl;
			return date.getFullYear().toString().padStart(4, "0") + "年"
				+ (date.getMonth() + 1).toString().padStart(2, "0") + "月"
				+ date.getDate().toString().padStart(2, "0") + "日";
		},
		outOfTime: function () {
			let date = new Date();
			// true -> out of time
			return this.todo.times.ddl < date;
		},
		haveFiles: function () {
			return this.todo.files && this.todo.files.length > 0;
		}
	},
	methods: {
		changeDoneState() {
			// 点击图片时禁用setting部分显示的事件
			this.todo.isDone = !this.todo.isDone;
			this.$store.commit("updateTodo", this.todo);
		},
		changeImportantState() {
			let idx = this.$store.state.builtinLists.findIndex(item => item.name === "重要");
			let id = this.$store.state.builtinLists[idx].id;
			if (!this.isImportant) {
				// 加入到"重要列表中"
				this.todo.builtinList.push(id);
			}
			else {
				let removeid = this.todo.builtinList.findIndex(item => item === id);
				this.todo.builtinList.splice(removeid, 1);
			}
			this.$store.commit("updateTodo", this.todo);
		}
	}
};
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
                .todo-remind {
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
