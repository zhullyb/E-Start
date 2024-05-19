<script setup lang="ts">
import { computed, ref } from 'vue'
const page = ref(1)

const data1 = [
    "风景名胜",
    "文化历史",
    "养生保健",
    "电影戏剧",
    "美容美发",
    "休闲购物",
    "棋牌桌游",
    "酒吧"
]

const data2 = [
    "小吃快餐",
    "甜品蛋糕",
    "农家菜",
    "海鲜",
    "火锅",
    "烤肉",
    "川菜",
    "西餐"
]

const data = computed(() => {
    if (page.value === 1) {
        return data1
    } else {
        return data2
    }
})

const selectedData = ref<string[]>([])

const select = (item: string) => {
    if (selectedData.value.includes(item)) {
        selectedData.value = selectedData.value.filter(v => v !== item)
    } else {
        selectedData.value.push(item)
    }

    console.log(selectedData.value)
}

const toNext = () => {
    console.log(page.value)
    if (page.value === 1) {
        page.value = 2
    } else {
        uni.reLaunch({ url: '/pages/index/index' })
    }
}

</script>

<template>
    <view class="root">
        <view class="text-title">个人偏好 - 休闲娱乐（选填）</view>
        <view style="height: 8px;"></view>
        <view class="text-desc">如果愿意，可以向我们提供您的个人偏好信息，我们会为您量身定制推荐内容</view>
        <view style="height: 20px;"></view>
        <uni-row :gutter="12">
            <uni-col v-for="item in data" :span="12">
                <view
                    class="card"
                    :class="{ 'selected': selectedData.includes(item) }"
                    @click="select(item)"
                >
                    <view>{{ item }}</view>
                </view>
                <view style="height: 6px;"></view>
            </uni-col>
        </uni-row>
        <view style="height: 20px;"></view>
        <view class="es-button selected" @click="toNext">提交</view>
        <view style="height: 10px;"></view>
        <view class="es-button" @click="toNext">跳过</view>
    </view>
</template>

<style scoped>
.root {
    margin-top: 15vh;
    padding: 0 20px;
}

.text-title {
    margin: 6px 0;
    font-size: 20px;
    font-weight: bold;
    color: #112D4E;
}

.text-desc {
    margin: 6px 0;
    font-size: 14px;
    color: #7c7c7c;
}

.card {
    border: 1px solid rgb(246, 247, 248);
    border-radius: 12px;
    background: rgb(246, 247, 248);
    padding: 25px 0;
}

.card.selected{
    border: 1px solid rgb(52, 53, 56);
    border-radius: 12px;
    background: rgb(232, 233, 235);
}

.card > view {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: rgb(0, 0, 0);
}
</style>