<template>
    <div class="dtp_buttons">
        <!--取消还是删除-->
        <button class="dtp_button" @click.prevent="$emit('cancel')">{{cancelText}}</button>
        <button class="dtp_button" @click.prevent="$emit('ok')">OK</button>
    </div>
</template>

<script>
    export default {
        name: "Buttons",
        props: {
            hadInit: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            cancelText () {
                return this.hadInit? "删除": "取消"
            }
        }
    }
</script>

<style lang="scss" scoped>
.dtp_buttons {
    margin: 8px 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .dtp_button {
        padding: 0;
        margin: 0 0 0 24px;
        border: none;
        background-color: transparent;
        font-family: sans-serif;
        font-size: 14px;
        line-height: 22px;
        font-weight: 600;
        text-transform: uppercase;
        color: cornflowerblue;
        cursor: pointer;
        outline: none;
    }
}
</style>
