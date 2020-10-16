<template>
    <div class="dtp_body">
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
            name: {
                type: Array,
                required: true
            },
            number: {
                type: Number,
                required: true
            },
            position: {
                type: Number,
                required: true
            },
            selectedDay: {
                type: Number,
                required: true
            },
            selectedYear: {
                type: Number,
                required: true
            },
            selectedMonth: {
                type: Number,
                required: true
            },
            disabledDates: {
                type: Array | Object,
                required: false
            },
            disabledDatesAndTimes: {
                type: Array | Object,
                required: false
            }
        },
        methods: {
            handleClick(day) {
                this.$emit('day', day)
            }
        },
        computed: {
            days () {
                const disabled = this.disabledDates.length > 0 ? this.disabledDates : this.disabledDatesAndTimes;
                const prevMonthDays = new Array(this.position).fill(null);
                const monthDays = Array.from({length: this.number}, (v, k) => k + 1);

                let filteredDates;
                const dates = [...prevMonthDays, ...monthDays]

                filteredDates = dates.map(v => {
                    let obj = { day: v }
                    const dayDate = new Date(this.selectedYear, this.selectedMoth, v)
                    disabled.forEach(o => {
                        const toJSDate = o.to && new Date(o.to)
                        const fromJSDate = o.from && new Date(o.from)
                        if (o.to && !o.from && !obj.disabled) {
                            obj.disabled = !(toJSDate.getTime() <= dayDate.getTime())
                        } else if (!o.to && o.from && !obj.disabled) {
                            obj.disabled = !(dayDate.getTime() <= fromJSDate.getTime())
                        } else if (o.to && o.from && !obj.disabled) {
                            obj.disabled = (fromJSDate.getTime() <= dayDate.getTime() && dayDate.getTime() <= toJSDate.getTime())
                        } else if (!obj.disabled) {
                            obj.disabled = false
                        }
                    })
                    return obj
                })
                return filteredDates
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
