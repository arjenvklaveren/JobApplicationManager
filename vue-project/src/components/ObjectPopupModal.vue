<script setup lang="ts">
import { useObjectModal } from '@/composables/modalObjectData.vue';
import { ObjectModelViewType } from '@/enums/ObjectModalViewType';
import FormDisplayItem from './form/FormDisplayItem.vue';
import FormEditItem from './form/FormEditItem.vue';

const modal = useObjectModal();

function onEditItemUpdate({ key, value }: { key: string | number; value: any }) {
    modal.data.value[key] = value;
}
</script>

<template>
    <Teleport to="body">
        <div v-if="modal.isOpen.value" class="modal-overlay" @click.self="modal.close()">
            <div class="modal">
                <h3>Item details</h3>

                
                <p v-if="modal.viewtype.value == ObjectModelViewType.DisplayView"
                    v-for="(value, key) in modal.data.value">
                    <FormDisplayItem :label="key" :value="value" />
                </p>

                <p v-if="modal.viewtype.value == ObjectModelViewType.EditView || modal.viewtype.value == ObjectModelViewType.CreateView"
                    v-for="(value, key) in modal.data.value">
                    <FormEditItem :label="key" :value="value" @update="onEditItemUpdate" />
                </p>
                
  
                <button @click="modal.close()">Close</button>

                <button v-if="modal.viewtype.value == ObjectModelViewType.DisplayView"
                    @click="modal.switchToEditView()">
                    Edit
                </button>

                <button v-if="modal.viewtype.value == ObjectModelViewType.EditView"
                    @click="modal.deleteObject()">
                    Delete
                </button>

                <button 
                    @click="modal.confirm(modal.data)">
                    Confirm
                </button>
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