<script setup lang="ts">
import { ref } from 'vue';

const selectedItem = ref(1);

</script>

<template>
<uni-row
    :gutter="12"
    style="margin: 12px;"
>
    <uni-col :span="8">
        <button
            class="es-button"
            :class="{ selected: selectedItem === 0 }"
            @click="selectedItem = 0"
        >最新通知</button>
    </uni-col>
    <uni-col :span="8">
        <button
            class="es-button"
            :class="{ selected: selectedItem === 1 }"
            @click="selectedItem = 1"
        >新闻动态</button>
    </uni-col>
    <uni-col :span="8">
        <button
            class="es-button"
            :class="{ selected: selectedItem === 2 }"
            @click="selectedItem = 2"
        >系统公告</button>
    </uni-col>
</uni-row>
</template>