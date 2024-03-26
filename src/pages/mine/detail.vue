<script setup lang="ts">

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
            <view class="content">E小新</view>
            <view class="divider"></view>
            <view class="label">身份证号码</view>
            <view class="content">123456789012345678</view>
            <view class="divider"></view>
            <view class="label">手机号</view>
            <view class="content">12345678901</view>
            <view class="divider"></view>
            <view class="label">学院</view>
            <view class="content">计算机科学与技术学院（软件学院）</view>
            <view class="divider"></view>
            <view class="label">班级</view>
            <view class="content">计算机类2401班</view>
            <view class="divider"></view>
            <view class="label">学号</view>
            <view class="content">2024000001</view>
            <view class="divider"></view>
            <view class="label">寝室</view>
            <view class="content">尚德园13号楼 619室 4号床</view>
            <view class="divider"></view>
        </view>
        <view style="height: 20vh;"></view>
    </view>
</template>

<style scoped>
page {
    background-color: #FFFFFF;
}

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