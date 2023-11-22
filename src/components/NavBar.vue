<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Toro</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
        <ul class="mb-2 mb-lg-0 nav">
          <li>
            <button type="button" class="nav-link" @click="logout">
              <span v-show="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {{ loading ? 'Logging out' : 'Logout' }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import LoginResponses from '../constants/login';

export default {
  name: "NavBar",
  setup() {
    const loading = ref(false);
    const userStore = useUserStore();

    return { userStore, loading };
  },
  methods: {
    async logout() {
      this.loading = true;
      const response = await this.userStore.logout();
      this.loading = false;
      switch (response) {
        case LoginResponses.SUCCESS:
          this.$router.push({ name: 'Login' });
          break;
      }
    }
  }
};
</script>

<style scoped></style>
