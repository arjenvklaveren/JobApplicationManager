<script setup lang="ts">
import ApplicationsPanel from '@/components/dashboard-panels/ApplicationsPanel.vue';
import AppointmentsPanel from '@/components/dashboard-panels/AppointmentsPanel.vue';
import TasksPanel from '@/components/dashboard-panels/TasksPanel.vue';

</script>

<template>

<div class="panel-container">

    <ApplicationsPanel/>
    <AppointmentsPanel/>
    <TasksPanel/>

</div>
</template>

<style scoped lang="scss">

.panel-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

</style>