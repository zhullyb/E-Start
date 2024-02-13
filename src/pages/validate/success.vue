<script setup lang="ts">
import UniIcons from '../../components/uni-icons/uni-icons.vue'
</script>

<template>
    <view class="center">
        <image
            src="../../static/validate-success.png"
            mode="widthFix"
            style="width: 50vw;"
        />
        <view style="text-align: center;">
            <text
                style="
                        color: rgb(17, 45, 78);
                        font-size: 22px;
                        font-weight: 700;
                        line-height: 32px;
                    "
            >验证通过</text>
            <view style="height: 2vh;"></view>
            <text style="
                            color: rgb(17, 45, 78);
                            font-size: 13px;
                            font-weight: 400;
                            line-height: 22px;
                        "
            >点击下面的按钮进入大学生活</text>
        </view>
        <button
            style="
                    margin-top: 30px;
                    border-radius: 32px;
                    height: 60px;
                    width: 60px;
                    background: rgb(63, 114, 175);
                "
            @click=""
        >
            <uni-icons type="arrow-right" size="24" color="white"></uni-icons>
        </button>
        <view style="height: 10vh;"></view>
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

</style>