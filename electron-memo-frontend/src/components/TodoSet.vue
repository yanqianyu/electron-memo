<template>
    <div class="todo-set-container">
        <div class="todo-set" v-click-outside="noTodoSetShow">
            <div class="todo-title">
                <img v-if="!todo.isDone" src="../assets/icons/nodone.svg" v-on:click="changeDoneTodo">
                <img v-else src="../assets/icons/done.svg" v-on:click="changeDoneTodo">
                <!--editable-->
                <input ref="inputTitle" name="title" type="text" :value="todo.title"
                       @change="changeTodoTitle($event.currentTarget.value)"/>
                <img src="../assets/icons/notImportant.svg" v-if="!isImportant" v-on:click="changeImportant">
                <img src="../assets/icons/important.svg" v-else v-on:click="changeImportant">
            </div>

            <div class="todo-setting">
                <div class="add-step">
                    <div class="todo-steps" v-for="step in todo.steps" :key="step.id">
                        <img src="../assets/icons/nodone.svg" v-if="!step.isDone" v-on:click="changeDoneStep(step.id)">
                        <img src="../assets/icons/done.svg" v-else v-on:click="changeDoneStep(step.id)">
                        <!--editable-->
                        <span>{{step.content}}</span>
                        <img src="../assets/icons/cross.svg" v-on:click="deleteStep(step.id)">
                    </div>
                    <div class="add-steps-input" v-on:click="addStep">
                        <img src="../assets/icons/add.svg" class="add-button">
                        <input type="text" placeholder="添加步骤" v-model="newStep" v-on:keyup.enter="addStep">
                    </div>
                </div>

                <hr width="100%" size="3" align=center noshade="noshade"/>

                <div class="add-to-my-day" v-on:click="changeAddMyDay">
                    <div v-if="!isOnMyDay">
                        <img src="../assets/icons/myday.svg">
                        <span>添加到"我的一天"</span>
                    </div>
                    <div v-else>
                        <img src="../assets/icons/myday.svg">
                        <span>已添加到"我的一天"</span>
                        <img src="../assets/icons/cross.svg">
                    </div>
                </div>

                <hr width="100%" size="3" align=center noshade="noshade"/>

                <div class="time-set">
                    <time-choose type="reminder" :init-time="todo.times.reminder" @deleteTimeChoose="deleteTimeChoose" @saveTimeChoose="saveTimeChoose">
                        <img src="../assets/icons/reminder.svg">
                    </time-choose>
                    <time-choose type="ddl" :init-time="todo.times.ddl" @deleteTimeChoose="deleteTimeChoose" @saveTimeChoose="saveTimeChoose">
                        <img src="../assets/icons/calender.svg">
                    </time-choose>
                    <time-choose type="repeat">
                        <img src="../assets/icons/repeat.svg">
                    </time-choose>
                </div>

                <hr width="100%" size="3" align=center noshade="noshade"/>

                <div class="add-file">
                    <div class="file-lists">
                        <div class="file" v-for="file in todo.files" :key="file.id">
                            <img :src="file.content.iconimg">
                            <div class="file-center">
                                <span class="file-name">{{file.content.filename}}</span>
                                <span class="file-size">{{formatFileSize(file.content.filesize)}}</span>
                            </div>
                            <img src="../assets/icons/cross.svg" class="delete-button" v-on:click="deleteFile">
                        </div>
                    </div>
                    <div class="add-file-button" v-on:click="showFileDialog">
                        <img src="../assets/icons/file.svg">
                        <span>添加文件</span>
                    </div>
                </div>

                <hr width="100%" size="3" align=center noshade="noshade"/>

                <div class="add-notes">
                    <textarea v-model="todo.notes" placeholder="添加备注"></textarea>
                </div>

                <hr width="100%" size="3" align=center noshade="noshade"/>
            </div>
        </div>


        <div class="buttom-bar">
            <img src="../assets/icons/right.svg" class="claspe-button" v-on:click="changeColpase">
            <div class="create-time">{{createInfo}}</div>
            <img src="../assets/icons/delete.svg" class="delete-button" v-on:click="deleteTodo">
        </div>
    </div>
</template>

