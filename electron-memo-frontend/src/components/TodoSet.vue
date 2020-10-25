<template>
    <div class="todo-set">
        <div class="todo-title">
            <img v-if="!todo.isDone" src="../assets/icons/nodone.svg" v-on:click="changeDoneTodo">
            <img v-else src="../assets/icons/done.svg" v-on:click="changeDoneTodo">
            <!--editable-->
            <span>{{todo.title}}</span>
            <img src="../assets/icons/notImportant.svg" v-if="!todo.isImportant" v-on:click="changeImportant">
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

            <div class="add-to-my-day" v-on:click="changeAddMyDay">
                <div v-if="!isOnMyDay">
                    <img src="../assets/icons/myday.svg">
                    <span>添加到"我的一天"</span>
                </div>
                <div v-else>
                    <img src="../assets/icons/myday.svg">
                    <span>已添加到"我的一天"</span>
                    <img src="../assets/icons/cross.svg" v-on:click="removeFromMyDay">
                </div>
            </div>

            <div class="time-set">
                <time-choose type="reminder" @deleteTimeChoose="deleteTimeChoose" @saveTimeChoose="saveTimeChoose">
                    <img src="../assets/icons/reminder.svg">
                </time-choose>
                <time-choose type="ddl" @deleteTimeChoose="deleteTimeChoose" @saveTimeChoose="saveTimeChoose">
                    <img src="../assets/icons/calender.svg">
                </time-choose>
                <time-choose type="repeat">
                    <img src="../assets/icons/repeat.svg">
                </time-choose>
            </div>
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

            <div class="add-notes">
                <textarea cols="25" rows="5" v-model="todo.notes" placeholder="添加备注"></textarea>
            </div>
        </div>

        <div class="buttom-bar">
            <img src="../assets/icons/right.svg" class="claspe-button" v-on:click="changeColpase">
            <div class="create-time">{{todo.createTime}}</div>
            <img src="../assets/icons/delete.svg" class="delete-button" v-on:click="deleteTodo">
        </div>
    </div>
</template>

<script>
    import TimeChoose from "./TimeChoose";

    export default {
        name: "TodoSet",
        components: {TimeChoose},
        props: {
            initTodo: Object
        },
        data: function () {
            return {
                todo: this.initTodo,
                newStep: "",
                isOnMyDay: false,
                reminderShow: false,
                ddlShow: false,
                repeatShow: false
            }
        },
        created() {

        },
        mounted() {
            // 通过target事件 判定 只要点击的不是包裹住按钮和内容区域的Div就让v-show为false
        },
        computed: {
            formatFileSize() {
                return function (fileSize) {
                    if (fileSize < 1024) {
                        return fileSize + 'B';
                    } else if (fileSize < (1024*1024)) {
                        let temp = fileSize / 1024;
                        temp = temp.toFixed(2);
                        return temp + 'KB';
                    } else if (fileSize < (1024*1024*1024)) {
                        let temp = fileSize / (1024*1024);
                        temp = temp.toFixed(2);
                        return temp + 'MB';
                    } else {
                        let temp = fileSize / (1024*1024*1024);
                        temp = temp.toFixed(2);
                        return temp + 'GB';
                    }
                }
            }
        },
        methods: {
            changeDoneTodo() {
                this.todo.isDone = !this.todo.isDone;
                this.$store.commit("updateTodo", this.todo)
            },
            changeImportant() {
                this.todo.isImportant = !this.todo.isImportant;
                this.$store.commit("updateTodo", this.todo)
            },
            changeDoneStep(step_id) {
                this.todo.steps.forEach(function (step) {
                    if (step.id === step_id) {
                        step.isDone = !step.isDone
                    }
                })
                this.$store.commit("updateTodo", this.todo)
            },
            deleteStep(step_id) {
                let idx = 0;
                this.todo.steps.forEach(function (step, index) {
                    if (step.id === step_id) {
                        idx = index
                    }
                })
                this.todo.steps.splice(idx, 1)
                this.$store.commit("updateTodo", this.todo)
            },
            addStep() {
                if (this.newStep.length > 0) {
                    // todo: id改为hash计算
                    let max_id = 0;
                    this.todo.steps.forEach(function (step) {
                        if (step.id > max_id) {
                            max_id = step.id;
                        }
                    })
                    this.todo.steps.push({
                        id: max_id + 1,
                        content: this.newStep,
                        isDone: false
                    })
                    this.$store.commit("updateTodo", this.todo)
                    this.newStep = ""
                }
            },
            changeAddMyDay() {
                this.isOnMyDay = !this.isOnMyDay
                if (this.isOnMyDay === true) {
                    this.todo.checklists.push("Myday")
                } else {
                    // todo
                    this.todo.checklists.forEach(function (list_name, index) {
                        if (list_name === "MyDay") {
                            this.todo.checklists.splice(index)
                        }
                    })
                }
                this.$store.commit("updateTodo", this.todo)
            },
            removeFromMyDay() {
                // 从我的一天中删除
            },
            deleteFile(file_id) {
                let idx = 0;
                this.todo.files.forEach(function (file, index) {
                    if (file.id === file_id) {
                        idx = index
                    }
                })
                this.todo.files.splice(idx, 1);
                this.$store.commit("updateTodo", this.todo)
            },
            showFileDialog() {
                // 打开文件对话框
                window.ipcRender.send('open-directory-dialog', 'openFile');
                // 主进程返回的消息selectedItem的回调函数为getPath
                window.ipcRender.on('selectedItem', this.addFile);
            },
            addFile(e, fileObj) {
                let max_id = 0;
                this.todo.files.forEach(function (file) {
                    if (file.id > max_id) {
                        max_id = file.id
                    }
                });
                this.todo.files.push({
                    id: max_id + 1,
                    content: fileObj
                });
                this.$store.commit("updateTodo", this.todo)
            },
            changeColpase() {
                // 修改父组件中的showTodoDetail
                this.$emit("no-show-todo-detail")
            },
            deleteTimeChoose(type) {
                console.log("type = " + type);
                // 对应的事件置为undefined
                this.todo.times[type] = undefined;
                this.$store.commit("updateTodo", this.todo);
            },
            saveTimeChoose(date, type) {
                console.log("date = " + date);
                console.log("type = " + type);
                this.todo.times[type] = date;
                this.$store.commit("updateTodo", this.todo);
            },
            deleteTodo() {
                // show alert
            }
        }
    }
</script>

<style lang="scss" scoped>
    .todo-set {
        height: 100%;
        margin: 10px;
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

            span {
                padding: 15px;
                font-size: 20px;
                text-align: left;
                flex-grow: 1;
                vertical-align: middle;
            }

            img {
                vertical-align: middle;
                width: 25px;
                height: 25px;
            }
        }

        .todo-setting {
            flex-grow: 1;

            .add-step {
                .todo-steps {
                    padding-left: 3px;
                    padding-right: 5px;
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
                        width: 15px;
                        height: 15px;
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
                display: flex;
                flex-direction: row;
                padding: 0 5px;
                justify-items: center;
                align-items: center;

                img {
                    order: -1;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }

                span {
                    flex-grow: 1;
                    vertical-align: middle;
                    margin-left: 12px;
                    font-size: 15px;
                }
            }

            .time-set {
                .time-add-ddl {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-items: center;
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

                .time-repeat {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-items: center;
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
                padding: 0 5px;

                textarea {
                    outline: none;
                    //border: none;
                    resize: none;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .buttom-bar {
            height: 40px;
            display: flex;
            flex-direction: row;
            padding: 0 5px;
            margin-bottom: 5px;

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
