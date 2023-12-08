<template>
    <div class="home-container">
      <div class="top-section">
        <div class="home-title">
            <!--<div class="print-line"></div>-->
          <!--<div class="title-img"></div>-->
          <div class="title-text">
            <span>J</span>
            <span>K</span>
            <span style="margin-left:.25em;">R</span>
            <span>o</span>
            <span>l</span>
            <span>l</span>
            <span>u</span>
            <span>p</span>
          </div>
          <div class="fire">
            <div v-for="part in particles" :key="part.pid" class="particle"></div>
          </div>
        </div>
        
      </div>
      
    </div>

    
  </template>
  
  <script>
  import store from '../store';

  export default {
    name: 'HomePage',
    data() {
      return {
        particles: []
      }
    },
    props: {
      msg: String,
    },
    created() {
      for(var i = 0; i < 100; i++){
        this.particles.push({
          pid: i
        })
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="scss" scoped>
    $fireColor: #48abe0;
    $fireColorT: rgba(255,80,0,0);
    $dur: 1s;
    $blur: 0.02em;
    $fireRad: 3em;
    $parts: 100;
    $partSize: 5em;

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
      height:calc(100vh - 72px);
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
      /*background-image: url('../assets/scrolleditpage.png');
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center center;*/
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
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      margin-bottom:10em;
      flex-wrap: nowrap;
      vertical-align:bottom;
      position:relative;
      width: 35vmax;
      overflow:visible;
      /*animation: titleBuild 12s ease-in forwards;*/
    }

    /*.print-line{
        height: 1px;
        width: 100%;
        position:absolute;
        top: 0px;
        background-color:white;
  
  box-shadow: 0 0 8px 8px #48abe0, 0px 0px 2px 2px white, 0px 0px 3px 3px white, 0px 0px 2px 2px white;
  
      animation: print 12s ease-in forwards;

    }*/
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
      display:flex;
      flex-direction: row;
      font-size:5vmax;
      font-weight:bold;
      font-family: 'Exo';
      color:transparent;
      align-items: center;
      overflow:visible;
      -webkit-text-stroke: .03em white;
      vertical-align:bottom;
      position:absolute;
      bottom: 300px;
    }

    $spans: 8;

    
    .title-text > span{
      display:inline-block;
      @for $s from 1 through $spans {
        &:nth-of-type(#{$s}) {
          margin-bottom: ((200 * random()) - 500) + px;
          opacity: .01 * random() - .5;
          filter: blur((.05 + (.2 * random())) + em);
          -webkit-filter: blur((.05 + (.2 * random())) + em);
          //transform: skewX((90 * random()) + deg);
          //transform: rotate(random() * 180);
        }
      }
      
     // transform: skewX((360 * random()) + deg);
      animation: titleResolve 4s forwards;
      animation-delay: 1s;
    }

    @keyframes titleResolve{
      0%{
      }
      /*10%{
        transform: skewX((50 - (random() * 100)) + deg);
      }
      20%{
        transform: skewX((50 - (random() * 100)) + deg);
      }
      30%{
        transform: skewX((50 - (random() * 100)) + deg);
      }
      40%{
        transform: skewX((50 - (random() * 100)) + deg);
      }
      50%{
        transform: skewX((50 - (random() * 100)) + deg);
      }
      60%{
        transform: skewX((50 - (random() * 100)) + deg);
      }
      70%{
        transform: skewX((50 - (random() * 100)) + deg);
      }
      80%{
        transform: skewX((50 - (random() * 100)) + deg);
      }
      90%{
        transform: skewX((50 - (random() * 100)) + deg);
      }*/
      100%{
        margin-bottom: 0px;
        opacity: 1;
        filter: blur(0em);
        -webkit-filter: blur(0em);
        //transform:none;
      }
    }

    @keyframes smokey {
      0%{
        filter: blur(.1em);
        -webkit-filter: blur(.1em);
      }
      50%{
        filter: blur(.2em);
        -webkit-filter: blur(.2em);
      }
      100%{
        filter: blur(.1em);
        -webkit-filter: blur(.1em);
      }
    }

    @keyframes printglow {
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




    .fire {
      font-size: 24px;
      filter: blur($blur);
      -webkit-filter: blur($blur);
      margin: 3em auto 0 auto;
      position: relative;
      width: 20em;
      height: 12em;
      animation: firefade 800ms ease-in forwards;
    }
    .particle {
      animation: rise $dur ease-in infinite;
      background-image: radial-gradient($fireColor 20%,$fireColorT 70%);
      border-radius: 50%;
      mix-blend-mode: screen;
      opacity: 0;
      position: absolute;
      bottom: 0;
      width: $partSize;
      height: $partSize;
      // spread particles out in time and x-position to get desired effect
      @for $p from 1 through $parts {
        &:nth-of-type(#{$p}) {
          animation-delay: $dur * random();
          left: calc((100% - #{$partSize}) * #{($p - 1)/$parts});
        }
      }
    }

    @keyframes firefade{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(0) scale(1);
      }
      25% {
        opacity: 1;
      }
      to {
        opacity: 0;
        transform: translateY(-10em) scale(0);
      }
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
  