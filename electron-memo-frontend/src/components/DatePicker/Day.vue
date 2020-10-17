<template>
    <div class="dtp_body">
        <!-- 周几-->
        <ul class="dtp_head">
            <li v-for="(day, index) in name"
                :key="index"
                class="dtp_head_item">
                {{day.name}}
            </li>
        </ul>

        <ul class="dtp_main">
            <li v-for="(day, index) in days"
                :key="`${day}-${index}`"
                :class="{disabled: day.disabled}"
                class="dtp_main_item"
                @click.prevent="handleClick(day.content)"
            >
                <span :class="{selected: (day.content === selectedDay)}">
                    {{day.content}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {WEEK_SET} from "./constants";

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
            },
            selectedDay: {
                type: Number,
                required: true
            }
        },
        data: function() {
            return {
                name: WEEK_SET,
            }
        },
        methods: {
            handleClick(day) {
                this.$emit('day', day)
            }
        },
        computed: {
            days () {
                let totalDay = new Date(this.year, this.month, 0).getDate();
                let firstDay = new Date(this.year, this.month, 1).getDay();
                let days = [];

                for(let i = 1; i < firstDay; i++) {
                    days.push({
                        content: '',
                        disabled: true // 禁用点击事件
                    })
                }

                for(let i = 1; i <= totalDay; i++) {
                    days.push({
                        content: i,
                        disabled: false
                    })
                }

                return days
            }
        }
    }
</script>

<style lang="scss" scoped>
.disabled {
    pointer-events: none;
}
</style>
