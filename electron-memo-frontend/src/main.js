import Vue from "vue";
import axios from "./http/api";
import "./mock/mock.js";
import {router} from "./router";
import {store} from "./store";
import App from "@/App";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
	render: h => h(App),
	router,
	store
}).$mount("#app");
