<template>
    <div class="home-container">
      <div class="home-title">
        <div class="title-text">
          JK Rollup
        </div>
      </div>
      
    <div class="dev-text">
      In Development
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

    @font-face{
      font-family: "MangaBey";
      src: 
        url('../fonts/mangabey.otf');
    }
    .home-container{
      width:100%;
      box-sizing: border-box;
      padding-top:100px;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .dev-text {
      margin-top: 100px;
      color:white;
      font-family: 'Exo';
      font-size: 1em;
      font-weight: bold;
      opacity: 0;
      animation: imgFadeIn 2s ease-in forwards, textglow 5s infinite;
      animation-delay: 5s, 7s;
    }

    .home-subtitle{
      
      margin-top: 100px;
      color:white;
      font-family: 'Exo';
      font-size: 1.2em;
      font-weight: bold;
      opacity: 0;
      animation: imgFadeIn 2s ease-in forwards;
      animation-delay: 3s;
    }
    .home-title{
      display : flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      margin-bottom:100px;
      flex-wrap: nowrap;
    }
    .title-img{
      background-image: url('../img/jk_logo_white.png');
      background-repeat: no-repeat;
      background-size: contain;
      margin-left: 10px;
      width: 10em;
      height: 10em;
      opacity: 0;
      animation: imgFadeIn 2s ease-in forwards
    }
    .title-text{
      display:flex;
      font-size:4em;
      font-weight:bold;
      font-family: 'Exo';
      color:transparent;
      text-align: center;
      justify-content: center;
      align-items: center;
      opacity: 0;
      animation: imgFadeIn 3s ease-in forwards;
      
      -webkit-text-stroke: .03em white;
    }

    @keyframes textglow {
      0% { -webkit-filter: none; }
      50% { -webkit-filter: drop-shadow(0 0 20px #fff) drop-shadow(0 0 50px #fff) }
      100% { -webkit-filter: none; }
    }
    @keyframes imgFadeIn {
      to {
        opacity: 1;
      }
    }

    @keyframes textFadeIn {
      to {
        opacity: 1;
      }
    }
    .ats-image{
      
      background-image: url('../img/trade_logo_white.png');
      background-repeat: no-repeat;
      background-size: contain;
      margin-left: 10px;
      width: 200px;
      height: 180px;
    }
  </style>
  