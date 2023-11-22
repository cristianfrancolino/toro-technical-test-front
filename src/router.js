import { createRouter, createWebHistory } from "vue-router";
import PizzasView from "./views/PizzasView.vue";
import LoginView from "./views/LoginView.vue";
import IngredientsView from "./views/IngredientsView.vue";
import { useUserStore } from "./store/user";

const Home = { template: "<div>Home</div>" };

const routes = [
    { path: "/", component: Home },
    {
        path: "/pizzas",
        name: "Pizzas",
        component: PizzasView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/ingredients",
        name: "Ingredients",
        component: IngredientsView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        meta: {
            hideNavbar: true,
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.matched.some(record => record.meta.requiresAuth) && !userStore.isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;