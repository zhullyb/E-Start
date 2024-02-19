<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getCurrentInstance, onMounted } from 'vue';
import { ref } from 'vue';
import type { stage, taskList } from '../../types/tasks';
import { reqTaskStage } from '@/api/tasks';

const $instance = getCurrentInstance()?.proxy as any
const task = ref<taskList>() as any

const id = ref(-1)
const curStage = ref(-1)
const stages = ref<stage[]>()
const buttonSelected = ref(0)
const buttons = [
    "任务详情",
    "用户评价"
]

// #ifdef MP-WEIXIN
onLoad(() => {
    const eventChannel = $instance.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (accepted_task: taskList) => {
        task.value = accepted_task
    })
    uni.setNavigationBarTitle({
        title: '主线任务：' + task.value.title
    });
})

onMounted(async () => {
    const res = await reqTaskStage(id.value)
    if (res.status !== 200 && res.data.code !== 0) {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
    stages.value = res.data.data.stages
    curStage.value = res.data.data.curStage
})
// #endif
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
                <view class="es-text-desc">{{ task.desc }}</view>
                <view class="es-text-title">任务奖励</view>
                <view class="es-text-desc">{{ task.reward }}智慧种子，{{ task.reward }}求索石</view>
                <view class="es-text-title">截止时间</view>
                <view class="es-text-desc">{{ timeParse(task.endTime) }}</view>
                <view class="es-text-title">任务进度</view>
                <ua-timeline>
                    <ua-timeline-item
                        v-for="stage in stages"
                        :key="stage.id"
                        :title="stage.title"
                        :content="stage.desc"
                        :icon="curStage >= stage.stage ? 'success' : 'pending'"
                    >{{ timeParse(stage.endTime) }}</ua-timeline-item>
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
</style>