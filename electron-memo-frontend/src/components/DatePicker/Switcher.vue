<template>
    <div class="dtp_switch">
        <span class="arrow arrow_left" @click.prevent="goBack">&#10094;</span>
        <div class="content">
            <p class="text">{{`${this.year}年 ${this.month}月`}}</p>
        </div>
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
.dtp_switch {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 16px;

    .dtp_arrow {
        color: black;
        width: 24px;
        height: 24px;
        text-align: center;
        &:hover {
            cursor: pointer;
            border-radius: 50%;
            background-color: rgba(1, 1, 1, 0.1);
        }
    }

    .content {
        flex-grow: 1;
        .text {
            margin: 0;
            text-align: center;
            font-family: sans-serif;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
        }
    }
}
</style>
