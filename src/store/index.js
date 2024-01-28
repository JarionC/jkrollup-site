// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import signin from '../api/signin'
import signup from '../api/signup'
import utils from '../utils'
import storage from './storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storage.get('user') ? storage.get('user') : null,
    cart: storage.get('cart') ? storage.get('cart') : [],
    admin: storage.get('admin') ? storage.get('admin') : null
  },
  mutations: {
    SET_ADMIN(state, admin){
      state.admin = admin;
      storage.set('admin', admin, 120);
    },
    SET_USER(state, user) {
      state.user = user;
      storage.set('user', user, 120); // Set cookie to expire in 2 hours
    },
    CLEAR_USER(state) {
      state.user = null;
      storage.remove('user');
    },
    CLEAR_admin(state){
      state.admin = null;
      storage.remove('admin');
    },
    SET_CART(state, cart){
      state.cart = cart;
      storage.set('cart', cart, 120);
    },
    CART_ADD(state, cartItem){

      var cartItemIndex = state.cart.findIndex( x => x.productId === cartItem.productId);
      var foundMatch = false;
      if(cartItemIndex == -1){
        cartItem['itemId'] = state.cart.length + 1;
        state.cart.push(cartItem);
      }
      else{

        state.cart.forEach((element, index) => {
          //check custom fields
          if(utils.productsAreEqual(element, cartItem)){
            var temp = state.cart[cartItemIndex];
            temp.quantity = state.cart[cartItemIndex].quantity + cartItem.quantity;
            state.cart.splice(cartItemIndex, 1);
            state.cart.push(temp);
            foundMatch = true;
          }
        });

        if(!foundMatch){
          cartItem['itemId'] = state.cart.length + 1;
          state.cart.push(cartItem);
        }
        
        //Vue.set(state.cart[cartItemIndex], state.cart[cartItemIndex]['quantity'], (state.cart[cartItemIndex].quantity + cartItem.quantity));
        //state.cart[cartItemIndex].quantity = state.cart[cartItemIndex].quantity + cartItem.quantity;
      }
      storage.set('cart', state.cart, 120);
      
    },

    CART_REMOVE(state, cartItem){
      var cartItemIndex = state.cart.findIndex( x => x.productId === cartItem.productId);

      if(cartItemIndex != -1){
        state.cart.splice(cartItemIndex, 1);
      }
      
      storage.set('cart', state.cart, 120);
    },

    CLEAR_CART(state){
      state.cart = [];
      storage.remove('cart');
    }
  },
  getters :{
    cartContents(state){
      return state.cart;
    },
    adminStatus(state){
      return state.admin;
    },
    cartTotal(state){
      if(!state.cart || state.cart.length == 0){
        return 0;
      }
      
      var quantityArray = state.cart.map(p => (p.price * p.quantity));

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
    logoutAdmin({ commit }, admin){
      commit('CLEAR_ADMIN');
    },
    logout({ commit }) {
      commit('CLEAR_USER');
    },
    addCartItem({ commit }, cartItem) {
      commit('CART_ADD', cartItem);
    },
    removeCartItem({commit}, cartItem){
      commit('CART_REMOVE', cartItem);
    },
    clearCart({commit}){
      commit('CLEAR_CART');
    }

  }
})
