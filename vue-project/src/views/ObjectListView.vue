<script setup lang="ts">
import type { ObjectListViewData } from '@/types/ObjectListViewData';
import api from '@/api';
import { ref } from 'vue';
import { useObjectModal } from '@/composables/modalObjectData.vue';

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

function openObjectModal(item: any) {
    objectModal.open(item)
        .confirm((returnedObject) => {
            console.log("Confirmed:", returnedObject);
        })
        .cancel(() => {
            console.log("Cancelled");
        });
}


</script>

<template>

    <div
    class="main-container">
        <h3> {{ title }} </h3>
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
            @click="openObjectModal(listItem)" 
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
            <button>Add</button>
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