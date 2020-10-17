<template>
    <div class="dtp_body">
        <!-- 周几-->
        <ul class="dtp_head">
            <li v-for="(day, index) in name"
                :key="`${day}-${index}`"
                class="dtp_head_item">
                {{day}}
            </li>
        </ul>

        <ul class="dtp_main">
            <li v-for="(obj, index) in days"
                :key="`${day}-${index}`"
                :class="{disabled: obj.disabled}"
                class="dtp_main_item"
                @click.prevent="handleClick(obj.day)"
            >
                <span :class="{selected: (obj.day === selectedDay)}">
                    {{obj.day}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Day",
        props: {
            year: {
                type: Number,
                required: true
            },
            month: {
                type: Number,
                required: true
            },
            day: {
                type: Number,
                required: true
            }
        },
        methods: {
            handleClick(day) {
                this.$emit('day', day)
            }
        },
        computed: {
            days () {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
