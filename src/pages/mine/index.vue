<script setup lang="ts">
import { reqInfo, reqStudentInfo } from '@/api/user';
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
import type { info, studentInfo } from '@/types/user';

const studentInfo = ref<studentInfo>()
const info = ref<info>()

const images = {
    "v1-text": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/36451dd2-0c06-4db3-982d-dcf4a5334d10.webp",
    "v2-text": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/ee66ff10-65e4-42d3-b478-9348b871358f.webp",
    "v3-text": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/e168ed83-77d8-459b-bb92-fa209f8c8545.webp",
    "v4-text": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/70996a5b-9507-43c9-a53d-c381e1a32aec.webp",
    "v5-text": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/fada9073-35bc-492f-b4dc-5244df188bcc.webp",
    "v1-figure": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/6bc1954d-cbc4-4cf9-9846-70e43055b03e.webp",
    "v2-figure": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/0cbd3996-6050-4ac8-9f5c-67de4aed745d.webp",
    "v3-figure": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/27732833-4108-468b-b4c4-7a792081c87c.webp",
    "v4-figure": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/4d0034f7-e48d-4032-83a4-3b2c41ab6ca5.webp",
    "v5-figure": "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/2bec1afe-2b91-4b67-a00a-f999c71d1eb7.webp" 
}

const levelInfo = computed(
    () => {
        const level = [
            { min: 0, max: 100, imgText: images["v1-text"], imgFigure: images["v1-figure"] },
            { min: 100, max: 500, imgText: images["v2-text"], imgFigure: images["v2-figure"] },
            { min: 500, max: 1000, imgText: images["v3-text"], imgFigure: images["v3-figure"] },
            { min: 1000, max: 2000, imgText: images["v4-text"], imgFigure: images["v4-figure"] },
            { min: 2000, imgText: images["v5-text"], imgFigure: images["v5-figure"] },
        ]
        const expValue = info.value?.exp ?? 0;
        for (const l of level) {
            if (expValue >= l.min && expValue < (l.max || Infinity)) {
                const need = (l.max || Infinity) - expValue
                const percent = (expValue - l.min) / ((l.max || 2000) - l.min)
                return { level: level.indexOf(l) + 1, need, percent, imgText: l.imgText, imgFigure: l.imgFigure }
            }
        }
        return { level: 1, need: 100, percent: 0, imgText: images["v1-text"], imgFigure: images["v1-figure"] }
    }
)

const toDetail = () => {
    uni.navigateTo({
        url: '/pages/mine/detail'
    })
}

const toTask = () => {
    uni.switchTab({
        url: '/pages/tasks/index'
    })
}

const fetchData = async() => {
    const res = await reqInfo()
    if (res.data.code === 0) {
        info.value = res.data.data
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
}

onLoad(async() => {
    studentInfo.value = uni.getStorageSync('studentInfo')
    if (!studentInfo.value) {
        const res = await reqStudentInfo()
        if (res.data.code === 0) {
            studentInfo.value = res.data.data
            uni.setStorageSync('studentInfo', studentInfo.value)
        } else {
            uni.showToast({
                title: res.data.msg,
                icon: 'none'
            })
        }
    }

    await fetchData()
})

onPullDownRefresh(async() => {
    await fetchData()
    uni.stopPullDownRefresh()
})
</script>

<template>
    <view>
        <view @click="toDetail" class="board" style="display: flex; align-items: center;">
            <view style="margin: 10px;">
                <image
                    src="/static/logo.png"
                    mode="scaleToFill"
                    style="height: 60px; width: 60px; border-radius: 50%;"
                />
            </view>
            <view style="margin: 10px;">
                <view style="font-size: 16px; font-weight: bold;">{{ studentInfo?.name }}</view>
                <view style="font-size: 14px; color: #999999;">{{ studentInfo?.college }}</view>
                <view style="font-size: 14px; color: #999999;">{{ studentInfo?.class }}</view>
            </view>
            <view style="margin: auto 16px auto auto;">
                <image
                    src="/static/discover/right-arrow.png"
                    mode="scaleToFill"
                    style="height: 15px; width: 15px;"
                />
            </view>
        </view>
        <view class="board">
            <uni-row>
                <uni-col :span="12">
                    <view style="margin: 20px;">
                        <image
                            :src="levelInfo.imgText"
                            mode="heightFix"
                            style="height: 36px;"
                        />
                        <view style="color: #977A48; font-size: 15px; margin: 4px 0; font-weight: bold;">智慧值: {{ info?.exp }}</view>
                        <view style="color: #977A48; font-size: 12px; margin: 4px 0;">还需要 {{ levelInfo.need }} 点智慧值升级</view>
                        <view style="margin-top: 20px; height: 8px; background-color: rgb(192, 198, 200); border-radius: 8px;">
                            <view
                                style="
                                    height: 8px;
                                    background: linear-gradient(90.00deg, rgb(225, 202, 164) 17.899%,rgb(181, 151, 101) 88.204%);
                                    border-radius: 8px;"
                                :style="{ width: `${levelInfo.percent * 100}%` }"
                            ></view>
                        </view>
                        <view style="display: flex; margin-top: 8px;">
                            <text style="margin: auto auto auto 0;
                                            color: #977A48; font-size: 12px;">V{{ levelInfo.level }}</text>
                            <text style="margin: auto 0 auto auto;
                                            color: #977A48; font-size: 12px;">v{{ levelInfo.level+1 }}</text>
                        </view>
                    </view>
                </uni-col>
                <uni-col :span="12">
                    <view style="margin: -5px;">
                        <image
                            :src="levelInfo.imgFigure"
                            mode="widthFix"
                            style="width: 100%;"
                        />
                    </view>
                    <button @click="toTask"
                        style=" margin-top: 12px;
                                background-color: #3A3842;
                                border-radius: 24px;
                                color: #FFFFFF;
                                width: fit-content;
                                font-size: 12px;"
                    >去做任务</button>
                </uni-col>
            </uni-row>
        </view>
        <view style="font-size: 20px; margin: 16px;">账户信息</view>
        <view class="board">
            <view class="item">订单</view>
            <view class="item">积分明细</view>
            <view class="item">浏览记录</view>
        </view>
        <view style="font-size: 20px; margin: 16px;">设置</view>
        <view class="board">
            <view class="item">账户与安全</view>
            <view class="item">通知设置</view>
            <view class="item">关于我们</view>
        </view>
    </view>
</template>

<style>
page {
    background-color: #F8F8F9;
}
</style>

<style scoped>
.board {
    margin: 10px;
    background-color: #FFFFFF;
}

.board .item {
    padding: 15px;
    border-bottom: 1px solid #F8F8F9;
}
</style>