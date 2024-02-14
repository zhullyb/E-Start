<script setup lang="ts">
import { computed, ref } from 'vue';

const selectedItem = ref(1);

const buttons = [
    { text: '最新通知' },
    { text: '新闻动态' },
    { text: '系统公告' }
];

const originInfoList = [
    {   
        id: 1,
        title: '最新通知1没错这是一个非常长的标题啊啊啊啊啊啊啊啊简直不要太长啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
    },
    {
        id: 2,
        title: '最新通知2',
        content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
    },
    {
        id: 3,
        title: '最新通知3',
        content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
    },
    {
        id: 4,
        title: '最新通知4',
        content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
    },
    {
        id: 5,
        title: '最新通知5',
        content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
    },
    {
        id: 6,
        title: '最新通知6',
        content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
    },
    {
        id: 7,
        title: '最新通知7',
        content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容'
    }
]

const infoList = computed(
    () => originInfoList.filter(
        item => item.id % 3 === selectedItem.value
    )
)
</script>

<template>
<view style="margin: 16px;">
    <uni-row
        :gutter="12"
        style="margin-bottom: 20px;"
    >
        <uni-col :span="8" v-for="(button, index) in buttons" :key="index">
            <button
                class="es-button"
                :class="{ selected: selectedItem === index }"
                @click="selectedItem = index"
            >{{ button.text }}</button>
        </uni-col>
    </uni-row>
    <view>
        <view 
            v-for="item in infoList"
            style="
                margin: 30px 0;
                height: 100px;
            "
        >
            <view style="margin-bottom: 10px;">
                <text
                    style="
                            color: rgb(17, 45, 78);
                            font-size: 17px;
                            font-weight: 400;
                            line-height: 23.8px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                            word-break: break-all;
                        "
                >{{ item.title }}</text>
            </view>
            <view>
                <text
                    style="
                            color: rgb(17, 45, 78);
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 19.6px;
                            opacity: 0.5;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                            word-break: break-all;
                        "
                >{{ item.content }}</text>
            </view>
        </view>
    </view>
</view>
</template>
