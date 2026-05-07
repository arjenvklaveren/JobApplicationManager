import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
    
    const isAuth = ref(false);

    async function initialize() {
        await api.get('account/check-auth-state')
            .then(() => {
                isAuth.value = true;
            })
            .catch(() => {
                isAuth.value = false;
            }
        )
    }

    function isAuthenticated() {
        return isAuth.value;
    }

    function setAuthenticated() {
        isAuth.value = true;
    }

    async function logout() {
        await api.post('account/logout')
            .then(() => {
                isAuth.value = false;
                router.push('/login');
            }).catch((error) => {
            
        })
    }

  return { initialize, setAuthenticated, logout, isAuthenticated }
})
