<script setup lang="ts">
import { computed, ref } from 'vue'
import type { studentInfo } from '@/types/user';
import { onLoad } from '@dcloudio/uni-app';
import { reqStudentInfo } from '@/api/user';
const date = new Date()
const accessToken = uni.getStorageSync('access_token')
const studentInfo = ref<studentInfo>()

const getCurrentTime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    const second = String(date.getSeconds()).padStart(2, '0')
    return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
}

const curTime = ref(getCurrentTime())
const qrcTime = ref(date.toISOString())
const refreshTime = ref(15)

const qrcode = computed(() => {
    return {
        code: JSON.stringify({
            time: qrcTime.value,
            token: accessToken
        }),
        size: 450,
        level: 4
    }
})

onLoad(async()=>{
    setInterval(async()=>{
        qrcTime.value = new Date().toISOString()
        await new Promise(resolve => setTimeout(resolve, 500));
        refreshTime.value = 15
    }, 15000)
    setInterval(()=>{
        curTime.value = getCurrentTime()
        refreshTime.value--
    }, 1000)
    studentInfo.value = uni.getStorageSync('studentInfo')
    if (!studentInfo.value) {
        const res = await reqStudentInfo()
        if (res.data.code === 0) {
            studentInfo.value = res.data.data
            uni.setStorageSync('studentInfo', studentInfo.value)
        } else {
            uni.showToast({
                title: res.data.msg,
                icon: 'none'
            })
        }
    }
    
    // sleep 10s
    await new Promise(resolve => setTimeout(resolve, 5000));
    uni.showToast({
        title: '扫码成功',
    })
})

const returnBack = () => {
    uni.navigateBack()
}
</script>

<template>
    <view>
        <view class="info-card">
            <view class="text-title">面向摄像头展示二维码</view>
            <view class="text-title">完成打卡</view>
            <view class="divider"></view>
            <view class="text-title">{{ studentInfo?.name }}</view>
            <view style="display: flex;">
                <w-qrcode :options="qrcode" style="margin: auto;"></w-qrcode>
            </view>
            <view class="text-desc">{{ curTime }}</view>
            <view class="text-desc">{{ refreshTime }}秒后自动更新</view>
        </view>
        <button
            @click="returnBack"
            class="es-button selected"
            style="
                margin: 32px;
                position: fixed;
                bottom: 0;
                width: calc(100% - 64px);"
        >返回</button>
    </view>
</template>

<style scoped>
.info-card {
    background: #FFFFFF;
    margin: 32px;
    padding: 32px;
    border-radius: 16px;
}

.text-title {
    color: #000000;
    font-size: 20px;
    font-weight: 600;
    margin: 12px 0;
    text-align: center;
}

.text-desc {
    color: rgb(33, 33, 33);
    font-size: 16px;
    margin: 8px 0;
    line-height: 16px;
    word-break: break-all;
    text-align: center;
}

.divider {
    height: 1px;
    width: 100%;
    margin: 32px 0;
    border-top: 2px dashed rgb(255, 133, 138);;
}
</style>

<style>
page {
    background: #F9FAFB;
}
</style>