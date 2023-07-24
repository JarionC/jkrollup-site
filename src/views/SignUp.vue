<template>
    <div v-if="$store" class="flex justify-center items-center h-screen">

        <div>
          <label for="displayName">Display Name:</label>
          <input id="displayName" v-model="displayName" type="text">
        </div>
        <div>
          <label for="tier">Tier:</label>
          <input id="tier" v-model="tier" type="text">
        </div>
        <div id="g_id_onload"
     data-client_id="487527329078-sk90claiu1e0k007q6ruftad9lmvc0ot.apps.googleusercontent.com"
     data-context="signup"
     data-ux_mode="popup"
     data-callback="onSignUp"
     data-auto_prompt="false">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import store from '../store';
  import utils from '../utils';
  
  export default {
    data() {
      return {
        displayName: '',
        tier: '',
      };
    },
    mounted: function(){
      window.onSignUp = this.onSignUp;
    },
    computed: {
      getClientId: function(){
        return process.env.VUE_APP_CLIENT_ID;
      },
      dataIsValid: function(){
        return !!(this.displayName && this.tier)
      }
    },
    methods: {
      onSignUp(googleUser) {
        // Extract email from Google response

        var googleProfile = utils.decodeJwtResponseFromGoogleAPI(googleUser.credential);
        const email = googleProfile.email;

        // Send request to your backend to check if email exists in your database
        axios.post(process.env.BACK_END_URL + '/signup', { userId : email, displayName : this.displayName, tier : this.tier })
            .then(response => {
                if (response.data) {
                    if(response.data.status == "signup_successful")
                    {
                    // Email exists in your database, user is authenticated
                    // Store user information in Vuex store
                        this.$store.commit('SET_USER', JSON.parse(response.data.userData));
                    }
                    else if (response.data.status == "user_exists"){
                        
                        this.$router.push({
                            name: 'signin', // Use the name of the route
                            params: { failedSignUp: true }, // Data passed as params (not visible in URL)
                        });

                    }

                    // Optionally, you can redirect the user to a different page
                    // this.$router.push('/dashboard');
                } else {
                    //Login Failed Error Message
                }
            })
            .catch(error => {
                // Handle error
                console.error("error signing up user", error);
            });
        }

    },
  };
  </script>
  

  