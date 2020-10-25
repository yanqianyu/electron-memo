<template>
    <div class="time-choose">
        <input class="year-chosen" type="number" min="0" :value="year" @change="changeYear">
        <input class="month-chosen" type="number" min="1" max="12" :value="month" @change="changeMonth">
        <input class="day-chosen" type="number" min="1" :max="maxDays" :value="day" @change="changeDay">
        <input v-if="!dateOnly" class="hour-chosen" type="number" min="0" max="23" :value="hour" @change="changeHour">
        <input v-if="!dateOnly" class="minute-chosen" type="number" min="0" max="59" :value="minute" @change="changeMinute">
    </div>
</template>

<script>
    export default {
        name: "Time",
        props: {
            dateOnly: {
                type: Boolean,
                required: true
            },
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
            hour: {
                type: Number
            },
            minute: {
                type: Number
            }
        },
        computed: {
            maxDays () {
                // 根据当前选择的月份 返回最多的天数
                let date = new Date(this.year, this.month, 0);
                return date.getDate();
            }
        },
        methods: {
            changeYear(event) {
                this.$emit('update:year', event.target.value)
            },
            changeMonth(event) {
                this.$emit('update:month', event.target.value)
            },
            changeDay(event) {
                this.$emit('update:day', event.target.value)
            },
            changeHour(event) {
                this.$emit('update:hour', event.target.value)
            },
            changeMinute(event) {
                this.$emit('update:minute', event.target.value)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
