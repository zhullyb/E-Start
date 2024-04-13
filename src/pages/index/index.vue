<script setup lang="ts">
import { computed, reactive } from 'vue';
import { ref } from 'vue'
import type { info } from '@/types/user'
import { onLoad } from '@dcloudio/uni-app';
import { reqInfo } from '@/api/user';
import getWeather from '@/api/getWeather';

const info = ref<info>()

const weather = reactive({
    temperature: '',
    weather: '',
})

const images = {
    "v1-text": "https://bu.dusays.com/2024/03/27/66030a1c8ae3d.webp",
    "v2-text": "https://bu.dusays.com/2024/03/27/66030a1ca04e5.webp",
    "v3-text": "https://bu.dusays.com/2024/03/27/66030a1ca176e.webp",
    "v4-text": "https://bu.dusays.com/2024/03/27/66030a1c95d94.webp",
    "v5-text": "https://bu.dusays.com/2024/03/27/66030a1ca3ecc.webp",
    "v1-figure": "https://bu.dusays.com/2024/03/27/66030a1ccdeb5.webp",
    "v2-figure": "https://bu.dusays.com/2024/03/27/66030a1ce82d7.webp",
    "v3-figure": "https://bu.dusays.com/2024/04/01/6609d4a87058f.webp",
    "v4-figure": "https://bu.dusays.com/2024/03/27/66030a1d61b53.webp",
    "v5-figure": "https://bu.dusays.com/2024/04/01/6609d4dd26ff7.webp" 
}

const levelInfo = computed(
    () => {
        const level = [
            { min: 0, max: 100, imgText: images["v1-text"], imgFigure: images["v1-figure"], title: "启程者" },
            { min: 100, max: 500, imgText: images["v2-text"], imgFigure: images["v2-figure"], title: "探索者" },
            { min: 500, max: 1000, imgText: images["v3-text"], imgFigure: images["v3-figure"], title: "求真者" },
            { min: 1000, max: 2000, imgText: images["v4-text"], imgFigure: images["v4-figure"], title: "悟道者" },
            { min: 2000, imgText: images["v5-text"], imgFigure: images["v5-figure"], title: "集大成者"},
        ]
        const expValue = info.value?.exp ?? 0;
        for (const l of level) {
            if (expValue >= l.min && expValue < (l.max || Infinity)) {
                const need = (l.max || Infinity) - expValue
                const percent = (expValue - l.min) / ((l.max || 2000) - l.min)
                return { level: level.indexOf(l) + 1, need, percent, imgText: l.imgText, imgFigure: l.imgFigure, title: l.title }
            }
        }
        return { level: 1, need: 100, percent: 0, imgText: images["v1-text"], imgFigure: images["v1-figure"], title: "启程者" }
    }
)

const toNewsList = () => {
    uni.navigateTo({ url: '/pages/news/index' })
}

const toTasks = () => {
    uni.switchTab({ url: '/pages/tasks/index' })
}

const toAiChat = () => {
    uni.navigateTo({ url: '/pages/aichat/index' })
}

const imageToPreload = [
    "https://bu.dusays.com/2024/03/27/66030a1c8ae3d.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ca04e5.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ca176e.webp",
    "https://bu.dusays.com/2024/03/27/66030a1c95d94.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ca3ecc.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ccdeb5.webp",
    "https://bu.dusays.com/2024/03/27/66030a1ce82d7.webp",
    "https://bu.dusays.com/2024/03/27/66030a1d61b53.webp",
    "https://bu.dusays.com/2024/04/01/6609d4a87058f.webp",
    "https://bu.dusays.com/2024/04/01/6609d4dd26ff7.webp"
]

const fetchData = async() => {
    const res = await getWeather()
    weather.temperature = res.temperature
    weather.weather = res.weather

    const res1 = await reqInfo()
    if (res1.data.code === 0) {
        info.value = res1.data.data
    } else {
        uni.showToast({
            title: res1.data.msg,
            icon: 'none'
        })
    }
}

onLoad(async() => {
    try {
        const loginStatus = uni.getStorageSync('loginStatus')
        if (!loginStatus) {
            uni.reLaunch({ url: '/pages/login/index' })
        }
    } catch (e) {
        console.log('error: ', e)
    }

    await fetchData()
})

const tasks = [
    {
        title: "准备脸盆",
        time: "2024年9月1日12:00",
        process: 0
    },
    {
        title: "阅读校规",
        time: "2024年9月1日12:00",
        process: 30
    }
]
</script>

