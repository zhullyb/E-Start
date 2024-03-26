<script setup lang="ts">
import { reqReview, updTaskStage } from '@/api/tasks';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const needReview = ref(false)

const title = "上传图片"
const pic = ref('')
const loc =ref('')
const needFace = ref(false)
const handleUpload = () => {
    needReview.value = false
    uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'back',
        success: (res) => {
            uni.uploadFile({
                url: 'https://api.lonesome.cn/api/wx/upload',
                filePath: res.tempFiles[0].tempFilePath,
                name: 'file',
                header: {
                    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
                },
                success: (res) => {
                    pic.value = JSON.parse(res.data).data
                    uni.showToast({
                        title: '上传成功'
                    })
                },
                fail: (res) => {
                    uni.showToast({
                        title: '上传失败',
                        icon: 'none'
                    })
                    console.log(res)
                }
            })
        }
    })
}

const handleSubmit = () => {
    if (!needReview.value){
        submitValidate()
    } else {
        submitReview()
    }
}

const submitValidate = async () => {
    if (pic.value === ''){
        uni.showToast({
            title: '请先上传照片',
            icon: 'none'
        })
        return
    }
    const res = await updTaskStage({
        pic: pic.value,
        // 如果 loc 为空，则不传入 loc
        ...(loc.value && { loc: loc.value })
    })
    if (res.status !== 200 && res.data.code !== 0){
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
        needReview.value = true
        return
    }
    uni.navigateTo({
        url: '/pages/tasks/validateSuccess'
    })
}

const submitReview = async() => {
    const res = await reqReview({
        pic: pic.value,
        loc: loc.value
    })
    if (res.status !== 200 && res.data.code !== 0){
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
        return
    }
    uni.navigateTo({
        url: '/pages/tasks/validateSuccess'
    })
}

onLoad((options:any) => {
    loc.value = options.loc
    needFace.value = options.needFace
})
</script>

<template>
    <view class="center">
        <view class="es-text-title">{{ title }}</view>
        <view class="es-text-desc">请按要求上传照片</view>
        <view id="photo-container">
            <image
                :src="pic"
                mode="scaleToFill"
                style="width: 100%;height: 100%;"
            />
        </view>
        <button 
            class="es-button"
            @click="handleUpload"
            style="width: 90vw;"
        >上传照片</button>
        <view
            class="es-text-desc"
            v-show="needFace"
            style="color: rgb(226, 59, 59);"
        >*照片中应当出现人脸</view>
        <button
            class="es-button selected"
            @click="handleSubmit"
            style="
                    width: 90vw;
                    margin-top: 16px;
                    margin-bottom: 15vh;
        ">{{ !needReview ? '提交验证':'人工审核' }}</button>
        
    </view>
</template>

<style>
page {
    position: relative;
    height: 100%;
}
</style>

<style scoped>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.es-text-title {
    color: rgb(55, 56, 110);
    font-size: 24px;
    font-weight: 900;
    line-height: 32px;
}

.es-text-desc {
    color: rgb(148, 154, 169);
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
}

#photo-container {
    border: 1px dashed rgb(184, 184, 210);
    width: 165px;
    height: 165px;
    margin: 20vw auto;
}
</style>