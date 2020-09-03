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
        component: App
    }
]

export default routes
