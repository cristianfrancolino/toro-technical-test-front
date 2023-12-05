import { createRouter, createWebHistory } from "vue-router";
import PizzasView from "./views/PizzasView.vue";
import LoginView from "./views/LoginView.vue";
import IngredientsView from "./views/IngredientsView.vue";
import { useUserStore } from "./store/user";

const routes = [
    {
        path: "/",
        name: "Home",
        component: PizzasView,
        meta: {
            requiresAuth: true,
            title: "Pizzapp | Pizzas"
        }
    },
    {
        path: "/pizzas",
        name: "Pizzas",
        component: PizzasView,
        meta: {
            requiresAuth: true,
            title: "Pizzapp | Pizzas"
        }
    },
    {
        path: "/ingredients",
        name: "Ingredients",
        component: IngredientsView,
        meta: {
            requiresAuth: true,
            title: "Pizzapp | Ingredients"
        }
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        meta: {
            hideNavbar: true,
            title: "Pizzapp | Login"
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
        document.title = to.meta.title;
        next();
    }
});

export default router;