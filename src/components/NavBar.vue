<template>
  <div class="nav-container">
    <div v-on:click="navigateHome" class="nav-title">
      JK Rollup
    </div>
    <div v-on:click="navigateCustom" class="custom-prints-menu">Custom Prints</div>
        <div v-on:click="navigateProducts" class="products-menu">Products</div>
    <div v-on:click="navigateAbout" class="about-us-menu">
      About Us
    </div>
    <div v-on:click="navigateContact" class="contact-menu">
      Contact
    </div>
    <div class="mobile-menu" :class="{mhovering: menuHovering}" @mouseover="menuHovering=true" @mouseout="menuHovering=false">
      <i class="fa-solid fa-bars menu-icon">
        
      </i>
      <div class="mobile-menu-list">
        <div class="menu-x" v-on:click="disableMenuHovering" ><i class="fa-solid fa-times-circle"></i></div>
        
        
        <div v-on:click="navigateCustom" class="custom-prints-menu-mobile">Custom Prints</div>
            <div v-on:click="navigateProducts" class="products-menu-mobile">Products</div>
        <div v-on:click="navigateAbout" class="about-us-menu-mobile">
          About Us
        </div>
        <div v-on:click="navigateContact" class="contact-menu-mobile">
          Contact
        </div>
      </div>
    </div>

    

    <div class="cart-container" :class="{hovering: cartHovering}" @mouseover="cartHovering=true" @mouseout="cartHovering=false">
      <i class="fa-solid fa-shopping-cart cart-icon">
        
      </i>
      <div class="cart-quant">{{cartQuant}}</div>
      <div class="cart-menu" >
        <div class="cart-x" v-on:click="disableHovering" ><i class="fa-solid fa-times-circle"></i></div>
        <div class="cart-menu-title">Shopping Cart</div>
        <div class="cart-menu-quant">{{ cartQuant }} items in Cart</div>
        <div class="cart-menu-list" v-for="item in cartItems" :key="item.productId">
          <div class="cart-item">
            <div class="cart-item-thumbnail" :style="'background-image: url(' + item.thumbnailUrl + ')'"></div>
            <div class="cart-item-text">
              <div class="cart-item-display">{{ item.displayName }}</div>
              <div class="cart-item-price">${{ parseFloat(item.price).toFixed(2) }}</div>
            </div>
            <div class="cart-item-quantity">x{{ item.quantity }}</div>
          </div>
        </div>
        <div class="cart-menu-message">{{ cartMenuMessage }}</div>
        <div class="cart-menu-total">Total : ${{ parseFloat(cartTotalPrice).toFixed(2) }}</div>
        <div class="cart-menu-clear" v-on:click="clearCart"><i class="fa-solid fa-eraser"></i>Clear Cart</div>
        <div v-bind:class="{'active': (cartHasItems)}" class="cart-menu-checkout"> <i class="fa-solid fa-check-square"></i>Checkout</div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
      data() {
        return {
         cartMenuMessage: "",
         cartHovering: false,
         menuHovering: false
        };
      },
  
    computed: {
      cartHasItems: function(){
        return this.$store.getters.cartQuantity > 0;
      },
      cartTotalPrice: function(){
        return this.$store.getters.cartTotal;
      },
      cartQuant: function(){
        return this.$store.getters.cartQuantity;
      },
      cartItems: function(){
        return this.$store.getters.cartContents;
      },
    },
    mounted: function(){
    },
    methods: {
      disableHovering(){
        this.cartHovering = false;
      },
      disableMenuHovering(){
        this.menuHovering = false;
      },
      navigateHome(){
        this.$router.push({path: "/home"}).catch(()=>{});
      },

      navigateCustom(){
        this.$router.push({path: "/customrequest"}).catch(()=>{});
      },

      navigateContact(){
        this.$router.push({path: "/contact"}).catch(()=>{});
      },

      navigateAbout(){
        this.$router.push({path: "/about"}).catch(()=>{});
      },

      navigateProducts(){
        this.$router.push({path: "/products"}).catch(()=>{});
      },

      clearCart(){
        this.$store.dispatch("clearCart");
      }


    }
  }
