<template>

<div class="sidebar-container">
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <RouterLink to="/companies">Companies</RouterLink>
    <RouterLink to="/positions">Positions</RouterLink>
    <!-- <RouterLink to="/applications">Applications</RouterLink>
    <RouterLink to="/appointments">Appointments</RouterLink> -->
    <RouterLink to="/tasks">Tasks</RouterLink>
</div>
    
</template>

<style scoped lang="scss">

.sidebar-container {
    display: flex;
    flex-direction: column;
    min-width: 10rem;
    max-width: 10rem;
    background-color: red;
}

</style>