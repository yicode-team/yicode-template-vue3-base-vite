import { createApp } from 'vue';
import router from '@/plugins/router.js';
import store from '@/plugins/store.js';

import App from './App.vue';

// 创建实例
const app = createApp(App);

// 挂载组件
app.use(store);
app.use(router);

// 挂载应用
app.mount('#app');
