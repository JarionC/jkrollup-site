<template>
    <div class="products-container">
        <div class="products-title">
            JK Rollup Products
        </div>
        <div class="products-description">
            Check out our available products below. 
        </div>
        <div class="products-message">
                {{productListMessage}}
        </div>
        <div class="products-holder">
            <div v-for="product in products" v-on:click="goToProductPage(product.productId)" :key="product.productId" class="product-container">
                
                <div class="product-thumbnail" :style="'background-image: url(' + imageDomain + product.thumbnailUrl + ')'"></div>
                <div class="product-display">{{ product.displayName }}</div>
                <div class="product-description">{{ product.description }}</div>
                <div class="product-price">${{ parseFloat(product.price).toFixed(2) }}</div>
                <div class="product-availability" :class="{available: product.available}"> {{ product.available ? "Available" : "" }}</div>
            
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
            loadingProducts: true,
            productError: false,
            productListMessage: "Loading Products...",
            products: [],
            imageDomain: process.env.VUE_APP_IMAGE_DOMAIN
        };
      },
      created(){
        var self = this;
        apiClient.getProducts().then( function(response){
            self.products = response.data;
            self.productListMessage = self.products.length + " products found.";            
            self.loadingProducts = false;
        }).catch( function (error){
            console.error(error);
            self.products = [];
            self.productListMessage = self.products.length + " products found.";
            self.loadingProducts = false;
        })
      },
    computed: {
        
    },
    mounted: function(){

    },
    methods: {
        goToProductPage: function(pid){
          //  this.$router.push({path: '/product/'+pid, params: { productId: pid}});
            this.$router.push({name: "product", params: { productId: pid}});
        }
    }
  }
</script>

<style scoped>

    .products-container{
        width:100%;
        height:100%;
        color:white;
    }

    .products-holder{
        margin-top: 3em;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1em;
    }
    .product-container{
        width: 100%;
        height: 100%;
        text-align : left;
        padding: 20px;
        border: solid 1px #555;
        border-radius: 5px;
        display:flex;
        flex-direction: column;
        max-width: 200px;
        max-height: 200px;
        cursor: pointer;
        box-sizing: border-box;
        transition: all 200ms ease-in-out; 
    }

    .product-container:hover{
        border: solid 2px #777;
        transition: all 200ms ease-in-out; 
    }

    .products-title{
        font-weight: bold;
        font-size: 2em;
        margin-top:30px;
        margin-top:2em;

    }
    .product-thumbnail{
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 100px;
        height: 100px;
        align-self: center;
    }
    .products-description{
        padding: 20px;
        margin-top:50px;
    }

    .products-soon-message{
        text-align: center;
        font-size: 1.5em;
        margin-top: 100px;
    }

    .product-display{
        font-weight:bold;
        max-width:100%;
        overflow:hidden;
        height: 1.33em;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .product-description{
        font-size: .65em;
        max-width:100%;
        text-overflow:ellipsis;
        overflow:hidden;
        height:1.4em;
        white-space: nowrap;
    }

    .product-price{
        margin-top: 1em;
    }

    .product-availability{
        margin-top: .5em;
        font-size: .7em;
    }

    .product-availability.available{
        color: green;
    }

    @media only screen and (max-width: 768px) {
        .products-holder{
            padding: 1em;
            flex-direction: column;
        }
    }
</style>