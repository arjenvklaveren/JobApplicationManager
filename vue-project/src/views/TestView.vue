<script setup lang="ts">

import axios from "axios";
import { onMounted } from "vue";

async function loadData() {
    const response = await axios.get("http://localhost:3000/test/test");
  console.log(response.data)
}

onMounted(() => loadData());

</script>

<template>
    <div class="test-div">
        <h3>Test</h3>
        <p>This is a test page!</p>
    </div>
</template>

<style scoped lang="scss">

.test-div {
    border: solid 2px red;

    p {
        color: blue;
    }
}

</style>