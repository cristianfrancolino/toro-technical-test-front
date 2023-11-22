<template>
  <div class="modal fade" data-bs-backdrop="static" id="ingredientModal" tabindex="-1" aria-labelledby="ingredientModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ingredientModalLabel">Ingredient</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm"></button>
        </div>
        <form @submit.prevent="addIngredient">
          <div class="modal-body">
            <!-- Name -->
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="name" placeholder="Tomato" required>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input type="number" step="0.01" class="form-control" id="price" v-model="price" placeholder="0.50" required>
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
import { useIngredientsStore } from "../store/ingredients";
import { ref } from "vue";

export default {
  name: "IngredientModal",
  props: {},
  components: {

  },
  setup() {
    const ingredientsStore = useIngredientsStore();
    const loading = ref(false);
    const close = ref(null);

    return { ingredientsStore, loading, close };
  },
  created() {
    this.ingredientsStore.getIngredients();
  },
  data() {
    return {
      name: '',
      price: 0
    };
  },
  methods: {
    async addIngredient() {
      this.loading = true;
      await this.ingredientsStore.addIngredient(this.name, this.price);
      this.loading = false;
      this.close.click();
    },
    resetForm() {
      this.name = '';
      this.price = 0;
    }
  },
};
</script>

<style scoped>
.form-check-input {
  border: 1px solid black;
}
</style>
