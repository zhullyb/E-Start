<template>
	<view class="background">
		<view class="flex-row justify-between items-center head-info">
			<view class="items-center"><image src="/static/exam/clock.png" mode="aspectFit"/>{{ lasttime }} 秒</view>
			<view class="items-center" @tap="open"><image src="/static/exam/submit.png" mode="aspectFit" style="width: 70rpx;height:80rpx;"></image></view>
		</view>
        <view class="slide-area">
            <exam-item :examItem="item" @answ="answ" :total="5" :current="index + 1" currentType="单选"></exam-item>
        </view>
	</view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

const index = ref(0)
const lasttime = ref(120)

const items = [
	{
		id:1,
		type:0,
		topic:'我们学校的校训是？',
		optionJson:[
			"求是创新",
			"厚德健行",
			"笃学力行、守正求新",
			"实事求是，经世致用"
		]
	},
	{
		id:2,
		type:0,
		topic:'我们学校的建校时间是？',
		optionJson:[
			"1897年",
			"1953年",
			"1956年",
			"1986年"
		]
	}
]

const item = computed(() => items[index.value])

const answ = (item: any) => {
    index.value += 1
}

const open = () => {
    uni.navigateTo({
        url: '/pages/tasks/submit'
    })
}

onLoad(() => {
	const timer = setInterval(() => {
		lasttime.value -= 1
		if (lasttime.value <= 0) {
			uni.showToast({
				title: '时间到',
				icon: 'none'
			})
			clearInterval(timer)
			uni.navigateBack()
		}
	}, 1000)
})
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