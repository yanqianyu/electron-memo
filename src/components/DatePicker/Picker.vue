<template>
    <div class="time-picker">
        <Switcher :year="year" :month="month" @back="handleSwitchBack" @forward="handleSwitchForward"></Switcher>
        <Day :year="year" :month="month" :day="day" @day="setDay"></Day>
        <Time :date-only="dateOnly"
              :init-year="year"
              :init-month="month"
              :init-day="day"
              :init-hour="hour"
              :init-minute="minute"
              @changeYear="setYear"
              @changeMonth="setMonth"
              @changeDay="setDay"
              @changeHour="setHour"
              @changeMinute="setMinute"
        ></Time>
    </div>
</template>

<script>
    import Switcher from "./Switcher";
    import Day from "./Day";
    import Time from "./Time";
    export default {
        name: "Picker",
        components: {Time, Switcher, Day},
        props: {
            dateOnly: {
                type: Boolean,
                required: true
            },
            initDate: {
                type: Date
            }
        },
        data: function() {
            return {
                date: this.initDate
            }
        },
        created() {
            // 如果之前没有设置则，以当前时间为基准
            if (!this.initDate) {
                this.date = new Date()
            }
        },
        computed: {
            year () {
                return this.date.getFullYear();
            },
            month () {
                return this.date.getMonth();
            },
            day () {
                return this.date.getDay();
            },
            hour () {
                return this.date.getHours();
            },
            minute () {
                return this.date.getMinutes();
            }
        },
        methods: {
            handleSwitchBack() {

            },
            handleSwitchForward() {

            },
            setDay() {

            },
            setYear() {

            },
            setMonth() {

            },
            setHour() {

            },
            setMinute() {

            }
        }
    }
</script>

<style scoped>

</style>
