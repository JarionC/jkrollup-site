<template>
    <div v-if="$store" class="flex justify-center items-center h-screen">
        
        <div v-if="failedSignUp">This user already exists. Please sign in.</div>
      <div id="g_id_onload"
           :data-client_id="getClientId"
           data-callback="onSignIn"
           data-auto_prompt="false">
      </div>
      <div class="g_id_signin"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import store from '../store';
  import utils from '../utils';
  
  export default {
    data() {
      return {
        failedSignUp : false,
      };
    },
      mounted: function(){
          window.onSignIn = this.onSignIn;
          this.failedSignUp = this.$route.params.failedSignUp;
      },
      computed: {
          getClientId: function(){
              return process.env.VUE_APP_CLIENT_ID;
          }
      },
      methods: {
        onSignIn(googleUser) {
        // Extract email from Google response
        var googleProfile = utils.decodeJwtResponseFromGoogleAPI(googleUser.credential);
        const email = googleProfile.email;

        // Send request to your backend to check if email exists in your database
        axios.post(process.env.BACK_END_URL + '/login', { userId : email })
            .then(response => {
                if (response.data) {
                    if(response.data.status == "login_successful")
                    {
                    // Email exists in your database, user is authenticated
                    // Store user information in Vuex store
                        this.$store.commit('SET_USER', JSON.parse(response.data.userData));
                        this.$router.push("home");
                    }
                    else if (response.data.status == "login_failed"){
                        
                        //Login Failed error message

                    }

                    // Optionally, you can redirect the user to a different page
                    // this.$router.push('/dashboard');
                } else {
                    //Login Failed Error Message
                }
            })
            .catch(error => {
                // Handle error
                console.error("error logging in", error);
            });
        }
    },
  };
  </script>
  