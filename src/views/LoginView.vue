<template>
  <h1 class="text-center mt-3">Login</h1>
  <form class="container" @submit.prevent="login">
    <div class="row justify-content-md-center">
      <div class="col-sm-6">
        <div class="form-group mt-5">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Enter email" required>
        </div>
        <div class="form-group mt-3">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
            minlength="8" required>
        </div>
        <button type="submit" class="btn btn-primary mt-3" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          {{ loading ? 'Loading' : 'Submit' }}
        </button>
        <div class="alert alert-danger alert-dismissible fade mt-5" :class="{ show: wrongCredentials }" role="alert">
          Oops, parece que el email o la contraseña no son correctos. Por favor, verifica e intentalo de nuevo.
          <button type="button" class="btn-close" aria-label="Close" @click="wrongCredentials = false"></button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import LoginResponses from '../constants/login';

export default {
  name: "LoginView",
  props: {},
  components: {

  },
  setup() {
    const loading = ref(false);
    const userStore = useUserStore();

    return { loading, userStore };
  },
  data() {
    return {
      email: "",
      password: "",
      wrongCredentials: false
    };
  },
  methods: {
    async login() {
      this.loading = true;
      const response = await this.userStore.signIn(this.email, this.password);
      this.loading = false;
      switch (response) {
        case LoginResponses.WRONG_CERENDIALTS:
          this.wrongCredentials = true;
          break;
        case LoginResponses.SUCCESS:
          this.$router.push({ name: 'Pizzas' });
          break;
      }
    },
  },
};
</script>

<style scoped></style>
