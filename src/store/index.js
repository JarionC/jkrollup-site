// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import signin from '../api/signin'
import signup from '../api/signup'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      Cookies.set('user', JSON.stringify(user), { expires: 1/12 }); // Set cookie to expire in 2 hours
    },
    CLEAR_USER(state) {
      state.user = null;
      Cookies.remove('user');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await signin.signin(credentials);
      commit('SET_USER', response.data);
    },
    async register({ commit }, user) {
      const response = await signup.signup(user);
      commit('SET_USER', response.data);
    },
    logout({ commit }) {
      commit('CLEAR_USER');
    }
  }
})
