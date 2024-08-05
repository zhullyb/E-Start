<template>
	<view class="background">
		<view class="flex-row justify-between items-center head-info">
			<view class="items-center" @tap="open"><image src="/static/exam/submit.png" mode="aspectFit" style="width: 70rpx;height:80rpx;"></image></view>
		</view>
        <view class="slide-area">
            <exam-item :examItem="item" @answ="answ" :total="5" :current="index + 1" currentType="住宿习惯调查问卷"></exam-item>
        </view>
	</view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const index = ref(0)

const items = [
	{
		id:1,
		type:0,
		topic:'省份',
		optionJson:[
			"省内",
			"省外"
		]
	},
	{
		id:2,
		type:0,
		topic:'起床时间',
		optionJson:[
			"较早",
			"正常",
			"较晚"
		]
	},
	{
		id:3,
		type:0,
		topic: '睡觉时间',
		optionJson:[
			"较早",
			"正常",
			"较晚"
		]
	},
	{
		id:4,
		type:0,
		topic: '爱好偏向',
		optionJson:[
			"偏静",
			"不确定",
			"偏动"
		]
	},
	{
		id:5,
		type:0,
		topic: '社交偏向',
		optionJson:[
			"社恐",
			"不确定",
			"社牛"
		]
	}
]

const item = computed(() => items[index.value])

const answ = async (item: any) => {
	console.log(item)
	console.log(index.value)
	if (index.value < 4) {
		index.value += 1
	} else {
	 	uni.showToast({
			title: '填写完成',
			icon: 'success'
		})
		// sleep 1s
		await new Promise(resolve => setTimeout(resolve, 1000))
		uni.switchTab({ url: '/pages/index/index' })
	}
}

const open = () => {
	uni.showToast({
		title: '填写完成',
		icon: 'success'
	})
    uni.switchTab({ url: '/pages/index/index' })
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