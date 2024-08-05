<script setup lang="ts">

const text = [
    "50ml",
    "100ml",
    "150ml",
    "200ml"
]

const colors = [
    "蓝色",
    "绿色",
    "红色",
    "粉色"
]

</script>

<template>
    <view>
        <swiper
            indicator-dots
            circular
            style="height: 250px;"
        >
            <swiper-item style="height: 250px;">
                <image
                    src="https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/c2fcd975-8ffa-47f3-9698-b660fafcfb34.png"
                    mode="scaleToFill"
                    style="width: 100%; height: 100%;"
                />
            </swiper-item>
            <swiper-item style="height: 250px;">
                <view style="height: 100%; background-color: blue;"></view>
            </swiper-item>
            <swiper-item style="height: 250px;">
                <view style="height: 100%; background-color: red;"></view>
            </swiper-item>
        </swiper>
        <view style="margin: 20px;">
            <view style="margin: 10px 0px; font-size: 20px;">脸盆</view>
            <text style="color: #FF4C2C; font-size: 20px; font-weight: bolder;">￥18.</text>
            <text style="color: #FF4C2C; font-size: 16px; font-weight: bolder;">88</text>
            <view class="small-distro" style="text-decoration: line-through;">￥23.60</view>
            <view class="title">选择规格</view>
            <view style="margin: 10px 0px; display: flex;">
                <view v-for="item in text" class="tag" :class="{ 'selected': item === '100ml' }">
                    <text>{{ item }}</text>
                </view>
            </view>
            <view class="title">选择颜色</view>
            <view style="margin: 10px 0px; display: flex;">
                <view v-for="item in colors" class="tag" :class="{ 'selected': item === '蓝色' }">
                    <text>{{ item }}</text>
                </view>
            </view>
            <view class="title">选择数量</view>
            <uni-number-box
                @change=""
            />
            <view class="title">我们的服务</view>
            <view class="small-distro">开学当天将直接配送到您的寝室</view>
        </view>
        <view style="height: 88px;"></view>
        <button
            class="es-button selected"
            style="position: fixed; bottom: 16px; width: calc(100% - 36px); margin: 0px 10px;"
        >确认购买</button>
    </view>
</template>

<style scoped>
.tag {
    margin-right: 10px;
    margin-bottom: 8px;
    border: 1px solid #E4EAF1;
    padding: 4px;
    width: 60px;
    text-align: center;
    border-radius: 4px;
    color: #667085;
    font-size: 14px;
}

.tag.selected {
    background-color: #FF4C2C;
    color: #FFFFFF;
    border: 1px solid #FF4C2C;
}

.title {
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0px;
}

.small-distro {
    color: #999999;
    font-size: 12px;
}
</style>