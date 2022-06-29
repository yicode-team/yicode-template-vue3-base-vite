import { createRouter, createWebHashHistory } from 'vue-router';
import { routeConfig } from '@/config/route.js';
let files = import.meta.glob('@/pages/**/index.vue');
let routes = [];

for (let key in files) {
    let route = key.replace('/src/pages', '').replace('/index.vue', '');
    routes.push({
        path: route,
        component: import('@/layouts/default.vue'),
        children: [
            {
                path: '/',
                component: files[key]
            }
        ]
    });
}

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;
