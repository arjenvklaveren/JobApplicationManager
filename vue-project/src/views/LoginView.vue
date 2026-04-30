<script setup lang="ts">
import { reactive } from 'vue';
import api from '@/api';
import type { LoginDTO } from '@jobapplicationmanager/shared';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const loginForm = reactive<LoginDTO>({
  id: null,
  username: '',
  password: ''
})

async function submitLogin() {
    await api.post<{ access_token: string }>("http://localhost:3000/account/login", loginForm)
    .then(() => {
        authStore.setAuthenticated();
        router.push('/');
    })
    .catch((error) => {
        console.log(error);
    });
}

</script>

<template>
    
    <form @submit.prevent="submitLogin">
        <h3>Login</h3>
        <input v-model="loginForm.username" placeholder="Username">
        <input v-model="loginForm.password" placeholder="Password">
        <button type="submit">Login</button>
    </form>
    
<div>
    <RouterLink to="/register">Register</RouterLink>
</div>

</template>