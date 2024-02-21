<script setup lang="ts">
const title = "上传验证"
</script>

<template>
    <view class="center">
        <view class="es-text-title">{{ title }}</view>
        <view class="es-text-desc">请按要求上传照片</view>
        <view id="photo-container"></view>
        <button 
            class="es-button"
            style="
                    width: 90vw;
                    margin-bottom: 16px;
        ">上传照片</button>
        <button
            class="es-button selected"
            style="
                    width: 90vw;
                    margin-bottom: 15vh;
        ">提交验证</button>
    </view>
</template>

<style>
page {
    position: relative;
    height: 100%;
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.es-text-title {
    color: rgb(55, 56, 110);
    font-size: 24px;
    font-weight: 900;
    line-height: 32px;
}

.es-text-desc {
    color: rgb(148, 154, 169);
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
}

#photo-container {
    border: 1px dashed rgb(184, 184, 210);
    width: 165px;
    height: 165px;
    margin: 20vw auto;
}
</style>