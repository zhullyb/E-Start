<script setup lang="ts">
const maps = [
    {
        "campus": "朝晖校区",
        "map": "https://bu.dusays.com/2024/04/01/660a1a805340e.webp",
        "map-hd": "https://bu.dusays.com/2024/03/31/660851ab3d48d.webp"
    },
    {
        "campus": "屏峰校区",
        "map": "https://bu.dusays.com/2024/04/01/660a1a20c15e8.webp",
        "map-hd": "https://bu.dusays.com/2024/03/31/660852597902e.webp"
    }
]

const previewMap = (item: any) => {
    uni.previewImage({
        urls: [item['map-hd']]
    })
}
</script>

<template>
    <view style="margin: 20px;">
        <view v-for="item in maps">
            <view class="title-font">{{ item.campus }}</view>
            <image
                :src="item.map"
                mode="widthFix"
                style="width: 100%;"
                @click="previewMap(item)"
            />
        </view>
    </view>
</template>

<style scoped>
.title-font {
    font-size: 24px;
    font-weight: 700;
    color: #112D4E;
    margin: 10px 0;
}
</style>