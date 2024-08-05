<script setup lang="ts">

const detail = [
    {
        id: 1,
        name: 'E小新',
        college: '计算机科学与技术学院、软件学院',
        class: '计算机类2401班',
        phone: '19857314625'
    },
    {
        id: 2,
        name: '严风树',
        college: '计算机科学与技术学院、软件学院',
        class: '计算机类2401班',
        phone: '19957317546'
    },
    {
        id: 3,
        name: '袁鸣',
        college: '计算机科学与技术学院、软件学院',
        class: '计算机类2401班',
        phone: '13750871463'
    },
    {
        id: 4,
        name: '刘大海',
        college: '计算机科学与技术学院、软件学院',
        class: '计算机类2401班',
        phone: '19857311392'
    }
]

</script>

<template>
<view style="margin: 20px;">
    <view v-for="i in 4">
        <view class="roommate-card">
            <view style="display: flex; margin-bottom: 20px;">
                <text class="text-title" style="margin: auto 4px auto 0;">{{ detail[i - 1].name }}</text>
                <text class="tag" style="margin: auto auto 0 4px;">{{ i }} 号床</text>
            </view>
            <view>
                <view style="display: flex; justify-content: space-between;">
                    <text class="text-2nd-title">联系方式</text>
                    <text class="text-desc">{{ detail[i - 1].phone }}</text>
                </view>
                <view style="display: flex; justify-content: space-between;">
                    <text class="text-2nd-title">学院</text>
                    <text class="text-desc">计算机科学与技术学院、软件学院</text>
                </view>
                <view style="display: flex; justify-content: space-between;">
                    <text class="text-2nd-title">班级</text>
                    <text class="text-desc">计算机类2401班</text>
                </view>
            </view>
        </view>
    </view>
    <view style="height: 20vh;"></view>
</view>
</template>

<style>
page {
    background-color: #F8F8F8;
}
</style>

<style scoped>
.text-title {
    color: #3F71AE;
    font-size: 24px;
    font-weight: 900;
}

.text-2nd-title {
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
}

.text-desc {
    color: #949AA9;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
}

.roommate-card {
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    background-color: #FFFFFF;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.tag {
    background-color: #FFFFFF;
    color: #3F71AE;
    border-radius: 12px;
    border: 1px dotted #3F71AE;
    font-size: 10px;
    margin-left: 4px;
    padding: 4px 8px;
}
</style>