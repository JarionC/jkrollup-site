<template>
    <div class="custom-request-container">
        <div class="custom-request-title">
            3D Printing Custom Request
        </div>
        <div class="custom-request-description">
            Please fill out the form below to request a custom 3D Printing service. We'll be in touch within 48 hours to discuss the service and cost. We currently accept CashApp, PayPal, Money Orders, and limited Cryptocurrencies as payment, but we are are able to consider other payment methods upon request.
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
                    Please upload as a ZIP file. While STL is the most convenient format, we can work with a wide range of formats : FBL, OBJ, etc.
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
        padding: 20px;
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
        padding:10px;
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

    .custom-request-title{
        font-size: 2em;
        font-weight:bold;
        text-align: left;
        margin-top:30px;
    }
</style>