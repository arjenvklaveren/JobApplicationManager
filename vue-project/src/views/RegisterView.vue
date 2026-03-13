<script setup lang="ts">
import { reactive } from 'vue';
import axios, { Axios } from 'axios';
import type { RegisterDTO } from '@jobapplicationmanager/shared';

const form = reactive<RegisterDTO>({
  name: '',
  password: '',
  city: ''
})

function submitRegister() {
  console.log(form);

  axios.post("http://localhost:3000/test/test-register", form);
  
}

</script>

<template>

<form @submit.prevent="submitRegister">
    <h3>Register</h3>
    <input v-model="form.name" placeholder="Username">
    <input v-model="form.password" placeholder="Password">
    <input v-model="form.city" placeholder="City">
    <button type="submit">Create</button>
</form>



</template>