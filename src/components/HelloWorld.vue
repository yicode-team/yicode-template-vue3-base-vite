<template>
    <h1 class="ml-4" bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600">13323</h1>
</template>
<script setup>
import { ref } from "vue";

defineProps({
    msg: String,
});

const count = ref(0);
</script>

<style lang="scss" scoped>
h1 {
    color: #f33;
}
</style>
