<script setup lang="ts">
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import type { studentInfo } from '@/types/user';
import { ref } from 'vue';
import { reqStudentInfo } from '@/api/user';

const studentInfo = ref<studentInfo>()

const toRoommateList = () => {
    uni.navigateTo({
        url: '/pages/mine/roommateList'
    })
}

const toExchange = () => {
    uni.navigateTo({
        url: '/pages/mine/exchange'
    })
}

onLoad(() => {
    studentInfo.value = uni.getStorageSync('studentInfo')
})

onPullDownRefresh(async() => {
    const res = await reqStudentInfo()
    if (res.data.code === 0) {
        studentInfo.value = res.data.data
        uni.setStorageSync('studentInfo', res.data.data)
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
    uni.stopPullDownRefresh()
})
</script>

<template>
    <view>
        <view style="display: flex; height: 36vh;">
            <image
                src="/static/logo.png"
                mode="scaleToFill"
                style="height: 200px; width: 200px; margin: auto"
            />
        </view>
        <view style="margin: 20px;">
            <view class="label">姓名</view>
            <view class="content">{{ studentInfo?.name }}</view>
            <view class="divider"></view>
            <view class="label">性别</view>
            <view class="content">{{ studentInfo?.gender }}</view>
            <view class="divider"></view>
            <view class="label">学号</view>
            <view class="content">{{ studentInfo?.studentId }}</view>
            <view class="divider"></view>
            <view class="label">学院</view>
            <view class="content">{{ studentInfo?.college }}</view>
            <view class="divider"></view>
            <view class="label">班级</view>
            <view class="content">{{ studentInfo?.class }}</view>
            <view class="divider"></view>
            <view class="label">校区</view>
            <view class="content">{{ studentInfo?.campus }}</view>
            <view class="divider"></view>
            <view style="display: flex">
                <view class="label">寝室</view>
                <view style="display: flex; margin: auto 2px auto auto;">
                    <view @click="toRoommateList"
                        style="margin-right: 4px;">
                        <uni-icons
                            type="home"
                            color="#3F4870"
                            size="18"
                        />
                        <text style="color: #3F4870; font-size: 12px; margin: auto;">查看室友</text>
                    </view>
                    <view @click="toExchange">
                        <uni-icons
                            type="compose"
                            color="#3F4870"
                            size="18"
                            style="margin: auto;"
                        />
                        <text style="color: #3F4870; font-size: 12px; margin: auto;">申请调换</text>
                    </view>
                </view>
            </view>
            <view class="content">{{ studentInfo?.dormitory }}</view>
            <view class="divider"></view>
        </view>
        <view style="height: 20vh;"></view>
    </view>
</template>

<style>
page {
    background-color: #FFFFFF;
}
</style>

<style scoped>
.label {
    font-size: 12px;
    color: #999999;
    margin-bottom: 10px;
}

.content {
    font-size: 16px;
    color: #000000;
    margin-bottom: 10px;
}

.divider {
    height: 1px;
    background-color: #E5E5E5;
    margin-bottom: 20px;
}
</style>