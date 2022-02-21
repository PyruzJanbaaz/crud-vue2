import Vue from 'vue'
import VueRouter from 'vue-router'
import {Trans} from '@/plugins/Translation'

function load(component) {
    // '@' is aliased to src/components
    return () => import(`@/views/${component}.vue`)
}

Vue.use(VueRouter)

const routes = [{
    path: '/:locale',
    component: {
        template: "<router-view></router-view>"
    },
    beforeEnter: Trans.routeMiddleware,
    children: [
        {
            path: '',
            name: 'Home',
            component: load('Home')
        },
        {
            path: 'home',
            name: 'Home',
            component: load('Home')
        },
        {
            path: 'login',
            name: 'Login',
            component: load('Login')
        },
        {
            path: 'register',
            name: 'Register',
            component: load('Register')
        },
        {
            path: 'profile',
            name: 'Profile',
            component: load('Profile')
        },
        {
            path: 'admin',
            name: 'Admin',
            component: load('AdminPage')
        },
        {
            path: 'user',
            name: 'User',
            component: load('UserPage')
        },
        {
            path: '*',
            name: 'NotFound',
            component: load('404')
        },
        {
            path: '401',
            name: 'Access Denied',
            component: load('401')
        }
    ]
},
    {
        path: '*',
        redirect() {
            return Trans.defaultLocale;
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;


/*
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
*/
