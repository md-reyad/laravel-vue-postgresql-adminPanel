require('./bootstrap');
window.Vue = require('vue');

import App from './app.vue';
import VueRouter from 'vue-router';

import VueAxios from 'vue-axios';
import Vuelidate from 'vuelidate'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'


import axios from 'axios';
import {routes} from './routes';
Vue.use(Toaster, {timeout: 5000})
Vue.use(Vuelidate)
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
});
