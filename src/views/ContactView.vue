<template>
    <div class="contact-container">
        <div class="contact-title">
            Contact Us
        </div>
        <div class="contact-description">
            Please fill out the form below to reach us with any inquiries.
            <br><br>
            Site Administration : <a href = "mailto: admin@jkrollup.com">admin@jkrollup.com</a>
            <br>
            Support : <a href = "mailto: support@jkrollup.com">support@jkrollup.com</a>
        </div>
        <div class="contact-form-container">
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
                    Message
                </div>
                <textarea v-model="formNotes" class="form-input" v-bind:disabled="formDisabled"></textarea>
            </div>
            <div class="form-validation-message" v-bind:class="{'success': sendingSuccess}">
                {{ validationMessage }}
            </div>
            <div v-on:click="sendRequest" v-bind:class="{'active': (isValid && !formDisabled && !sending)}" class="sendButton">
                Send Contact
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import apiClient from '../api/app';

export default {
      data() {
        return {
            formName : '',
            formEmail : '',
            formPhone : '',
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
                return "Please enter your Name to send a message.";
            }
            if(!this.emailIsValid){
                return "Please enter a valid Email Address to send a message.";
            }
            if(this.sendingError){
                return "There was an error sending your message. Please try again or contact support.";
            }
            if(this.sendingSuccess){
                return "Message Sent Successfully. Look for our confirmation email and we will be in touch in the next 48 hours!";
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
                this.apicli.sendContact(
                    this.formName,
                    this.formEmail,
                    this.formPhone,
                    this.formNotes,
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

    }
  }
</script>

<style>
    .contact-container{
        color:white;
        padding: 20px;
    }

    .contact-title{
        font-weight: bold;
        font-size:2em;
        text-align: left;
        margin-top:30px;
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
    .contact-form-container{
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

    .contact-description{
        text-align : left;
        margin-bottom:40px;
        padding : 10px;
        margin-top:50px;
    }
</style>