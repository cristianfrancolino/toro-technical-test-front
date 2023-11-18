<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Toro</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/pizzas">Pizzas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ingredients">Ingredients</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- <div class="navbar">
    <router-link class="link" to="/pizzas">Pizzas</router-link>
    <router-link class="link" to="/ingredients">Ingredients</router-link>
  </div> -->
</template>

<script>
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  background-color: #ffa600;
  display: flex;
}

.link {
  display: inline-block;
  padding: 1rem;
  color: #fff;
  text-decoration: none;
}
.link:hover {
  background-color: #d8971f;
}
</style>
