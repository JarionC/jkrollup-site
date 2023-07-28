<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import store from './store';
export default {
  components: {
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
}
</style>
