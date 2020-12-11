import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home.vue'),
    },
    {
        path: '/error',
        name: 'Error',
        component: () => import('../pages/Error.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router