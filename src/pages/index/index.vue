<template>
    <view class="content">
        <image class="logo" src="/static/logo.png" @click="toNews" />
        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'
const title = ref('Hello')

const toNews = () => {
    uni.navigateTo({ url: '/pages/news/index' })
}

onMounted(() => {
    try {
        const loginStatus = uni.getStorageSync('loginStatus')
        if (!loginStatus) {
            uni.reLaunch({ url: '/pages/login/index' })
        }
    } catch (e) {
        console.log('error: ', e)
    }
})
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
