<script setup lang="ts">
import { reqHotKeywords } from '@/api/search';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

const originData = ref(["推荐", "学生组织", "学生社团", "餐饮美食", "娱乐场所", "规章制度", "资料广场", "风景名胜", "勤工俭学"])

const recommendList = computed(() => {
    return originData.value.map((item, index) => {
        return {
            value: index,
            label: item
        }
    })
})

const fetchData = async() => {
    const res = await reqHotKeywords()
    if (res.data.code === 0) {
        originData.value = res.data.data
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
}

const doSearch = (res: string) => {
    uni.navigateTo({ url: `/pages/discover/searchResult?keyword=${res}` })
}

onLoad(async() => {
    await fetchData()
    console.log(recommendList)
})
</script>

<template>
    <view>
        <customer-search
            :maxSearchListLength="5"
            :recommendList="recommendList"
            recommendTabValueName="value"
            recommendTabShowName="label"
            @search="doSearch"
            @recommend="fetchData"
        ></customer-search>
    </view>
</template>