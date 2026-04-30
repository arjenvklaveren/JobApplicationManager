<template>
  <div class="grid-stack"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

onMounted(() => {
  const items = [
    { content: 'my first widget' },
    { w: 2, content: 'another longer widget!' }

]
  const grid = GridStack.init({
    cellHeight: 200
  })

  grid.load(items)
})

</script>

<style>
.grid-stack {
  background: #FAFAD2;
  width: 100%;
}

.grid-stack-item-content {
  background-color: #18BC9C;
}
</style>