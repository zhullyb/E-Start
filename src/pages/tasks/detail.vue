<script setup lang="ts">
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { getCurrentInstance, ref } from 'vue';
import type { stage, taskList } from '../../types/tasks';
import { reqTask, reqTaskStage, updTaskStage } from '@/api/tasks';

const loc = ref('')

const $instance = getCurrentInstance()?.proxy as any
const task = ref<taskList>() as any

const curStage = ref(-1)
const stages = ref<stage[]>() as any
const buttonSelected = ref(0)
const buttons = [
    "任务详情",
    "用户评价"
]

// 后端保证如果 needCamera，则不会有 needLoc 和 needPic
const handleComplete = async (stage: stage) => {
    if (stage.needPic){
        if (stage.needLoc){
            if (!await locValidate(stage)){
                return
            }
        }
        uni.navigateTo({
            url: `/pages/tasks/uploadValidate?loc=${loc.value}&needFace=${stage.needFace}`
        })
    } else if (stage.needLoc){
        if (!await locValidate(stage)){
            return
        }
        await doUpdTaskStage({loc: loc.value})
    } else if (stage.needCamera){
        uni.navigateTo({
            url: "/pages/tasks/qrcode"
        })
    } else {
        await doUpdTaskStage({})
    }
}

const doUpdTaskStage = async (data:{loc?: string}) => {
    const res = await updTaskStage(data)
    if (res.status !== 200 || res.data.code !== 0){
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
        return
    } else {
        uni.showToast({
            title: '提交成功'
        })
        await getData()
    }
}

const locValidate = async(stage: stage) => {
    return new Promise<boolean>((resolve, reject) => {
        uni.getLocation({
            type: 'gcj02',
            success: (res) => {
                loc.value = res.longitude + ',' + res.latitude
                if (getDistance(loc.value, stage.loc) > stage.allowDist){
                    uni.showToast({
                        title: '距离过远，请30秒后重试',
                        icon: 'none'
                    })
                    reject(false)
                    return
                }
                uni.showToast({
                    title: '位置验证成功'
                })
                resolve(true)
            },
            fail: (res) => {
                uni.showToast({
                    title: '获取位置失败',
                    icon: 'none'
                })
                console.log(res)
                reject(false)
            }
        });
    })
}

function getDistance(pos1: string, pos2: string) {
    const radius = 6378137;
    const rad = Math.PI / 180.0;
    let lng1 = Number(pos1.split(',')[0]) * rad;
    let lat1 = Number(pos1.split(',')[1]) * rad;
    let lng2 = Number(pos2.split(',')[0]) * rad;
    let lat2 = Number(pos2.split(',')[1]) * rad;
    const theta = lng2 - lng1;
    const dist = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(theta));
    return dist * radius;
}

const navigateTo = (stage: stage) => {
    if (stage.loc == '') {
        uni.showToast({
            title: '暂无导航信息',
            icon: 'none'
        })
        console.log(stage)
        return
    }
    uni.openLocation({
        latitude: Number(stage.loc.split(',')[0]),
        longitude: Number(stage.loc.split(',')[1])
    });
}

