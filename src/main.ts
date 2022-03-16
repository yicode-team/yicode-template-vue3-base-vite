import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';

// 自动导入页面路由
import routes from '~pages';

// 导入应用模板
import App from './App.vue';

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

// 创建实例
const app = createApp(App);

// 挂载组件
app.use(createPinia());
app.use(router);

// 挂载应用
app.mount('#app');
