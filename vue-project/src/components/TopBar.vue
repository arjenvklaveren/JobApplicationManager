<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { RouterLink } from 'vue-router'

const authStore = useAuthStore();

</script>

<template>
    <div class="topbar-container">
        <span>Topbar</span>
        <RouterLink class="login-button" v-if="!authStore.isAuthenticated()" to="/login">Login</RouterLink>
        <span class="logout-button" v-else @click="authStore.logout()">Logout</span>
    </div>
</template>

<style scoped lang="scss">

.topbar-container {
    background-color: blue;
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}

.logout-button {
    text-decoration: underline;

    &:hover {
        cursor: pointer;
    }
}

</style>