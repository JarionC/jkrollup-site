// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import signin from '../api/signin'
import signup from '../api/signup'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [],
    admin: Cookies.get('admin') ? Cookies.get('admin') : null
  },
  mutations: {
    SET_ADMIN(state, admin){
      state.admin = admin;
      Cookies.set('admin', admin, {expires : 1/12});
    },
    SET_USER(state, user) {
      state.user = user;
      Cookies.set('user', JSON.stringify(user), { expires: 1/12 }); // Set cookie to expire in 2 hours
    },
    CLEAR_USER(state) {
      state.user = null;
      Cookies.remove('user');
    },
    SET_CART(state, cart){
      state.cart = cart;
      Cookies.set('cart', JSON.stringify(cart), { expires: 1/12 });
    },
    CART_ADD(state, cartItem){
      var cartItemIndex = state.cart.findIndex( x => x.name === cartItem.name);
      if(cartItemIndex == -1){
        state.cart.push(cartItem);
      }
      else{
        state.cart[cartItemIndex] = cartItem;
      }
      Cookies.set('cart', JSON.stringify(state.cart), { expires: 1/12 });
    },

    CART_REMOVE(state, cartItem){
      var cartItemIndex = state.cart.findIndex( x => x.name === cartItem.name);

      if(cartItemIndex != -1){
        state.cart.splice(cartItemIndex, 1);
      }
      
      Cookies.set('cart', JSON.stringify(state.cart), { expires: 1/12 });
    },

    CLEAR_CART(state){
      state.cart = [];
      Cookies.remove('cart');
    }
  },
  getters :{
    cartContents(state){
      return state.cart;
    },
    cartTotal(state){
      if(!state.cart || state.cart.length == 0){
        return 0;
      }
      var quantityArray = state.cart.map(p => p.price);

      var sum = quantityArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)

      return sum;
    },
    cartQuantity(state){
      if(!state.cart || state.cart.length == 0){
        return 0;
      }
      var quantityArray = state.cart.map(p => p.quantity);

      var sum = quantityArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)

      return sum;
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
    },
    addCartItem({ commit }, cartItem) {
      commit('CART_ADD', cartItem);
    },
    removeCartItem({commit}, cartItem){
      commit('CART_REMOVE', cartItem);
    }

  }
})
