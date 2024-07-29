<script setup lang="ts">
import { ref } from 'vue';

const reason = ref<string>('');

</script>

<template>
<view style="display: flex; height: 100vh;">
    <view style="margin: auto;">
        <view class="text-title">您目前所在的寝室</view>
        <view class="text-desc">尚德园 13 号楼 619 室 4 号床</view>
        <view class="text-title">申请调换理由及需求</view>
        <textarea
            id="reason"
            v-model="reason"
            placeholder="说点什么吧..."
            placeholder-class="textarea-placeholder"
            @input=""
        />
        <view style="display: flex; margin-top: 5px;">
            <view style="margin: auto 0 auto auto; color: #949AA9">{{ reason.length }}/3000字数</view>
        </view>
        <view class="text-title" style="font-size: 18px;">添加图片</view>
        <view style="display: flex;">
            <view
                v-for="i in 3"
                class="upload-box"
                :style="{ 'margin-left': i === 1 ? '0' : 'auto' , 'margin-right': i === 3 ? '0' : 'auto' }"
            >
                <view style="font-size: 60px; margin: auto; color: #E5E5E5">+</view>
            </view>
        </view>
        <button class="es-button selected">提交申请</button>
    </view>
</view>
</template>

<style scoped>
.text-title {
    color: #3F4870;
    font-size: 24px;
    font-weight: 900;
    line-height: 32px;
    margin-top: 20px;
    margin-bottom: 10px;
}

.text-desc {
    color: #949AA9;
    font-size: 20px;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 10px;
}

#reason {
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    padding: 10px;
}

.upload-box {
    height: 25vw;
    width: 25vw;
    border: 1px dashed #E5E5E5;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
</style>