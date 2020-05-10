<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
// import components
import Navbar from "./components/Navbar";

export default {
  name: "App",
  // register components
  components: {
    Navbar
  }
};
</script>

<style >
body {
  background: url("./assets/bw-city.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: "Muli";
}
</style>
