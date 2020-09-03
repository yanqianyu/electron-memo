<template>
    <div class="login">
        <div class="login-form">
            <input type="email" name="username" id="username" class="login-un" v-model="username">
            <input type="password" name="password" id="password" class="login-pwd" v-model="password">
            <button onclick="login">登录</button>
        </div>
        <div class="to-register">
            <span>没有账户</span>
            <span>免费注册</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                // 通过store向后台发送登录表单
                // 登录成功跳转
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
