<template>
    <div class="product-container">
        <div class="head-container">
            <div class="product-image" :style="'background-image: url(' + product.imageUrl+ ')'">
                
            </div>
            <div class="product-data">
                <div class="product-title">
                    {{ product.displayName }}
                </div>
                <div class="product-description">
                    {{ product.description }}
                </div>
                <div class="sub-data">
                    <div class="product-material">
                            Material: {{ product.material }}
                    </div>
                    <div class="product-weight">
                            Weight: {{ product.price }}lbs
                    </div>
                    <div class="product-dimensions">
                            Dimensions(inches): {{ getDimensions(product.dimensions) }}
                    </div>
                    <div class="product-price">
                            Price: ${{ parseFloat(product.price).toFixed(2) }}
                    </div>
                </div>
                <div class="add-container">
                    <select  v-model="cartQuantity">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                    <div class="product-add-button" v-on:click="addToCart">
                        Add To Cart
                    </div>
                </div>
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
            loadingProduct: true,
            productError: false,
            productMessage: "",
            productId: "",
            product: {},
            cartQuantity: 1
        };
      },
      created(){
        
        this.productId = this.$route.params.productId;
        var self = this;
        apiClient.getProduct(this.productId).then( function(response){  
            self.product = response.data;        
            self.loadingProduct = false;
        }).catch( function (error){
            console.error(error);
            self.loadingProduct = false;
        })
      },
    computed: {
        
    },
    mounted: function (){
        
    },
    methods: {
        getDimensions:function(rawD){
            if(!rawD){
                return "";
            }
            var dArray = rawD.split(',');
            if(dArray.length === 3){
                return dArray[0] + 'x' + dArray[1] + 'x' + dArray[2];
            }
            else{
                return "";
            }
        },
        addToCart: function(){
            var cartItem = this.product;
            cartItem["quantity"] = parseInt(this.cartQuantity);
            this.$store.dispatch('addCartItem', cartItem);
        }
    }
  }
</script>

<style scoped>
    .product-container{
        width: 100%;
        height: 100%;
        text-align : left;
        color: white;
        padding: 5em 15em 5em 15em;
        display:flex;
        flex-direction: column;
        align-items:center;
        box-sizing: border-box;
    }

    .head-container{
        display:flex;
        flex-direction:row;
        width:100%;
        box-sizing: border-box;
        justify-content: center;
    }
    .product-data{
        display:flex;
        flex-direction: column;
        gap: .5em;
        justify-self:end;
        margin-left:auto;
        box-sizing: border-box;
    }

    .product-title{
        font-weight: bold;
        font-size: 2em;
        justify-self:right;
        margin-top:2em;
    }

    .product-image{
        justify-self: left;
        width: 30em;
        height: 30em;
        background-size:contain;
        background-position: center center;
        background-repeat: no-repeat;
    }

    .product-description{
        margin-bottom:2em;
        font-size: 1.2em;
    }
    .sub-data{
        font-size: .8em;
    }

    .add-container{
        margin-top:2em;
    }
    .product-add-button{
        margin-top:1em;
        padding: .5em;
        font-weight: bold;
        font-size: 1.2em;
        background-color: teal;
        border-radius: .3em;
        border: 1px solid white;
        color:white;
        display:flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    
  @media only screen and (max-width: 768px) {
    .product-container{
        padding: 1em;
    }
    .head-container{
        flex-direction: column;
        align-items: center;
    }
    .product-image{
        width: 10em;
        height:10em;
    }
    .product-title{
        margin-top: 1em;
    }
    .product-data{
        margin-left:0px;
    }
  }
</style>