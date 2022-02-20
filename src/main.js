import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css'
import './assets/css/style.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import Toasted from 'vue-toasted';
import setupInterceptors from './services/setup-interceptors';

Vue.config.productionTip = false;
Vue.use(Toasted, {
    duration: 3000,
    position: 'top-center',
    iconPack: 'material'
});
Vue.use(VeeValidate);
Vue.use(Vuex);

setupInterceptors(store);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');



