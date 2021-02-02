<template>
    <div class="layout">
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
                <hr width="80%" size="3" align=center noshade="noshade"/>
                <div class="customize-list">
                    <div class="customize-item" v-for="customize in customizes" :key="customize.id">
                        <router-link :to="customize.url">
                            <img v-bind:src="customize.icon">
                            <span>{{customize.name}}</span>
                        </router-link>
                    </div>
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
import {store} from "../store";

export default {
	name: "SideBar",
	data: function () {
		return {
			searchEntry: "", // 搜索词条
			isSearchActive: false  // 是否处于search状态
		};
	},
	beforeRouteEnter (to, from, next){
		// 导航完成前获取数据
		// 不能访问this
		let arr = [store.dispatch("getAllList"), store.dispatch("getAllTodo")];
		Promise.all(arr).then((result) => {
			console.log(result);
			next();
		}).catch(err => {
			console.log(err);
			next(false);
		});
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
		}
	},
	methods: {
		toSearch() {
			// 绑定在了input的change事件上
			debounce(this.search);
			this.$router.push({name: "searchList", query: {entry: this.searchEntry}});
		},
		search() {
			// 搜索逻辑
			// 向后端发送词条，获得todo列表 渲染在页面上
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
			// https://stackoverflow.com/questions/32649704/how-to-generate-hash-from-timestamp
			let id = escape(Number(new Date).toString(36));
			let newList = {
				id: id,
				name: "无标题清单" + this.$store.getters.noNameCustomListsSuffix,
				icon: require("../assets/icons/folders.svg"),
				url: "/customizeList?listid=".concat(id)
			};
			this.$store.commit("addCusList", newList);
			// 跳转到新的list
			this.$router.push({path: "/customizeList", query: {listid: id}});
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
                            order: -1;
                            width: 20px;
                            height: 20px;
                            margin: 5px;
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
