<template>
    <div class="home-container">
      <div class="top-section">
        <div class="home-title">
          <div class="title-img"></div>
          <div class="title-text">
            Rollup ATS
          </div>
        </div>
        <div class="opening-text">
          <div class="subtitle">
            A Revolution in Automated Trading
          </div>
          <div class="title-description">
            We are building predictive AI models to generate signals for an automated cryptocurrency trading client for our community
          </div>
        </div>
      </div>
      <div class="ai-model-section home-section">
        <div class="ai-model-section-title home-section-title-img">
          <div class="home-section-title">
            Context Matters
          </div>
          <div class="home-section-img"></div>
        </div>
        <div class="ai-model-section-text home-section-text">
          There are millions of indicators, strategies, and bots built with the intention of estimating price movements based on 
          statistical analysis. There are hundreds of thousands of experts, insiders, and influencers following the events, announcements, and wallets
          of the biggest money movers in the world in an attempt to guess when and where the next big breakout or freefall will be. 
          But you can't use these methods and sources, alone, to accurately predict how the market is going to behave. In the realm of trading, what we are ultimately
          trying to build is a predictive model capable of taking all of these factors into consideration so we can get as close as possible to realtime candle predictions.
        </div>
      </div>
      <div class="client-section home-section">
        
        <div class="client-section-text home-section-text">
          Currently we've built a client that receives signals from our back-end server which, itself, can either receive outside signals through its api or 
          generate the signals internally, based on realtime statistical analysis. The client and backend are structured so that private information (Users' Exchange
          API Keys, Secrets, Passphrases, etc) are stored on your private device so that trades can be executed by the client, and our proprietary trading strategies are 
          securely stored and signaled on by the backend.
          <br><br>
          Once we train and test a sufficiently accurate AI model, we will implement it on our backend and offer signals based on its predictions. The price for this
          service has yet to be determined but the first people with access to these signals will be our community members.
        </div>
        <div class="client-section-title home-section-title-img">
          <div class="home-section-title">
          A Client for the Community
          </div>
          <div class="home-section-img"></div>
        </div>
      </div>
      <div class="community-section home-section">
        <div class="community-section-title home-section-title-img">
          <div class="home-section-title">
            You are the Future
          </div>
          <div class="home-section-img"></div>
        </div>
        <div class="community-section-text home-section-text">
          At JK Rollup, we're not just building clients, trading strategies and AI models - We are building a community dedicated to innovation, development, and prosperity. We believe AI and 
          cryptocurrency will play important intersecting roles in the future of finance and humanity itself, and we want to get in on the ground floor. We're focused on the 
          trading space for now, but there is no limit to the applications and technologies we want to eventually build upon and contribute to. And the most important part of our
          ecosystem will always be the community - The people contributing the ideas and directions that we build into our goals. 
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
    }

    .top-section{
      width: 100%;
      box-sizing: border-box;
      padding-top:20px;
      display:flex;
      flex-direction: row;
      flex-wrap:wrap;
      align-items: center;
      justify-content: center;
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
      display : flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      margin-bottom:100px;
      flex-wrap: nowrap;
      flex: 0 0 50%;
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
  