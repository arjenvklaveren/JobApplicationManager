<script setup lang="ts">

const props = defineProps<{
    label: string | number
    value: any
}>()

const emit = defineEmits(['update']);

function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update', { key: props.label, value: target.value });
}
</script>

<template>
    <div class="prop-container">
        <span class="prop-label">
            {{ props.label }}
        </span>

        <span class="prop-divider">
            :
        </span>

        <input type="text" class="prop-value" :value="props.value" @input="onInput"> 

    </div>
</template>

<style scoped lang="scss">

.prop-container {

    .prop-label {
        font-weight: bold;
    }

}

</style>