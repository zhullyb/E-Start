<script setup lang="ts">
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { computed,ref } from 'vue';
import { reqOrganizationList } from '@/api/orgs';

const type = ref(0)
const orgs = ref([])

const listData = computed(() => {
    return orgs.value?.map((item: any) => ({
        id: item.id,
        title: item.name,
        img: item.pic,
        intro: item.introduction
    }))
})

const fetchData = async() => {
    const res = await reqOrganizationList(type.value)
    if (res.data.code === 0) {
        orgs.value = res.data.data.list
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
}

onLoad(async(option: any)=>{
    type.value = option.type
    await fetchData()
})

onPullDownRefresh(async()=>{
    await fetchData()
    uni.stopPullDownRefresh()
})

const goDetail = (item: any) => {
    uni.navigateTo({
        url: `/pages/orgs/detail?id=${item.id}`
    })
}
</script>

<template>
    <es-list :list="listData" @click="goDetail"></es-list>
</template>