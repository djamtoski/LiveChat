import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/pages/home';
import Login from '../components/pages/login';
import Register from '../components/pages/register';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});