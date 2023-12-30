<template>
    <div class="checkout-container">
        <div class="checkout-header">
            <div class="checkout-title">Checkout</div>
        </div>

        <div class="item-container">
            <div class="item-title">Items</div>
            <div class="item-list">
                <div class="cart-item" v-for="item in cartItems" :key="item.itemId">
                    <div class="cart-item-info">
                        <div class="cart-item-thumbnail" :style="'background-image: url(' + imageDomain + item.thumbnailUrl + ')'"></div>
                        <div class="cart-item-text">
                            <div class="cart-item-display">{{ item.displayName }}</div>
                            <div class="cart-item-price">${{ parseFloat(item.price).toFixed(2) }}</div>
                        </div>
                        <div class="cart-item-quantity">x{{ item.quantity }}</div>
                    </div>
                    <div class="display-data">
                        <div v-if="item.shape" class="data-item shape-data">
                            <div class="shape-label">
                                {{ item.shape.label + " :" }}
                            </div>
                            <div class="shape-display">
                                {{ item.shape.display }}
                            </div>
                        </div>
                        <div v-if="item.image" class="data-item image-data">
                            <div class="image-label">
                                {{ item.image.label + " :" }}
                            </div>
                            <div class="image-display">
                                {{ item.image.display }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="subtotal">
                <div class="subtotal-label">Subtotal : </div>
                <div class="subtotal-value">${{ parseFloat(subtotal).toFixed(2) }}</div>
            </div>
            <div class="shipping-button check-button" v-on:click="openShipping">
                Calculate Shipping
            </div>
        </div>

        <div id="shipping-box"  class="shipping-container" :class="{'open': shippingOpen}">
            <div class="shipping-title">Shipping</div>
            <div class="shipping-disclaimer">We currently only ship within the United States using USPS</div>
            <div class="shipping-form">
                <input v-model="firstName" class="shipping-input first-dname" placeholder="First Name"/>
                <input v-model="lastName" class="shipping-input last-name" placeholder="Last Name"/>
                <input v-model="address" class="shipping-input address" placeholder="Address"/>
                <input v-model="city" class="shipping-input city" placeholder="City"/>
                <select v-model="state" class="shipping-input state" placeholder="state">
                    <option value="" disabled selected hidden>Select State</option>
                    <option v-for="state in stateList" :key="state.name" v-bind:value="state.abbreviation">
                        {{ state.name }}
                    </option>
                </select>
                <input v-model="zipCode" class="shipping-input zipcode" placeholder="Zipcode"/>
                <input v-model="email" class="shipping-input email" placeholder="Email Address"/>
                <input v-model="phone" class="shipping-input phone" placeholder="Phone Number(Optional)"/>
            </div>
            <div class="calculate-message">{{ calculateMessage }}</div>
            <div class="calculate-button check-button" :class="{'disabled': !shippingIsValid}">Calculate</div>
            <div class="payment-container" :class="{'open': paymentOpen}">
                <div class="cost-container">
                    <div class="shipping-cost">
                        <div class="shipping-cost-label">Shipping Cost : </div>
                        <div class="shipping-cost-value"></div>
                    </div>
                    <div class="total-cost">
                        <div class="total-cost-label">Pre-tax Total : </div>
                        <div class="total-cost-value"></div>
                    </div>
                </div>
                <div class="payment-message">{{ paymentMessage }}</div>
                <div class="payment-button check-button">Payment</div>
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
            cartItems: [],
            subtotal: "",
            calculateMessage: "",
            shippingMessage: "",
            paymentMessage: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            email: "",
            phone: "",
            shippingOpen: false,
            paymentOpen: false,
            calculatingShipping: false,
            imageDomain: process.env.VUE_APP_IMAGE_DOMAIN,
            stateList: [{"name":"Alabama","abbreviation":"AL"},{"name":"Alaska","abbreviation":"AK"},{"name":"Arizona","abbreviation":"AZ"},{"name":"Arkansas","abbreviation":"AR"},{"name":"California","abbreviation":"CA"},{"name":"Colorado","abbreviation":"CO"},{"name":"Connecticut","abbreviation":"CT"},{"name":"Delaware","abbreviation":"DE"},{"name":"Florida","abbreviation":"FL"},{"name":"Georgia","abbreviation":"GA"},{"name":"Hawaii","abbreviation":"HI"},{"name":"Idaho","abbreviation":"ID"},{"name":"Illinois","abbreviation":"IL"},{"name":"Indiana","abbreviation":"IN"},{"name":"Iowa","abbreviation":"IA"},{"name":"Kansas","abbreviation":"KS"},{"name":"Kentucky","abbreviation":"KY"},{"name":"Louisiana","abbreviation":"LA"},{"name":"Maine","abbreviation":"ME"},{"name":"Maryland","abbreviation":"MD"},{"name":"Massachusetts","abbreviation":"MA"},{"name":"Michigan","abbreviation":"MI"},{"name":"Minnesota","abbreviation":"MN"},{"name":"Mississippi","abbreviation":"MS"},{"name":"Missouri","abbreviation":"MO"},{"name":"Montana","abbreviation":"MT"},{"name":"Nebraska","abbreviation":"NE"},{"name":"Nevada","abbreviation":"NV"},{"name":"New Hampshire","abbreviation":"NH"},{"name":"New Jersey","abbreviation":"NJ"},{"name":"New Mexico","abbreviation":"NM"},{"name":"New York","abbreviation":"NY"},{"name":"North Carolina","abbreviation":"NC"},{"name":"North Dakota","abbreviation":"ND"},{"name":"Ohio","abbreviation":"OH"},{"name":"Oklahoma","abbreviation":"OK"},{"name":"Oregon","abbreviation":"OR"},{"name":"Pennsylvania","abbreviation":"PA"},{"name":"Rhode Island","abbreviation":"RI"},{"name":"South Carolina","abbreviation":"SC"},{"name":"South Dakota","abbreviation":"SD"},{"name":"Tennessee","abbreviation":"TN"},{"name":"Texas","abbreviation":"TX"},{"name":"Utah","abbreviation":"UT"},{"name":"Vermont","abbreviation":"VT"},{"name":"Virginia","abbreviation":"VA"},{"name":"Washington","abbreviation":"WA"},{"name":"West Virginia","abbreviation":"WV"},{"name":"Wisconsin","abbreviation":"WI"},{"name":"Wyoming","abbreviation":"WY"}]
        };
      },
    created(){
        this.cartItems = this.$store.state.cart;
        this.subtotal = this.$store.getters.cartTotal;
    },
    computed: {

        shippingIsValid(){
            return this.firstName &&
            this.lastName &&
            this.address &&
            this.city &&
            this.state &&
            this.zipCode &&
            this.email && this.cartItems.length > 0;
        }
    },
    mounted: function(){

    },
    methods: {
        openShipping(){
            this.shippingOpen = true;
            setTimeout(() => {
                var el = document.getElementById("shipping-box");
                el.scrollIntoView({
                    block: "end",
                    behavior: "smooth"
                });
            }, "250");
            
        },
        calculateShipping(){
            if(!this.shippingIsValid){
                return;
            }
            var self = this;
            this.calculateMessage = "Calculating...";
            this.calculatingShipping = true;
            
            var lineItems = [];
            this.cartItems.forEach(function(item, index, theArray){
                lineItems[index] = {
                    productId: item.productId,
                    quantity: item.quantity,
                    shape: item.shape,

                };
            });

            var shippingTo = {
                firstName: this.firstName,
                lastName: this.lastName,
                address: this.address,
                city: this.city,
                state: this.state,
                zipCode: this.zipCode,
                email: this.email,
                phone: this.phone
            };
            apiClient.calculateShipping(shippingTo, lineItems).then( function(response){  
            
                
                this.calculateMessage = "";
                self.calculatingShipping = false;
            }).catch( function (error){
                console.error(error);
                this.calculateMessage = "Error Calculating Shipping.";
                self.calculatingShipping = false;
            })
        },
        openPayment(){

        }
    }
  }
