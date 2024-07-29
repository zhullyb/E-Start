<script setup lang="ts">
import { ref } from 'vue';
import { reqChat } from '@/api/aichat';

const input = ref('')
const dialogs = ref<Array<{question: string, answer: string}>>([])

const send = async() => {
    dialogs.value.push({question: input.value, answer: ''})
    input.value = ''

    const timer = setInterval(() => {
        if (dialogs.value[dialogs.value.length - 1].answer.length >= 3) {
            dialogs.value[dialogs.value.length - 1].answer = '.'
        } else {
            dialogs.value[dialogs.value.length - 1].answer += '.'
        }
    }, 1000)

    const question = dialogs.value[dialogs.value.length - 1].question

    const res = await reqChat(dialogs.value[dialogs.value.length - 1].question)

    clearInterval(timer)

    if (res.data.code === 0) {
        dialogs.value[dialogs.value.length - 1].answer = res.data.data.answer
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
}
</script>

<template>
<view style="display: flex; flex-wrap: wrap; height: 100vh;">
    <view class="bottom" style="min-width: 100vw;">
        <view v-for ="dialog in dialogs">
            <view class="message mine">
                    {{ dialog.question }}
            </view>
            <view class="message">
                {{ dialog.answer }}
            </view>
        </view>
        <view style="margin: auto; display: flex; width: 90vw;">  
            <uni-easyinput
                v-model="input"
                type="text"
                placeholder="请输入内容"
                id="input"
                @confirm=""
                adjustPosition
                cursorSpacing="10"
            />
            <view id="send-icon">
                <uni-icons
                    type="paperplane"
                    color=""
                    size="24"
                    style="margin: auto;"
                    @click="send"
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
    margin: 20px 20px 20px auto;
}

.bottom {
    margin: auto auto 20px auto;
    width: 100%;
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