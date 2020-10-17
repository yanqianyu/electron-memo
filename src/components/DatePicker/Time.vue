<template>
    <div class="time-choose">
        <input class="year-choosen" type="number" min="0" v-model="year" @change="changeYear">
        <input class="month-choosen" type="number" min="1" max="12" v-model="month" @change="changeMonth">
        <input class="day-choosen" type="number" min="1" :max="maxDays" v-model="day" @change="changeDay">
        <input class="part-choosen" type="number" min="0" max="1" v-model="part" @change="changePart">
        <input class="hour-choosen" type="number" min="1" max="12" v-model="hour" @change="changeHour">
        <input class="minute-choosen" type="number" min="0" max="59" v-model="minute" @change="changeMinute">
    </div>
</template>

<script>
    import {EventBus} from "./event-bus";
    export default {
        name: "Time",
        props: {
            initYear: {
                type: Number,
                required: true
            },
            initMonth: {
                type: Number,
                required: true
            },
            initDay: {
                type: Number,
                required: true
            },
            initPart: {
                type: Number
            },
            initHour: {
                type: Number
            },
            initMinute: {
                type: Number
            }
        },
        data: function() {
            return {
                year: this.initYear,
                month: this.initMonth,
                day: this.initDay,
                part: this.initPart,
                hour: this.initHour,
                minute: this.initMinute
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
                EventBus.$emit('changeYear', {
                    year: this.year
                })
            },
            changeMonth() {
                EventBus.$emit('changeMonth', {
                    month: this.month
                })
            },
            changeDay() {
                EventBus.$emit('changeDay', {
                    day: this.day
                })
            },
            changePart() {

            },
            changeHour() {

            },
            changeMinute() {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
