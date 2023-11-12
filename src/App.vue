<template>
  <div id="app">
    <div class="site-container">
      <Navbar/>
      <router-view />
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar';
import store from './store';
import Footer from './components/FooterView';
export default {
  components: {
    Navbar,
    Footer
  },
};
</script>

<style>
html{
  height:100%;
  width:100%;
}
body{
      width:100%;
      height:100%;
      background-color: black;
      box-sizing: border-box;
      padding:0;
      margin: 0;
    }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
      height:100%;
      box-sizing: border-box;
  display:flex;
  flex-direction:column;

}
.site-container{
  height:100%;
  display:flex;
  flex-direction: column;
}
</style>
