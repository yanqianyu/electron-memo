<template>
    <div>
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

        },
        activeTodos: function() {

        },
        completedTodos: function() {
            
        }
    }
}
</script>