</script>

<style>
  .nav-container{
    width:100%;
    display:flex;
    flex-direction:row;
    padding:10px;
    box-sizing: border-box;
    gap:20px;
    position: relative;
    z-index: 4;
    color:white;
    height:42px
  }
  .nav-title{
    color:transparent;
    margin-right:auto;
    font-weight:bold;
    cursor: pointer;
    font-family: "Exo";
    -webkit-text-stroke : .07em white;
    letter-spacing: .04em;
  }
  .products-menu{
    font-weight:bold;
    color: white;
    position:relative;
    height:100%;
    cursor:pointer;
  }
  .custom-prints-menu{
    font-weight:bold;
    color: white;
    position:relative;
    height:100%;
    cursor:pointer;
  }
  .about-us-menu{
    font-weight:bold;
    color: white;
    position:relative;
    height:100%;
    cursor:pointer;
  }

  .contact-menu{
    font-weight:bold;
    color: white;
    position:relative;
    height:100%;
    cursor:pointer;
  }
  .printing-menu{
    margin-left: auto;
    color: white;
    font-weight: bold;
    position:relative;
    height:100%;

  }

  .printing-menu-text{
    cursor: pointer;
  }
  .printing-menu-list{
    width:auto;
    position:absolute;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    padding: 5px;
    width:150px;
  }

  .printing-menu > .printing-menu-list{
    max-height:0px;
    transition: all 600ms ease-in-out;
  }

  .printing-menu:hover > .printing-menu-list{
    max-height:100px;
    transition: all 600ms ease-in-out;
  }

  .printing-menu-list > div{
    position:relative;
    padding-top:5px;
    padding-bottom:5px;
    text-align:left;
    font-weight:normal;
    cursor:pointer;
  }

  .cart-icon{
    position:absolute;
    top:0px;
    left:0px;
  }

  .cart-container{
    position:relative;
    box-sizing: border-box;
    margin-right:20px;
    cursor:pointer;
  }

  .cart-quant{
    width:.8em;
    height:.8em;
    border-radius:10px;
    background-color:red;
    position:absolute;
    top:-.3em;
    left: .7em;
    display:flex;
    align-items: center;
    justify-content: center;
    font-weight:bold;
    font-size:.7em;
    padding:.2em;
  }
  .cart-menu{
    position:absolute;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    width:200px;
    margin-top:20px;
    top:0px;
    right:0px;
    background-color:white;
    color:black;
    align-items: start;
    cursor:default;
  }
  .cart-menu-title{
    font-size: 1.2em;
    font-weight:bold;
  }
  .cart-menu-quant{
    font-size:.65em;
    margin-top:1em;
    margin-left: .8em;
  }

  .cart-menu-list{
    width:100%;
    max-height:250px;
    overflow-x:hidden;
    overflow-y:auto;
    margin-top:1em;
    display:flex;
    flex-direction: column;
    gap: .2em;
    box-sizing: border-box;
  }

  .cart-item{
    width:100%;
    display: flex;
    flex-direction: row;
    padding:.3em;
    align-items: center;
    justify-content: space-between;
    border: .08em solid #777;
    border-radius: .2em;
    box-sizing: border-box;
  }
  .cart-item-thumbnail{
    background-size:contain;
    background-position: center center;
    background-repeat: no-repeat;
    width: 3em;
    height: 3em;
  }
  .cart-item-text{
    display:flex;
    flex-direction:column;
    align-items: start;
  }
  .cart-item-display{
    font-weight:bold;
    font-size: .8em;
    text-overflow: ellipsis;
  }
  
  .cart-item-price{
    font-size: .6em;
  }
  .cart-item-quantity{
    font-weight: bold;
    font-size: .7em;
  }
  .cart-menu-checkout{
    width:100%;
    padding:.5em 1em .5em .5em;
    color:white;
    border-radius:.3em;
    box-sizing: border-box;
    cursor:not-allowed;
    background-color: #555;
    font-weight:bold;
    font-size: 1em;
    margin-top:1em;
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    gap: .2em;
    transition: all 200ms ease-in-out; 
  }

  .cart-menu-clear{
    width:100%;
    padding:.5em 1em .5em .5em;
    color:black;
    border-radius:.3em;
    box-sizing: border-box;
    cursor:pointer;
    background-color: orange;
    font-weight:bold;
    font-size: 1em;
    margin-top:1em;
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    gap: .2em;
    -webkit-text-stroke: unset;
    transition: all 200ms ease-in-out; 
  }

  .cart-menu-checkout:hover{
    box-shadow: 2px 2px black;
    transition: all 200ms ease-in-out; 
  }

  .cart-menu-clear:hover{
    box-shadow: 2px 2px black;
    transition: all 200ms ease-in-out; 
  }

  .cart-menu-checkout.active{

    background-color:blue;
    cursor:pointer;
  }
  .cart-menu-total{
    margin-top: 2em;
    font-weight:bold;
  }
  .cart-container > .cart-menu{
    padding: 0px;
    max-height:0px;
    transition: all 600ms ease-in-out;
  }

  .cart-container.hovering > .cart-menu{
    padding: 1em;
    max-height:400px;
    transition: all 600ms ease-in-out;
  }

  .cart-x{
    display:none;
  }
  .mobile-menu{
    display: none;
  }
  .menu-x{
    display:none;
  }
  @media only screen and (max-width: 768px) {
    .printing-menu{
      display:none;
    }
    .contact-menu{
      display:none;
    }
    .about-us-menu{
      display:none;
    }
    .custom-prints-menu{
      display:none;
    }
    .products-menu{
      display:none;
    }
    .mobile-menu{
      display: block;
    }
    .contact-menu-mobile{
      cursor:pointer;
    }
    .about-us-menu-mobile{
      cursor:pointer;
    }
    .custom-prints-menu-mobile{
      cursor:pointer;
    }
    .products-menu-mobile{
      cursor:pointer;
    }
    .mobile-menu > .mobile-menu-list{
      padding: 0px;
      max-height:0px;
      transition: all 600ms ease-in-out;
    }

    .mobile-menu.mhovering > .mobile-menu-list{
      padding: 3em 1em 1em 1em;
      max-height:400px;
      transition: all 600ms ease-in-out;
    }

    .mobile-menu-list{
      z-index:5;
      position:fixed;
      display:flex;
      flex-direction:column;
      overflow:hidden;
      height:100%;
      width:100%;
      margin: 0;
      top:0px;
      left:0px;
      background-color:white;
      color:black;
      align-items: start;
      cursor:default;
      box-sizing: border-box;
      font-weight:bold;
      gap: 1em;
    }
    .menu-x{
      display:block;
      position:absolute;
      right: .5em;
      top: .5em;
    }
    .cart-x{
      display:block;
      position:absolute;
      right: .5em;
      top: .5em;
    }

    .cart-menu{
      height:100%;
      width:100%;
      box-sizing: border-box;
      margin: 0;
      position:fixed;
      top: 0px;
      left: 0px;
    }

    .cart-container{
    }

    .cart-menu-checkout{
    width:100%;
    color:white;
    border-radius:.3em;
    box-sizing: border-box;
    cursor:not-allowed;
    background-color: #555;
    font-weight:bold;
    font-size: 1em;
    margin-top:1em;
  }

  .cart-menu-clear{
    width:100%;
    color:black;
    border-radius:.3em;
    box-sizing: border-box;
    cursor:pointer;
    font-weight:bold;
    font-size: 1em;
    margin-top:1em;
  }
  
  .cart-item{
    padding: .5em;
    justify-content: space-around;
  }



  .cart-menu-checkout.active{

    background-color:blue;
    cursor:pointer
  }
  .cart-menu-total{
    margin-top: auto;
    font-weight:bold;
  }

  .cart-item-display{
    font-size:1.1em;
  }

  .cart-item-price{
    font-size: 1em;
  }
  }
</style>
