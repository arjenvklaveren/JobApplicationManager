<script setup lang="ts">
import type { ObjectListViewData } from '@/types/ObjectListViewData';
import api from '@/api';
import { ref } from 'vue';
import { useObjectModal } from '@/composables/modalObjectData.vue';
import { ObjectModelViewType } from '@/enums/ObjectModalViewType';
import { generateDefaultListObject } from '@/helpers/GenerateDefaultListObjectHelper';

const props = defineProps<ObjectListViewData>()
var listData: any = ref([]);
var loading: boolean = true;

const objectModal = useObjectModal();

loadObjectListData();

async function loadObjectListData() {
    await api.get(props.controllerName + "/" + (props.customGetPath ?? "get-all"))
        .then((data) => {
            loading = false;
            listData.value = data.data;
        })
        .catch((error) => {
            loading = false;
            console.log(error);
        });
}

function openObjectModal(item: any, modelView: ObjectModelViewType) {

    if (modelView == ObjectModelViewType.CreateView) item = generateDefaultListObject(props.objectType);

    objectModal.open(item, modelView)
        .onConfirm((returnedObject) => {

            if (objectModal.viewtype.value == ObjectModelViewType.CreateView) {
                listData.value = [...listData.value, returnedObject.value];
            }

            if (objectModal.viewtype.value == ObjectModelViewType.EditView) {
                const updatedItem = returnedObject.value;

                listData.value = listData.value.map((listItem: any) =>
                    listItem.id === updatedItem.id ? updatedItem : listItem
                );
            }

        })
        .onCancel(() => {
            console.log("Cancelled");
        })
        .onDelete(() => {
            listData.value = listData.value.filter(
                (listItem: any) => listItem.id !== item.id
            );
        });

}


</script>

<template>

    <div
    class="main-container">
        <h3> {{ title }} </h3>
        <button
            @click="openObjectModal(null, ObjectModelViewType.CreateView)">
                Add
        </button>
        <div 
        v-if="listData.length > 0">

            <!-- Header row -->
            <div 
            class="list-grid list-header-row"
            :style="{ gridTemplateColumns: `repeat(${Object.values(listData[0]).length}, 1fr)` }">
                <span 
                class="list-header-key"
                v-for="listItemKey in Object.keys(listData[0])">
                    {{ listItemKey }}
                </span>
            </div>

            <!-- Data rows -->
            <div
            class="list-grid list-item-row"
            @click="openObjectModal(listItem, ObjectModelViewType.DisplayView)" 
            :style="{ gridTemplateColumns: `repeat(${Object.values(listData[0]).length}, 1fr)` }" 
            v-for="listItem in listData">
                <span 
                v-for="listItemValue in Object.values(listItem)">
                    {{ listItemValue }}
                </span>
            </div>

        <!-- Loading -->
        </div>
        <div v-else-if="loading == true">
            <span>Loading...</span>
        </div>

        <!-- No data -->
        <div v-else>
            <p>No items found</p>
        </div>
    </div>


</template>

<style scoped lang="scss">

.main-container {
    width: 100%;
}

.list-grid {
    display: grid;

    &.list-header-row {

        .list-header-key {
            font-weight: bold;
        }
    }

    &.list-item-row {

        &:hover {
            background-color: purple;
            cursor: pointer;
        }
    }
}

</style>