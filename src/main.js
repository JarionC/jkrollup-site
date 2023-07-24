import Vue from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import store from './store'
import Vuex from 'vuex';

Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false;
