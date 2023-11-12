<template>
  <nav v-if="this.$store">
    <div v-if="this.$store.state.user">
      Welcome, {{ this.$store.state.user.displayName }}!
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <router-link to="/sign-in">Login</router-link>
      <router-link to="/sign-up">Signup</router-link>
      
      <router-link :to="{ name: 'registration', params: { registrationId: '123' }}">Registration</router-link>
    </div>
  </nav>
</template>

<script>

import { mapState } from 'vuex';

export default {
    data() {
      return {
        displayName : ""
      };
    },

  computed: {
    ...mapState(['user']),
    currentUser() {
      return this.user;
    }
  },
  mounted: function(){
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>
