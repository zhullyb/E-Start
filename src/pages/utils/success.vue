<script setup lang="ts">
import { reactive, ref } from 'vue';
import UniIcons from '../../components/uni-icons/uni-icons.vue'
import { onLoad } from '@dcloudio/uni-app';

const pageData = ref({
    title: '',
    desc: '',
    nextUrl: ''
})

const toNext = () => {
    uni.redirectTo({
        url: pageData.value.nextUrl
    })
}

onLoad((option: any) => {
    const data = JSON.parse(decodeURIComponent(option.data))
    pageData.value = data
})
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
            >{{ pageData.title }}</text>
            <view v-if="pageData.desc">
                <view style="height: 2vh;"></view>
                <text style="
                                color: rgb(17, 45, 78);
                                font-size: 13px;
                                font-weight: 400;
                                line-height: 22px;
                            "
                >{{ pageData.desc }}</text>
            </view>
        </view>
        <button
            style="
                    margin-top: 30px;
                    border-radius: 32px;
                    height: 60px;
                    width: 60px;
                    background: rgb(63, 114, 175);
                "
            @click="toNext"
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
</style>

<style scoped>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>