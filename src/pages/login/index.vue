<script setup lang="ts">
import { reqLogin } from '@/api/login';
const login = () => {
    // #ifdef MP-WEIXIN
    uni.login({
        provider: 'weixin',
        success: async (loginRes) => {
            console.log(loginRes)
            // we get a json like this here:
            // {
            //     code: "0b1ctpFa1OSdUG03z7Ha1vxs0i2ctpFZ"
            //     errMsg: "login:ok"
            // }

            const result = await reqLogin(loginRes.code)
            console.log(result)
            uni.setStorageSync('access_token', result.data.data.accessToken)
            uni.setStorageSync('refresh_token', result.data.data.refreshToken)

            // if (result.data.data.studentInfoId !== 0) {
            //     uni.navigateTo({ url: '/pages/index/index' })
            // } else {
            //     uni.navigateTo({ url: '/pages/validate/index' })
            // }

            uni.navigateTo({ url: '/pages/validate/index' })
        }
    })
    // #endif
    // #ifndef MP-WEIXIN
    uni.navigateTo({ url: '/pages/validate/index' })
    // #endif
}
</script>

<template>
    <view class="center">
        <view
            style="text-align: center;"
        >
            <image
                src="../../static/logo.png"
                mode="widthFix"
                style="width: 75%;"
            />
        </view>
    
        <view
            style="text-align: center;"
        >
            <text
                style="font-size: xx-large; color: white;"
            >E启新篇</text>
        </view>
    
        <button
            :disabled="false"
            :loading="false"
            open-type=""
            hover-class="button-hover"
            @click="login"
            style="
                width: 70vw;
                margin-top: 20vh;
                border-radius: 16px;
                border: 1px solid rgb(63, 114, 175);
                padding: 8px;
                color: rgb(17, 45, 78);
                font-weight: bold;
                margin-bottom: 10vh;
            "
        >
            一键授权登陆
        </button>
    </view>
</template>


<style>
page {
    background: url('../../static/bg-small.png') no-repeat;
    position: relative;
    height: 100%;
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>