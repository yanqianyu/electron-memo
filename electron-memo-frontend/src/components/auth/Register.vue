<template>
    <div class="register">
        <div class="slogan"></div>
        <div class="register-form">
            <div class="register-username">
                <input type="email" name="email" id="email" class="register-email" placeholder="邮箱地址" v-model="email">
            </div>
            <div class="register-password">
                <input type="password" name="password" id="password" class="register-pwd" placeholder="密码"
                       v-model="password">
            </div>
            <div class="reigister-btn">
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
        }
    },
    mounted() {

    },
    methods: {
		register() {
			this.$store.dispatch('register', {
			    email: this.email,
                password: this.password
            }).then(resp => {
            	console.log(resp);
            	this.$route.push({name: 'index'})
            }).catch(err => {
            	console.log("注册失败")
                this.email = "";
            	this.password = "";
            })
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
