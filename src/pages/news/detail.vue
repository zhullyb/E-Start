<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getCurrentInstance, ref } from 'vue';

const detail = ref();
const $instance = getCurrentInstance()?.proxy as any
onLoad(() => {
    const eventChannel = $instance.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data: any) => {
        detail.value = data.data
        console.log(data.data)
    })
})

</script>

<template>
    <view>{{ detail }}</view>
</template>