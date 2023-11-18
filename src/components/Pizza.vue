<template>
  <article class="pizza btn">
    <h2>{{ name }}</h2>
    <p>{{ ingredients }}</p>
  </article>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Pizzas",
  props: {
    name: String,
    ingredients: Array,
  },
  setup() {
    const loading = ref(false);
    return { loading };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pizza {
  background-color: #fff;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  flex-basis: 250px;
}
</style>
