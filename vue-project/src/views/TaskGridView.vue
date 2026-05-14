<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import api from '@/api';
import type { TaskDTO } from '@jobapplicationmanager/shared';
import { useObjectModal } from '@/composables/ModalObjectData.vue';
import { ObjectModelViewType } from '@/enums/ObjectModalViewType';
import { generateDefaultListObject } from '@/helpers/GenerateDefaultListObjectHelper';
import { ObjectListObjectType } from '@/enums/ObjectListObjectType';

const objectModal = useObjectModal();
var loading = ref<boolean>(true);

var todoGrid: any = null;
var doingGrid: any = null;
var doneGrid: any = null;

var gridOpts = { 
  dragOut: true,
  minRow: 1,
  cellHeight: 50,
  margin: 5,
  acceptWidgets: true,
  removable: '.delete-item-container'
}

onMounted(() => {
  initializeGrids();
  generateGridItems();
})

function initializeGrids() {
  todoGrid = GridStack.init(gridOpts, "todo-grid");
  doingGrid = GridStack.init(gridOpts, "doing-grid");
  doneGrid = GridStack.init(gridOpts, "done-grid");

  [todoGrid, doingGrid, doneGrid].forEach(grid => {
    grid.on('dropped', () => console.log("item dropped"));
    grid.on('added', () => console.log("item added"));
    grid.on('removed', () => console.log("item removed"));
  });

}

async function generateGridItems() {
  let taskObjects;

  await api.get("/task/get-all")
    .then((result) => {
      taskObjects = result.data;
      loading.value = false;

      for (let i = 0; i < taskObjects.length; i++) {
        let gridItem = generateItemFromTaskObject(taskObjects[i]);

        let grid = getGridByStage(taskObjects[i].stage);
        if (grid == null) continue; 
        grid.addWidget(gridItem);
      }
    })
    .catch((error) => {
      console.log(error);
      loading.value = false;
    })
}

function generateItemFromTaskObject(taskObject: TaskDTO) {
  return {
    w: 12,
    content: taskObject.description
  }
}

function getGridByStage(stage: number) {
  switch (stage) {
    case 0:
      return todoGrid;
    case 1:
      return doingGrid;
    case 2:
      return doneGrid;
    default:
      return null;
  }
}

function openTaskModal(item: any, modelView: ObjectModelViewType) {

    //Instantiate empty object if opened as create view
    if (modelView == ObjectModelViewType.CreateView) item = generateDefaultListObject(ObjectListObjectType.Tasks);

    objectModal.open(item, modelView, false)
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
            //onObjectDeleted(item);  
        })

        //Did nothing
        .onCancel(() => {
            console.log("Cancelled");
        });
}

async function onObjectCreated(object: any) {
    loading.value = true;
    await api.post("/task/add-task", object)
        .then(() => {
            todoGrid.addWidget(generateItemFromTaskObject(object));
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
        }
    );
}

async function onObjectEdited(object: any) {
    loading.value = true;
    await api.put("TODO", object)
        .then(() => {
            //TODO
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
            console.log(error);
        }
    ); 
}

async function onObjectDeleted(object: any) {
    loading.value = true;
    await api.delete("TODO")
        .then(() => {
            //TODO
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
            console.log(error);
        }
    ); 
}

</script>

<template>

  <div class="main-container">
    <div class="title-container">
      <h3> Tasks </h3>
      <span v-if="loading" class="loader"></span>
    </div>

    <button @click="openTaskModal(null, ObjectModelViewType.CreateView)">
      Add
    </button>

    <div class="main-grid-container">
      <div class="todo-grid-container grid-container">
        <h3>Todo</h3>
        <div class="grid-stack" id="todo-grid"></div>
      </div>

      <div class="doing-grid-container grid-container">
        <h3>Doing</h3>
        <div class="grid-stack" id="doing-grid"></div>
      </div>

      <div class="done-grid-container grid-container">
        <h3>Done</h3>
        <div class="grid-stack" id="done-grid"></div>
      </div>
    </div>

    <div class="delete-item-container"></div>

  </div>




</template>

<style>

.main-container {
  width: 100%;
}

.main-grid-container {
  width: 100%;
  display: flex;
}

.grid-container {
  width: 100%;
}

.grid-stack {
  background: #FAFAD2;
  width: 100%;
}

.grid-stack-item-content {
  background-color: #18BC9C;
}

.title-container {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.delete-item-container {
  background-color: yellow;
  width: 100%;
  height: 100px;
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