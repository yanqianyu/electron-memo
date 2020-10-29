<template>
    <div class="time-choose-container">
        <div class="time-choose" v-on:click.stop="arrowDown">
            <div class="select-title">
                <slot></slot>
                <span v-if="!hasSelected">{{slogan}}</span>
                <div class="select-res" v-if="hasSelected">
                    <span v-if="this.type==='reminder'">{{selectedTime}}</span>
                    <span>{{selectedDate}}</span>
                </div>
                <img src="../assets/icons/cross.svg" v-if="hasSelected" @click.stop="deleteTimeChoose">
            </div>
            <div class="select-list" v-show="isShowSelect">
                <div class="select-item" v-for="item in timeItem" v-bind:key="item.id" @click.stop="select(item)">
                    <span>{{item.first}}</span>
                    <span v-if="item.second">{{item.second}}</span>
                </div>
                <div class="select-cust" v-on:click.stop="showDatePicker">
                    <p>自定义</p>
                </div>
            </div>
        </div>
        <!--todo: date-picker-->
        <Picker v-if="isDatePickerShow" :date-only="dateOnly"
                :init-date="finalTime"
                :type="type"
                @saveTimeChoose="saveTimeChoose"
                @cancelDatePicker="cancelDatePicker"
                @deleteTimeChoose="deleteTimeChoose"
        ></Picker>
    </div>
</template>

<script>
import Picker from "./DatePicker/Picker";
export default {
	name: "TimeChoose",
	components: {Picker},
	props: {
		type: String
	},
	created() {
		if(this.type === "reminder") {
			this.slogan = "提醒我";
			this.timeItem.push({
				id: 1,
				first: "今天晚些时候",
				second: this.todayLater,
				// 获取当天23点的时间戳
				time: new Date(new Date(new Date().toLocaleDateString()).getTime() + 23 * 60 * 60 * 1000)
			});

			this.timeItem.push({
				id: 2,
				first: "明天",
				second: this.tomorrow,
				// 第二天9点的时间戳
				time: new Date(new Date(new Date().toLocaleDateString()).getTime() + (24 + 9) * 60 * 60 * 1000)
			});

			this.timeItem.push({
				id: 3,
				first: "下周",
				second: this.nextWeek,
				// 下周的周X的9点时间戳
				time: new Date(new Date(new Date().toLocaleDateString()).getTime() + (7 * 24 + 9) * 60 * 60 * 1000)
			});
		}
		else if (this.type === "ddl") {
			this.slogan = "添加截止日期";
			this.timeItem.push({
				id: 1,
				first: "今天",
				second: this.todayLater,
				time: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
			});

			this.timeItem.push({
				id: 2,
				first: "明天",
				second: this.tomorrow,
				time: new Date(new Date(new Date().toLocaleDateString()).getTime() + 2 * 24 * 60 * 60 * 1000)
			});

			this.timeItem.push({
				id: 3,
				first: "下周",
				second: this.nextWeek,
				time: new Date(new Date(new Date().toLocaleDateString()).getTime() + 8 * 24 * 60 * 60 * 1000)
			});
		}
		else if (this.type === "repeat") {
			this.slogan = "重复";
			this.timeItem.push({
				id: 1,
				first: "每天",
			});

			this.timeItem.push({
				id: 2,
				first: "每周",
			});

			this.timeItem.push({
				id: 3,
				first: "工作日",
			});
			this.timeItem.push({
				id: 4,
				first: "每月",
			});

			this.timeItem.push({
				id: 5,
				first: "每年",
			});
		}
	},
	data: function () {
		return {
			hasSelected: false,
			slogan: "提醒我",
			isShowSelect: false,
			timeItem: [],
			isDatePickerShow: false,
			finalTime: null
		};
	},
	computed: {
		dateOnly: function () {
			return this.type !== "reminder";
		},
		todayLater: function () {
			// 获取当前时间
			let now = new Date().getHours();
			if (now > 20) {
				return "";
			}
			// 获取今天是周几
			let str = "周" + "日一二三四五六".charAt(new Date().getDay());
			return this.type === "reminder" ? str + " " + "下午11:00": str;
		},
		tomorrow: function () {
			let str = "周" + "日一二三四五六".charAt((new Date().getDay() + 1) % 7);
			return this.type === "reminder" ? str + " " + "上午9:00": str;
		},
		nextWeek: function () {
			let str = "周" + "日一二三四五六".charAt(new Date().getDay());
			return this.type === "reminder" ? str + " " + "上午9:00": str;
		},
		selectedTime: function () {
			let time = this.finalTime.getHours().toString().padStart(2, "0") + ":" + this.finalTime.getMinutes().toString().padStart(2, "0");
			return "在" + time + "时提醒我";
		},
		selectedDate: function () {
			let dates = this.finalTime.getFullYear().toString().padStart(4, "0") + "年"
                + (this.finalTime.getMonth() + 1).toString().padStart(2, "0") + "月"
                + this.finalTime.getDate().toString().padStart(2, "0") + "日";
			return this.type === "reminder" ? dates : dates + "到期";
		}
	},
	methods: {
		arrowDown() {
			this.isShowSelect = !this.isShowSelect;
		},
		select(item) {
			this.hasSelected = true;
			this.isShowSelect = false;
			this.finalTime = item.time;
			// 向上抛出
			this.$emit("saveTimeChoose", item.time, this.type);
		},
		showDatePicker() {
			this.isShowSelect = false;
			this.isDatePickerShow = true;
		},
		cancelDatePicker()  {
			this.isDatePickerShow = false;
		},
		deleteTimeChoose() {
			this.hasSelected = false;
			// 向上抛出
			this.$emit("deleteTimeChoose", this.type);
		},
		saveTimeChoose(date) {
			this.finalTime = date;
			// 向上抛出
			this.$emit("saveTimeChoose", date, this.type);
		}
	}
};
</script>

<style lang="scss" scoped>
    .time-choose {
        cursor: pointer;
        position: relative;
        .select-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-items: center;
            padding: 0 5px;

            img:first-child {
                order: -1;
                width: 20px;
                height: 20px;
                vertical-align: middle;
            }

            span {
                flex-grow: 1;
                vertical-align: middle;
                text-align: left;
                margin-left: 12px;
            }
            .select-res {
                display: flex;
                flex-direction: column;
            }
            img:last-child {
                width: 20px;
                height: 20px;
                vertical-align: middle;
            }
        }
        .select-list {
            position: absolute;
            top: -20px;
            left: 5px;

            margin: 1em;
            padding: 0 0.4em;
            border: 1px solid gainsboro;
            background-color: gainsboro;
            z-index: 999;
            border-radius: 3px;

            .select-item {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .select-item:hover {
                background-color: lightgreen;
            }
            .select-cust {
                p {
                    margin-bottom: 0;
                }
                text-align: left;
            }
            .select-cust:hover {
                background-color: lightgreen;
            }
        }
    }

</style>
