<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
import map from "@/static/map.json"

const selectedButton = ref(0)
const selectedValue = ref("")

const campus = [
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

const campusSelected = computed(() => {
    return campus[selectedButton.value]
})

const previewMap = (item: any) => {
    uni.previewImage({
        urls: [item['map-hd']]
    })
}


const candidates = computed(() => {
    return map.map((item: any) => item['name'])
})

const position = computed(() => {
    return map.find((item: any) => item['name'] === selectedValue.value) || {
        id: 0,
        name: "",
        x: 0,
        y: 0
    }
})

const label = computed(() => {
    switch (selectedButton.value) {
        case 0:
            return "朝晖校区"
        case 1:
            return "屏峰校区"
        default:
            return ""
    }
})

const goto = () => {
    uni.openLocation({
        longitude: position.value['x'],
        latitude: position.value['y'],
        name: position.value['name']
    })
}

onLoad(()=>{
    console.log(map)
})

</script>

<template>
    <view style="margin: 20px;">
        <uni-row
            :gutter="12"
        >
            <uni-col
                :span="24/campus.length"
                v-for="(button, index) in campus"
            >
                <button
                    class="es-button"
                    :class="{ selected: selectedButton === index }"
                    @click="selectedButton = index"
                    style="margin: 12px 0;"
                >
                    {{ button.campus }}
                </button>
            </uni-col>
        </uni-row>
        <uni-combox
            v-model="selectedValue"
            :label="label"
            placeholder=""
            :candidates="candidates"
        />
        <view>
            <image
                :src="campusSelected.map"
                mode="scaleToFill"
                @click="previewMap(campusSelected)"
                style="width: 100%; margin: 12px 0;"
            />
        </view>
        <view class="title-font">{{ selectedValue }}</view>
        <view class="text-desc">
            朝晖校区学生上课地点主要集中于子良楼、新教楼（协同大楼）、文荟楼。朝晖校区共有三个食堂，分别是处于尚德园的精弘食堂、毓秀堂，和处于梦溪村后的博文园。体育活动场所游泳馆、体育馆、操场、篮球场等位于校区西南角。复印店、水果店、超市等集中于综合楼附近。快递站位于梦溪村四号楼（部分快递收货地址可能在梦七地下室或浙工大东南门，请同学们根据短信自行判断）。
        </view>
        <view>
            <view style="height: 88px;"></view>
            <button
                class="es-button selected"
                @click="goto"
                style="
                    position: fixed;
                    bottom: 16px;
                    width: calc(100% - 32px);
                    "
            >导航去这里</button>
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

.text-desc {
    font-size: 18px;
    font-weight: 400;
    color: #112D4E;
    line-height: 24px;
}
</style>