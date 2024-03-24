<script setup lang="ts">
import { ref } from 'vue'

const urls = [
    'https://bu.dusays.com/2023/09/18/6507cd24bbe8e.jpg',
    'https://bu.dusays.com/2023/10/01/651860224035c.jpg',
    'https://bu.dusays.com/2023/08/10/64d4b999c4ead.jpg'
]

const curr = ref(0)

const change = (e: any) => {
    console.log('change', e)
    curr.value = e.detail.current
}

const clickItem = (index: number) => {
    console.log('clickItem', index)
}

</script>
<template>
    <view>
        <view class="l-swiper">
            <swiper autoplay circular class="swiper-box" style="--height: 300rpx" previous-margin="60rpx"
                next-margin="60rpx" @change="change">
                <swiper-item v-for="(item, index) in urls" :key="index" class="swiper-item">
                    <image :src="item" class="swiper-image" :class="[curr != index ? 'swiper-scsle' : '']"
                        mode="scaleToFill" lazy-load @tap="clickItem(index)"></image>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.l-swiper {
    width: 100%;
    padding: 20rpx 0;
    box-sizing: border-box;
    background: #fff;

    .swiper-box {
        width: 100%;
        height: var(--height);

        .swiper-item {
            padding: 0 16rpx;
            box-sizing: border-box;
        }

        .swiper-image {
            width: 100%;
            height: var(--height);
            display: block;
            border-radius: 12rpx;
        }

        .swiper-scsle {
            transform: scaleY(0.9);
            transform-origin: center center;
        }
    }
}
</style>