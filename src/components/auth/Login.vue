<template>
    <div class="login">
        <div class="login-form">
            <div class="login-username">
                <label for="email">邮箱</label>
                <input type="email" name="email" id="email" class="login-un" v-model="email">
            </div>
            <div class="login-password">
                <label for="password">密码</label>
                <input type="password" name="password" id="password" class="login-pwd" v-model="password">
            </div>
            <div class="login-btn">
                <button onclick="login">登录</button>
            </div>

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
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                // 通过store向后台发送登录表单
                // 登录成功跳转
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                    // eslint-disable-next-line no-unused-vars
                }).then(resp => {
                    this.$route.push({name: 'app'})
                }).catch(err => {
                    // todo：error信息的显示
                    console.log(err)
                    this.email = ''
                    this.password = ''
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
