<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { reqInfo, updInfo } from '@/api/user';

const username = ref<string>('')
const signature = ref<string>('')

const info = ref<any>({
    avatar: 'https://bu.dusays.com/2024/04/14/661adb9d5972a.webp'
})

const changeAvatar = () => {
    uni.chooseImage({
        count: 1,
        success: function (res) {
            info.value.avatar = res.tempFilePaths[0]
        }
    })
}

const save = async() => {
    uni.uploadFile({
        url: 'https://api.lonesome.cn/api/wx/upload',
        filePath: info.value.avatar,
        name: 'file',
        header: {
            'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
        },
        success: async(res) => {
            info.value.avatar = JSON.parse(res.data).data
            const data = {
                avatar: info.value.avatar,
                hobby: info.value.hobby,
                signature: signature.value,
                username: username.value
            }
            const res1 = await updInfo(data)
            if (res1.data.code === 0) {
                uni.showToast({
                    title: '保存成功'
                })
            } else {
                uni.showToast({
                    title: res1.data.msg,
                    icon: 'none'
                })
            }
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

const fetchData = async() => {
    const res = await reqInfo()
    uni.setStorageSync('avatar', info.value?.avatar)
    if (res.data.code === 0) {
        info.value = res.data.data
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }
}

onLoad(async() => {
    await fetchData()
    username.value = info.value.username
    signature.value = info.value.signature
})
</script>

<template>
    <view>
        <view style="display: flex; height: 40vh;">
            <image
                :src="info.avatar"
                mode="scaleToFill"
                @click="changeAvatar"
                style="
                    margin: auto;
                    height: 160px;
                    width: 160px;
                    border-radius: 50%;
                    border: 2px dotted #3F71AE;
                "
            />
        </view>
        <view style="margin: 20px;">
            <view style="display: flex;">
                <text class="title">昵称</text>
                <uni-easyinput
                    v-model="username"
                    type="text"
                    @confirm=""
                />
            </view>
            <view style="height: 20px;"></view>
            <view style="display: flex;">
                <text class="title">个性签名</text>
                <uni-easyinput
                    v-model="signature"
                    type="text"
                    @confirm=""
                />
            </view>
        </view>
        <view style="height: 20vh; display: flex;">
            <button
                class="es-button selected"
                @click="save"
                style="
                    width: 40%;
                    margin: auto;
                "
            >
                保存
            </button>
        </view>
    </view>
</template>

<style scoped>
.title {
    font-size: 16px;
    width: 80px;
    min-width: 80px;
    text-align: center;
    margin: auto 0;
}
</style>