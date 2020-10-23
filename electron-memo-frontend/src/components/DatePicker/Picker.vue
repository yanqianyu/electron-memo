<template>
    <div class="time-wrapper">
        <div class="time-picker">
            <Switcher :year="year"
                      :month="month"
                      @back="handleSwitchBack"
                      @forward="handleSwitchForward"></Switcher>
            <Day :year="year"
                 :month="month"
                 :day="day"
                 @day="setday"></Day>
            <Time :date-only="dateOnly"
                  :year="year"
                  :month="month"
                  :day="day"
                  :hour="hour"
                  :minute="minute"
                  @changeYear="setyear"
                  @changeMonth="setmonth"
                  @changeDay="setday"
                  @changeHour="sethour"
                  @changeMinute="setminute"
            ></Time>
            <buttons :had-init="haveInit"
                     @cancel="handleCancel"
                     @ok="handleOk"></buttons>
        </div>
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
        data: function () {
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
            haveInit() {
                return !!this.initDate;
            },
            year() {
                return this.date.getFullYear();
            },
            month() {
                // 0 -> Jan -> 1
                // 11 -> Rem -> 12
                return this.date.getMonth() + 1;
            },
            day() {
                return this.date.getDate();
            },
            hour() {
                return this.date.getHours();
            },
            minute() {
                return this.date.getMinutes();
            }
        },
        methods: {
            handleSwitchBack() {
                // 一个月前
                let tmp = this.date;
                let month = tmp.getMonth();
                if (0 === month) {
                    let year = tmp.getFullYear();
                    tmp.setMonth(11);
                    tmp.setFullYear(year - 1);
                } else {
                    tmp.setMonth(month - 1);
                }
                this.date = new Date(tmp);
            },
            handleSwitchForward() {
                // 一个月后
                let tmp = this.date;
                let month = tmp.getMonth();
                if (11 === month) {
                    let year = tmp.getFullYear();
                    tmp.setMonth(0);
                    tmp.setFullYear(year + 1);
                } else {
                    tmp.setMonth(month + 1);
                }
                this.date = new Date(tmp);
            },
            setday(day) {
                this.date.setDate(day);
                this.date = new Date(this.date);
            },
            setyear(year) {
                this.date.setFullYear(year);
                this.date = new Date(this.date);
            },
            setmonth(month) {
                // month 1-12
                this.date.setMonth(month - 1);
                this.date = new Date(this.date);
            },
            sethour(hour) {
                this.date.setHours(hour);
                this.date = new Date(this.date);
            },
            setminute(minute) {
                this.date.setMinutes(minute);
                this.date = new Date(this.date);
            },
            handleCancel() {
                // 如果已经有初始化值，则cancel实际为删除
                // 否则是取消picker的显示？
                if (this.initDate) {
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
    .time-wrapper {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(1, 1, 1, 0.25);
    }
    .time-picker {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 290px;
        background-color: white;
        box-shadow: 0 0 4px 0 rgba(1, 1, 1, 0.3);
    }
</style>
