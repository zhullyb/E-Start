<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
import type { Business } from '@/types/restaurant';
import { reqBusinessList } from '@/api/restaurant';
const businessList = ref<Array<Business>>([])
const listData = computed(() => {
    return businessList.value?.map((item: Business) => ({
        id: item.id,
        title: item.name,
        img: item.pic,
        intro: item.introduction
    }))
})

const goDetail = (id: number) => {
    uni.navigateTo({
        url: `/pages/restaurant/detail?id=${id}`
    })
}

onLoad(async() => {
    const res = await reqBusinessList()
    if (res.data.code === 0) {
        businessList.value = res.data.data.list
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
})
</script>

<template>
    <es-list :list="listData" @click="goDetail" />
</template>