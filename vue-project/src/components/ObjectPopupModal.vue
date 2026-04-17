<script setup lang="ts">
import { useObjectModal } from '@/composables/modalObjectData.vue';

const modal = useObjectModal();
</script>

<template>
    <Teleport to="body">
        <div v-if="modal.isOpen.value" class="modal-overlay" @click.self="modal.close()">
            <div class="modal">
                <h3>Item details</h3>

                <pre>{{ modal.data }}</pre>

                <button @click="modal.close()">Close</button>
                <button @click="modal.confirm(modal.data)">Confirm</button>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">

.modal-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}

.modal {
    background-color: green;
    width: 50%;
}

</style>