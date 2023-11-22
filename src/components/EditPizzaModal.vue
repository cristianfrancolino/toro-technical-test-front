<template>
  <div class="modal fade" data-bs-backdrop="static" id="pizzaModal" tabindex="-1" aria-labelledby="pizzaModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="pizzaModalLabel">Pizza</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm"></button>
        </div>
        <form @submit.prevent="addPizza">
          <div class="modal-body">
            <!-- Name -->
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="name" placeholder="Fun Pizza" required>
            </div>
            <!-- Ingredients -->
            <div v-for="ingredient in ingredientsStore.ingredients" :key="ingredient.id"
              class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" :id="`ingredient-checkbox-${ingredient.id}`"
                :value="ingredient.id" v-model="checkedIngredients">
              <label class="form-check-label" :for="`ingredient-checkbox-${ingredient.id}`">{{ ingredient.name }}</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="close"
              @click="resetForm">Close</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {{ loading ? 'Loading' : 'Save changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { usePizzasStore } from "../store/pizzas";
import { useIngredientsStore } from "../store/ingredients";
import { ref } from "vue";

export default {
  name: "PizzaModal",
  props: {},
  components: {

  },
  setup() {
    const pizzasStore = usePizzasStore();
    const ingredientsStore = useIngredientsStore();
    const checkedIngredients = ref([]);
    const loading = ref(false);
    const close = ref(null);

    return { pizzasStore, ingredientsStore, checkedIngredients, loading, close };
  },
  created() {
    this.ingredientsStore.getIngredients();
  },
  data() {
    return {
      name,
    };
  },
  methods: {
    async addPizza() {
      this.loading = true;
      await this.pizzasStore.addPizza(this.name, this.checkedIngredients);
      this.loading = false;
      this.close.click();
    },
    resetForm() {
      this.name = '';
      this.checkedIngredients = [];
    }
  },
};
</script>

<style scoped>
.form-check-input {
  border: 1px solid black;
}
</style>
