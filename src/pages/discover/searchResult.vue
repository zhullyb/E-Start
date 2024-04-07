<script setup lang="ts">
import { reqSearch } from '@/api/search';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

const keyword = ref()
const searchResult = ref()

const fetchData = async () => {
    const res = await reqSearch(keyword.value)
    if (res.data.code === 0) {
        searchResult.value = res.data.data
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
}

const listData1 = computed(() => {
    return (searchResult.value?.[0]?.list || []).map((item: any) => ({
        id: item.id,
        title: item.name,
        img: item.pic,
        intro: item.introduction
    }))
})

const listData2 = computed(() => {
    return (searchResult.value?.[1]?.list || []).map((item: any) => ({
        id: item.id,
        title: item.name,
        img: item.pic,
        intro: item.introduction
    }))
})

const listData3 = computed(() => {
    return (searchResult.value?.[2]?.list || []).map((item: any) => ({
        id: item.id,
        title: item.name,
        img: item.pic,
        intro: item.introduction
    }))
})

onLoad(async(option: any) => {
    keyword.value = option.keyword
    await fetchData()
    console.log(listData1)
    console.log(listData2)
    console.log(listData3)
})

const toSearch = () => {
    uni.navigateTo({ url: '/pages/discover/search' })
}
</script>

<template>
    <view @click="toSearch" class="fakeSearchBar">
        <uni-icons type="search" size="24"/>
        <text style="margin: auto 4px; color: #999999; font-size: 14px;">{{ keyword }}</text>
    </view>
    <view v-show="listData1.length">
        <view class="text-title">热门推广</view>
        <es-list :list="listData1" @click=""></es-list>
    </view>
    <view v-show="listData2.length">
        <view class="text-title">餐饮美食</view>
        <es-list :list="listData2" @click=""></es-list>
    </view>
    <view v-show="listData3.length">
        <view class="text-title">组织社团</view>
        <es-list :list="listData3" @click=""></es-list>
    </view>
</template>

<style scoped>
.text-title {
    margin: 6px 20px;
    font-size: 20px;
}

.fakeSearchBar {
    display: flex;
    margin: 12px 20px;
    background: #F1F1F1;
    padding: 4px 12px;
    border-radius: 20px;
}
</style>