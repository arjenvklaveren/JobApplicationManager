<script setup lang="ts">
import type { ObjectListViewData } from '@/types/ObjectListViewData';
import api from '@/api';
import { ref } from 'vue';
import { useObjectModal } from '@/composables/modalObjectData.vue';
import { ObjectModelViewType } from '@/enums/ObjectModalViewType';
import { generateDefaultListObject } from '@/helpers/GenerateDefaultListObjectHelper';

const props = defineProps<ObjectListViewData>()
var listData: any = ref([]);
var loading = ref<boolean>(true);

const objectModal = useObjectModal();

loadObjectListData();

async function loadObjectListData() {
    await api.get(props.objectName + "/" + (props.customGetPath ?? "get-all"))
        .then((data) => {
            loading.value = false;
            listData.value = data.data;
        })
        .catch((error) => {
            loading.value = false;
            console.log(error);
        });
}

function openObjectModal(item: any, modelView: ObjectModelViewType) {

    //Instantiate empty object if opened as create view
    if (modelView == ObjectModelViewType.CreateView) item = generateDefaultListObject(props.objectType);

    objectModal.open(item, modelView)
        .onConfirm((returnedObject) => {

            //Created a new object
            if (objectModal.viewtype.value == ObjectModelViewType.CreateView) {
                onObjectCreated(returnedObject.value);
            }

            //Edited an object
            if (objectModal.viewtype.value == ObjectModelViewType.EditView) {
                onObjectEdited(returnedObject.value);
            }

        })

        //Deleted an object
        .onDelete(() => {
            onObjectDeleted(item);  
        })

        //Did nothing
        .onCancel(() => {
            console.log("Cancelled");
        });
}

async function onObjectCreated(object: any) {
    loading.value = true;
    await api.post(props.objectName + "/" + (props.customAddPath ?? "add-" + props.objectName), object)
        .then(() => {
            listData.value = [...listData.value, object];
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
        }
    );
}

async function onObjectEdited(object: any) {
    loading.value = true;
    await api.put(props.objectName + "/" + (props.customUpdatePath ?? "update-" + props.objectName), object)
        .then(() => {
            listData.value = listData.value.map((listItem: any) =>
                listItem.id === object.id ? object : listItem);
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
        }
    ); 
}

async function onObjectDeleted(object: any) {
    loading.value = true;
    await api.delete(props.objectName + "/" + (props.customDeletePath ?? "delete-" + props.objectName) + "/" + object.id)
        .then(() => {
            listData.value = listData.value.filter((listItem: any) =>
                listItem.id !== object.id);
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
        }
    ); 
}


</script>

<template>

    <div
    class="main-container">

        <div class="title-container">
            <h3> {{ title }} </h3>
            <span v-if="loading" class="loader"></span>
        </div>


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
                <span v-for="(listItemValue, key) in listItem">

                    <template v-if="typeof listItemValue === 'object'">
                        <span v-if="listItemValue !== null">
                            {{ key }}
                            <span v-if="Array.isArray(listItemValue)">({{ listItemValue.length }})</span>
                        </span>
                        <span v-else>Null</span>
                    </template>

                    <span v-else>{{ listItemValue }}</span>

                </span>
            </div>
        </div>
        <!-- No data -->
        <div v-else>
            <p v-if="loading != true">No items found</p>
        </div>
    </div>


</template>

<style scoped lang="scss">

.main-container {
    width: 100%;
}

.title-container {
    display: flex;
    align-items: center;
    gap: 0.25rem;
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

.loader {
    height: 1rem;
    aspect-ratio: 1/1;
    border: 0.15rem solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}    

</style>