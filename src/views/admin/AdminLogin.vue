<template>
    <div class="admin-login-container">
        <div class="login-form">
            <div class="login-title">
                ADMIN LOGIN
            </div>
            <input class="user-field" placeholder="USERNAME" v-model="userName"/>
            <input class="password-field" placeholder="PASSWORD" v-model="password"/>
            <div class="login-button" v-on:click="onSignIn">LOGIN</div>
        </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../../api/app';
  
  export default {
    data() {
      return {
        loginResponse: "",
        userName: "",
        password: ""
      };
    },
    created(){
        if(this.$store.state.admin)
        {
            
            this.$router.push("admincontrols").catch(()=>{});
        }
    },
      mounted: function(){
      },
      computed: {
        validated: function(){
            return this.userName && this.password;
        }
      },
      methods: {
        onSignIn() {
        console.log("Logging in as Admin...");
            if(!this.userName || !this.password){
                this.loginResponse = "MISSING USERNAME OR PASSWORD";
                return;
            }
        // Send request to your backend to check if email exists in your database
        apiClient.adminLogin(this.userName, this.password)
            .then(response => {

                if(response.data.value == "success"){
                    console.log("Login Successful");
                    this.$store.commit('SET_ADMIN', this.userName);
                    this.$router.push({name: "admincontrols"}).catch(()=>{});
                }
                else{
                    console.log("Login Failed.")
                    this.loginResponse = "LOGIN FAILED";
                }
            })
            .catch(error => {
                // Handle error
                console.error("error logging in", error);
                
                this.loginResponse = "LOGIN FAILED";
            });
        }
    },
  };
  </script>
  <style>
  .admin-login-container{
    height:100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    color:white;
  }
  .login-title{
    font-size: 1em;
    font-weight:bold;
    
  }
  .login-form{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width:300px;
    gap: 1em;
  }

  .user-field{
    width:100%;
  }

  .password-field{
    width:100%;
  }

  .login-button{
    width:100%;
    background-color:blue;
    color:white;
    font-size: .8em;
    font-weight:bold;
    cursor: pointer;
    height:2em;
    display:flex;
    align-items: center;
    justify-content: center;
  }
</style>