<template>
    <view>
        <view id="index-board">
            <view style="height: 44px; background: transparent;"></view>
            <view style="margin: 8px 20px;">
                <text style="font-size: 28px;">{{ weather.weather }}</text>
                <text style="color: #FFFFFF; font-size: 16px;"> {{ weather.temperature }}℃</text>
            </view>
            <uni-row>
                <uni-col :span="14">
                    <view style="margin: 16px 16px;">
                        <view class="title">{{ info?.username }}</view>
                        <view class="title" style="font-size: 16px;">(Lv.{{ levelInfo.level }} {{ levelInfo.title }})</view>
                    </view>
                    <view style="margin-left: 20px; margin-top: 12px;">
                        <text class="tag">{{ info?.exp }} 智慧值</text>
                        <text class="tag">{{ info?.points }} 求索石</text>
                    </view>
                </uni-col>
                <uni-col :span="10">
                    <image
                        src="https://bu.dusays.com/2024/03/27/66030a1ccdeb5.webp"
                        mode="widthFix"
                        style="width: 120%; margin-left: -30px;"
                    />
                </uni-col>
            </uni-row>
            <view>
                <text style="margin-left: 20px; font-size: 16px; color: #FFFFFF;">主线任务进度: </text>
                <text style="margin-left: 4px; font-size: 16px; color: #FFFFFF; font-weight: bolder;">{{ info?.mainProgress}}%</text>
                <view style="margin: 20px;">
                    <view style="height: 6px; width: 100%; background: rgba(3, 3, 3, 0.4); border-radius: 6px;">
                        <view style="height: 6px; background: #1FE032; border-radius: 6px;" :style="`width: ${info?.mainProgress}%`"></view>
                    </view>
                </view>
            </view>
            <view style="height: 8px;"></view>
        </view>
        <view>
            <view style="display: flex;">
                <view class="title">新闻公告</view>
                <view class="check-more" @click="toNewsList">查看更多</view>
            </view>
            <view class="white-board">
                <view class="news-title">国家板球集训队在我校开展冬季集训</view>
                <view class="news-text">1月中旬起，国家板球队入驻浙江工业大学（屏峰校区）板球场开展冬季集训，备战亚洲板球理事会男子T20挑战者杯比赛和亚洲板球理事会女子板球精英赛。</view>
            </view>
        </view>
        <view style="text-align: center; color: #3F72AF; margin: 12px 0;">家庭有困难？点击申请绿色通道</view>
        <view>
            <view style="display: flex;">
                <view class="title">在线咨询</view>
                <view class="check-more">人工服务</view>
            </view>
            <view id="chat-search" @click="toAiChat">
                <uni-icons type="search" size="24" style="margin: auto 0;"/>
                <text style="margin: auto 8px; color: #999999; font-size: 14px;">
                    AI智能在线咨询
                </text>
            </view>
        </view>
        <view>
            <view style="display: flex;">
                <view class="title">待办任务</view>
                <view class="check-more" @click="toTasks">查看更多</view>
            </view>
            <scroll-view scroll-x style="margin: 12px 0px; white-space: nowrap;">
                <view class="task-card" v-for="(task, index) in tasks" :style="index === 0 ? 'margin-left: 10px;' : ''">
                    <view class="task-title">{{ task.title }}</view>
                    <view style="display: flex;">
                        <text class="task-text">截止时间</text>
                        <text class="task-text bold" style="margin: auto 0px auto auto;">{{ task.time }}</text>
                    </view>
                    <view style="display: flex;">
                        <text class="task-text">任务进度</text>
                        <text class="task-text bold" style="margin: auto 0px auto auto;">{{ task.process }}%</text>
                    </view>
                    <view style="margin-top: 12px;">
                        <view style="height: 4px; width: 100%; background: rgba(3, 3, 3, 0.4); border-radius: 4px;">
                            <view style="height: 4px; background: #3F72AF; border-radius: 4px;" :style="`width: ${task.process}%`"></view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view style="height: 16px;"></view>
    </view>
    <!-- 图片预加载 -->
    <view style="display: none;">
        <image
            v-for="image in imageToPreload"
            :src="image"
            mode="scaleToFill"
        />
    </view>
</template>

<style scoped>
#index-board {
    width: 100%;
    background: linear-gradient(135deg, #5563DC, #5EC1F5);
    border-radius: 0px 0px 32px 32px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;
}

#index-board .title {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
}

#index-board .tag {
    margin-right: 10px;
    margin-bottom: 8px;
    border: 1px solid #E4EAF1;
    padding: 4px;
    width: 60px;
    text-align: center;
    border-radius: 4px;
    color: #667085;
    font-size: 12px;
    background: #fff;
}

.title {
    font-size: 20px;
    color: #112D4E;
    font-weight: 500;
    margin-left: 20px;
}

.white-board {
    background-color: #fff;
    padding: 12px 20px;
    margin: 6px 0px;
}

.news-title {
    color: #112D4E;
    font-size: 17px;
    font-weight: 400;
    line-height: 23.8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-all;
    margin-bottom: 6px;
}

.news-text {
    color: #112D4E;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    opacity: 0.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    word-break: break-all;
}

.check-more {
    margin: auto 20px auto auto;
    color: #3F72AF;
    font-size: 14px;
    font-weight: 400;
}

#chat-search {
    background-color: #FFFFFF;
    height: 60px;
    margin: 12px 20px;
    border-radius: 50px;
    display: flex;
    border: 1px solid rgb(152, 162, 179);
    padding: 0px 16px;
}

.task-card {
    background-color: #fff;
    border-radius: 12px;
    border: 1px dashed #3F72AF;
    padding: 12px;
    width: 200px;
    display: inline-block;
    margin-right: 10px;
}

.task-title {
    color: #3F72AF;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;
}

.task-text {
    color: #667085;
    font-size: 14px;
    font-weight: 400;
}

.task-text.bold {
    font-weight: 700;
}
</style>

<style>
page {
    background-color: #F9FAFB;
}
</style>