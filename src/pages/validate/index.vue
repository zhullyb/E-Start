<script setup lang="ts">
import { reactive } from 'vue';
import { reqVerify } from '@/api/user';
const validateInfo = reactive({
    name: '',
    idCard: '',
    admissionLetterId: '',
    facePic: ''
})
const doChooseMedia = () => {
    // #ifdef MP-WEIXIN
    uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'front',
        success: (res) => {
            uni.uploadFile({
                url: 'https://api.lonesome.cn/api/wx/upload',
                filePath: res.tempFiles[0].tempFilePath,
                name: 'file',
                header: {
                    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
                },
                success: (res) => {
                    validateInfo.facePic = JSON.parse(res.data).data
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
    // #endif
    // #ifndef MP-WEIXIN
    uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            console.log(res)
            validateInfo.facePic = 'not_null'
        }
    })
    // #endif
}

const doValidate = async () => {
    if (validateInfo.name === '' || validateInfo.idCard === '' || validateInfo.admissionLetterId === '') {
        uni.showToast({
            title: '请填写完整信息',
            icon: 'none'
        })
        return
    }

    if (validateInfo.facePic === '') {
        uni.showToast({
            title: '请先上传人脸照片',
            icon: 'none'
        })
        return
    }

    const result = await reqVerify(validateInfo);
    if (result.data.code !== 0) {
        uni.showToast({
            title: result.data.msg,
            icon: 'none'
        })
        return
    }
    uni.reLaunch({ url: '/pages/validate/success' })
}
</script>
<template>
    <view class="center">
        <view
            style="padding: 20px;"
        >
            <view>
                <text style="
                        color: rgb(17, 45, 78);
                        font-size: 24px;
                        font-weight: 700;
                        line-height: 32px;
                        "
                >验证身份</text>
            </view>
            <view style="height: 2vh;"></view>
            <view>
                <text style="
                                color: rgb(17, 45, 78);
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 20px;
                            "
                >请输入以下信息以验证您的新生身份</text>
            </view>
        </view>
    
        <view style="display: flex; justify-content: center; padding-top: 20px;">
            <view
                style="
                border-color: grey;
                border-width: 1px;
                border-radius: 10px;
                margin-bottom: 30px;
                "
            >   
                <view
                    style="
                    padding: 10px;
                    width: 80vw;
                    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
                    "
                >
                    <input placeholder="姓名" v-model="validateInfo.name" />
                    <input placeholder="身份证号" v-model="validateInfo.idCard" />
                    <input placeholder="录取通知书编号" v-model="validateInfo.admissionLetterId" />
                </view>
            </view>
    
        </view>
        <button
            hover-class="button-hover"
            @click="doChooseMedia"
            class="es-button"
            style="
                    width: 88vw;
                    margin-bottom: 20px;
                "
        >
            上传人脸照片
        </button>

        <button
            hover-class="button-hover"
            @click="doValidate"
            class="es-button selected"
            style="
                width: 88vw;
                margin-bottom: 15vh;
            "
        >
            验证
        </button>
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

input {
    padding: 15px;
    color: rgb(152, 162, 179);
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
}
</style>