<template>
  <h1 class="text-center mt-3">Login</h1>
  <form class="container" @submit.prevent="login">
    <div class="row justify-content-md-center">
      <div class="col-sm-6">
        <div class="form-group mt-5">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div class="form-group mt-3">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="password"
            placeholder="Password"
            minlength="8"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mt-3" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {{ loading ? "Loading" : "Submit" }}
        </button>
        <div
          class="alert alert-danger alert-dismissible fade mt-5"
          :class="{ show: wrongCredentials }"
          role="alert"
        >
          Oops, it seems that the email or password is not correct. Please check
          and try again.
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="wrongCredentials = false"
          ></button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import LoginResponses from "../constants/login";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const wrongCredentials = ref(false);
const loading = ref(false);
const userStore = useUserStore();
const router = useRouter();

async function login() {
  loading.value = true;
  const response = await userStore.signIn(email.value, password.value);
  loading.value = false;
  switch (response) {
    case LoginResponses.WRONG_CERENDIALTS:
      wrongCredentials.value = true;
      break;
    case LoginResponses.SUCCESS:
      router.push({ name: "Pizzas" });
      break;
  }
}
</script>

<style scoped></style>
