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
            }
        },
        data: function() {
            return {
                name: WEEK_SET,
                selectedDay: this.day
            }
        },
        methods: {
            handleClick(day) {
                this.selectedDay = day
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
.dtp_body {
    height: 200px;
    overflow: auto;
    padding: 0 12px;

    .dtp_head {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        &_item {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: sans-serif;
            font-size: 12px;
            font-weight: 600;
            line-height: 22px;
            color: rgb(1, 1, 1, 0.5);
        }
    }

    .dtp_main {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
        margin: 0;
        padding: 0;
        list-style: none;
        &_item {
            margin: 8px 0;
            display: flex;
            justify-content: center;
            flex-basis: calc(100% / 7);
            &.disabled {
                pointer-events: none;
                span {
                    color: gray;
                }
            }
            span {
                padding: 0;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                font-family: sans-serif;
                font-size: 12px;
                font-weight: 600;
                line-height: 22px;
                color: black;
                transition: all 0.25s ease-in-out;
                &:hover {
                    cursor: pointer;
                    background-color: rgba(1, 1, 1, 0.1);
                }
                &.selected {
                    background-color: #4e89ae;
                    color: white;
                }
            }
            }
        }
    }
}
</style>
