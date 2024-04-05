<template>
    <view class="content">
        <image class="logo" src="/static/logo.png" @click="toNews" />
        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>
    </view>
    <view style="display: none;">
        <image
            v-for="image in imageToPreload"
            :src="image"
            mode="scaleToFill"
        />
    </view>
    <button @click="messageSubscribe1">
        任务反馈提醒
    </button>
    <button @click="messageSubscribe2">
        审核结果通知
    </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'
const title = ref('Hello')

const toNews = () => {
    uni.navigateTo({ url: '/pages/restaurant/detail?id=1' })
}

const messageSubscribe1 = () => {
    uni.requestSubscribeMessage({
        tmplIds: ['zWqQ0g3O0V2PKlXIYEdfqmmwB_n0tOGExlIPxqbBvd8'],
        success() {
            uni.showToast({
                title: '订阅成功',
                icon: 'success'
            })
        }
    })
}

const messageSubscribe2 = () => {
    uni.requestSubscribeMessage({
        tmplIds: ['tfmRn9iQCGCUOOJnMsfImS5Q9HAezfbBIx6BUHn6uwI'],
        success() {
            uni.showToast({
                title: '订阅成功',
                icon: 'success'
            })
        }
    })
}

const imageToPreload = [
    "https://bu.dusays.com/2024/03/27/66030a1c8ae3d.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ca04e5.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ca176e.webp",
    "https://bu.dusays.com/2024/03/27/66030a1c95d94.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ca3ecc.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ccdeb5.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ce82d7.webp",
    "https://bu.dusays.com/2024/03/27/66030a1d61b53.webp",
    "https://bu.dusays.com/2024/04/01/6609d4a87058f.webp",
    "https://bu.dusays.com/2024/04/01/6609d4dd26ff7.webp"
]

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
