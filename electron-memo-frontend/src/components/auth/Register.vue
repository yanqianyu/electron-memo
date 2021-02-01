<template>
    <div class="register">
        <div class="picture"><img src="../../assets/data_organization_monochromatic.svg"></div>
        <div class="register-form">
            <div class="register-username">
                <input type="email" name="email" id="email" class="register-email" placeholder="邮箱地址" v-model="email">
            </div>
            <div class="register-password">
                <input type="password" name="password" id="password" class="register-pwd" placeholder="密码"
                       v-model="password">
            </div>
            <div class="register-btn">
                <button v-on:click="toLogin">返回登录</button>
                <button v-on:click="register">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "Register",
	data: function () {
		return {
			email: "",
			password: ""
		};
	},
	mounted() {

	},
	methods: {
		register() {
			this.$store.dispatch("register", {
				email: this.email,
				password: this.password
			}).then(resp => {
				console.log(resp);
				this.$router.push({name: "index"});
			}).catch(err => {
				console.log(err);
				this.email = "";
				this.password = "";
			});
		},
		toLogin: function () {
			// 跳转到登录页面
			this.$router.push({
				name: "login"
			});
		}
	}
};
</script>

<style lang="scss" scoped>
    @media screen and (min-aspect-ratio: 1/1){
        .register {
            display: flex;
        }
        .picture {
            flex: 0 0 25rem;
        }
        .register-form {
            flex: 1;
        }
    }
    .register {
        .register-form {
            // 内容垂直方向居中
            display: flex;
            flex-direction: column;
            margin: auto;
            text-align: center;

            .register-username {
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

            .register-password {
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

            .register-btn {
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
    }
</style>
