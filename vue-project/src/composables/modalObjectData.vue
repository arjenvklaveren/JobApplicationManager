<script lang="ts">

import { ObjectModelViewType } from "@/enums/ObjectModalViewType";
import type { CustomModalElement } from "@/types/CustomModalElement";
import { ref } from "vue";
 
const isOpen = ref(false);
const data = ref<any>(null);
const viewtype = ref<ObjectModelViewType>();
const customElements = ref<CustomModalElement[] | null>();
const ignoredElements = ref<string[] | null>();

let confirmCallback: ((value: any) => void) | null = null;
let cancelCallback: (() => void) | null = null;
let deleteCallback: ((value: any) => void) | null = null;

export function useObjectModal() {
    function open(payload: any, modalViewtype: ObjectModelViewType, ignoredElementsKeys?: string[] | null, customModalElements?: CustomModalElement[] | null) {

        data.value = { ...payload };
        isOpen.value = true;
        viewtype.value = modalViewtype; 
        customElements.value = customModalElements || null;
        ignoredElements.value = ignoredElementsKeys || null;

        return {
            onConfirm(cb: (value: any) => void) {
                confirmCallback = cb;
                return this; 
            },
            onCancel(cb: () => void) {
                cancelCallback = cb;
                return this;
            },
            onDelete(cb: () => void) {
                deleteCallback = cb;
                return this;
            }
        };
    }

    function confirm(updatedItem: any) {
        isOpen.value = false;
        confirmCallback?.(updatedItem);
        cleanup();
    }

    function close(callCancelCb: boolean = true) {
        isOpen.value = false;
        if(callCancelCb) cancelCallback?.();
        cleanup();
    }

    function cancel() {
        close();
    }

    function deleteObject() {
        deleteCallback?.(data.value);   
        close(false);
    }

    function switchToEditView() {
        viewtype.value = ObjectModelViewType.EditView;
    }

    function cleanup() {
        confirmCallback = null;
        cancelCallback = null;
    }

    return {
        isOpen,
        data,
        viewtype,
        customElements,
        ignoredElements,
        open,
        close,
        confirm,
        cancel,
        deleteObject,
        switchToEditView,
    };
}

</script>