<script setup lang="ts">
import { reactive } from 'vue';
import axios, { Axios } from 'axios';

interface LoginForm {
  username: string
  password: string
}

const form = reactive<LoginForm>({
  username: '',
  password: ''
})

function submitLogin() {
    console.log(form);
}

</script>

<template>
    
    <form @submit.prevent="submitLogin">
        <h3>Login</h3>
        <input v-model="form.username" placeholder="Username">
        <input v-model="form.password" placeholder="Password">
        <button type="submit">Create</button>
    </form>
    
<div>
    <RouterLink to="/register">Register</RouterLink>
</div>

</template>