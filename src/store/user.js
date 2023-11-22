import { defineStore } from "pinia";
import axios from 'axios';
import LoginResponses from '../constants/login';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1].slice(0, -3);
    config.headers['X-XSRF-TOKEN'] = csrfToken;

    return config;
});

export const useUserStore = defineStore("user", {
    state: () => ({
        isAuthenticated: false,
    }),

    persist: true,

    actions: {
        async signIn(email, password) {
            try {
                await this.csrfCookie();
            } catch (error) {
                return LoginResponses.UNEXPECTED_ERROR;
            }

            try {
                await axios.post("http://localhost:8000/login", {
                    email,
                    password
                });
                this.isAuthenticated = true;
                return LoginResponses.SUCCESS;
            } catch (error) {
                if (error.response?.status === 422) {
                    return LoginResponses.WRONG_CERENDIALTS;
                } else {
                    return LoginResponses.UNEXPECTED_ERROR;
                }
            }
        },
        async logout() {
            try {
                await this.csrfCookie();
                await axios.post("http://localhost:8000/logout");
                this.isAuthenticated = false;
                return LoginResponses.SUCCESS;
            } catch (error) {
                return LoginResponses.UNEXPECTED_ERROR;
            }


        },
        async csrfCookie() {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');
        }
    },
});