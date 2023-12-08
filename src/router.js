import Vue from 'vue';
import Router from 'vue-router';
import ATS from './views/ATS';
import HomePage from './views/NewHomePage';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ContactView from './views/ContactView';
import AboutView from './views/AboutUs';
import RegistrationView from './views/RegistrationView';
import CustomRequest from './views/printing/CustomRequest';
import ProductsView from './views/printing/ProductsView';
import ProductView from './views/products/ProductView';
import AdminLogin from './views/admin/AdminLogin';
import AdminControls from './views/admin/AdminControls';
import CheckoutView from './views/checkout/CheckoutView';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    //{ path: '/', redirect: { name: 'ats' } },
    { path: '/', component: HomePage,  name: 'home' },
    { path: '/home', component: HomePage,  name: 'home' },
    { path: '/customrequest', component: CustomRequest,  name: 'customrequest' },
    { path: '/products', component: ProductsView,  name: 'products' },
    { path: '/products/:productId', component: ProductView,  name: 'product' },
    { path: '/contact', component: ContactView,  name: 'contact' },
    { path: '/about', component: AboutView,  name: 'about' },
    { path: '/ats', component: ATS, name: 'ats' },
    { path: '/sign-in', component: SignIn, name: 'signin' },
    { path: '/sign-up', component: SignUp, name: 'signup' },
    { path: '/admin', component: AdminLogin, name: 'admin' },
    { path: '/admin/controls', component: AdminControls, name: 'admincontrols' },
    { path: '/checkout', component: CheckoutView, name: 'checkout' },
    { path: '/registration/:registrationId', component: RegistrationView, name: 'registration' }

  ]
});


export default router;
