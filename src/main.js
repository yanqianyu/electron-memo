import Vue from 'vue'

import VueRouter from 'vue-router'
import axios from './http/api'
import './mock/mock.js'
import routes from "./router";
import {store} from "./store";
import Login from "./components/auth/Login";

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
  render: h => h(Login),
  router,
  store
}).$mount('#app')
