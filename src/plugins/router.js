import { createRouter, createWebHashHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const routes = setupLayouts(generatedRoutes);

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;
