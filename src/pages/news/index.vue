<script setup lang="ts">
import { reqInformation } from '@/api/information';
import { onMounted } from 'vue';
import { computed, ref } from 'vue';
import type { news } from '../../types/news';
import { reactive } from 'vue';

const selectedItem = ref(1);
const infoLists = reactive<{
    infoList0: news[],
    infoList1: news[],
    infoList2: news[]
}>({
    infoList0: [],
    infoList1: [],
    infoList2: []
})

const buttons = [
    { text: '最新通知' },
    { text: '新闻动态' },
    { text: '系统公告' }
];

const infoList = computed(
    () => {
        if (selectedItem.value === 0) {
            return infoLists.infoList0
        } else if (selectedItem.value === 1) {
            return infoLists.infoList1
        } else {
            return infoLists.infoList2
        }
    }
)

const toNewsDetail = (id: number) => {
    uni.navigateTo({
        url: '/pages/news/detail',
        success: (res) => {
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: infoList.value.find(item => item.id === id) })
        }
    })
}

onMounted( async() => {
    const res0 = await reqInformation(1)
    const res1 = await reqInformation(2)
    const res2 = await reqInformation(3)
    infoLists.infoList0 = res0.data.data.list
    infoLists.infoList1 = res1.data.data.list
    infoLists.infoList2 = res2.data.data.list
})
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
            @click="toNewsDetail(item.id)"
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
../../types/newa