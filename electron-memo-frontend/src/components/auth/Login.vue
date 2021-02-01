<template>
    <div class="login">
        <div class="picture"><img src="../../assets/data_organization_monochromatic.svg"></div>
        <div class="login-form">
            <div class="login-username">
                <input type="email" name="email" id="email" class="login-email" placeholder="邮箱地址" v-model="email">
            </div>
            <div class="login-password">
                <input type="password" name="password" id="password" class="login-pwd" placeholder="密码"
                       v-model="password">
            </div>
            <div class="login-btn">
                <button v-on:click="login">登录</button>
            </div>
            <div class="to-register">
                <span style="color: darkgrey">没有账户</span>
                <span v-on:click="toRegister" style="color: #4e89ae; cursor: pointer">免费注册</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			email: "",
			password: ""
		};
	},
	mounted() {
		if (window.ipcRender) {
			window.ipcRender.send("login-window");
		}
	},
	methods: {
		login: function () {
			// 通过store向后台发送登录表单
			// 登录成功跳转
			// this.$router.push({path: "/builtinList", query: {listid: "1"}});
			// 登陆成功，服务端返回所有的todo，存在localstorage中？
			this.$store.dispatch("login", {
				email: this.email,
				password: this.password
			}).then(resp => {
				console.log(resp);
				this.$router.push({
					name: "todo"
				});
			}).catch(err => {
				console.log(err);
				console.log("登录失败");
				this.email = "";
				this.password = "";
			});
		},
		toRegister: function () {
			// 跳转到注册页面,
			this.$router.push({
				name: "register"
			});
		}
	}
};
</script>

<style lang="scss" scoped>
    // 根据高宽比
    @media screen and (min-aspect-ratio: 1/1){
        .login {
           display: flex;
        }
        .picture {
            flex: 0 0 25rem;
        }
        .login-form {
            flex: 1;
        }
    }
    .login {
        .login-form {
            // 内容垂直方向居中
            display: flex;
            flex-direction: column;
            margin: auto;
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

            .to-register {
                font-size: 1rem;
                text-align: center;

                span {
                    margin: 0.5rem;
                }
            }
        }

    }
</style>
