<template>
  <h1 class="main_title">Pizzas</h1>
  <section class="pizzas" id="pizzas-section">
    <Pizza name="Muzzarella" :ingredients="['tomate', 'queso', 'oregano']" />
  </section>
  <Loader :loading="loading" />
  <button class="add-pizza-btn" id="add-pizza-btn">Add pizza</button>
  <div class="add-pizza-modal" id="add-pizza-modal">
    <div class="add-pizza-modal-content">
      <span class="add-pizza-modal-close" id="add-pizza-modal-close"
        >&times;</span
      >
      <h2>Add</h2>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginView",
  props: {},
  components: {
    
  },
  setup() {
    const loading = ref(false);
    return { loading };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
