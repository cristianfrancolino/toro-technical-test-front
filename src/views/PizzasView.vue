<template>
  <h1 class="main_title">Pizzas</h1>
  <section class="pizzas" id="pizzas-section">
    <Pizza name="Muzzarella" :ingredients="['tomate', 'queso', 'oregano']"/>
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
import Loader from "../components/Loader.vue";
import Pizza from "../components/Pizza.vue";
import { ref } from "vue";

export default {
  name: "PizzasView",
  props: {
    msg: String,
  },
  components: {
    Loader,
    Pizza,
  },
  setup() {
    const loading = ref(false);
    return { loading };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main_title {
  text-align: center;
  font-size: 3rem;
}

.pizzas {
  background-color: #cecece;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.add-pizza-btn {
  background-color: #3498db;
  border: none;
  padding: 1rem 2rem;
  color: #fff;
  font-size: 18px;
  border-radius: 1rem;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
}

.add-pizza-btn:hover {
  background-color: #65b7ee;
}

.add-pizza-modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.add-pizza-modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.add-pizza-modal-close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.add-pizza-modal-close:hover,
.add-pizza-modal-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 1200px) {
  .pizzas {
    justify-content: center;
  }
}

@media only screen and (max-width: 768px) {
  .add-pizza-btn {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
}
</style>
