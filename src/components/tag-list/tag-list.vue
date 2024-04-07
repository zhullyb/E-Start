<template>
	<view class="tag-list">
		<view class="tag-item" :class="getStyle(item[this.tabValueName])" v-for="(item, index) in tagList"
			:key="item[this.tabValueName]" @click="handleSelectTag(item, index)">
			{{ item[this.tagShowName] }}
			<uni-icons v-if="this.type == 'delete'" class="delete-icon" type="clear" size="33rpx"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//选中tag列表
			selectedTagList: {
				type: Array,
				default: [],
			},
			tabValueName: {
				type: String,
				default: "_id",
			},
			//显示tag名称字段
			tagShowName: {
				type: String,
				default: "category",
			},
			//展示tag列表
			tagList: {
				type: Array,
				default: [],
			},
			//tag类型：delete【可删除tag，无法选中】
			type: {
				type: String,
				default: "",
			},
			//限制tag选中个数
			limit: {
				type: Number,
				default: 1,
			},
			// 标签大小 normal | small
			size: {
				type: String,
				default: 'normal',
			},
			// 显示类型 normal | round | hollow
			showType: {
				type: String,
				default: 'normal',
			},
		},
		methods: {
			/**
			 * 获取tag的样式
			 */
			getStyle(_id) {
				return {
					seleted: this.getIndexSeleted(_id) !== -1,
					small: this.size === 'small',
					[this.showType]: this.showType,
					[this.type]: this.type,
				};
			},
			/**
			 * @param {Object} item 点击tag的每一项
			 * @param {Object} index 索引
			 */
			handleSelectTag(item, index) {
				if (this.type == "delete") {
					this.$emit("delete", {
						item,
						index
					});
					return;
				}
				let selectedTagList = JSON.parse(JSON.stringify(this.selectedTagList));
				const indexSelected = this.getIndexSeleted(item[this.tabValueName]);
				if (indexSelected !== -1) {
					selectedTagList.splice(indexSelected, 1);
				} else if (this.limit == 1) {
					selectedTagList = [item];
				} else if (this.selectedTagList.length == this.limit) {
					uni.showToast({
						title: `最多能选择${this.limit}个标签`,
						icon: "none",
					});
				} else {
					selectedTagList.push(item);
				}
				this.$emit("select", selectedTagList);
			},
			/**
			 * 获取tag的选中索引
			 */
			getIndexSeleted(_id) {
				return this.selectedTagList.findIndex((item) => item[this.tabValueName] == _id);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.tag-list {
		display: flex;
		flex-wrap: wrap;

		.tag-item {
			color: #333;
			font-size: 26rpx;
			background: rgba(247, 247, 247, 1);
			padding: 8rpx 28rpx;
			border-radius: 8rpx;
			margin: 0 20rpx 20rpx 0;
			position: relative;

			&.small {
				padding: 2rpx 8rpx;
				font-size: 24rpx;
				border-radius: 4rpx;

				.delete-icon {
					top: -12rpx;
					right: -12rpx;
					font-size: 26rpx !important;
				}
			}

			&.round {
				border-radius: 24rpx;
			}

			&.hollow {
				background: transparent;
				border: 1px solid rgba(247, 247, 247, 1);
			}

			&.seleted {
				background: linear-gradient(to right, #feef3c, #f3cd34);
			}

			.delete-icon {
				position: absolute;
				top: -16rpx;
				right: -16rpx;
			}
		}
	}
</style>