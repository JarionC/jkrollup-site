import Vue from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import store from './store'
import Vuex from 'vuex';

import fontawesome from '@fortawesome/fontawesome';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";
/* add icons to the library */
library.add(faUserSecret)
library.add(brands, solid);
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuex);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false;
