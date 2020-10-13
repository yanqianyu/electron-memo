<template>
    <!--todo: 自己定义组件-->
    <div class="date-picker">
        <input :type="pickerType" v-model="choose_time">
        <button v-on:click="saveDate">保存</button>
        <button v-on:click="cancelDate">取消</button>
    </div>
</template>

<script>
    export default {
        name: "DateChoose",
        props: {
            type: String
        },
        data: function() {
            return {
                choose_time: null
            }
        },
        computed: {
            pickerType: function () {
                if(this.type === 'reminder') {
                    return "datetime-local";
                }
                else if(this.type === "ddl") {
                    return "date";
                }
                return "repeat"
            }
        },
        methods: {
            saveDate() {
                this.$emit("settingTime", this.choose_time);
                this.$emit("cancelDatePicker");
            },
            cancelDate() {
                this.$emit("cancelDatePicker");
            }
        }
    }
</script>

<style scoped>

</style>
