<template>
    <div class="layout">
        <div class="side-bar">
            <div class="bar-main">
                <!--    todo: add border -> position change -->
                <div :class="['search', isSearchActive? 'active': 'unactive']">
                    <img src="../assets/icons/search.svg">
                    <input type="text" v-model="searchEntry" placeholder="搜索" @focus="toFocus('search')"
                           @blur="toBlur('search')">
                </div>
                <div class="builtin-list">
                    <div class="builtin-item" v-for="builtin in builtins" :key="builtin._id">
                        <router-link :to="{path: 'builtinList', query: {listid: builtin._id}}">
                            <img v-bind:src="icon(builtin.icon)">
                            <span>{{builtin.title}}</span>
                        </router-link>
                    </div>
                </div>
                <hr width="80%" size="3" align=center noshade="noshade"/>
                <div class="customize-list">
                    <div class="customize-item" v-for="customize in customizes" :key="customize._id">
                        <router-link :to="{path: 'customizeList', query: {listid: customize._id}}">
                            <img v-bind:src="icon(customize.icon)">
                            <span>{{customize.title}}</span>
                        </router-link>
                        <img src="@/assets/icons/delete.svg" v-on:click="deleteList(customize._id)">
                    </div>
                </div>
            </div>
            <div class="create-list" v-on:click="addCustomizeList">
                <img src="../assets/icons/add.svg">
                <span>create new list</span>
            </div>
        </div>

        <router-view class="todo-lists" :searchEntry="searchEntry" :key="key"></router-view>
    </div>
</template>

<script>
	import {store} from "../store";

	export default {
	name: "SideBar",
	data: function () {
		return {
			searchEntry: "", // 搜索词条
			isSearchActive: false,  // 是否处于search状态
            timer: null // 搜索的定时器
		};
	},
	beforeRouteEnter(to, from, next) {
		// vuex中没有todo和list的相关信息，就从后台获得
		if (store.state.builtinLists.length === 0) {
			let arr = [store.dispatch("getAllList"), store.dispatch("getAllTodo")];
			// 同步异步
			Promise.all(arr).then(res => {
				console.log(res);
				// 获取路由中携带的参数 是url查询参数
				let listid = to.query.listid; // 这里的listid是字符串
				// 更改store中存储的currentList
				console.log(listid);
				if (listid) {
					store.commit("updateListFilter", listid);
					next();
				}
				else {// 否则重新登录
					next({
						path: "/login",
					});
				}
			}).catch(err => {
				console.log(err);
				next({
					path: "/login"
				});
			});
		}
		else {
			// 获取路由中携带的参数 是url查询参数
			let listid = to.query.listid; // 这里的listid是字符串
			// 更改store中存储的currentList
			console.log(listid);
			if (listid) {
				store.commit("updateListFilter", listid);
				next();
			}
			else {// 否则重新登录
				next({
					path: "/login",
				});
			}
		}
	},
	beforeRouteUpdate(to, from, next) {
		// 获取路由中携带的参数 是url查询参数
		let listid = to.query.listid; // 这里的listid是字符串
		// 更改store中存储的currentList
		console.log(listid);
		if (listid) {
			store.commit("updateListFilter", listid);
			next();
		}
		else {// 否则重新登录
			next({
				path: "/login",
			});
		}
	},
	mounted() {
		if (window.ipcRender) {
			window.ipcRender.send("todo-window");
		}
	},
	computed: {
		builtins() {
			return this.$store.state.builtinLists;
		},
		customizes() {
			return this.$store.state.customLists;
		},
		// 路由跳转不更新问题https://blog.csdn.net/w390058785/article/details/82813032
		key() {
			return this.$route.path + Math.random();
		},
	},
	methods: {
		icon(name) {
			return require("@/assets/icons/" + name + ".svg");
		},
		toFocus(input) {
			if (input === "search") {
				this.isSearchActive = true;
			}
		},
		toBlur(input) {
			if (input === "search") {
				this.isSearchActive = false;
			}
		},
		addCustomizeList() {
			// 不重名
			let newList = {
				userId: this.$store.state.userId,
				title: "无标题清单" + this.$store.getters.noNameCustomListsSuffix,
				icon: "folders",
				isCustomize: true
			};
			this.$store.dispatch("addCusList", newList).then(resp => {
				// 跳转到新的list
				this.$router.push({path: "/customizeList", query: {listid: resp.data.todolist._id}});
			});
		},
        deleteList(listId) {
			this.$store.dispatch("deleteCusList", listId).then(resp => {
				console.log(resp);
            })
        }
	}
};
</script>

<style lang="scss" scoped>
    .layout {
        height: 100%;
        display: flex;
        flex-direction: row;

        .side-bar {
            order: -1;
            display: flex;
            flex-direction: column;

            .bar-main {
                width: 200px;
                order: -1;
                height: 100%;
                display: flex;
                flex-direction: column;
                overflow-y: auto;
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
                    /*height: 20rem;*/

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
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        text-align: left;

                        img {
                            vertical-align: middle;
                            width: 20px;
                            height: 20px;
                            margin: 5px;
                        }

                        img:first-child {
                            order: -1;
                        }
                        span {
                            vertical-align: middle;
                            flex-grow: 1;
                        }
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
