<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" @click="toNews" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import useLoginStatus from '@/stores/loginStatus';
import { onMounted } from 'vue';
import { ref } from 'vue'
const title = ref('Hello')
const newLoginStatus = useLoginStatus()

const toNews = () => {
  console.log('to news')
  uni.navigateTo({url: '/pages/news/index'})
}

onMounted(() => {
  if (!newLoginStatus.loginStatus) {
    newLoginStatus.setLoginStatus(true)
    uni.navigateTo({url: '/pages/login/index'})
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
