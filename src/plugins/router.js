import { merge as _merge, cloneDeep as _cloneDeep } from 'lodash-es';
import { createRouter, createWebHashHistory } from 'vue-router';
let routeFiles = import.meta.glob('@/pages/**/route.js', { eager: true });
let pageFiles = import.meta.glob('@/pages/**/index.vue');
let layoutFiles = import.meta.glob('@/layouts/**/index.vue');

let routes = [];

// 以路由文件为基础遍历
for (let key in routeFiles) {
    // 路由路径
    let routePath = key.replace(/.*\/pages/, '').replace('/route.js', '');
    console.log('🚀 ~ file: router.js ~ line 14 ~ routePath', routePath);
    let mod = routeFiles[key];
    let routeData = mod.default || {};

    // 如果没有设置路由，则自动设置（考虑是否禁止手动设置）
    if (!routeData.path) routeData.path = routePath;

    if (routeData.layout !== undefined) {
        // 如果定义了框架属性
        if (routeData.layout !== false) {
            routeData.component = layoutFiles[`/src/layouts/${routeData.layout}/index.vue`];
            // 定义当前页面组件
            routeData.children = _merge(
                [
                    {
                        path: '',
                        component: pageFiles[key.replace('/route.js', '/index.vue')]
                    }
                ],
                _cloneDeep(routeData.children || [])
            );
        } else {
            // 如果框架为false，则当前页面取代框架位置
            routeData.component = pageFiles[key.replace('/route.js', '/index.vue')];
        }
    } else {
        // 如果没有定义框架，则默认每个页面都有框架
        routeData.component = () => import('@/layouts/default/index.vue');
        // 定义当前页面组件
        routeData.children = _merge(
            [
                {
                    path: '',
                    component: pageFiles[key.replace('/route.js', '/index.vue')]
                }
            ],
            _cloneDeep(routeData.children || [])
        );
    }

    routes.push(routeData);
}
console.log('🚀 ~ file: router.js ~ line 55 ~ routes', routes);
// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;
