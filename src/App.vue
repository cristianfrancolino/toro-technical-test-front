<template>
  <NavBar v-if="!$route.meta.hideNavbar"/>
  <router-view></router-view>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
*,
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
