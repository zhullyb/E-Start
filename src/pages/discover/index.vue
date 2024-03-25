<script setup lang="ts">
import { ref } from 'vue'

const urls = [
    'https://bu.dusays.com/2023/09/18/6507cd24bbe8e.jpg',
    'https://bu.dusays.com/2023/10/01/651860224035c.jpg',
    'https://bu.dusays.com/2023/08/10/64d4b999c4ead.jpg'
]

const iconInfo = [
    {
        "icon": "/static/discover/stu-org.png",
        "text": "学生组织"
    },
    {
        "icon": "/static/discover/stu-soc.png",
        "text": "学生社团"
    },
    {
        "icon": "/static/discover/food.png",
        "text": "餐饮美食"
    },
    {
        "icon": "/static/discover/game.png",
        "text": "娱乐场所"
    },
    {
        "icon": "/static/discover/rule.png",
        "text": "规章制度"
    },
    {
        "icon": "/static/discover/file.png",
        "text": "资料广场"
    },
    {
        "icon": "/static/discover/landmark.png",
        "text": "风景名胜"
    },
    {
        "icon": "/static/discover/work.png",
        "text": "勤工俭学"
    }
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
    <view style="background-color: #F9FAFB;">
        <view class="l-swiper">
            <swiper autoplay circular class="swiper-box" style="--height: 300rpx" previous-margin="60rpx"
                next-margin="60rpx" @change="change">
                <swiper-item v-for="(item, index) in urls" :key="index" class="swiper-item">
                    <image :src="item" class="swiper-image" :class="[curr != index ? 'swiper-scsle' : '']"
                        mode="scaleToFill" lazy-load @tap="clickItem(index)"></image>
                </swiper-item>
            </swiper>
        </view>
        <view style="margin: 16px 32px;">
            <uni-row :gutter="16">
                <uni-col :span="6" v-for="item in iconInfo">
                    <view style="text-align: center; margin: 8px;">
                        <view>
                            <image
                                :src="item.icon"
                                mode="widthFix"
                                style="width: 40%"
                            />
                        </view>
                        <view style="font-size: small;">{{ item.text }}</view>
                    </view>
                </uni-col>
            </uni-row>
        </view>
        <view style="margin: 10px;">
            <view style="border-radius: 16px; background-color: #FFFFFF;">
                <uni-row>
                    <view style="display: flex; align-items: center;">
                        <uni-col :span="6">
                            <view style="margin:10px; background-color: #FFF1DE; border-radius: 16px; width: min-content;">
                                <image
                                    src="/static/discover/map-icon.png"
                                    mode="scaleToFill"
                                    style="width: 40px; height: 36px; margin: 10px;"
                                />
                            </view>
                        </uni-col>
                        <uni-col :span="16">
                            <view style="font-size: 16px; font-weight: bold;">点击查看校园地图</view>
                            <view style="font-size: 14px; color: #999999;">还可进行校园导航</view>
                        </uni-col>
                        <uni-col :span="2">
                            <image
                                src="/static/discover/right-arrow.png"
                                mode="scaleToFill"
                                style="height: 12px; width: 12px;"
                            />
                        </uni-col>
                    </view>
                </uni-row>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.l-swiper {
    width: 100%;
    padding: 20rpx 0;
    box-sizing: border-box;

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