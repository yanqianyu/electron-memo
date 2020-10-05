<template>
    <div class="side-bar">
        <div class="bar-main">
            <!--    todo: add border -> position change -->
            <div :class="['search', isSearchActive? 'active': 'unactive']">
                <img src="../assets/icons/search.svg">
                <input type="text" v-model="searchEntry" placeholder="搜索" @change="toSearch" @focus="toFocus('search')"
                       @blur="toBlur('search')">
            </div>
            <div class="builtin-list">
                <div class="builtin-item" v-for="builtin in builtins" :key="builtin.id">
                    <router-link :to="builtin.url">
                        <img v-bind:src="builtin.icon">
                        <span>{{builtin.name}}</span>
                    </router-link>
                </div>
            </div>
            <div class="customize-list">
                <div class="customize-item" v-for="customize in customizes" :key="customize.id">
                    <router-link :to="customize.url">
                        <img v-bind:src="customize.icon">
                        <span>{{customize.name}}</span>
                    </router-link>
                </div>
            </div>

            <div class="create-list" v-on:click="addCustomizeList">
                <img src="../assets/icons/add.svg">
                <span>create new list</span>
            </div>
        </div>

        <router-view class="todo-lists" :key="key"></router-view>
    </div>
</template>

<script>
    import {debounce} from "../utils";

    export default {
        name: "SideBar",
        data: function () {
            return {
                searchEntry: "", // 搜索词条
                isSearchActive: false,  // 是否处于search状态
                builtins: [
                    {
                        id: "1",
                        name: "My day",
                        icon: require('../assets/icons/myday.svg'),
                        url: "/builtinList/myday" // router 路由
                    },
                    {
                        id: "2",
                        name: "Important",
                        icon: require('../assets/icons/important.svg'),
                        url: "/builtinList/important"
                    },
                    {
                        id: "3",
                        name: "Planned schedule",
                        icon: require('../assets/icons/calender.svg'),
                        url: "/builtinList/haveplanned"
                    },
                    {
                        // the todos having no lists
                        id: "4",
                        name: "Task",
                        icon: require('../assets/icons/tasks.svg'),
                        url: "/builtinList/task"
                    }
                ],
                customizes: this.$store.state.customLists
            }
        },
        mounted() {
            window.ipcRender.send('todo-window')
        },
        computed: {
            // 路由跳转不更新问题https://blog.csdn.net/w390058785/article/details/82813032
            key() {
                return this.$route.path + Math.random();
            }
        },
        created() {
            // this.customLists = this.$store.state.customLists;
        },
        methods: {
            toSearch() {
                // 绑定在了input的change事件上
                debounce(this.search);
                this.$router.push({name: 'searchList', params: {entry: this.searchEntry}});
            },
            search() {
                // 搜索逻辑
                // 向后端发送词条，获得todo列表 渲染在页面上
            },
            toFocus(input) {
                if (input === 'search') {
                    this.isSearchActive = true;
                }
            },
            toBlur(input) {
                if (input === 'search') {
                    this.isSearchActive = false;
                }
            },
            addCustomizeList() {
                let id = escape(new Date().toDateString());
                console.log(id);
                // 获取无标题清单的最大后缀

                let newList = {
                    id: id,
                    name: '无标题清单' + this.$store.getters.noNameCustomListsSuffix,
                    icon: require('../assets/icons/folders.svg'),
                    url: '/customizeList/'.concat(id)
                };
                this.$store.commit('addCusList', newList);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .side-bar {
        height: 100%;
        display: flex;
        flex-direction: row;

        .bar-main {
            width: 200px;
            order: -1;
            height: 100%;
            display: flex;
            flex-direction: column;

            .search {
                background-color: lightgray;
                //border: none;
                border-radius: 0.5rem;
                margin: 1rem;
                //todo: box-sizing means
                box-sizing: border-box;
                order: -1;
                padding: 0.2rem;

                display: flex;
                flex-direction: row;

                img {
                    order: -1;
                    padding: 0 0.5rem;
                    float: left;
                    width: 20px;
                    height: 20px;
                }

                input {
                    width: 100%;
                    flex-grow: 1;
                    background-color: lightgray;
                    box-sizing: border-box;
                    height: 20px;
                    outline: none;
                    border: 0;
                }

                input::placeholder {
                    color: black;
                }
            }

            .builtin-list {
                margin-left: 1rem;
                height: 20rem;

                .builtin-item {
                    cursor: default;
                    text-align: left;
                    box-sizing: border-box;

                    img {
                        vertical-align: middle;
                        width: 20px;
                        height: 20px;
                        margin: 0.5rem;
                    }

                    span {
                        vertical-align: middle;
                        height: 20px;
                    }
                }
            }

            .customize-list {
                flex-grow: 1;

                margin-left: 1rem;
                height: 20rem;

                .customize-item {
                    cursor: default;
                    text-align: left;
                    box-sizing: border-box;

                    display: flex;
                    flex-direction: row;

                    img {
                        order: -1;
                        vertical-align: middle;
                        width: 20px;
                        height: 20%;
                        margin: 0.5rem;
                    }

                    span {
                        flex-grow: 1;
                        vertical-align: middle;
                        height: 20px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

            .create-list {
                box-sizing: border-box;
                margin-bottom: 5px;

                img {
                    // span and img vertical-img
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    margin: 0.5rem;
                }

                span {
                    vertical-align: middle;
                    height: 20px;
                }
            }

            .create-list :hover {
                cursor: default;
            }
        }

        .todo-lists {
            flex-grow: 1;
        }
    }

    .active {
        border: 1px solid palegreen;
    }

    .unactive {
        // todo
        border: 1px solid white;
    }
</style>
