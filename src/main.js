import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from './http/api'
import './mock/mock.js'
import routes from "./router";
import {store} from "./store";

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
