<template>
    <div class="container">

        <input type="text" class="todo-input" placeholder="请写下你的待办事项" v-model="newTodo" v-on:keydown.enter="addTodo">
        <div class="content"></div>
        <div class="filter"></div>
    </div>
</template>