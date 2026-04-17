<script lang="ts">

import { ref } from "vue";

const isOpen = ref(false);
const data = ref<any>(null);

let confirmCallback: ((value: any) => void) | null = null;
let cancelCallback: (() => void) | null = null;

export function useObjectModal() {
    function open(payload: any) {
        data.value = { ...payload };
        isOpen.value = true;

        return {
            confirm(cb: (value: any) => void) {
                confirmCallback = cb;
                return this; 
            },
            cancel(cb: () => void) {
                cancelCallback = cb;
                return this;
            }
        };
    }

    function confirm(updatedItem: any) {
        isOpen.value = false;
        confirmCallback?.(updatedItem);
        cleanup();
    }

    function close() {
        cancel();
    }

    function cancel() {
        isOpen.value = false;
        cancelCallback?.();
        cleanup();
    }

    function cleanup() {
        confirmCallback = null;
        cancelCallback = null;
    }

    return {
        isOpen,
        data,
        open,
        close,
        confirm,
        cancel
    };
}

</script>