// #ifdef MP-WEIXIN
onLoad(async(options: any) => {
    const id = options.id
    const res = await reqTask(id)
    if (res.data.code === 0){
        task.value = res.data.data
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
    await getData()
})

onPullDownRefresh(async() => {
    await getData()
    uni.stopPullDownRefresh()
})
// #endif
const getData = async () => {
    const res = await reqTaskStage(task.value.id);
    if (res.status !== 200 || res.data.code !== 0) {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
    stages.value = res.data.data.stages
    curStage.value = res.data.data.curStage
}
// #ifndef MP-WEIXIN
task.value = {
    "id": 1,
    "createdAt": "2024-02-18T16:33:49+08:00",
    "updatedAt": "2024-02-18T16:33:52+08:00",
    "category": 1,
    "title": "主线任务1",
    "desc": "主线任务1的描述",
    "campus": "全部",
    "college": "全部",
    "reward": 100,
    "needMain": false,
    "startTime": "2024-02-18T16:35:01+08:00",
    "endTime": "2024-02-25T16:35:03+08:00"
}
stages.value = [{
    "id": 1,
    "createdAt": "2024-02-18T17:47:41+08:00",
    "updatedAt": "2024-02-18T17:47:44+08:00",
    "taskId": 1,
    "stage": 1,
    "title": "阶段一的名称",
    "desc": "阶段一的描述",
    "requiredItem": "阶段一需要的物品",
    "imgs": "",
    "needPic": false,
    "needFace": false,
    "pic": "",
    "needLoc": false,
    "allowDist": 0,
    "needNav": true,
    "loc": "",
    "needCamera": false,
    "cameraId": 0
},
{
    "id": 2,
    "createdAt": "2024-02-18T17:47:41+08:00",
    "updatedAt": "2024-02-18T17:47:44+08:00",
    "taskId": 1,
    "stage": 2,
    "title": "阶段二的名称",
    "desc": "阶段二的描述",
    "requiredItem": "",
    "imgs": "",
    "needPic": true,
    "needFace": false,
    "pic": "",
    "needLoc": true,
    "allowDist": 100,
    "needNav": true,
    "loc": "",
    "needCamera": true,
    "cameraId": 1
},
{
    "id": 6,
    "createdAt": "2024-02-18T17:47:41+08:00",
    "updatedAt": "2024-02-18T17:47:44+08:00",
    "taskId": 1,
    "stage": 3,
    "title": "阶段三的名称",
    "desc": "阶段三的描述",
    "requiredItem": "阶段三需要的物品",
    "imgs": "",
    "needPic": false,
    "needFace": false,
    "pic": "",
    "needLoc": false,
    "allowDist": 0,
    "needNav": true,
    "loc": "",
    "needCamera": false,
    "cameraId": 0
}]
curStage.value = 2
// #endif

const timeParse = (time: string) => {
    const objectedTime = new Date(time)
    const year = objectedTime.getFullYear()
    const month = String(objectedTime.getMonth() + 1).padStart(2, '0')
    const day = String(objectedTime.getDate()).padStart(2, '0')
    const hour = String(objectedTime.getHours()).padStart(2, '0')
    const minute = String(objectedTime.getMinutes()).padStart(2, '0')
    return `${year}年${month}月${day}日${hour}:${minute}`
}
</script>

<template>
    <view style="margin: 12px;">
        <uni-row :gutter="18">
            <uni-col :span="12" v-for="(button, index) in buttons">
                <button
                    class="es-button"
                    :class="{ selected: buttonSelected === index }"
                    @click="buttonSelected = index"
                >
                    {{ button }}
                </button>
            </uni-col>
        </uni-row>
        <view style="margin: 12px 0;">
            <view v-if="buttonSelected === 0">
                <view class="es-text-title">任务描述</view>
                <view class="es-text-desc">{{ task?.desc }}</view>
                <view class="es-text-title">任务奖励</view>
                <view class="es-text-desc">{{ task?.reward }}智慧值，{{ task?.reward }}求索石</view>
                <view class="es-text-title">截止时间</view>
                <view class="es-text-desc">{{ timeParse(task?.endTime) }}</view>
                <view class="es-text-title">任务进度</view>
                <ua-timeline>
                    <ua-timeline-item
                        v-for="stage in stages"
                        style="padding: 0;"
                        :key="stage.id"
                        :size="16"
                        :hideTimestamp="true"
                        :color="curStage >= stage.stage || curStage == 0 ? '#3F72AF' : '#E4E7ED'"
                        :lineColor="curStage > stage.stage || curStage == 0 ? '#3F72AF' : '#E4E7ED'"
                    >
                        <view class="es-timeline-item" :class="{ 'current-task': curStage === stage.stage }">
                            <view class="es-text-task-title">{{ stage.title }}</view>
                            <view v-show="curStage === stage.stage">
                                <view class="es-text-task-desc">{{ stage.desc }}</view>
                                <view style="display: inline-flex;">
                                    <button
                                        class="task-button"
                                        @click="handleComplete(stage)"
                                    >
                                        去完成
                                    </button>
                                    <button
                                        v-show="stage.needNav"
                                        class="task-button"
                                        @click="navigateTo(stage)"
                                    >
                                        需要导航?
                                    </button>
                                </view>
                            </view>
                        </view>
                    </ua-timeline-item>
                </ua-timeline>
            </view>
            <view v-else>
            </view>
        </view>
    </view>
</template>

<style>
.es-text-title {
    color: rgb(17, 45, 78);
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    margin: 12px 0;
}

.es-text-desc {
    color: rgb(17, 45, 78);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
}

.es-text-task-title {
    color: rgb(56, 59, 70);
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 10px;
}

.es-text-task-desc {
    color: rgb(56, 59, 70);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    margin-top: 20px;
    margin-bottom: 12px;
}

.es-timeline-item {
    margin-left: -6px;
    margin-right: 6px;
    padding: 10px 10px 10px 16px;
}

.current-task {
    background-color: #F7F8F9;
    border-radius: 10px;
    box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
    padding-top: 16px;
    padding-bottom: 20px;
}

.task-button {
    border-radius: 36px;
    background-color: rgb(238, 244, 255);
    color: rgb(100, 129, 220);
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    text-align: center;
    width: fit-content;
    margin: 2px;
}
</style>