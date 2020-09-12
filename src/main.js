import Vue from 'vue'

import VueRouter from 'vue-router'
import axios from './http/api'
import './mock/mock.js'
import routes from "./router";
import {store} from "./store";
import App from "@/App";

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.login) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
