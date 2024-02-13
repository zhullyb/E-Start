<script setup lang="ts">
const doValidate = () => {
    // TODO:
    // make a request to backend, if success
    uni.navigateTo({ url: '/pages/validate/success' })
    // else, pop up an error message
}
</script>
<template>
    <view class="center">
        <view
            style="padding: 20px;"
        >
            <view>
                <text style="
                        color: rgb(17, 45, 78);
                        font-size: 24px;
                        font-weight: 700;
                        line-height: 32px;
                        "
                >验证身份</text>
            </view>
            <view style="height: 2vh;"></view>
            <view>
                <text style="
                                color: rgb(17, 45, 78);
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 20px;
                            "
                >请输入以下信息以验证您的新生身份</text>
            </view>
        </view>
    
        <view style="display: flex; justify-content: center; padding-top: 20px;">
            <view
                style="
                border-color: grey;
                border-width: 1px;
                border-radius: 10px;
                margin-bottom: 30px;
                "
            >   
                <view
                    style="
                    padding: 10px;
                    width: 80vw;
                    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
                    "
                >
                    <input placeholder="姓名" />
                    <input placeholder="身份证号" />
                    <input placeholder="录取通知书编号" />
                </view>
            </view>
    
        </view>
        <button
            hover-class="button-hover"
            @click="doValidate"
            style="
                width: 88vw;
                color: white;
                background-color: #3F72AF;
                font-size: small;
                padding: 16px;
                border-radius: 16px;
                font-size: 16px;
                font-weight: 600;
                line-height: 24px;
                margin-bottom: 15vh;
            "
        >
            验证
        </button>
    </view>
</template>


<style>
page {
    position: relative;
    height: 100%;
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

input {
    padding: 15px;
    color: rgb(152, 162, 179);
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
}
</style>