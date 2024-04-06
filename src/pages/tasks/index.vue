<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { taskList } from '../../types/tasks'
import { reqSelectTask, reqTaskList } from '../../api/tasks'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';

const taskLists = reactive<{
    taskList1: taskList[],
    taskList2: taskList[],
    taskList3: taskList[],
    taskList4: taskList[],
    taskList5: taskList[],
    taskList6: taskList[]
}>({
    taskList1: [],
    taskList2: [],
    taskList3: [],
    taskList4: [],
    taskList5: [],
    taskList6: []
})

const buttonSelected = ref(0)
const taskTypeSelected = ref(0)

const buttons = [
    "主线任务",
    "支线任务",
    "每日任务",
    "隐藏任务"
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

const openTask = async (task: taskList) => {
    if (taskTypeSelected.value === 1) {
        uni.showToast({
            title: '任务已完成',
            icon: 'none'
        })
        return
    }

    uni.requestSubscribeMessage({
        tmplIds: ['zWqQ0g3O0V2PKlXIYEdfqmmwB_n0tOGExlIPxqbBvd8'],
        fail () {
            uni.showToast({
                title: '消息订阅失败',
                icon: 'none'
            })
        }
    })

    const res = await reqSelectTask(task.id)
    if (res.status !== 200 || res.data.code !== 0){
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
        return
    }

    uni.navigateTo({
        url: `/pages/tasks/detail?id=${task.id}`
    })
}

const loadData = async() => {
    const res1 = await reqTaskList({ category: 1, isCompleted: 0 })
    const res2 = await reqTaskList({ category: 1, isCompleted: 1 })
    const res3 = await reqTaskList({ category: 2, isCompleted: 0 })
    const res4 = await reqTaskList({ category: 2, isCompleted: 1 })
    const res5 = await reqTaskList({ category: 3, isCompleted: 0 })
    const res6 = await reqTaskList({ category: 3, isCompleted: 1 })

    taskLists.taskList1 = res1.data.data.list,
    taskLists.taskList2 = res2.data.data.list,
    taskLists.taskList3 = res3.data.data.list,
    taskLists.taskList4 = res4.data.data.list,
    taskLists.taskList5 = res5.data.data.list,
    taskLists.taskList6 = res6.data.data.list
}

onLoad(async()=>{
    await loadData()
})

onPullDownRefresh(async() => {
    await loadData()
    uni.stopPullDownRefresh()
})

const taskUncompleted = computed(() => {
    switch (buttonSelected.value) {
        case 0:
            return taskLists.taskList1.length
        case 1:
            return taskLists.taskList3.length
        case 3:
            return taskLists.taskList5.length
        // case 2: 该情况为隐藏任务
        default:
            return -1
    }
})


const taskCompleted = computed(() => {
    switch (buttonSelected.value) {
        case 0:
            return taskLists.taskList2.length
        case 1:
            return taskLists.taskList4.length
        case 3:
            return taskLists.taskList6.length
        // case 2: 该情况为隐藏任务
        default:
            return -1
    }
})

const tasks = computed(() => {
    switch (buttonSelected.value) {
        case 0:
            return taskTypeSelected.value === 0 ? taskLists.taskList1 : taskLists.taskList2
        case 1:
            return taskTypeSelected.value === 0 ? taskLists.taskList3 : taskLists.taskList4
        case 3:
            return taskTypeSelected.value === 0 ? taskLists.taskList5 : taskLists.taskList6
        // case 2: 该情况为隐藏任务
        default:
            return []
    }
})
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
                        style="display: flex; padding: 8px 16px;"
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
                            <text style="font-weight: 700;">{{ taskUncompleted }}</text>
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
                        style="display: flex; padding: 8px 16px;"
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
                            <text style="font-weight: 700;">{{ taskCompleted }}</text>
                            <br />
                            <text>已完成</text>
                        </view>
                    </button>
                </uni-col>
            </uni-row>
            <view>
                <view v-for="task in tasks" class="shadow" style="margin: 12px 0;">
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
                        <uni-row>
                            <view style="display: flex;align-items: center;">
                                <uni-col :span="16">
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
                                        @click="openTask(task)"
                                    >
                                        {{ taskTypeSelected === 0 ? '进入' : '已完成' }}
                                    </button>
                                </uni-col>
                            </view>
                        </uni-row>
                        <uni-row>
                            <view style="margin: 5px 0; min-height: 40px;">
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
                            </view>
                        </uni-row>
                        <view>
                            <view class="text-title" style="display: flex; justify-content: space-between;">
                                <text>截止时间：</text>
                                <text>{{ timeParse(task.endTime) }}</text>
                            </view>
                            <view class="text-title" style="display: flex; justify-content: space-between;">
                                <text>任务奖励：</text>
                                <text>{{ task.reward }}智慧值，{{ task.reward }}求索石</text>
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