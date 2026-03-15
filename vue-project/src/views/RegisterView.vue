<script setup lang="ts">
import { reactive } from 'vue';
import axios, { Axios } from 'axios';
import type { RegisterDTO } from '@jobapplicationmanager/shared';

const registerForm = reactive<RegisterDTO>({
  name: '',
  password: '',
  city: ''
})

async function submitRegister() {
  await axios.post("http://localhost:3000/account/register", registerForm);  
}

</script>

<template>

<form @submit.prevent="submitRegister">
    <h3>Register</h3>
    <input v-model="registerForm.name" placeholder="Username">
    <input v-model="registerForm.password" placeholder="Password">
    <input v-model="registerForm.city" placeholder="City">
    <button type="submit">Register</button>
</form>



</template>