<script>
import TimeChoose from "./TimeChoose";
const clickOutside = {
	// eslint-disable-next-line no-unused-vars
	bind(el, binding, vnode) {
		function documentHandler(e) {
			if(el.contains(e.target)) {
				return false;
			}
			if (binding.expression) {
				binding.value(e);
			}
		}
		el.__vueClickOutside__ = documentHandler;
		document.addEventListener("click", documentHandler);
	},
	update() {},
	// eslint-disable-next-line no-unused-vars
	unbind(el, binding) {
		document.removeEventListener("click", el.__vueClickOutside__);
		delete el.__vueClickOutside__;
	}
};
export default {
	name: "TodoSet",
	components: {TimeChoose},
	directives: {clickOutside},
	props: {
		initTodo: Object
	},
	data: function () {
		return {
			todo: this.initTodo,
			newStep: "",
			reminderShow: false,
			ddlShow: false,
			repeatShow: false
		};
	},
	computed: {
		isOnMyDay() {
			let idx = this.$store.state.builtinLists.findIndex(item => item.name === "我的一天");
			let id = this.$store.state.builtinLists[idx].id;
			return this.todo.builtinList.includes(id);
		},
		isImportant() {
			let idx = this.$store.state.builtinLists.findIndex(item => item.name === "重要");
			let id = this.$store.state.builtinLists[idx].id;
			return this.todo.builtinList.includes(id);
		},
		formatFileSize() {
			return function (fileSize) {
				if (fileSize < 1024) {
					return fileSize + "B";
				} else if (fileSize < (1024*1024)) {
					let temp = fileSize / 1024;
					temp = temp.toFixed(2);
					return temp + "KB";
				} else if (fileSize < (1024*1024*1024)) {
					let temp = fileSize / (1024*1024);
					temp = temp.toFixed(2);
					return temp + "MB";
				} else {
					let temp = fileSize / (1024*1024*1024);
					temp = temp.toFixed(2);
					return temp + "GB";
				}
			};
		},
		createInfo: function () {
			if(this.todo.createTime) {
				let date = new Date(this.todo.createTime);
				return "创建于" + date.getFullYear().toString().padStart(4, "0") + "年"
					+ (date.getMonth() + 1).toString().padStart(2, "0") + "月"
					+ date.getDate().toString().padStart(2, "0") + "日";
			}
			return "";
		}
	},
	methods: {
		noTodoSetShow() {
			this.$parent.$data.showTodoDetail = false;
		},
		changeDoneTodo() {
			this.todo.isDone = !this.todo.isDone;
			this.$store.dispatch("updateTodo", this.todo).then(resp => {

            }).catch(err => {
                console.log(err);
            });
		},
		changeTodoTitle(newTitle) {
		    const oldTitle = this.todo.title;
			this.todo.title = newTitle;
            this.$store.dispatch("updateTodo", this.todo).then(resp => {

            }).catch(err => {
                console.log(err);
                this.todo.title = oldTitle;
            });
		},
		changeImportant() {
			let idx = this.$store.state.builtinLists.findIndex(item => item.name === "重要");
			let id = this.$store.state.builtinLists[idx].id;
			if (!this.isImportant) {
				// 加入到"重要列表中"
				this.todo.builtinList.push(id);
			}
			else {
				let removeid = this.todo.builtinList.findIndex(item => item === id);
				this.todo.builtinList.splice(removeid, 1);
				// 如果现在是"重要" 则不显示detail
				if (this.$store.state.currentList === id) {
					this.$parent.noShowTodoDetail();
				}
			}

			this.$store.dispatch("updateTodo", this.todo).then(resp => {

            }).catch(err => {
                console.log(err);
            });
		},
		changeDoneStep(step_id) {
			this.todo.steps.forEach(function (step) {
				if (step.id === step_id) {
					step.isDone = !step.isDone;
				}
			});
			this.$store.dispatch("updateTodo", this.todo).then(resp => {

            }).catch(err => {
                console.log(err);

            })
		},
		deleteStep(step_id) {
			let idx = 0;
			this.todo.steps.forEach(function (step, index) {
				if (step.id === step_id) {
					idx = index;
				}
			});
			this.todo.steps.splice(idx, 1);
			this.$store.dispatch("updateTodo", this.todo).then(resp => {

            }).catch(err => {
                console.log(err);
            });
		},
		addStep() {
			if (this.newStep.length > 0) {
				// id后台给
				this.todo.steps.push({
					content: this.newStep,
					isDone: false
				});
				this.$store.dispatch("updateTodo", this.todo).then(resp => {

                }).catch(err => {
                    console.log(err);
                });

				this.newStep = "";
			}
		},
		changeAddMyDay() {
			let idx = this.$store.state.builtinLists.findIndex(item => item.name === "我的一天");
			let id = this.$store.state.builtinLists[idx].id;
			if (this.isOnMyDay !== true) {
				// push的都是id 显示的是name
				this.todo.builtinList.push(id);
			} else {
				// 从"我的一天"中移除
				let removeid = this.todo.builtinList.findIndex(item => item === id);
				this.todo.builtinList.splice(removeid, 1);
				// 如果现在是"我的一天" 则不显示detail
				if (this.$store.state.currentList === id) {
					this.$parent.noShowTodoDetail();
				}
			}
            this.$store.dispatch("updateTodo", this.todo).then(resp => {

            }).catch(err => {
                console.log(err);
            });
		},
		deleteFile(file_id) {
			let idx = 0;
			this.todo.files.forEach(function (file, index) {
				if (file.id === file_id) {
					idx = index;
				}
			});
			this.todo.files.splice(idx, 1);
			this.$store.dispatch("deleteFile", fileId).then(resp => {

            }).catch(err => {

            });
		},
		showFileDialog() {
			// 移除之前的事件监听
			window.ipcRender.removeAllListeners("selectedItem");
			// 打开文件对话框
			window.ipcRender.send("open-directory-dialog", "openFile");
			// 主进程返回的消息selectedItem的回调函数为getPath
			window.ipcRender.on("selectedItem", this.addFile);
		},
		addFile(e, fileObj) {
			console.log("add file");
			this.todo.files.push({
				content: fileObj
			});
			this.$store.dispatch("uploadFile", fileObj).then(resp => {

            }).catch(err => {
                console.log(err);
            })
		},
		changeColpase() {
			// 修改父组件中的showTodoDetail
			this.$emit("no-show-todo-detail");
		},
		deleteTimeChoose(type) {
			// 对应的事件置为undefined
			this.todo.times[type] = undefined;
			this.$store.dispatch("updateTodo", this.todo).then(resp => {

            }).catch(err => {
                console.log(err);
            })
		},
		saveTimeChoose(date, type) {
			this.todo.times[type] = date;
            this.$store.dispatch("updateTodo", this.todo).then(resp => {

            }).catch(err => {
                console.log(err);
            })
		},
		deleteTodo() {
			// todo: show alert
			// 删除后自动显示下一个
			// 没有下一个则收回set部分
            this.$store.dispatch("deleteTodo", this.todo.id).then(resp => {

            }).catch(err => {
                console.log(err);
            });
			this.$parent.noShowTodoDetail();
		}
	}
};
</script>

