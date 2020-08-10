<template>
    <div>
        <button v-on:click="allTodos">All</button>
        <button v-on:click="activeTodos">Active</button>
        <button v-on:click="completedTodos">Completed</button>
    </div>
</template>
<script>
import '../mock/mock'
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
