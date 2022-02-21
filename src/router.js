import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./views/AdminPage.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('./views/UserPage.vue')
        },
        {
            path: '*',
            name: 'Not Found',
            component: () => import('./views/error/404.vue')
        },
        {
            path: '/401',
            name: 'Access Denied',
            component: () => import('./views/error/401.vue')
        }
    ]
});

