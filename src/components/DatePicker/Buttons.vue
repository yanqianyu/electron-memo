<template>
    <div class="dtp_buttons">
        <img
                v-if="isCalendarIconShown"
                alt="calendar"
                class="vmdtp_img"
                src="src/assets/icons/calender.svg"
                @click.prevent="$emit('calendar')"
        />
        <div style="flex-grow: 1"></div>
        <button class="dtp_button" @click.prevent="$emit('cancel')">Cancel</button>
        <button class="dtp_button" :class="{disabled}" @click.prevent="$emit('ok')">OK</button>
    </div>
</template>

<script>
    import {MODE} from "./constants.js";

    export default {
        name: "Buttons",
        props: {
            mode: {
                type: Number,
                required: true
            },
            canFinish: {
                type: Boolean,
                required: true
            },
            isTimeOnly: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data: function() {
            return {
                MODE: MODE
            }
        },
        computed: {
            disabled () {
                return (this.mode === 4 || this.mode === 3) && !this.canFinish
            },
            isCalendarIconShown () {
                return !this.isTimeOnly && (this.mode === this.MODE.HOUR || this.mode === this.MODE.MINUTE)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
