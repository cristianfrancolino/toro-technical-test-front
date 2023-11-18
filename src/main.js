import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import PizzasView from "./views/PizzasView.vue";
import LoginView from "./views/LoginView.vue";

const Home = { template: "<div>Home</div>" };

const routes = [
  { path: "/", component: Home },
  { path: "/pizzas", component: PizzasView },
  { path: "/login", component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
