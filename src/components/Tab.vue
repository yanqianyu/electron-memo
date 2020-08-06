<template>
    <div class="">
        <button v-on:click="allTodos">All</button>
        <button v-on:click="activeTodos">Active</button>
        <button v-on:click="completedTodos">Completed</button>
    </div>
</template>
<script>
export default {
    name: "Tab"
}
</script>
<style scoped>

</style>