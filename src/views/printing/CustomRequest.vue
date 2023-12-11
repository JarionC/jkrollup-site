<template>
    <div class="custom-request-container">
        <div class="custom-request-header">
            <div class="vid-container">
                <video autoplay muted loop id="myVideo">
                    <source src="../../img/3dtimelapse-bg_v2.mp4" type="video/mp4">
                </video>
            </div>
            <div class="custom-request-title-container">
                <div class="custom-request-title">
                    3D Printing Custom Request
                </div>
            </div>
        </div>
        <div class="custom-request-description">
            Please fill out the form below to request a custom 3D Printing and crafting service. We'll be in touch within 48 hours to discuss the service, detailing, and cost. We currently accept CashApp, PayPal, Money Orders, and limited Cryptocurrencies as payment, but we are are able to consider other payment methods upon request.
        </div>
        <div class="custom-request-form-container">
            <div class="form-item">
                <div class="form-label">
                    Name
                </div>
                <input v-model="formName" type="text" class="form-input" v-bind:disabled="formDisabled"/>
            </div>
            <div class="form-item">
                <div class="form-label">
                    Email Address
                </div>
                <input v-model="formEmail" type="text" class="form-input" v-bind:disabled="formDisabled"/>
            </div>
            <div class="form-item">
                <div class="form-label">
                    Phone Number (Optional)
                </div>
                <input v-model="formPhone" type="text" class="form-input" v-bind:disabled="formDisabled"/>
            </div>
            <div class="form-item">
                <div class="form-label">
                    3D Model (Optional)
                </div>
                <div class="form-description">
                    Please upload as a ZIP file. While STL is the most convenient format, we can work with a wide range of formats : FBL, OBJ, etc. We can also work with ideas you would like to see come to life!
                </div>
                <input  v-on:change="fileUpdated" accept=".zip" type="file" class="form-input" v-bind:disabled="formDisabled"/>
            </div>
            <div class="form-item">
                <div class="form-label">
                    Budget (Optional)
                </div>
                <input v-model="formBudget" type="text" class="form-input" v-bind:disabled="formDisabled"/>
            </div>
            <div class="form-item">
                <div class="form-label">
                    Date Needed (Optional)
                </div>
                <input v-model="formDate" type="date" class="form-input" v-bind:disabled="formDisabled"/>
            </div>
            <div class="form-item">
                <div class="form-label">
                    Notes/Instructions
                </div>
                <div class="form-description">
                    Please include any additional details here. (Product Description, Shipping Details, Printing Material, Timeline, Contact Preference, Budget Discussion/Details, Additional Payment Options, etc.)
                </div>
                <textarea v-model="formNotes" class="form-input" v-bind:disabled="formDisabled"></textarea>
            </div>
            <div class="form-validation-message" v-bind:class="{'success': sendingSuccess}">
                {{ validationMessage }}
            </div>
            <div v-on:click="sendRequest" v-bind:class="{'active': (isValid && !formDisabled && !sending)}" class="sendButton">
                Send Request
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import apiClient from '../../api/app';

export default {
      data() {
        return {
            formName : '',
            formEmail : '',
            formPhone : '',
            formFile : '',
            formBudget : '',
            formDate : '',
            formNotes : '',
            formDisabled: false,
            sending: false,
            sendingError: false,
            sendingSuccess: false,
            apicli: apiClient
        };
      },
  
    computed: {
        validationMessage : function(){
            if(!this.formName){
                return "Please enter your Name to send a request.";
            }
            if(!this.emailIsValid){
                return "Please enter a valid Email Address to send a request.";
            }
            if(this.sendingError){
                return "There was an error sending your request. Please try again or contact support.";
            }
            if(this.sendingSuccess){
                return "Request Sent Successfully. Look for our confirmation email and we will be in touch in the next 48 hours!";
            }
            
            return "";
        },
        emailIsValid: function(){
            var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
            return pattern.test(this.formEmail);
        },

        isValid: function(){
            return this.formName && this.emailIsValid;
        }
    },
    mounted: function(){

    },
    methods: {
        sendRequest(){

            if(this.isValid){
                this.sending = true;
                var self = this;
                this.apicli.sendCustomRequest(
                    this.formName,
                    this.formEmail,
                    this.formPhone,
                    this.formBudget,
                    this.formDate,
                    this.formNotes,
                    this.formFile
                ).then(function(response) {
                    self.sending = false;
                    self.formDisabled = true;
                    self.sendingSuccess = true;
                    console.log(response);
                }).catch(function(error){
                    self.sending = false;
                    self.sendingError = true;
                    console.log(error);
                })
            }
        },


        fileUpdated(files){
            var file = files.target.files[0];
            this.formFile = file;
        }

    }
  }
</script>

<style>
    .custom-request-container{
        color:white;
    }
    .form-item{
        display:flex;
        flex-direction: column;
        margin-bottom:20px;
        max-width:400px;
    }
    .form-description {
        text-align:left;
        padding:5px;
        margin-bottom:5px;
        font-size:.7em;
    }
    .custom-request-form-container{
        display:flex;
        flex-direction: column;
        align-items: start;
        padding:20px;
        margin-left:20px;
    }
    .form-label{
        text-align: left;
        margin-bottom:5px;
        font-size: .9em;
        font-weight:bold;
    }
    .form-validation-message{
        margin-bottom:10px;
        font-size:.85em;
        color:red;
    }
    .form-validation-message.success{
        color:green;
    }

    .sendButton{
        padding:15px;
        border: 1px solid white;
        background-color: gray;
        color: black;
        cursor:not-allowed;
        border-radius: 5px;
        font-weight:bold;
        transition: all 200ms ease-in-out;
    }

    .sendButton.active{
        background-color: black;
        color:white;
        cursor:pointer;
        transition: all 200ms ease-in-out;
    }

    .sendButton.active:hover{
        background-color: #222;
        cursor:pointer;
        transition: all 200ms ease-in-out;
        
    }

    .custom-request-description{
        text-align : left;
        margin-bottom:40px;
        padding : 30px;
        margin-top:50px;
    }

    .custom-request-header{
        position:relative;
        height:15em;
        overflow:hidden;
    }

    .custom-request-title{
        font-size: 2em;
        font-weight:bold;
        text-align: left;
        margin-top:30px;
        position:absolute;
        bottom:0px;
        margin-bottom: 1em;
        margin-left: 3em;
    }

    .custom-request-title-container{
        position:absolute;
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, .7);
        bottom:0px;
        left:0px;
    }

    .vid-container{
        position:absolute;
        left:0px;
        bottom:0px;
        margin-bottom:-20em;
    }

    

    @media only screen and (max-width: 768px) {
        .custom-request-title{
            margin-left:.5em;
            margin-right:.5em;
        }
        .vid-container{
        position:absolute;
        top:0px;
        margin-bottom:8em;
        margin-left: 2em;
    }
        .vid-container video{
        /* Make video to at least 100% wide and tall */
  min-width: 100%; 
  min-height: 100%; 

  /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  width: auto;
  height: auto;

  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
    }
    }
</style>