<style lang="scss" scoped>
    .todo-set-container {
        height: 100%;
        /*padding: 10px;*/
        display: flex;
        flex-direction: column;
        .todo-set {
            overflow-x: hidden;
            overflow-y: scroll;
            order: -1;
            height: 100%;
            padding: 10px;
            /*margin: 10px;*/
            display: flex;
            flex-direction: column;

            .todo-title {
                order: -1;
                height: 40px;
                display: flex;
                flex-direction: row;
                justify-items: center;
                align-items: center;

                img:first-child {
                    order: -1;
                }

                input {
                    padding-left: 16px;
                    font-size: 20px;
                    outline: none;
                    border: none;
                }

                img {
                    vertical-align: middle;
                    width: 22px;
                    height: 22px;
                }
            }

            .todo-setting {
                flex-grow: 1;

                .add-step {
                    .todo-steps {
                        padding-left: 2px;
                        /*padding-right: 8px;*/
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-items: center;

                        img {
                            vertical-align: middle;
                        }

                        img:first-child {
                            order: -1;
                            width: 20px;
                            height: 20px;
                        }

                        img:last-child {
                            width: 20px;
                            height: 20px;
                        }

                        span {
                            margin: 0 18px;
                            flex-grow: 1;
                            vertical-align: middle;
                            text-align: left;
                        }
                    }

                    .add-steps-input {
                        display: flex;
                        flex-direction: row;
                        padding: 3px;

                        img {
                            order: -1;
                            width: 20px;
                            height: 20px;
                        }

                        input {
                            margin-left: 15px;
                            flex-grow: 1;
                            outline: none;
                            border: none;
                        }

                        input::placeholder {
                            color: #4e89ae;
                        }
                    }
                }

                .add-to-my-day {
                    div {
                        display: flex;
                        flex-direction: row;
                        padding: 5px 5px;
                        justify-items: center;
                        align-items: center;
                        cursor: pointer;
                        width: 100%;
                        img {
                            vertical-align: middle;
                            width: 20px;
                            height: 20px;
                        }
                        img:first-child {
                            order: -1;
                        }
                        span {
                            flex-grow: 1;
                            vertical-align: middle;
                            margin-left: 12px;
                            font-size: 15px;
                            text-align: left;
                        }
                    }
                }

                .time-set {
                }

                .add-file {
                    .file-lists {
                        padding: 0 5px;
                        .file {
                            display: flex;
                            flex-direction: row;
                            justify-items: center;
                            align-items: center;
                            img:first-child {
                                width: 20px;
                                height: 20px;
                            }

                            img:last-child {
                                width: 12px;
                                height: 12px;
                            }

                            .file-center {
                                flex-grow: 1;
                                display: flex;
                                flex-direction: column;
                                justify-items: center;

                                span {
                                    flex-grow: 1;
                                    vertical-align: middle;
                                    text-align: left;
                                    margin-left: 12px;
                                }
                            }
                        }
                    }

                    .add-file-button {
                        cursor: pointer;
                        display: flex;
                        flex-direction: row;
                        justify-items: center;
                        align-items: center;
                        padding: 0 5px;

                        img {
                            order: -1;
                            width: 20px;
                            height: 20px;
                            vertical-align: middle;
                        }

                        span {
                            flex-grow: 1;
                            vertical-align: middle;
                            text-align: left;
                            margin-left: 12px;
                        }
                    }
                }

                .add-notes {
                    padding: 5px 5px;
                    textarea {
                        font-size: 15px;
                        outline: none;
                        /*border: none;*/
                        resize: none;
                        width: 100%;
                        min-height: 120px;
                    }
                }
            }
        }
        .buttom-bar {
            height: 40px;
            display: flex;
            flex-direction: row;
            padding: 0 10px;
            margin-top: 15px;
            margin-bottom: 15px;

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
