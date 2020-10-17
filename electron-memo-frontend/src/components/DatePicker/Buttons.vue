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

</style>
