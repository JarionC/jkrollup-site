<template>
    <div class="products-container">
        <div class="products-title">
            3D Printed Products
        </div>
        <div class="products-description">
            Check out our products available for printing below. 
        </div>
        <div class="products-message">
                {{productListMessage}}
        </div>
        <div class="products-holder">
            <div v-for="product in products" :key="product.productId" class="product-container">
                
                <div class="product-thumbnail" :style="'background-image: url(' + product.thumbnailUrl + ')'"></div>
                <div class="product-display">{{ product.displayName }}</div>
                <div class="product-description">{{ product.description }}</div>
                <div class="product-price">${{ product.price }}</div>
                <div class="product-availability"> {{ product.available ? "Available" : "" }}</div>
            
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
            products: []
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
            self.loadingProducts = false;
        })
      },
    computed: {
        
    },
    mounted: function(){

    },
    methods: {

    }
  }
</script>

<style>

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
        align-items: center;
        max-width: 200px;
        max-height: 200px;
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

    .product-description{
        font-size: .65em;
    }
</style>