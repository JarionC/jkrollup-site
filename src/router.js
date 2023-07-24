import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import RegistrationView from './views/RegistrationView';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/sign-in', component: SignIn, name: 'signin' },
    { path: '/sign-up', component: SignUp, name: 'signup' },
    { path: '/registration/:registrationId', component: RegistrationView, name: 'registration' }
  ]
});


export default router;
