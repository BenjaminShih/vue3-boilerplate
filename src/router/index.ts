import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
    history: createWebHistory(process.env.BASE_URL || '/vue3-boilerplate/'),
    routes,
})

export default router