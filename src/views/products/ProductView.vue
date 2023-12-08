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
                <div class="product-options">
                    <div v-if="displayData && displayData.options && displayData.options.shape" class="product-option shape-option">
                        <div class="option-title">{{ displayData.options.shape.display + " : " }}</div>
                        <select class="option-select" v-model="selectedShapeOption">
                            <option v-for="optionItem in displayData.options.shape.optionList" :key="optionItem.name" v-bind:value="optionItem.name">
                                {{ optionItem.display }} 
                            </option>
                        </select>
                    </div>
                    <div v-if="displayData && displayData.options && displayData.options.image" class="product-option image-option">
                        <div class="option-title">{{ displayData.options.image.display + " : " }}</div>
                        <select class="option-select" v-model="selectedImageOption">
                            <option v-for="optionItem in displayData.options.image.optionList" :key="optionItem.name" v-bind:value="optionItem.name">
                                {{ optionItem.display}}
                            </option>
                        </select>
                    </div>
                    <div class="custom-image-selection"  v-if="selectedImageIsCustom">
                        <div class="custom-image-label">Custom Image : </div>
                        <input type="file" v-if="selectedImageIsCustom" v-on:change="imageUpdated" accept="image/png, image/jpeg"/>
                    </div>
                </div>
                <div class="add-container">
                    <div class="quantity-container">
                        <div class="quantity-label">Quantity : </div>
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
                    </div>
                    <div class="form-error">
                        {{ formErrorMessage }}
                    </div>
                    <div class="product-add-button" :class="{'disabled': !formValidated}" v-on:click="addToCart">
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
            displayData: {},
            cartQuantity: 1,
            selectedShapeOption: "",
            selectedImageOption: "",
            imageFile: ""

        };
      },
      created(){
        
        this.productId = this.$route.params.productId;
        var self = this;
        apiClient.getProduct(this.productId).then( function(response){  
            self.product = response.data;  
            
            if(self.product.displayData){
                self.displayData = JSON.parse(self.product.displayData);
                console.log("data", self.displayData);
            }

            self.loadingProduct = false;

            
        }).catch( function (error){
            console.error(error);
            self.loadingProduct = false;
        })
      },
    computed: {
        selectedImageIsCustom(){
            return this.selectedImageOption == 'custom';
        },
        formValidated: function(){
            if(this.displayData && this.displayData.options && this.displayData.options.shape){
                if(!this.selectedShapeOption){
                    return false;
                }
            }
            if(this.displayData && this.displayData.options && this.displayData.options.image){
                if(!this.selectedImageOption || (this.selectedImageOption == 'custom' && !this.imageFile)){
                    return false;
                }
            }
            return true;
        },
        formErrorMessage: function(){
            if(this.displayData && this.displayData.options && this.displayData.options.shape){
                if(!this.selectedShapeOption){
                    return "Please select a shape.";
                }
            }
            if(this.displayData && this.displayData.options && this.displayData.options.image){
                if(!this.selectedImageOption){
                    return "Please select an image.";
                }
                if(this.selectedImageOption == 'custom' && !this.imageFile){
                    return "Please upload an image for your custom design.";
                }
            }
            return "";
        }
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
            if(!this.formValidated){
                return;
            }
            var cartItem = this.product;
            cartItem["quantity"] = parseInt(this.cartQuantity);

            if(this.selectedShapeOption){
                cartItem["shape"] = this.displayData.options.shape.optionList.find(x => x.name == this.selectedShapeOption);
                cartItem["shape"]["label"] = this.displayData.options.shape.display;
            }
            if(this.selectedImageOption){
                cartItem["image"] = this.displayData.options.image.optionList.find(x => x.name == this.selectedImageOption);
                cartItem["image"]["label"] = this.displayData.options.image.display;
                cartItem["image"]["imageFile"] = this.imageFile;
            }
            var item = {...cartItem};
            this.$store.dispatch('addCartItem', item);
        },
        imageUpdated(files){
            var file = files.target.files[0];
            debugger;
            this.imageFile = file;
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
        padding: 5em 18vw 5em 18vw;
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
        justify-content: space-between;
        gap: 4em;
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
    }
    .quantity-container{
        display:flex;
        flex-direction: row;
        gap: .5em;
    }

    .form-error{
        margin-top: 1em;
        font-size: .8em;
        color: rgb(255, 0, 111);
    }
    .product-add-button{
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
        transition: all 200ms ease-in-out;
    }

    .product-add-button.disabled{
        background-color: #555;
        cursor:not-allowed;
        transition: all 200ms ease-in-out;
    }

    .product-options{
        margin-top:2em;

    }

    .product-option{
        display:flex;
        flex-direction: row;
        gap:.5em;
        margin-bottom:.2em;
    }

    .custom-image-selection{
        display:flex;
        flex-direction: column;
        gap: .5em;
    }

    .option-title{
        font-size:.9em;
    }
    .custom-image-label{
        font-size:.9em;
    }

    .quantity-label{
        font-size:.9em;
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