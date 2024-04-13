<script setup lang="ts">
import { reqRankList } from '@/api/tasks';
import { reqInfo } from '@/api/user';
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { computed, reactive, ref } from 'vue';
import type { info } from '@/types/user';

const type = ref(0)
const info = ref<info>()

const listData = reactive({
    list1: Array(),
    list2: Array(),
    list3: Array(),
})

const userRank = reactive({
    dic1: Object(),
    dic2: Object(),
    dic3: Object(),
})

const selectedData = computed(() => {
    switch (type.value) {
        case 0:
            return listData.list1
        case 1:
            return listData.list2
        case 2:
            return listData.list3
    }
})

const selectedUserRank = computed(() => {
    switch (type.value) {
        case 0:
            return userRank.dic1
        case 1:
            return userRank.dic2
        case 2:
            return userRank.dic3
    }
})

const fetchData = async() => {
    const res = await reqInfo()
    if (res.data.code === 0) {
        info.value = res.data.data
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
    const res1 = await reqRankList(1)
    if (res1.data.code === 0) {
        listData.list1 = res1.data.data.list
        userRank.dic1 = res1.data.data.userRank
    } else {
        uni.showToast({
            title: res1.data.msg,
            icon: 'none'
        })
    }
    const res2 = await reqRankList(2)
    if (res2.data.code === 0) {
        listData.list2 = res2.data.data.list
        userRank.dic2 = res2.data.data.userRank
    } else {
        uni.showToast({
            title: res2.data.msg,
            icon: 'none'
        })
    }
    const res3 = await reqRankList(3)
    if (res3.data.code === 0) {
        listData.list3 = res3.data.data.list
        userRank.dic3 = res3.data.data.userRank
    } else {
        uni.showToast({
            title: res3.data.msg,
            icon: 'none'
        })
    }
}

const prizeGenerator = (index: number) => {
    switch (index) {
        case 1:
            return '🥇'
        case 2:
            return '🥈'
        case 3:
            return '🥉'
        default:
            return ''
    }
}

onLoad(async() => {
    await fetchData()
})

onPullDownRefresh(async() => {
    await fetchData()
    uni.stopPullDownRefresh()
})
</script>

<template>
    <view style="margin: 0 12px;">
        <view style="display: flex;">
            <view class="selector">
                <text @click="type = 0" :class="{ 'selected': type === 0 }" class="left">智慧值数</text>
                <text @click="type = 1" :class="{ 'selected': type === 1 }">主线进度</text>
                <text @click="type = 2" :class="{ 'selected': type === 2 }" class="right">总任务数</text>
            </view>
        </view>
        <view>
            <view
                style="border-radius: 12px;
                       background-color: #3F71AE;
                       margin-bottom: 20px;
                ">
                <view
                    style="display: flex;
                        align-items: center;
                        border-radius: 12px;">
                    <view class="text-index" style="color: #FFFFFF;">
                        {{ selectedUserRank.rank < 10 && selectedUserRank.rank > 0 ? '0' + selectedUserRank.rank : selectedUserRank.rank || 'N/A' }}
                    </view>
                    <view style="display: flex; align-items: center; justify-content: center;">
                        <image
                            :src="info?.avatar"
                            mode="scaleToFill"
                            style="height: 60px; width: 60px; border-radius: 50%; margin: 8px;"
                        />
                    </view>
                    <view>
                        <view style="font-size: 18px; color: #FFFFFF;">{{ info?.username }}{{ prizeGenerator(selectedUserRank.rank) }}</view>
                        <view class="text-disc" style="color: #FFFFFF;">{{ info?.signature || '这个人很懒，什么也没留下' }}</view>
                    </view>
                    <view style="margin: auto 16px auto auto; color: #FFFFFF;">{{ selectedUserRank.param }}</view>
                </view>
            </view>
        </view>
        <view v-for="(item, index) in selectedData">
            <view 
                class="board" 
                :class="{ 'dark-board': index % 2 === 0 }"
            >
                <view class="text-index">
                    {{ index + 1 < 10 ? '0' + (index + 1) : (index + 1) }}
                </view>
                <view style="display: flex; align-items: center; justify-content: center;">
                    <image
                        :src="item.avatar"
                        mode="scaleToFill"
                        style="height: 60px; width: 60px; border-radius: 50%; margin: 8px;"
                    />
                </view>
                <view>
                    <view style="font-size: 18px;">{{ item.username }}{{ prizeGenerator(index + 1) }}</view>
                    <view class="text-disc">{{ item.signature || '这个人很懒什么都没有留下~' }}</view>
                </view>
                <view style="margin: auto 16px auto auto;">{{ item.param }}</view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.selector {
    display: flex;
    margin: 12px auto;
    border-radius: 12px;
    border: 1px solid #3F71AE;
    width: fit-content;

    text {
        padding: 8px;
        font-size: 14px;
    }

    .left {
        border-right: 1px solid #3F71AE;
        padding-left: 12px;
        border-radius: 8px 0 0 8px;
    }

    .right {
        border-left: 1px solid #3F71AE;
        padding-right: 12px;
        border-radius: 0 8px 8px 0;
    }

    .selected {
        background-color: #3F71AE;
        color: #FFFFFF;
    }
}

.text-index {
    font-size: 20px;
    margin-left: 12px;
    font-weight: bold;
}

.text-disc {
    font-size: 12px;
    color: #7c7c7c;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.board {
    align-items: center;
    display: flex;
    border-radius: 12px;
    background-color: #FFFFFF;
}

.dark-board {
    background-color: #F8F8F8;
}
</style>