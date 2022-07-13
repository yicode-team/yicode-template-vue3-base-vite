<template>
    <div class="div-1">
        news - {{ $Data.count }}
        <div class="div-2">2</div>
    </div>
</template>

<script setup>
import { useTest } from '@/hooks/useTest.js';
let $Data = reactive({
    count: 1
});
setTimeout(() => {
    $Data.count = useTest(1, 2);
}, 3000);
</script>

<style lang="scss" scoped>
.div-1 {
    color: #f00;
    .div-2 {
        color: #00a;
    }
}
</style>
