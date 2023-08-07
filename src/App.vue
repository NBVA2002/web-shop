<template>
  <div>
    <base-nav class="navbar"/>
    <router-view />
    <footer-place class="footer"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterPlace from "./components/FooterPlace.vue";
export default {
  name: "App",
  components: {
    BaseNav: NavBar,
    FooterPlace,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
