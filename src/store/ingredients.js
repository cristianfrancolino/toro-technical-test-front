import { defineStore } from "pinia";
import axios from 'axios';
import { useUserStore } from "./user";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1].slice(0, -3);
    config.headers['X-XSRF-TOKEN'] = csrfToken;

    return config;
});

export const useIngredientsStore = defineStore("ingredients", {
    state: () => ({
        ingredients: [],
    }),

    persist: true,

    actions: {
        async getIngredients() {
            try {
                const ingredients = await axios.get("http://localhost:8000/api/ingredients");
                this.ingredients = ingredients.data;
            } catch (error) {
                if (error.response?.status === 401) {
                    const userStore = useUserStore();
                    userStore.isAuthenticated = false;
                } else {
                    console.log('error');
                }
            }
        },
        async addIngredient(name, cost_price) {
            try {
                const response = await axios.post("http://localhost:8000/api/ingredients", { name, cost_price });
                this.ingredients.push(response.data.ingredient);
            } catch (error) {
                if (error.response?.status === 401) {
                    const userStore = useUserStore();
                    userStore.isAuthenticated = false;
                } else {
                    console.log('error');
                }
            }
        },
        async deleteIngredient(id) {
            try {
                await axios.delete(`http://localhost:8000/api/ingredients/${id}`);
                this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== id);
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