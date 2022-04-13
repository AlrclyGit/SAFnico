
import { createRouter, createWebHashHistory, } from 'vue-router'
import Home from '../pages/Home.vue'
import Main from '../pages/Main.vue'
import Daliy from '../pages/Daily.vue'
import Random from '../pages/Random.vue'

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            { path: '/', redirect: '/main' }, // 重定向路由
            { path: '/main', component: Main },
            { path: '/daily', component: Daliy },
            { path: '/random', component: Random },
        ]

    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})
