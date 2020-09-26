import Login from "@/components/auth/Login";
import {store} from "@/store";
import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/Layout";

Vue.use(Router)

export const router = new Router({
    routes:
        [
            {
                path: '/',
                name: 'index',
                redirect: '/login',
                component: Login
            },
            {
                path: '/todo',
                name: 'todo',
                component: Layout,
                meta: {
                    requireAuth: false
                }
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            }
        ]
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!store.getters.login) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    }
    else {
        // !!! 导航守卫
        next()
    }
})
