<template>
    <div class="todo-item">
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
                <div class="todo-date" v-if="haveDDL">
                    <img src="../assets/icons/calender.svg">
                    <span v-if="outOfTime">{{todo.ddl}}</span>
                    <span v-else>{{todo.ddl}}</span>
                </div>
                <div class="todo-file" v-if="haveFiles">
                    <img src="../assets/icons/file.svg">
                    <span>文件已附加</span>
                </div>
                <div class="todo-note" v-if="todo.note">
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
        props: {
            initTodo: Object
        },
        data: function () {
            return {
                todo: this.initTodo // 在子组件中修改值会commit到vuex中？
            }
        },
        computed: {
            stepsProps: function () {
                let count = this.todo.steps.reduce(function (prev, cur) {
                    if (cur.isDone === true) {
                        prev += 1;
                    }
                    return prev;
                }, 0);
                return count + "/" + this.todo.steps.length;
            },
            haveDDL: function() {
                return this.todo.ddl && this.todo.ddl != "";
            },
            outOfTime: function () {
                let date = new Date();
                // true -> out of time
                return this.todo.ddl < date;
            },
            haveFiles: function () {
                return this.todo.files && this.todo.files.length > 0;
            }
        },
        methods: {
            changeDoneState() {
                // 点击图片时禁用setting部分显示的事件
                this.todo.isDone = !this.todo.isDone;
                // todo: commit to vuex
                this.$store.commit("updateTodo", this.todo);
            },
            changeImportantState() {
                this.todo.isImportant = !this.todo.isImportant;
                // todo: commit to vuex
                this.$store.commit("updateTodo", this.todo);
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
