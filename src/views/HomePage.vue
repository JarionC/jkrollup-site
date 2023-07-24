<template>
    <div class="home-container">
      <div class="home-title">
        JK-Rollup
      </div>
      <div class="home-subtitle">

      </div>
    </div>
  </template>
  
  <script>
  import store from '../store';

  export default {
    name: 'HomePage',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    @font-face{
      font-family: "Exo";
      src: 
        url('../fonts/Exo.ttf');
    }
    .home-title{
      font-size:4em;
      font-weight:bold;
      font-family: 'Exo';
    }
  </style>
  