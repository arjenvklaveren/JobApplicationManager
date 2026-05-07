<script setup lang="ts">

const props = defineProps<{
  label: string | number
  value: any
}>()

</script>

<template>
    <div class="prop-container">
        <span class="prop-label">
            {{ props.label }}
        </span>

        <span class="prop-divider">: </span>

        <span class="prop-value">
            {{ props.value }}
        </span>

    </div>
</template>

<style scoped lang="scss">

.prop-container {

    .prop-label {
        font-weight: bold;
    }

}

</style>