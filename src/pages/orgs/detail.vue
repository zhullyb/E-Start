<script setup lang="ts">
import { reqDepartmentList, reqOrganization } from '@/api/orgs';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const buttons = [
    '组织概况',
    '同学评价',
    '招新情况'
]

const selectedItem = ref(0)

const id = ref()
const orgData = ref()
const departmentData = ref()

const applyForIt = () => {
    uni.setClipboardData({
        data: orgData.value.introduction,
        success: () => {
            uni.showToast({
                title: '复制成功',
                icon: 'success'
            })
        }
    })

}

const fetchData = async () => {
    const res = await reqOrganization(id.value)
    if (res.data.code === 0) {
        orgData.value = res.data.data
    } else {
        uni.showToast({
            title: res.data.msg,
            icon: 'none'
        })
    }

    if (orgData.value.category === 1) {
        const res1 = await reqDepartmentList(id.value)
        if (res1.data.code === 0) {
            departmentData.value = res1.data.data
        } else {
            uni.showToast({
                title: res1.data.msg,
                icon: 'none'
            })
        }
    }
}

onLoad(async(option: any) => {
    id.value = option.id
    await fetchData()
    uni.setNavigationBarTitle({
        title: orgData.value.name
    })
})
</script>

<template>
    <view style="margin: 20px;">
        <uni-row
            :gutter="12"
        >
            <uni-col
                :span="8"
                v-for="(button, index) in buttons"
            >
                <button
                    class="es-button"
                    :class="{ selected: selectedItem === index }"
                    @click="selectedItem = index"
                >
                    {{ button }}
                </button>
            </uni-col>
        </uni-row>
        <view v-if="selectedItem === 0">
            <image
                    :src="orgData.pic"
                    mode="aspectFill"
                    style="
                            width: 100%;
                            border-radius: 12px;
                            margin-top: 15px;
                            "
                />
            <text
                style="
                        color: rgb(17, 45, 78);
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 1.5;
                    "
            >
                {{ orgData.introduction }}
            </text>
        </view>
        <view style="height: 88px;"></view>
        <view>
            <button
                class="es-button selected"
                @click="applyForIt"
                style="
                    position: fixed;
                    bottom: 16px;
                    width: calc(100% - 32px);
                "
            >
                招新报名
            </button>
        </view>
    </view>
</template>