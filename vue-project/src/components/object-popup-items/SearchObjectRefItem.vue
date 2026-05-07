<script setup lang="ts">
import api from '@/api';
import { ref } from 'vue';

const props = defineProps<{
    initialObject: any,
    isEditMode: boolean,
    refObjectMainKey: string,
    refObjectDisplayKey: string,
    propertyLabel: string,
    fetchUrl: string
}>()

var dropdownItems: any = ref([]);
var typeDebounceTimeout: any;

const emit = defineEmits(['update']);

function loadDropdownItems(event: any) {
    clearTimeout(typeDebounceTimeout)

    
    typeDebounceTimeout = setTimeout(() => {

        //TEMP: EMPTY STRING LOADS ALL, THIS PREVENTS MOST CASES
        if (event.target.value.length == 0) {
            dropdownItems.value = [];
            return;
        }
        
        api.get(props.fetchUrl)
            .then((result: any) => {

                
                //TEMP: LOAD ALL ITEMS, FILTERING ON CLIENT SIDE (TODO, FILTER ON SERVER SIDE)
                var filtered: any[] = result.data.filter((item: any) => {
                    return item[props.refObjectDisplayKey].toLowerCase().startsWith(event.target.value.toLowerCase());
                })
                
                dropdownItems.value = filtered;
            })
            .catch((error) => {
                console.log(error);
            })
        
    }, 400);
    
}

function selectDropdownItem(item: any) {
    dropdownItems.value = [];
    props.initialObject.value[props.refObjectMainKey] = item;
    emit('update', { key: props.refObjectMainKey, value: item });
}

</script>

<template>

<div class="item-container">
    <span class="item-label">{{ props.propertyLabel }}</span>
    <span>: </span>

    <template v-if="props.isEditMode">    
        <input @input="loadDropdownItems">
        <p class="dropdown-item" 
            v-for="dropdownItem in dropdownItems"
            @click="selectDropdownItem(dropdownItem)">
            {{ dropdownItem[props.refObjectDisplayKey] }}
        </p>
    </template>
    <template v-else>
        <span v-if="props.initialObject.value[props.refObjectMainKey] != null">
            {{props.initialObject.value[props.refObjectMainKey][props.refObjectDisplayKey]}}
        </span>
    </template>
</div>

</template>

<style scoped lang="scss">

.item-container {

    .item-label {
        font-weight: bold;
    }

    .dropdown-item {

        &:hover {
            cursor: pointer;
            background-color: orange;
        }
    }



}

</style>