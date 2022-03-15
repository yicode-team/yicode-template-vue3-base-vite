import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import routes from '~pages';
console.log('routes=============');
console.log(routes);
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
// import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
