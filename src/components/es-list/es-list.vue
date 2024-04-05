<script setup lang="ts">
const props = defineProps({
    list: Array<{
        id: number
        title: string
        img: string
        intro: string
    }>
})
</script>

<template>
    <view v-for="item in list">
        <view 
            @click="$emit('click', item.id)"
            style="background-color: #FFFFFF;
                border-radius: 16px; margin: 10px;
                display: flex; align-items: center;">
            <image
                :src="item.img"
                mode="scaleToFill"
                style="height: 100px; width: 100px;
                        border-radius: 8px; border: 2px solid #F7924A;
                        margin: 12px;"
            />
            <view style="margin: 12px; width: calc(100% - 124px);">
                <view style="font-size: 16px; font-weight: bold;">{{ item.title }}</view>
                <view class="text-distro">{{ item.intro }}</view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.text-distro {
    font-size: 14px;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>