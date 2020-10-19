<template>
    <div class="time-picker">
        <Switcher :year="year"
                  :month="month"
                  @back="handleSwitchBack"
                  @forward="handleSwitchForward"></Switcher>
        <Day :year="year"
             :month="month"
             :day="day"
             @day="setDay"></Day>
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
        <buttons :had-init="haveInit"
                 @cancel="handleCancel"
                 @ok="handleOk"></buttons>
    </div>
</template>

<script>
    import Switcher from "./Switcher";
    import Day from "./Day";
    import Time from "./Time";
    import Buttons from "./Buttons";

    export default {
        name: "Picker",
        components: {Buttons, Time, Switcher, Day},
        props: {
            dateOnly: {
                type: Boolean,
                required: true
            },
            initDate: {
                type: Date
            },
            type: {
                type: String,
                required: true
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
            haveInit () {
                return !!this.initDate;
            },
            year () {
                return this.date.getFullYear();
            },
            month () {
                return this.date.getMonth();
            },
            day () {
                return this.date.getDate();
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
                // 一个月前
                let tmp = this.date;
                this.date = new Date(tmp.getTime() - 24 * 60 * 60 * 1000 * tmp.getDate());
            },
            handleSwitchForward() {
                // 一个月后
                let tmp = this.date;
                this.date = new Date(tmp.getTime() + 24 * 60 * 60 * 1000 * tmp.getDate());
            },
            setDay(day) {
                this.date.setDate(day);
            },
            setYear(year) {
                this.date.setYear(year);
            },
            setMonth(month) {
              this.date.setMonth(month);
            },
            setHour(hour) {
                this.date.setHour(hour);
            },
            setMinute(minute) {
                this.date.setMinute(minute);
            },
            handleCancel() {
                // 如果已经有初始化值，则cancel实际为删除
                // 否则是取消picker的显示？
                if(this.initDate) {
                    // 向上通知删除时间设定
                    this.$emit('deleteTimeChoose')
                }
                // 向上通知？
                this.$emit('cancelDatePicker')
            },
            handleOk() {
                // commit to vuex
                // 根据type
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
