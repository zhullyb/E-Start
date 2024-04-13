<script setup lang="ts">
import { ref } from 'vue';

const input = ref('')
</script>

<template>
<view>
    <view class="message mine">
            好转专业吗？转专业方不方便？
    </view>
    <view class="message">
        分两种情况，普通生转专业：学生（中外合作办学专业学生除外）在第二、三、四学期，可在全校范围内申请转专业。中外合作办学专业学生若第一学年平均学分绩点列专业前 2%且无不及格课程，在第二学年初可在全校范围内申请转专业。
特长生转专业：学生在某一专业上有明显专长，并已取得相应成果，且课程平均绩点在 2.0（含）以上，可在第二、三、四学期申请转专业，申请专业应为其特长专业。
    </view>
    <view style="height: 100px;"></view>
    <view class="bottom">
        <view style="margin: auto; display: flex; width: 90vw;">  
            <uni-easyinput
                v-model="input"
                type="text"
                placeholder="请输入内容"
                id="input"
                @confirm=""
            />
            <view id="send-icon">
                <uni-icons
                    type="paperplane"
                    color=""
                    size="24"
                    style="margin: auto;"
                />
            </view>
        </view>
    </view>
</view>
</template>

<style scoped>
.message {
    width: fit-content;
    border-radius: 10px;
    background-color: white;
    padding: 12px;
    font-size: 16px;
    display: grid;
    word-break: break-word;
    white-space: pre-wrap;
    margin: 20px auto 20px 20px;
    max-width: 70vw;
}

.message.mine {
    color: white;
    background: #3F72AF;
    margin: 12px 12px 12px auto;
}

.bottom {
    position: fixed;
    bottom: 20px;
    width: 100%;
    display: flex;
}

#input {
    width: 80vw;
}

#send-icon {
    color: #FFFFFF;
    background-color: #3F72AF;
    margin: auto 0 auto 8px;
    border-radius: 4px;
    width: 35px;
    height: 35px;
    display: flex;
}
</style>

<style>
page {
    background-color: #F9FAFB;
}
</style>