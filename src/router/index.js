import App from '../App'
import Login from "../components/auth/Login";

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/app',
        name: 'app',
        component: App,
        meta: {
            requiresAuth: true
        }
    }
]

export default routes
