<template>
	<view class="search-content">
		<view class="text-area">
			<uni-search-bar v-model="searchValue" :radius="20" class="search-input" placeholder="搜索" bgColor="#F1F1F1"
				@confirm="search" @cancel="cancel" />
		</view>
		<view class="search-title" v-if="localSearchList.length">
			<view class="title">
				<view class="text">
					搜索历史
				</view>
				<uni-icons @click="handleOnDelete" class="icon" type="trash"></uni-icons>
			</view>
			<tag-list :tabValueName="tabValueName" :tagShowName="tagShowName" :type="type" :tagList="localSearchList"
				@delete="handleDelete" @select="handleSelectTag" />
		</view>
		<view class="search-title" v-if="recommendList.length">
			<view class="title">
				<view class="text">
					搜索推荐
				</view>
				<uni-icons @click="handleRecommend" class="icon" type="reload"></uni-icons>
			</view>
			<tag-list :tabValueName="tabValueName" :tagShowName="recommendTabShowName" :tagList="recommendList"
				@select="handleSelectRecommendTag" />
		</view>
	</view>
</template>

<script>
	const localSearchListKey = '__local_search_history'
	export default {
		props: {
			maxSearchListLength: {
				type: Number,
				default: 10
			},
			recommendList: {
				type: Array,
				default: []
			},
			recommendTabShowName: {
				type: String,
				default: 'label'
			},
			recommendTabValueName: {
				type: String,
				default: 'value'
			}
		},
		data() {
			return {
				searchValue: '',
				localSearchList: uni.getStorageSync(localSearchListKey) || [],
				tabValueName: '_createTime',
				tagShowName: 'value',
				type: '', // delete【右上角出删除图标，无法选中，点击图标回调@delete】
			}
		},
		created() {},
		methods: {
			search(search) {
				if (search.value) {
					const findIndex = this.localSearchList.findIndex(item => item.value === search.value)
					if (findIndex !== -1) this.localSearchList.splice(findIndex, 1)
					if (this.localSearchList.length >= this.maxSearchListLength) this.localSearchList.pop()
					this.localSearchList.unshift({
						_createTime: new Date().getTime(),
						value: search.value
					})
					this.updateLocalStorage()
				}
				this.$emit('search', search.value)
			},
			/**
			 * 点击取消
			 */
			cancel(){
				this.$emit('cancel')
			},
			/**
			 * 点击删除按钮切换删除模式
			 */
			handleOnDelete() {
				if (!this.type) this.type = 'delete'
				else this.type = ''
			},
			/**
			 * 选中、取消标签
			 */
			handleSelectTag(seletedTagList) {
				const selectItem = seletedTagList[0]
				this.searchValue = selectItem.value
				this.$emit('search', this.searchValue, selectItem)
			},
			/**
			 * 选中推荐标签
			 */
			handleSelectRecommendTag(seletedTagList) {
				const selectItem = seletedTagList[0]
				this.searchValue = selectItem[this.recommendTabShowName]
				this.$emit('search', this.searchValue, seletedTagList[0])
			},
			/**
			 * 点击删除标签回调
			 */
			handleDelete(data) {
				const {
					item,
					index
				} = data
				this.localSearchList.splice(index, 1)
				this.updateLocalStorage()
			},
			/**
			 * 点击更换推荐
			 */
			handleRecommend() {
				this.$emit('recommend')
			},
			/**
			 * 更新缓存
			 */
			updateLocalStorage() {
				uni.setStorageSync(localSearchListKey, this.localSearchList)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-content {
		color: #333;
		font-size: 28rpx;
		background: rgb(251, 251, 251);
		padding: 25rpx 0;

		.text-area {
			margin: 0 auto 0;
			width: 720rpx;
			height: 70rpx;
			border-radius: 60rpx;
			display: flex;
			align-items: center;

			.search-input {
				width: 100%;
			}
		}

		.search-title {
			padding: 34rpx 15rpx 0rpx 30rpx;

			.title {
				display: flex;
				justify-content: space-between;
				font-weight: 500;
				font-size: 30rpx;
				margin-bottom: 34rpx;

				.icon {
					font-size: 42rpx !important;
				}
			}
		}
	}
</style>