<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqBusiness } from '@/api/restaurant'
import type { Business } from '@/types/restaurant'
// TODO: replace it with real id
const id = 1

const detail = ref<Business>({
    "id": 0,
    "createdAt": "unknown",
    "updatedAt": "unknown",
    "name": "unknown",
    "pic": "https://bu.dusays.com/2024/03/28/6604d3dd75f5d.png",
    "address": "unknown",
    "loc": "0,0",
    "businessHours": "unknown",
    "contact": "unknown",
    "introduction": "unknown",
})

const buttons = [
    '店铺概况',
    '用户评价',
    '优惠券'
]

const seletedItem = ref(0)

const openNavigation = () => {
    uni.openLocation({
        latitude: Number(detail.value.loc.split(',')[0]),
        longitude: Number(detail.value.loc.split(',')[1]),
        scale: 14,
        name: detail.value.name,
        address: detail.value.address
    });
}

onMounted(async () => {
    const res = await reqBusiness(id)
    if (res.data.code === 0) {
        detail.value = res.data.data
    } else {
        uni.showToast({
            title: '获取商家信息失败',
            icon: 'none'
        })
    }

    uni.setNavigationBarTitle({
        title: detail.value.name
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
        <view v-if="seletedItem == 0" style="margin-bottom: 88px;">
            <image
                :src="detail.pic"
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
                <text>店铺地址：{{ detail.address }}</text>
                <br />
                <text>营业时间：{{ detail.businessHours }}</text>
                <br />
                <text>联系电话：{{ detail.contact }}</text>
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
                    {{ detail.introduction }}
                </text>
            </view>
        </view>
        <view v-if="seletedItem == 1" style="margin-bottom: 88px;">
            <view>这里是评论，暂时没实现</view>
        </view>
        <view v-if="seletedItem == 2" style="margin-bottom: 88px;">
            <view>这里是优惠券，暂时没实现</view>
        </view>
        <!-- 微信小程序上需要这 1px 的空白才能生效 -->
        <view style="height: 1px;"></view>
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