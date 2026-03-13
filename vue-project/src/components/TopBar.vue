<!-- <script lang="ts">
import { RouterLink } from 'vue-router'
</script> -->

<template>
    <div class="topbar-container">
        Topbar
        <RouterLink to="/login">Login</RouterLink>
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

</style>