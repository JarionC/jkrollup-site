<template>
    <div class="home-container">
      <div class="top-section">
        <div class="home-title">
            <div class="print-line"></div>
          <!--<div class="title-img"></div>-->
          <div class="title-text">
            JK Rollup
          </div>
        </div>
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
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color:white;
      height:100%;
    }

    .top-section{
      width: 100%;
      box-sizing: border-box;
      padding-top:20px;
      display:flex;
      flex-direction: row;
      flex-wrap:wrap;
      justify-content: center;
      align-items: center;
      height:100%;
      position:relative;
      background-image: url('../assets/scrolleditpage.png');
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center center;
    }


    .home-section{
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: row;
      padding : 40px;
      flex-wrap:wrap;
      justify-content: center;
      align-items: center;
    }

    .home-section-title-img{
      flex: 1 1 50%;
      font-size: 2em;
      font-weight: bold;
      font-family: 'Exo';
      box-sizing: border-box;
    }

    .home-section-text{
      flex: 0 0 50%;
      padding: 20px;
      font-size: .8em;
      font-family : 'Exo';
      box-sizing: border-box;
    }

    .opening-text{
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: 'Exo';
      padding: 10px;
      flex: 1 1 450px;
      max-width:450px;
    }

    .subtitle{
      font-size: 1.2em;
      font-weight:bold;
    }

    .title-description{
      margin-top: 20px;
      font-size: .9em;
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
      box-sizing: border-box;
      margin-bottom:100px;
      flex-wrap: nowrap;
      vertical-align:bottom;
      position:relative;
      height:6.5vmax;
      width: 22vmax;
      overflow:hidden;
      animation: titleBuild 12s ease-in forwards;
    }

    .print-line{
        height: 1px;
        width: 100%;
        position:absolute;
        top: 0px;
        background-color:white;
  
  box-shadow: 0 0 8px 8px #48abe0, 0px 0px 2px 2px white, 0px 0px 3px 3px white, 0px 0px 2px 2px white;
  
      animation: print 12s ease-in forwards;

    }
    .title-img{
      background-image: url('../img/jk_logo_white.png');
      background-repeat: no-repeat;
      background-size: contain;
      margin-left: 10px;
      width: 10em;
      height: 10em;
      opacity: 0;
      animation: imgFadeIn 2s ease-in forwards;
    }
    .title-text{
      font-size:5vmax;
      font-weight:bold;
      font-family: 'Exo';
      color:transparent;
      align-items: center;
      overflow:hidden;
      -webkit-text-stroke: .03em white;
      vertical-align:bottom;
      position:absolute;
      bottom: 0px;
    }

    @keyframe printglow {
        0%{
            box-shadow: 0 0 8px 8px #48abe0;
            
        }

        50%{
            box-shadow: 0 0 8px 8px #48abe0, 0px 0px 40px 40px white;
        }

        0%{

            box-shadow: 0 0 8px 8px #48abe0;
        }
    }
    @keyframes print {
        0%{
            opacity: 0;
        }

        5%{
            opacity: 0;
        }

        8%{
            opacity: .6;
        }

        32%{
            opacity: .6;
            margin-top:0px;
        }

        37%{
            opacity: 0;
            margin-top:-20px;   
        }

        100%{
            opacity: 0;
        }


    }

    @keyframes titleBuild {
        0% { 
            height: 0px;
            margin-bottom: 0px;
        }
        35% {
            height: 6.5vmax;
            margin-bottom: 6.5vmax;
        }
        55% {
            height: 6.5vmax;
            margin-bottom: 6.5vmax;
        }
        100% {
            margin-bottom: 50vh;
        }
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


    
    @media only screen and (max-width: 1100px){
      .client-section-title{
        order : 1;
      }
      .client-section-text{
        order : 2;
      }

    }

    
    @media only screen and (max-width: 800px){
      .home-section{
        flex-direction: column;
      }
    }
  </style>
  