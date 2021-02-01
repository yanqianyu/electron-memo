import Vue from "vue";
import axios from "./http/api";
import {router} from "./router";
import {store} from "./store";
import App from "@/App";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

if (process.env.MOCK) {
	require("./mock/mock.js");
}

new Vue({
	render: h => h(App),
	router,
	store
}).$mount("#app");
