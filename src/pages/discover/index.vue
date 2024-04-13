<script setup lang="ts">
import { ref } from 'vue'

const urls = [
    'https://bu.dusays.com/2024/04/13/661a8c1d27f1b.webp',
    'https://bu.dusays.com/2024/04/13/661a8c1d357ef.webp',
    'https://bu.dusays.com/2024/04/13/661a8c1d3871d.webp'
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

const recommend = [
    {
        "id": 1,
        "title": "肯德基",
        "img": "https://bu.dusays.com/2024/04/13/661a8d3bcbd40.png",
        "intro": "肯德基，以其香脆可口的炸鸡和美味的配菜而闻名，是全球领先的快餐连锁店之一。凭借其标志性的秘方和广泛的菜单，肯德基为各年龄段的顾客提供了各种选择，从经典的鸡块到美味的汉堡和卷饼。" 
    },
    {
        "id": 2,
        "title": "麦当劳",
        "img": "https://bu.dusays.com/2024/04/13/661a8d842d012.png",
        "intro": "麦当劳是全球最大的快餐连锁店，以其标志性的巨无霸汉堡、金黄酥脆的薯条和香浓顺滑的奶昔而闻名。凭借其广泛的菜单和便利的位置，麦当劳已成为世界各地顾客的热门选择。无论您是在寻找快速午餐、家庭晚餐还是深夜小吃，麦当劳都能满足您的需求，提供各种美味佳肴和饮品。"
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

const iconClick = (index: number) => {
    switch (index) {
        case 0:
            uni.navigateTo({ url: '/pages/orgs/index?type=1' })
            break
        case 1:
            uni.navigateTo({ url: '/pages/orgs/index?type=2' })
            break
        case 2:
            uni.navigateTo({ url: '/pages/restaurant/index' })
            break
        default:
            uni.showToast({
                title: '暂未开放，敬请期待',
                icon: 'none'
            })
    }
}

const toSearch = () => {
    uni.navigateTo({ url: '/pages/discover/search' })
}

const toMap = () => {
    uni.navigateTo({ url: '/pages/discover/map' })
}

const toRestaurant = (item: any) => {
    uni.navigateTo({ url: `/pages/restaurant/detail?id=${item.id}` })
}
</script>
<template>
    <view>
        <view @click="toSearch" class="fakeSearchBar">
            <uni-icons type="search" size="24"/>
            <text style="margin: auto 4px; color: #999999; font-size: 14px;">你想要的都在这里~</text>
        </view>
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
                <uni-col :span="6" v-for="(item, index) in iconInfo">
                    <view @click="iconClick(index)" style="text-align: center; margin: 8px;">
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
                    <view @click="toMap" style="display: flex; align-items: center;">
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
        <view style="font-size: large; margin: 16px;">为您定制</view>
        <es-list :list="recommend" @click="toRestaurant"></es-list>
    </view>
</template>

<style lang="scss" scoped>
.fakeSearchBar {
    display: flex;
    margin: 8px 20px;
    background: #F1F1F1;
    padding: 4px 12px;
    border-radius: 20px;
}

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

<style>
page {
    background: #F9FAFB;
}
</style>