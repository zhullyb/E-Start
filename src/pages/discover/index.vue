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

const recommend = [
    {
        "title": "阿英川菜馆",
        "img": "https://bu.dusays.com/2023/09/18/6507cd24bbe8e.jpg",
        "intro": "阿英川菜馆位于中国川菜的发源地——四川省，坐落于成都市繁华的市中心地带。作为一家历史悠久的传统川菜馆，阿英川菜馆自创立以来就以其正宗的川菜口味和独特的烹饪技艺而闻名于当地。\n在阿英川菜馆，顾客能够品尝到地道、正宗的四川菜肴，每一道菜品都经过精心挑选的食材和传统的烹饪工艺制作而成。无论是麻辣鲜香的火锅、香味扑鼻的水煮鱼，还是麻辣鲜香的口水鸡，都能让您在品尝的同时感受到四川美食的独特魅力。\n除了传统的川菜，阿英川菜馆还推出了一系列创新菜品，结合了现代烹饪技巧和传统川菜的精髓，既保留了经典口味，又带来了新的风味体验，让顾客能够在品尝中感受到时代的变迁和川菜文化的传承。阿英川菜馆的用餐环境雅致舒适，装修风格充满了浓厚的川西风情，让顾客在品尝美食的同时仿佛置身于四川的山水之间。而专业的服务团队更是为每一位顾客提供贴心周到的服务，让用餐体验更加完美。\n总的来说，阿英川菜馆不仅是品尝正宗川菜的绝佳选择，更是感受四川文化和美食魅力的最佳去处。无论是与家人朋友聚餐还是商务宴请，都能在这里留下美好的回忆。\n"
    },
    {
        "title": "老登咖啡馆",
        "img": "https://bu.dusays.com/2023/10/01/651860224035c.jpg",
        "intro": "老登开的咖啡馆"
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

const toMap = () => {
    uni.navigateTo({ url: '/pages/discover/map' })
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
        <es-list :list="recommend"></es-list>
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