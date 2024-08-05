<script setup lang="ts">
import { ref } from 'vue';
import { reqBusiness, reqCouponList, redeemCoupon } from '@/api/restaurant'
import type { Business } from '@/types/restaurant'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
const id = ref(1)

const detail = ref<Business>({
    "id": 0,
    "createdAt": "unknown",
    "updatedAt": "unknown",
    "name": "unknown",
    "pic": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/ee9f6080-5501-4e64-832f-2ab280f57d96.png",
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

const couponsObtainable = ref<any>()
const couponsUnused = ref<any>()

const seletedItem = ref(0)
const couponCategory = ref(0)

const openNavigation = () => {
    const longitude = Number(detail.value.loc.split(',')[0])
    const latitude = Number(detail.value.loc.split(',')[1])
    uni.openLocation({
        longitude: longitude,
        latitude: latitude,
        scale: 14,
        name: detail.value.name,
        address: detail.value.address
    });
}

const handleRedeem = async (coupon: any) => {
    const res = await redeemCoupon(coupon.id)
    if (res.data.code === 0) {
        uni.showToast({
            title: '兑换成功',
            icon: 'success'
        })
    } else {
        uni.showToast({
            title: res.data.msg || '兑换失败',
            icon: 'none'
        })
    }
}

const handleWriteOff = (coupon: any) => {
    uni.redirectTo({
        url: `/pages/restaurant/writeOff?id=${coupon.id}`
    })
}

const fetchData = async() => {
    // 店铺概况
    const res = await reqBusiness(id.value)
    if (res.data.code === 0) {
        detail.value = res.data.data
    } else {
        uni.showToast({
            title: '获取商家信息失败',
            icon: 'none'
        })
    }
    
    // 获取优惠券
    const res1 = await reqCouponList(id.value)
    if (res1.data.code === 0) {
        couponsObtainable.value = res1.data.data
    } else {
        uni.showToast({
            title: '获取优惠券信息失败',
            icon: 'none'
        })
    }
    const res2 = await reqCouponList(id.value, 2)
    if (res2.data.code === 0) {
        couponsUnused.value = res2.data.data
    } else {
        uni.showToast({
            title: '获取优惠券信息失败',
            icon: 'none'
        })
    }

}

onLoad(async(option: any)=>{
    if (option.id) {
        id.value = option.id
    }

    await fetchData()

    uni.setNavigationBarTitle({
        title: detail.value.name
    });
})

onPullDownRefresh(async() => {
    await fetchData()
    uni.stopPullDownRefresh()
})

const timeParse = (time: string) => {
    const objectedTime = new Date(time)
    const year = objectedTime.getFullYear()
    const month = String(objectedTime.getMonth() + 1).padStart(2, '0')
    const day = String(objectedTime.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
}
</script>

<template>
    <view
        style="margin: 20px;"
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
        <view v-if="seletedItem == 0">
            <image
                :src="detail.pic"
                mode="aspectFill"
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
                        line-height: 1.5;
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
                            line-height: 1.5;
                        "
                >
                    {{ detail.introduction }}
                </text>
            </view>
        </view>
        <view v-if="seletedItem == 1">
            <view style="display: flex; margin-top: 20px;">
                <view style="margin: auto; display: flex; padding: 20px; border-radius: 20px; border: 1px solid #3F71AE;">
                    <uni-rate
                        readonly
                        :value="5"
                        activeColor="#F2DA03"
                        @change=""
                    />
                    <text class="rate-text" style="margin: auto 4px;">3.0</text>
                </view>
            </view>
            <view class="rate-text" style="text-align: center; margin: 8px;">已有5人进行评价</view>
            <view style="margin: 32px 0;">
                <view v-for="i in 5">
                    <view style="display: flex; margin: 20px 12px;">
                        <text class="rate-text">{{ 6-i }}</text>
                        <view style="height: 12px; width: 70vw; border-radius: 12px; background: #E4E7EC; margin: auto;">
                            <view style="height: 12px; width: calc(70vw * 0.2); border-radius: 12px; background: #F2DA03;"></view>
                        </view>
                        <text class="rate-text">20%</text>
                    </view>
                </view>
            </view>
            <view style="margin: 8px 0;">
                <button class="es-button">撰写评论</button>
            </view>
            <view>
                <view style="display: flex;">
                    <image
                        src="/static/logo.png"
                        mode="scaleToFill"
                        style="height: 60px; width: 60px;
                               border-radius: 50%;"
                    />
                    <view style="margin: auto 0;">
                        <view style="font-size: 14px;">不吃猫的鱼</view>
                        <view style="font-size: 10px; color: #999999;">2024年2月17日19:39</view>
                    </view>
                </view>
                <uni-rate
                    :value="5"
                    :size="16"
                    readonly
                    @change=""
                />
                <view style="margin: 8px 0; line-height: 1.4; color: #666;">
                    位置不偏，找起来挺方便的，风景不错微风吹拂让人感到非常舒服，早晨起来，打开落地窗，一望无垠的大海映入眼帘，非常美丽，性价比还是挺高的。
                </view>
                <view style="display: flex;">
                    <uni-icons
                        type="heart"
                        color="#999999"
                        size="20"
                        style="margin: auto 4px auto auto;"
                    />
                    <text style="margin: auto 0; color: #999999;">139</text>
                </view>
            </view>
        </view>
        <view v-if="seletedItem == 2">
            <view style="text-align: center; margin: 20px;">
                <text class="coupon-cate-text" :class="{ selected: couponCategory === 0 }" @click="couponCategory = 0">可兑换的券</text>
                <text class="coupon-cate-text" :class="{ selected: couponCategory === 1 }" @click="couponCategory = 1">未使用的券</text>
            </view>
            <uni-row :gutter="24">
                <view v-if="couponCategory === 0" v-for="item in couponsObtainable">
                    <uni-col :span="12">
                        <view class="coupon-card">
                            <view class="small">{{ item.name }}</view>
                            <view class="large">{{ item.redeemPoints }}积分</view>
                            <button @click="handleRedeem(item)">兑换</button>
                        </view>
                    </uni-col>
                </view>
                <view v-if="couponCategory === 1" v-for="item in couponsUnused">
                    <uni-col :span="12">
                        <view class="coupon-card">
                            <view class="small">{{ timeParse(item.expTime) }}过期</view>
                            <view class="large">{{ item.name }}</view>
                            <button @click="handleWriteOff(item)">核销</button>
                        </view>
                    </uni-col>
                </view>
            </uni-row>
        </view>
        <view style="height: 88px;"></view>
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
</template>

<style scoped>
.coupon-cate-text {
    color: #464646;
    font-size: 16px;
    font-weight: 500;
    line-height: 14px;
    margin: 8px;
}

.coupon-cate-text.selected {
    color: #EA9415;
    text-decoration: underline;
    text-underline-offset: 6px;
}

.coupon-card {
    padding: 12px;
    text-align: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.coupon-card .small {
    font-size: 14px;
    color: #112D4E;
    margin: 4px;
}

.coupon-card .large {
    font-size: 20px;
    color: #112D4E;
    margin: 4px;
}

.coupon-card button {
    background-color: #FDF699;
    width: fit-content;
    border-radius: 16px;
    font-size: 12px;
}

.rate-text {
    color: #3F71AE;
}
</style>