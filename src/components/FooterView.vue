<template>
    <div class="footer-container">
        <div class="footer-text">
            © 2023 JK Rollup, LLC 
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
    }
  }
  </script>

  <style scoped>
  .footer-container{
    width: 100%;
    height: 30px;
    min-height:30px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top:auto;
  }

  .footer-text{
    color:white;
    font-size: .8em;
    font-weight: bold;

  }
</style>
  