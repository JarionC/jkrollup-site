<template>
    <div class="registration-container">
      <div class="page-message">{{ pageMessage }}</div>
    </div>
  </template>
  
  <script>
  import store from '../store';
  
  import axios from 'axios';

  export default {
    data() {
      return {
        registered : false,
        registrationId : '',
        pageMessage: "Waiting For Server Response..."
      };
    },
    name: 'RegistrationView',
    props: {
    },
    mounted(){
        var referer = ""
        this.registrationId = this.$route.params.registrationId;
        axios.post(process.env.BACK_END_URL + '/api/registration/' + this.registrationId, { referer : referer })
            .then(response => {
                if (response.status == 200) {
                   this.pageMessage = "Client Verified. You can close this window and return to the JK-Rollup Client."
                } else if (response.status == 404){
                    this.pageMessage = "Registration Not Found. Please try again or contact JK-Rollup Support";
                }
            })
            .catch(error => {
                // Handle error
                this.pageMessage = "Error";
                console.error("error logging in", error);
            });
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .registration-container{
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;


  }

  .page-message{
    font-size:3em;
    font-weight:bold;
  }
  </style>
  