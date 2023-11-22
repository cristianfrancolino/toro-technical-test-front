<template>
  <div class="container">
    <h1 class="main_title">Ingredients</h1>
    <IngredientModal />
    <EditIngredientModal :ingredient="editingIngredient" />
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ingredientModal">
      Add Ingredient
    </button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in ingredientsStore.ingredients" :key="ingredient.id">
          <td>{{ ingredient.name }}</td>
          <td>{{ parsePrice(ingredient.cost_price) }}</td>
          <td>
            <button disabled type="button" data-bs-toggle="modal" data-bs-target="#editIngredientModal" @click="openModal(ingredient)" class="btn btn-warning btn-sm">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button type="button" @click="deleteIngredient(ingredient.id)" class="btn btn-danger btn-sm">
              <span v-show="deleting.includes(ingredient.id)" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <i v-show="!deleting.includes(ingredient.id)" class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useIngredientsStore } from "../store/ingredients";
import { ref } from "vue";
import IngredientModal from "../components/IngredientModal.vue";
import EditIngredientModal from "../components/EditIngredientModal.vue";

export default {
  name: "PizzasView",
  components: {
    IngredientModal,
    EditIngredientModal
  },
  setup() {
    const loading = ref(false);
    const deleting = ref([]);
    const ingredientsStore = useIngredientsStore();
    const editingIngredient = ref({});

    return { loading, ingredientsStore, deleting, editingIngredient };
  },
  created() {
    this.getIngredients();
  },
  methods: {
    async getIngredients() {
      this.loading = true;
      await this.ingredientsStore.getIngredients();
      this.loading = false;
    },
    async deleteIngredient(ingredientId) {
      this.deleting.push(ingredientId);
      await this.ingredientsStore.deleteIngredient(ingredientId);
      this.deleting = this.deleting.filter(id => id !== ingredientId);
    },
    openModal(ingredient) {
      this.editingIngredient = ingredient;
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
