<script setup lang="ts">
import { computed, reactive } from 'vue';
import { ref } from 'vue'
import type { info } from '@/types/user'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { reqInfo } from '@/api/user';
import getWeather from '@/api/getWeather';
import { reqInformation } from '@/api/information';
import { reqTaskList } from '@/api/tasks';

const info = ref<info>()

const subScribe = () => {
    uni.requestSubscribeMessage({
        tmplIds: ['CqJhuDjtn48AD8Pe2PMUkkU1Gp2RXRZio1a3X-L6hPc', 'Ee-ANBeWeQougnSw8ipyoEW-SkRYBeWvZNgLE4GllJo'],
        fail () {
            uni.showToast({
                title: '消息订阅失败',
                icon: 'none'
            })
        }
    })
}

const weather = reactive({
    temperature: '25',
    weather: '☀️',
})

const news = ref({
    id: 1,
    title: '国家板球集训队在我校开展冬季集训',
    content: '1月中旬起，国家板球队入驻浙江工业大学（屏峰校区）板球场开展冬季集训，备战亚洲板球理事会男子T20挑战者杯比赛和亚洲板球理事会女子板球精英赛。'
})

const tasks = ref([
    {
        title: "准备脸盆",
        endTime: "2024-04-30T00:00:00+08:00",
        stageNum: 1,
        curStage: 1
    },
    {
        title: "阅读校规",
        endTime: "2024-04-30T00:00:00+08:00",
        stageNum: 10,
        curStage: 4
    }
])

const taskPercent = (task: { stageNum: number, curStage: number }) => {
    if (task.curStage === 0) {
        return 0
    } else {
        return Math.floor((task.curStage-1) / task.stageNum * 100)
    }
}

const timeParse = (time: string) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}年${month}月${day}日${hour}:${minute}`
}

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

const toNewsDetail = () => {
    uni.navigateTo({
        url: '/pages/news/detail',
        success: (res) => {
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: news.value })
        }
    })
}

const toInfo = () => {
    uni.navigateTo({ url: '/pages/index/info' })
}

const toTasks = () => {
    uni.switchTab({ url: '/pages/tasks/index' })
}

const toTaskDetail = (task: any) => {
    uni.navigateTo({ url: `/pages/tasks/detail?id=${task.id}` })
}

const toAiChat = () => {
    uni.navigateTo({ url: '/pages/aichat/index' })
}

const imageToPreload = [
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/36451dd2-0c06-4db3-982d-dcf4a5334d10.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/ee66ff10-65e4-42d3-b478-9348b871358f.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/e168ed83-77d8-459b-bb92-fa209f8c8545.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/70996a5b-9507-43c9-a53d-c381e1a32aec.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/fada9073-35bc-492f-b4dc-5244df188bcc.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/6bc1954d-cbc4-4cf9-9846-70e43055b03e.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/0cbd3996-6050-4ac8-9f5c-67de4aed745d.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/4d0034f7-e48d-4032-83a4-3b2c41ab6ca5.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/27732833-4108-468b-b4c4-7a792081c87c.webp",
    "https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/2bec1afe-2b91-4b67-a00a-f999c71d1eb7.webp"
]

const fetchData = async() => {
    try {
        const res = await getWeather()
        weather.temperature = res.temperature
        weather.weather = res.weather
    } catch (error) {
        console.log(error)
    }

    const res1 = await reqInfo()
    if (res1.data.code === 0) {
        info.value = res1.data.data
    } else {
        uni.showToast({
            title: res1.data.msg,
            icon: 'none'
        })
    }

    const res2 = await reqInformation(2)
    if (res2.data.code === 0 && res2.data.data.list.length !== 0) {
        news.value = res2.data.data.list[0]
    }

    let category = 1
    if (info.value?.mainProgress === 100) {
        category = 2
    }
    const res3 = await reqTaskList({
        category,
        isCompleted: 0
    })
    if (res3.data.code === 0) {
        tasks.value = res3.data.data.list
    }
}

onLoad(async() => {
    try {
        const loginStatus = uni.getStorageSync('loginStatus')
        if (!loginStatus) {
            uni.reLaunch({ url: '/pages/login/index' })
        } else {
            await fetchData()
        }
    } catch (e) {
        console.log('error: ', e)
    }
})

onPullDownRefresh(async() => {
    await fetchData()
    uni.stopPullDownRefresh()
})
</script>

<template>
    <view>
        <view id="index-board">
            <view style="height: 44px; background: transparent;"></view>
            <view style="margin: 8px 20px;">
                <text style="font-size: 28px;">{{ weather.weather }}</text>
                <text style="color: #FFFFFF; font-size: 16px; margin-left: 4px;">{{ weather.temperature }}℃</text>
            </view>
            <uni-row>
                <uni-col :span="14">
                    <view style="margin: 16px 16px;" @click="toInfo">
                        <view style="display: flex;">
                            <view class="title">{{ info?.username }}</view>
                            <uni-icons
                                type="compose"
                                color="#FFFFFF"
                                size="18"
                                style="margin: auto auto 0 4px;"
                            />
                        </view>
                        <view class="title" style="font-size: 16px;">(Lv.{{ levelInfo.level }} {{ levelInfo.title }})</view>
                    </view>
                    <view style="margin-left: 20px; margin-top: 12px;">
                        <text class="tag">{{ info?.exp }} 智慧值</text>
                        <text class="tag">{{ info?.points }} 求索石</text>
                    </view>
                </uni-col>
                <uni-col :span="10">
                    <image
                        src="https://api-lonesome.oss-cn-hangzhou.aliyuncs.com/E-Start/6bc1954d-cbc4-4cf9-9846-70e43055b03e.webp"
                        mode="widthFix"
                        style="width: 120%; margin-left: -30px;"
                        @click="subScribe"
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
            <view class="white-board" @click="toNewsDetail">
                <view class="news-title">{{ news.title }}</view>
                <view class="news-text">{{ news.content }}</view>
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
                <view
                    class="task-card"
                    v-for="(task, index) in tasks"
                    @click="toTaskDetail(task)"
                    :style="index === 0 ? 'margin-left: 20px;' : ''"
                >
                    <view class="task-title">{{ task.title }}</view>
                    <view style="display: flex;">
                        <text class="task-text">截止时间</text>
                        <text class="task-text bold" style="margin: auto 0px auto auto;">{{ timeParse(task.endTime) }}</text>
                    </view>
                    <view style="display: flex;">
                        <text class="task-text">任务进度</text>
                        <text class="task-text bold" style="margin: auto 0px auto auto;">{{ taskPercent(task) }}%</text>
                    </view>
                    <view style="margin-top: 12px;">
                        <view style="height: 4px; width: 100%; background: rgba(3, 3, 3, 0.4); border-radius: 4px;">
                            <view style="height: 4px; background: #3F72AF; border-radius: 4px;" :style="`width: ${taskPercent(task)}%`"></view>
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
    width: 220px;
    display: inline-block;
    margin-right: 10px;
}

.task-title {
    color: #3F72AF;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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