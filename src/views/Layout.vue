<template>
    <div class="container">
        <div class="left-part">
            <side-bar></side-bar>
        </div>
        <div class="middle-part">
            <router-view></router-view>
        </div>
        <div v-if="setting" class="right-part">
            <todo-set></todo-set>
        </div>
    </div>
</template>

<script>
    import SideBar from "@/components/SideBar";
    import TodoSet from "@/components/TodoSet";

    export default {
        name: "Layout",
        components: {TodoSet, SideBar},
        mounted() {
            console.log(window.ipcRender)
            window.ipcRender.send('todo-window')
        },
        data: function () {
            return {
                setting: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: row;

        .left-part {
            order: -1;
        }

        .middle-part {
            flex-grow: 1;
        }

        .right-part {

        }
    }
</style>
