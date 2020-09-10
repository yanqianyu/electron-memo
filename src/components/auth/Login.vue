<template>
    <div class="login">
        <div class="slogan">欢迎使用ToDo</div>
        <div class="picture"><img src=""></div>
        <div class="login-form">
            <div class="login-username">
                <input type="email" name="email" id="email" class="login-email" placeholder="邮箱地址" v-model="email">
            </div>
            <div class="login-password">
                <input type="password" name="password" id="password" class="login-pwd" placeholder="密码" v-model="password">
            </div>
            <div class="login-btn">
                <button onclick="login">登录</button>
            </div>

        </div>
        <div class="to-register">
            <span style="color: darkgrey">没有账户</span>
            <span onclick="" style="color: #4e89ae; cursor: pointer">免费注册</span>
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
.login {
    .slogan {
        text-align: center;
        font-size: 2rem; // rem em px的区别
    }
    .login-form {
        text-align: center;
        .login-username {
            padding: 0.5rem;
            input {
                padding: 0.2rem;
                outline: none; // 去掉选中状态边框
                border: 0.08rem solid #4e89ae; // 只设置color会有阴影样式
                border-radius: 0.3rem;
                width: 75%;
                height: 2rem;
            }
        }
        .login-password {
            padding: 0.5rem;
            input {
                padding: 0.2rem;
                outline: none; // 去掉选中状态边框
                border: 0.08rem solid #4e89ae; // 只设置color会有阴影样式
                border-radius: 0.3rem;
                width: 75%;
                height: 2rem;
            }
        }
        .login-btn {
            /*padding: 0.5rem;*/
            button {
                margin: 1rem;
                padding: 0;
                border: none;
                border-radius: 0.3rem;
                width: 73%;
                height: 2.3rem;
                background-color: #4e89ae;
                color: white; // 字体颜色
                font-size: 0.8rem;
            }
        }
    }
    .to-register {
        text-align: center;
        span {
            margin: 0.5rem;
        }
    }
}
</style>
