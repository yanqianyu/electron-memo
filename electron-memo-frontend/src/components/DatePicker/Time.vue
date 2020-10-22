<template>
    <div class="time-choose">
        <input class="year-chosen" type="number" min="0" v-model="year" @change="changeYear">
        <input class="month-chosen" type="number" min="1" max="12" v-model="month" @change="changeMonth">
        <input class="day-chosen" type="number" min="1" :max="maxDays" v-model="day" @change="changeDay">
        <input v-if="!dateOnly" class="hour-chosen" type="number" min="0" max="23" v-model="hour" @change="changeHour">
        <input v-if="!dateOnly" class="minute-chosen" type="number" min="0" max="59" v-model="minute" @change="changeMinute">
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
            changeYear() {
                this.$emit('changeYear', this.year)
            },
            changeMonth() {
                this.$emit('changeMonth', this.month)
            },
            changeDay() {
                this.$emit('changeDay', this.day)
            },
            changeHour() {
                this.$emit('changeHour', this.hour)
            },
            changeMinute() {
                this.$emit('changeMinute', this.minute)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
