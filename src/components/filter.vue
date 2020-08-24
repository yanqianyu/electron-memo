<template>
    <div class="filter">
        <button v-on:click="allTodos">All</button>
        <button v-on:click="activeTodos">Active</button>
        <button v-on:click="completedTodos">Completed</button>
    </div>
</template>
<script>
export default {
    name: "todo-filter",
    methods: {
        allTodos: function() {
            this.$store.dispatch('updateFilter', 'all')
        },
        activeTodos: function() {
            this.$store.dispatch('updateFilter', 'active')
        },
        completedTodos: function() {
            this.$store.dispatch('updateFilter', 'completed')
        }
    }
}
</script>
<style lang="scss">
    .filter {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    button {
        font-size: 14px;

    }
</style>
