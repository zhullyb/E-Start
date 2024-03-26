<script setup lang="ts">
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
</script>

<template>
    <view>
        <view class="board" style="display: flex; align-items: center;">
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
                            :src="images['v1-text']"
                            mode="heightFix"
                            style="height: 36px;"
                        />
                        <view style="color: #977A48; font-size: 15px; margin: 4px 0;">智慧值: 55</view>
                        <view style="color: #977A48; font-size: 12px; margin: 4px 0;">还需要 45 点智慧值升级</view>
                        <view style="margin-top: 20px; height: 8px; background-color: rgb(192, 198, 200); border-radius: 8px;">
                            <view
                                style="
                                    height: 8px;
                                    background: linear-gradient(90.00deg, rgb(225, 202, 164) 17.899%,rgb(181, 151, 101) 88.204%);
                                    border-radius: 8px;"
                                :style="{ width: '55%' }"
                            ></view>
                        </view>
                        <view style="display: flex; margin-top: 8px;">
                            <text style="margin: auto auto auto 0;
                                            color: #977A48; font-size: 12px;">V1</text>
                            <text style="margin: auto 0 auto auto;
                                            color: #977A48; font-size: 12px;">v2</text>
                        </view>
                    </view>
                </uni-col>
                <uni-col :span="12">
                    <view style="margin: -5px;">
                        <image
                            :src="images['v1-figure']"
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