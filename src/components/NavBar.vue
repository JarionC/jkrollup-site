<template>
  <div class="nav-container">
    <div v-on:click="navigateHome" class="nav-title">
      JK Rollup
    </div>
    <div class="printing-menu">
      <div class="printing-menu-text">3D Printing</div>
      <div class="printing-menu-list">
        <div v-on:click="navigateCustom">Custom Prints</div>
        <div v-on:click="navigateProducts">Products</div>
      </div>
    </div>
    <div v-on:click="navigateAbout" class="about-us-menu">
      About Us
    </div>
    <div v-on:click="navigateContact" class="contact-menu">
      Contact
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
      data() {
        return {
         
        };
      },
  
    computed: {
    },
    mounted: function(){
    },
    methods: {
      navigateHome(){
        this.$router.push("home").catch(()=>{});
      },

      navigateCustom(){
        this.$router.push("customrequest").catch(()=>{});
      },

      navigateContact(){
        this.$router.push("contact").catch(()=>{});
      },

      navigateAbout(){
        this.$router.push("about").catch(()=>{});
      },

      navigateProducts(){
        this.$router.push("products").catch(()=>{});
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
  .about-us-menu{
    font-weight:bold;
    color: white;
    position:relative;
    height:100%;
    cursor:pointer;
  }

  .contact-menu{
    margin-right:100px;
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
</style>
