<script setup lang="ts">
// import { onLoad } from '@dcloudio/uni-app';
// import { getCurrentInstance, ref } from 'vue';

// const detail = ref();
// const $instance = getCurrentInstance()?.proxy as any
// onLoad(() => {
//     const eventChannel = $instance.getOpenerEventChannel()
//     eventChannel.on('acceptDataFromOpenerPage', (data: any) => {
//         detail.value = data.data
//         console.log(data.data)
//     })
// })

const detail = {
        "id": 3,
        "createdAt": "2024-01-29",
        "updatedAt": "2004-01-29",
        "category": 14,
        "title": "停网公告",
        "source": "信息化办公室",
        "content": "各位师生:\n根据学校《施工停电公告》（具体见https://www.zjut.edu.cn/2024/0129/c4528a254704/page.htm），2024年2月1日至2月28日期间，三校区在停电的相应时间段会出现局部或全局停网现象。信息化办公室将根据实际停电的时间，尽可能实时调整有关UPS和网络设备的运行，最大限度地保证关键应用系统和内部网络的正常运行。\n请各用户做好相应准备，停网给您带来的不便，敬请您理解。如有问题，请联系：88320094（朝晖）、85290091（屏峰）、88813091（莫干山）。",
        "imgs": "http://dummyimage.com/400x400"
    }

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
            >{{ detail.title }}</text>
        </view>
        <view style="margin: 2px 0;">
            <text
                style="
                        color: rgb(17, 45, 78);
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 20px;
                    "
            >来源：{{ detail.source }}</text>
        </view>
        <view style="margin-bottom: 10px;">
            <text
                style="
                        color: rgb(17, 45, 78);
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 20px;
                    "
            >时间：{{ detail.updatedAt }}</text>
        </view>
        <view>
            <text
                selectable
                style="
                        color: rgb(46, 46, 46);
                        font-size: 15px;
                        font-weight: 400;
                        line-height: 25px;
                    "
            >{{ detail.content }}</text>
        </view>
    </view>
</template>