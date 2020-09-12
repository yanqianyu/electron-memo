import layout from "@/components/layout";
import Login from "@/components/auth/Login";

const routes = [
    {
        path: '/',
        redirect: '/login',
        name: 'app',
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/todo',
        name: 'todo',
        component: layout,
        meta: {
            requiresAuth: false
        }
    }
]

export default routes
