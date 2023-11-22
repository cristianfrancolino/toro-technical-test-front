import { defineStore } from "pinia";
import axios from 'axios';
import { useUserStore } from "../store/user";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1].slice(0, -3);
    config.headers['X-XSRF-TOKEN'] = csrfToken;

    return config;
});

export const usePizzasStore = defineStore("pizzas", {
    state: () => ({
        pizzas: [],
    }),

    persist: true,

    actions: {
        async getPizzas() {
            try {
                const pizzas = await axios.get("http://localhost:8000/api/pizzas");
                this.pizzas = pizzas.data;
            } catch (error) {
                if (error.response?.status === 401) {
                    const userStore = useUserStore();
                    userStore.isAuthenticated = false;
                } else {
                    console.log('error');
                }
            }
        },
        async addPizza(name, ingredients) {
            try {
                const response = await axios.post("http://localhost:8000/api/pizzas", { name, ingredients });
                this.pizzas.push(response.data.pizza);
            } catch (error) {
                if (error.response?.status === 401) {
                    const userStore = useUserStore();
                    userStore.isAuthenticated = false;
                } else {
                    console.log('error');
                }
            }
        },
        async deletePizza(id) {
            try {
                await axios.delete(`http://localhost:8000/api/pizzas/${id}`);
                this.pizzas = this.pizzas.filter((pizza) => pizza.id !== id);
            } catch (error) {
                if (error.response?.status === 401) {
                    const userStore = useUserStore();
                    userStore.isAuthenticated = false;
                } else {
                    console.log('error');
                }
            }
        },
    },
});