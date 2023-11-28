<template>
    <div class="product-container">
        <div class="product-title">
            {{ product.displayName }}
        </div>
        <div class="product-image" :style="'background: url(' + require(product.imageUrl) + ')'">
            
        </div>
        <div class="product-description">
                {{ product.description }}
        </div>
        <div class="product-price">
                ${{ product.price }}
        </div>
        <div class="product-add-button">
            Add To Cart
        </div>
    </div>

</template>

<script>

import { mapState } from 'vuex';
import apiClient from '../api/app';

export default {
      data() {
        return {
            loadingProduct: true,
            productError: false,
            productMessage: "",
            productId: "",
            product: {}
        };
      },
      created(){
        
        this.productId = this.$route.params.productId;
        
        apiClient.getProduct(this.productId).then( function(response){          
            this.loadingProduct = false;
        }).catch( function (error){
            console.error(error);
            this.loadingProduct = false;
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
    .product-container{
        width: 100%;
        height: 100%;
        text-align : left;
        color: white;
        padding: 20px;
    }

    .product-title{
        font-weight: bold;
        font-size: 2em;
        margin-top:30px;
        
    }

    .product-description{
        padding: 20px;
        margin-top:50px;
    }
</style>