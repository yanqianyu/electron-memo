<template>
    <div class="time-choose">
        <ul>
            <li value="1">
                <!--todo: 如果现在超过了晚上8点，则这一项不能选-->
                <span>今天晚些时候</span>
                <span>{{todayLater}}</span>
            </li>
            <li value="2">
                <span>明天</span>
                <span>{{tomorrow}}</span>
            </li>
            <li value="3">
                <span>下周</span>
                <span>{{nextWeek}}</span>
            </li>
            <li>选择日期和时间</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "TimeChoose",
        props: {

        },
        data: function() {
            return {

            }
        },
        computed: {
            todayLater: function () {
                // 获取当前时间
                let now = new Date().getHours();
                if(now > 20) {
                    return "";
                }
                // 获取今天是周几
                let str = "周" + "日一二三四五六".charAt(new Date().getDay());
                return str + " " + "下午11:00";
            },
            tomorrow: function () {
                let str = "周" + "日一二三四五六".charAt((new Date().getDay() + 1) % 7);
                return str + " " + "上午9:00";
            },
            nextWeek: function () {
                let str = "周" + "日一二三四五六".charAt(new Date().getDay());
                return str + " " + "上午9:00";
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
.time-choose {
    ul {
        li {
            display: flex;
            flex-direction: row;
            list-style-type: none;
            justify-content: space-between;
        }
    }
}
</style>
