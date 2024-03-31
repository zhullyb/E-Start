<script setup lang="ts" >
import { reqCoupon } from '@/api/restaurant';
import { onLoad } from '@dcloudio/uni-app';
import { computed } from 'vue';
import { ref } from 'vue';

const id = ref(1)
const couponInfo = ref<any>()
const barcode = computed(() => {
    return {
        code: couponInfo.value.code || 'unknown',
        width: 450,
        height: 120
    }
})

const toRestaurantDetail = () => {
    uni.redirectTo({
        url: `/pages/restaurant/detail?id=${couponInfo.value.businessId}`
    })
}

onLoad(async(option: any)=> {
    if (option.id) {
        id.value = option.id
    }
    const res = await reqCoupon(id.value)
    if (res.data.code === 0) {
        couponInfo.value = res.data.data
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
    console.log(couponInfo.value)
})

const timeParse = (time: string) => {
    const objectedTime = new Date(time)
    const year = objectedTime.getFullYear()
    const month = String(objectedTime.getMonth() + 1).padStart(2, '0')
    const day = String(objectedTime.getDate()).padStart(2, '0')
    const hour = String(objectedTime.getHours()).padStart(2, '0')
    const minute = String(objectedTime.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hour}:${minute}`
}
</script>

<template>
    <view class="info-card">
        <view style="display: flex;">
            <image
                :src="couponInfo.businessPic"
                mode="widthFix"
                style="height: 60px; width: 60px; border-radius: 8px; border: 1px solid #F0F0F0;"
            />
            <view style="margin: auto 12px;">
                <view class="text-title">{{ couponInfo.couponName }}</view>
                <view class="text-desc">{{ couponInfo.businessName }}</view>
            </view>
        </view>
        <view class="divider"></view>
        <uni-row>
            <uni-col :span="24">
                <view class="text-title">地址</view>
                <view class="text-desc">{{ couponInfo.businessAddress }}</view>
            </uni-col>
            <uni-col :span="12">
                <view class="text-title">优惠券ID</view>
                <view class="text-desc">#{{ couponInfo.id }}</view>
            </uni-col>
            <uni-col :span="12">
                <view class="text-title">过期时间</view>
                <view class="text-desc">{{ timeParse(couponInfo.expTime) }}</view>
            </uni-col>
            <uni-col :span="24">
                <view class="text-title">注意事项</view>
                <text class="text-desc">{{ couponInfo.usageInstructions }}</text>
            </uni-col>
        </uni-row>
        <view class="divider"></view>
        <view style="display: flex;">
            <w-barcode :options="barcode" style="margin: auto;"></w-barcode>
        </view>
        <view class="text-desc" style="text-align: center;">付款前出示该条形码核销优惠券</view>
    </view>
    <button
        @click="toRestaurantDetail"
        class="es-button selected"
        style="
            margin: 32px;
            position: fixed;
            bottom: 0;
            width: calc(100% - 64px);
        ">查看商户详情</button>
</template>

<style scoped>
.info-card {
    background: #FFFFFF;
    margin: 32px;
    padding: 32px;
    border-radius: 16px;
}

.text-title {
    color: rgb(33, 33, 33);
    font-size: 18px;
    margin: 6px 0;
}

.text-desc {
    color: #999999;
    font-size: 14px;
    margin: 6px 0;
    line-height: 16px;
    word-break: break-all;
}

.divider {
    height: 1px;
    width: 100%;
    margin: 32px 0;
    border-top: 2px dashed rgb(255, 133, 138);;
}
</style>

<style>
page {
    background: #F9FAFB;
}
</style>