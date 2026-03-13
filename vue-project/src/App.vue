<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';
</script>

<template>
  <header>
    <div id="app-wrapper">

      <TopBar/>

      <div id="app-content">
        <SideBar/>
        <RouterView />
      </div>
      
    </div>
  </header>


</template>

<style scoped>

#app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app-content {

  display: flex;
  flex: 1;
  flex-direction: row;

}

</style>
