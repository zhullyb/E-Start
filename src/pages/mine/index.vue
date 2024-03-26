<script setup lang="ts">
import { computed } from 'vue';

const score = 600

const images = {
    "v1-text": "https://bu.dusays.com/2024/03/26/66023e26ee444.png",
    "v2-text": "https://bu.dusays.com/2024/03/26/66023ef3090f6.png",
    "v3-text": "https://bu.dusays.com/2024/03/26/66023e26ee444.png",
    "v4-text": "https://bu.dusays.com/2024/03/26/66023e26ee3a1.png",
    "v5-text": "https://bu.dusays.com/2024/03/26/66023ef3091d4.png",
    "v1-figure": "https://bu.dusays.com/2024/03/26/66023e195f355.png",
    "v2-figure": "https://bu.dusays.com/2024/03/26/66023e1a2bfdd.png",
    "v3-figure": "https://bu.dusays.com/2024/03/26/66023e1a358f7.png",
    "v4-figure": "https://bu.dusays.com/2024/03/26/66023e1a418b7.png",
    "v5-figure": "https://bu.dusays.com/2024/03/26/66023e1a63757.png" 
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
        for (const l of level) {
            if (score >= l.min && score < (l.max || Infinity)) {
                const need = (l.max || Infinity) - score
                const percent = (score - l.min) / ((l.max || 2000) - l.min)
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
                <view style="font-size: 16px; font-weight: bold;">E小新</view>
                <view style="font-size: 14px; color: #999999;">计算机科学与技术学院（软件学院）</view>
                <view style="font-size: 14px; color: #999999;">计算机类2401班</view>
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
                        <view style="color: #977A48; font-size: 15px; margin: 4px 0; font-weight: bold;">智慧值: {{ score }}</view>
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
                    <button style=" margin-top: 12px;
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
    </view>
</template>

<style scoped>
page {
    background-color: #F8F8F9;
}

.board {
    margin: 10px;
    background-color: #FFFFFF;
}
</style>