<script setup lang="ts">
import { ref } from 'vue';

const selectedItem = ref(1);

const buttons = [
    { text: '最新通知' },
    { text: '新闻动态' },
    { text: '系统公告' }
];

</script>

<template>
<uni-row
    :gutter="12"
    style="margin: 12px;"
>
    <uni-col :span="8" v-for="(button, index) in buttons" :key="index">
        <button
            class="es-button"
            :class="{ selected: selectedItem === index }"
            @click="selectedItem = index"
        >{{ button.text }}</button>
    </uni-col>
</uni-row>
</template>
