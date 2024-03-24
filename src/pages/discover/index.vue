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
            <swiper
                autoplay
                circular
                indicator-dots
                class="swiper-box" style="--height: 300rpx"
                previous-margin="60rpx" next-margin="60rpx"
                @change="change">
                <swiper-item v-for="(item, index) in urls" :key="index" class="swiper-item">
                    <image :src="item" class="swiper-image" :class="[curr != index ? 'swiper-scsle' : '']"
                        mode="scaleToFill" lazy-load @tap="clickItem(index)"></image>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<style scoped>
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

        /* #ifdef MP-WEIXIN */
        /deep/ .wx-swiper-dot {
            width: 8rpx;
            height: 8rpx;
            display: inline-flex;
            background: none;
            justify-content: space-between;
        }

        /deep/ .wx-swiper-dot::before {
            content: '';
            flex-grow: 1;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 16rpx;
            overflow: hidden;
        }

        /deep/.wx-swiper-dot-active::before {
            background: #fff;
        }

        /deep/ .wx-swiper-dot.wx-swiper-dot-active {
            width: 16rpx;
        }

        /* #endif
      
      /* #ifndef MP-WEIXIN */
        ::v-deep .uni-swiper-dot {
            width: 8rpx;
            height: 8rpx;
            display: inline-flex;
            background: none;
            justify-content: space-between;
        }

        ::v-deep .uni-swiper-dot::before {
            content: '';
            flex-grow: 1;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 16rpx;
            overflow: hidden;
        }

        ::v-deep .uni-swiper-dot-active::before {
            background: #fff;
        }

        ::v-deep .uni-swiper-dot.uni-swiper-dot-active {
            width: 16rpx;
        }

        /* #endif */

    }
}
</style>