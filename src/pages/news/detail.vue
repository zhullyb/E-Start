<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getCurrentInstance, ref } from 'vue';
import type { news } from '../../types/news';

const detail = ref<news>();
const $instance = getCurrentInstance()?.proxy as any
onLoad(() => {
    const eventChannel = $instance.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data: {data: news}) => {
        detail.value = data.data
        detail.value.updatedAt = data.data.updatedAt.slice(0, 10)
    })
})

</script>

<template>
    <view style="margin: 16px;">
        <view style="margin: 8px 0;">
            <text
                style="
                        color: rgb(17, 45, 78);
                        font-size: 17px;
                        font-weight: 400;
                        line-height: 23.8px;
                    "
            >{{ detail?.title }}</text>
        </view>
        <view style="margin: 2px 0;">
            <text
                style="
                        color: rgb(17, 45, 78);
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 20px;
                    "
            >来源：{{ detail?.source }}</text>
        </view>
        <view style="margin-bottom: 10px;">
            <text
                style="
                        color: rgb(17, 45, 78);
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 20px;
                    "
            >时间：{{ detail?.updatedAt }}</text>
        </view>
        <view>
            <text
                selectable
                style="
                        color: rgb(46, 46, 46);
                        font-size: 15px;
                        font-weight: 400;
                        line-height: 25px;
                        word-wrap: break-word;
                    "
            >{{ detail?.content }}</text>
        </view>
    </view>
</template>../../types/newa