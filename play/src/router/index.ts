import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/button'
    },
    {
        path: '/button',
        name: 'Button',
        component: () => import('../views/button/index.vue'),
        meta: {
            group: '组件',
            title: 'Button'
        }
    },
    {
        path: '/use-focus',
        name: 'UseFocus',
        component: () => import('../views/use-focus/index.vue'),
        meta: {
            group: 'Hooks',
            title: 'useFocus'
        }
    }
]

export const menuGroups = [
    {
        name: '组件',
        items: [{ path: '/button', title: 'Button' }]
    },
    {
        name: 'Hooks',
        items: [{ path: '/use-focus', title: 'useFocus' }]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

