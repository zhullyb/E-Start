<script setup lang="ts">
import { ref } from 'vue'

const buttonSelected = ref(0)

const buttons = [
    "主线任务",
    "直线任务",
    "每日任务",
    "隐藏任务"
]

const taskTypeSelected = ref(0)

const tasks = [
    {
        "id": 1,
        "createdAt": "2024-02-18T16:33:49+08:00",
        "updatedAt": "2024-02-18T16:33:52+08:00",
        "category": 1,
        "title": "报到注册",
        // "title": "报到注册，但是也非常长，非常非常长的一句话，结尾处应当会有省略号显示",
        "desc": "报到注册的描述",
        // "desc": "报到注册的描述，参与者需完成报到注册流程，提供个人信息并领取必要的证件。完成后，将获得进一步指引，确保顺利参与活动。参与者需完成报到注册流程，提供个人信息并领取必要的证件。完成后，将获得进一步指引，确保顺利参与活动。参与者需完成报到注册流程，提供个人信息并领取必要的证件。完成后，将获得进一步指引，确保顺利参与活动。",
        "campus": "全部",
        "college": "全部",
        "reward": 100,
        "needMain": false,
        "startTime": "2024-02-18T16:35:01+08:00",
        "endTime": "2024-02-25T16:35:03+08:00"
    },
    {
        "id": 2,
        "createdAt": "2024-02-18T16:33:49+08:00",
        "updatedAt": "2024-02-18T16:33:52+08:00",
        "category": 1,
        // "title": "报到注册",
        "title": "报到注册，但是也非常长，非常非常长的一句话，结尾处应当会有省略号显示",
        // "desc": "报到注册的描述",
        "desc": "报到注册的描述，参与者需完成报到注册流程，提供个人信息并领取必要的证件。完成后，将获得进一步指引，确保顺利参与活动。参与者需完成报到注册流程，提供个人信息并领取必要的证件。完成后，将获得进一步指引，确保顺利参与活动。参与者需完成报到注册流程，提供个人信息并领取必要的证件。完成后，将获得进一步指引，确保顺利参与活动。",
        "campus": "全部",
        "college": "全部",
        "reward": 100,
        "needMain": false,
        "startTime": "2024-02-18T16:35:01+08:00",
        "endTime": "2024-02-25T16:35:03+08:00"
    }
]

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
        <uni-row :gutter="12">
            <uni-col
                :span="6"
                v-for="(button, index) in buttons"
            >
                <button
                    class="es-button"
                    :class="{ selected: buttonSelected === index }"
                    @click="buttonSelected = index"
                    style="padding: 12px 2px;"
                >
                    {{ button }}
                </button>
            </uni-col>
        </uni-row>
        <view style="height: 12px;"></view>
        <view>
            <uni-row :gutter="24">
                <uni-col :span="12">
                    <button
                        class="es-button shadow"
                        :class="taskTypeSelected === 0 ? 'selected' : 'no-border'"
                        @click="taskTypeSelected = 0"
                        style="display: flex;"
                    >
                        <view
                            style="
                                    border-radius: 50%;
                                    width: 50px;
                                    height: 50px;
                                    background-color: rgb(219, 226, 239);
                                    position: relative;
                                    margin: 2px 10px;
                                "
                        >
                            <uni-icons
                                fontFamily="iconfont"
                                :size="24"
                                class="center"
                            >{{ '\ue643' }}</uni-icons>
                        </view>
                        <view>
                            <text style="font-weight: 700;">6</text>
                            <br />
                            <text>进行中</text>
                        </view>
                    </button>
                </uni-col>
                <uni-col :span="12">
                    <button
                        class="es-button shadow"
                        :class="taskTypeSelected === 1 ? 'selected' : 'no-border'"
                        @click="taskTypeSelected = 1"
                        style="display: flex;"
                    >
                        <view
                            style="
                                    border-radius: 50%;
                                    width: 50px;
                                    height: 50px;
                                    background-color: rgb(219, 226, 239);
                                    position: relative;
                                    margin: 2px 10px;
                                "
                        >
                            <uni-icons
                                type="checkmarkempty"
                                size="24"
                                class="center"
                            />
                        </view>
                        <view>
                            <text style="font-weight: 700;">5</text>
                            <br />
                            <text>进行中</text>
                        </view>
                    </button>
                </uni-col>
            </uni-row>
            <view>
                <view v-for="task in tasks" class="shadow" >
                    <view style="padding: 16px;">
                        <view
                            style="
                                    color: rgb(63, 114, 175);
                                    font-size: 10px;
                                    font-weight: 400;
                                    line-height: 13px;
                                    margin-bottom: 10px;
                                "
                        >{{ buttons[buttonSelected] }}</view>
                        <uni-row style="display: flex;">
                            <uni-col
                                :span="16"
                                style="
                                        display: flex;
                                        align-items: center;
                                        "
                            >
                                <text 
                                    class="text-title"
                                    style="
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 2;
                                            overflow: hidden;
                                            word-break: break-all;
                                            margin-right: 4px;
                                    "
                                >
                                    {{ task.title }}
                                </text>
                            </uni-col>
                            <uni-col :span="8">
                                <button
                                    class="es-button"
                                    :class="{ selected: taskTypeSelected === 0 }"
                                    style="padding: 7px;"
                                    @click=""
                                >
                                    {{ taskTypeSelected === 0 ? '进入' : '已完成' }}
                                </button>
                            </uni-col>
                        </uni-row>
                        <uni-row style="margin: 5px 0; min-height: 40px;">
                            <text
                                style="
                                        color: rgb(17, 45, 78);
                                        font-size: 10px;
                                        font-weight: 400;
                                        line-height: 13px;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        overflow: hidden;
                                        word-break: break-all;
                                        "
                            >
                                {{ task.desc }}
                            </text>
                        </uni-row>
                        <view>
                            <view class="text-title" style="display: flex; justify-content: space-between;">
                                <text>截止时间：</text>
                                <text>{{ timeParse(task.endTime) }}</text>
                            </view>
                            <view class="text-title" style="display: flex; justify-content: space-between;">
                                <text>任务奖励：</text>
                                <text>{{ task.reward }}智慧种子，{{ task.reward }}求索石</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.text-title {
    color: rgb(17, 45, 78);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    padding: 1px 0;
}
</style>