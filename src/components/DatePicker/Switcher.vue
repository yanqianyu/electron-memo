<template>
    <div class="dtp_switch">
        <span class="arrow arrow_left" @click.prevent="goBack">&#10094;</span>
        <div class="content">
            <p class="text">{{`${this.year}年 ${this.month}月`}}</p>
        </div>>
        <span class="arrow arrow_right" @click.prevent="goForward">&#10095;</span>
    </div>
</template>

<script>
    export default {
        name: "Switcher",
        props: {
            year: {
                type: Number,
                required: true
            },
            month: {
                type: Number,
                required: true
            }
        },
        methods: {
            goBack() {
                this.$emit('back');
            },
            goForward() {
                this.$emit('forward');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
