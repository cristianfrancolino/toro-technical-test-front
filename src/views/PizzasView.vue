<template>
  <div class="container">
    <h1 class="main_title">Pizzas</h1>
    <PizzaModal />
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pizzaModal">
      Add Pizza
    </button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Ingredients</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pizza in pizzasStore.pizzas" :key="pizza.id">
          <td>{{ pizza.name }}</td>
          <td>{{ parseIngredients(pizza.ingredients) }}</td>
          <td>{{ parsePrice(pizza.selling_price) }}</td>
          <td>
            <button disabled type="button" class="btn btn-warning btn-sm">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button type="button" @click="deletePizza(pizza.id)" class="btn btn-danger btn-sm">
              <span v-show="deleting.includes(pizza.id)" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <i v-show="!deleting.includes(pizza.id)" class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { usePizzasStore } from "../store/pizzas";
import { ref } from "vue";
import PizzaModal from "../components/PizzaModal.vue";

export default {
  name: "PizzasView",
  components: {
    PizzaModal
  },
  setup() {
    const loading = ref(false);
    const deleting = ref([]);
    const pizzasStore = usePizzasStore();
    return { loading, pizzasStore, deleting };
  },
  created() {
    this.getPizzas();
  },
  methods: {
    async getPizzas() {
      this.loading = true;
      await this.pizzasStore.getPizzas();
      this.loading = false;
    },
    async deletePizza(pizzaId) {
      this.deleting.push(pizzaId);
      await this.pizzasStore.deletePizza(pizzaId);
      this.deleting = this.deleting.filter(id => id !== pizzaId);
    },
    parseIngredients(ingredients) {
      return ingredients.map(ingredient => ingredient.name).join(', ');
    },
    parsePrice(price) {
      return `€${price.toFixed(2)}`;
    },
  }
};
</script>

<style scoped></style>