</script>

<style scoped>
    .checkout-container{
        width:100%;
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .checkout-header{
        box-sizing: border-box;
        width:100%;
        padding:2em;
        font-size: 2em;
        font-weight:bold;
        background-color:#333;
        text-align: left;
        color:white;
    }

    .checkout-title{

    }

    .item-container{
        width:100%;
        padding: 2em;
        display:flex;
        flex-direction:column;
        color:white;
        box-sizing: border-box;
    }

    .item-title{
        font-weight:bold;
        font-size:1.5em;
    }

    .item-list{
        display:flex;
        flex-direction:column;
        width:100%;
        padding: 1em;
        gap: 1em;
    }

    .cart-item{
        border: 1px solid #777;
        border-radius: .4em;
        padding: 1em;
        display:flex;
        flex-direction: column;
        max-width: 30em;
    }

    .cart-item-thumbnail{
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
        height: 5em;
        width: 5em;
    }

    .cart-item-text{
        display:flex;
        flex-direction: column;
        align-items: start;
        gap: .3em;
    }

    .cart-item-display{
        font-size: 1em;
        font-weight:bold;
    }

    .cart-item-price{
        font-size: 1.5em;
        font-weight:bold;
    }

    .cart-item-info{
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .cart-item-quantity{
        font-size: 1.3em;
        font-weight:bold;
    }

    .display-data{
        margin-top: 1em;
        display:flex;
        flex-direction:row;
        gap : 1em;
        font-size: .7em;
        font-style: italic;
    }

    .data-item{
        display:flex;
        flex-direction: row;
        gap: .3em;
        align-items: center;
    }

    .check-button{
        padding: 1em;
        border-radius:.2em;
        background-color:teal;
        color:white;
        font-size:1.1em;
        font-weight:bold;
        margin-top: 2em;

        max-width:10em;
        cursor:pointer;
    }

    .check-button.disabled{
        cursor:not-allowed;
        background-color:#555;
    }

    .subtotal{
        display:flex;
        flex-direction: row;
        font-size: 1.3em;
        font-weight:bold;
        gap: 2em;
    }

    .shipping-container{
        max-height:0px;
        display:flex;
        width:100%;
        flex-direction: column;
        color:white;
        padding:0;
        overflow:hidden;
        box-sizing: border-box;
        transition: all 250ms ease-in-out;
    }
    .shipping-container.open{
        max-height:none;
        padding: 2em;
        transition: all 250ms ease-in-out;
    }
    .shipping-title{
        font-weight:bold;
        font-size:1.5em;
    }

    .shipping-disclaimer{
        margin-top:1.5em;
    }

    .shipping-form{
        margin-top:1.5em;
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
        gap: 1em;
        justify-content: center;
    }
    .shipping-input {
        box-sizing: border-box;
        flex-basis: 28%;
        font-size: 1.5em;
        border-radius:.3em;
        border:none;
        padding:.2em;
    }

    .payment-container{
        margin-top:3em;
    }

    .cost-container{
        font-size: 1.2em;
        display:flex;
        flex-direction: column;
        gap:1em;
    }

</style>