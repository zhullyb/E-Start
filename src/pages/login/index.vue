<script setup lang="ts">
const login = () => {
    uni.login({
        provider: 'weixin',
        success: (loginRes) => {
            console.log(loginRes)
            // we get a json like this here:
            // {
            //     code: "0b1ctpFa1OSdUG03z7Ha1vxs0i2ctpFZ"
            //     errMsg: "login:ok"
            // }

            // TODO:
            // make a request to backend, 
            // if DataTransfer.user.studentInfoId=0, redirect to validate page
            uni.navigateTo({ url: '/pages/index/index' })
        }
    })
}
</script>

<template>
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
            width: 70%;
            margin-top: 20vh;
            border-radius: 16px;
            border: 1px solid rgb(63, 114, 175);
            padding: 8px;
            color: rgb(17, 45, 78);
            font-weight: bold;
        "
    >
        一键授权登陆
    </button>
</template>


<style>
    page {
        background: url('../../static/bg-small.png') no-repeat;
    }
</style>