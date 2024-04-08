<template>
	<view class="background">
		<view class="flex-row justify-between items-center head-info">
			<view class="items-center"><image src="/static/exam/clock.png" mode="aspectFit"/>02:00</view>
			<view class="items-center" @tap="open"><image src="/static/exam/submit.png" mode="aspectFit" style="width: 70rpx;height:80rpx;"></image></view>
		</view>
        <view class="slide-area">
            <exam-item :examItem="item" @answ="answ" :total="5" :current="1" currentType="单选" :oneAnswer="oneAnswer"></exam-item>
        </view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const item = {
    id:1,
    type:0,
    topic:'浙江工业大学的校训是？',
    optionJson:[
        "厚德载物",
        "厚德健行",
        "取精用宏",
        "博大精深"
    ]
}

const answ = (item: any) => {
    console.log("answ", item)
}

const oneAnswer = computed(() => {
    return {
        value: 'B',
        id: 1
    }
})


const open = () => {
    uni.navigateTo({
        url: '/pages/tasks/submit'
    })
}

</script>

<style lang="scss" scoped>
	.background{
		background-color: #fff;
		width: 100vw;
		padding-top: 1rpx;
		box-sizing: border-box;
		
		.head-info{
			background-color: #f7f7f7;
			box-sizing: border-box;
			padding: 20rpx 40rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.items-center{
				display: flex;
				align-items: center;
			}
			
			image{
				width: 60rpx;
				height: 60rpx;
			}
			.head-current{
				font-size: 40rpx;
				color: #333333;
				text-align: right;
				font-weight: 500;
			}
			.head-total{
				font-size: 28rpx;
				color: #C4C8D8;
				font-weight: 300;
			}
			
			.ques-type{
				height: 17px;
				background: rgba(87,118,243,0.10);
				border-radius: 85px;
			}
		}
		
		.slide-area{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.topic-box{
				width: 80%;
				height: 900rpx;
				background-color: #fff;
				border: 10rpx solid black;
			}
		}
	}
	
	@keyframes toRight {
	  0% { opacity: 1; transform:translateX(-100%)}
	  50%{ opacity: 1; transform:translateX(0)}
	  100%{ opacity: 1; transform:translateX(0)}
	}
	.toRight {
	  animation-name: toRight;
	  animation-duration: 1.3s;
	  animation-timing-function: ease-in-out;
	}
	
	@keyframes toLeft {
		0% { opacity: 1; transform:translateX(100%)}
		50%{ opacity: 1; transform:translateX(0)}
		100%{ opacity: 1; transform:translateX(0)}
	}
	.toLeft {
	  animation-name: toLeft;
	  animation-duration: 1.3s;
	  animation-timing-function: ease-in-out;
	}
</style>