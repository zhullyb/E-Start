<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';


const buttons = [
    '店铺概况',
    '用户评价',
    '优惠券'
]

const intro = "阿英川菜馆位于中国川菜的发源地——四川省，坐落于成都市繁华的市中心地带。作为一家历史悠久的传统川菜馆，阿英川菜馆自创立以来就以其正宗的川菜口味和独特的烹饪技艺而闻名于当地。\n" + 
"在阿英川菜馆，顾客能够品尝到地道、正宗的四川菜肴，每一道菜品都经过精心挑选的食材和传统的烹饪工艺制作而成。无论是麻辣鲜香的火锅、香味扑鼻的水煮鱼，还是麻辣鲜香的口水鸡，都能让您在品尝的同时感受到四川美食的独特魅力。\n" +
"除了传统的川菜，阿英川菜馆还推出了一系列创新菜品，结合了现代烹饪技巧和传统川菜的精髓，既保留了经典口味，又带来了新的风味体验，让顾客能够在品尝中感受到时代的变迁和川菜文化的传承。\n" +
"阿英川菜馆的用餐环境雅致舒适，装修风格充满了浓厚的川西风情，让顾客在品尝美食的同时仿佛置身于四川的山水之间。而专业的服务团队更是为每一位顾客提供贴心周到的服务，让用餐体验更加完美。\n"
"总的来说，阿英川菜馆不仅是品尝正宗川菜的绝佳选择，更是感受四川文化和美食魅力的最佳去处。无论是与家人朋友聚餐还是商务宴请，都能在这里留下美好的回忆。\n"

const seletedItem = ref(0)

const openNavigation = () => {
    uni.openLocation({
        latitude: 30.591,
        longitude: 104.063,
        scale: 14,
        name: '阿英川菜馆',
        address: '四川省成都市武侯区大慈寺路1号'
    });
}

onMounted(() => {
    uni.setNavigationBarTitle({
        title: '阿英川菜馆'
    });
})
</script>

<template>
    <view
        style="margin: 16px;"
    >
        <uni-row
            :gutter="12"
        >
            <uni-col
                :span="8"
                v-for="(button, index) in buttons"
            >
                <button
                    class="es-button"
                    :class="{ selected: seletedItem === index }"
                    @click="seletedItem = index"
                >
                    {{ button }}
                </button>
            </uni-col>
        </uni-row>
        <view style="margin-bottom: 88px;">
            <image
                src="https://bu.dusays.com/2022/08/10/62f37343c5254.webp"
                mode="center"
                style="
                        width: 100%;
                        border-radius: 12px;
                        margin-top: 15px;
                        "
            />
            <view
                style="
                        color: rgb(17, 45, 78);
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        margin: 5px 0;
                    "
            >
                <text>店铺地址：</text>
                <br />
                <text>营业时间：</text>
                <br />
                <text>联系电话：</text>
            </view>
            <view>
                <text
                    style="
                            color: rgb(17, 45, 78);
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 18px;
                        "
                >
                    {{ intro }}
                </text>
            </view>
        </view>
        <view>
            <button
                class="es-button selected"
                @click="openNavigation"
                style="
                    position: fixed;
                    bottom: 16px;
                    width: calc(100% - 32px);
                "
            >
                导航去这家
            </button>
        </view>
    </view>
</template>>