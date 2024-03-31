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

const couponsObtainable = ref<any>()
const couponsUnused = ref<any>()

const seletedItem = ref(0)
const couponCategory = ref(0)

const openNavigation = () => {
    uni.openLocation({
        latitude: Number(detail.value.loc.split(',')[0]),
        longitude: Number(detail.value.loc.split(',')[1]),
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
</style>