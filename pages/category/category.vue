<template>
	<view>
		<navigator url="../../subPackages/search/search" >
			<search></search>
		</navigator>
		<view class="scroll-view-wrap">
			<scroll-view scroll-y="true"  class="l-scroll-view" :style="{height: windowH+'px'}">
				<block v-for="(item,i) in categoryList" :key="i">
					<view class="l-scroll-item"  @click="clickChange(i)" :class="i===active?'active':''">
						{{item.cate_name}}
					</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y="true"  class="r-scroll-view" :style="{height: windowH+'px'}" :scroll-top="scrollTop">
				<view  class="level2-nav" v-for="(item2, i2) in categoryLevel2" :key="i2">
					<view class="level2-nav-title">{{item2.cate_name}}</view>
					<view class="level3-img-list">
						<view class="level3-img-item" v-for="(item3, i3) in item2.children" :key="i3"  @click="goGoodsList(item3.cate_name)">
							<image :src="item3.cate_icon"></image>
							<text>{{item3.cate_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import setBadgeMixins from "../../mixins/setTabbarBadge.js"
	export default {
		mixins:[setBadgeMixins],
		data() {
			return {
				windowH:0,
				categoryList:[],
				scrollTop:0,
				active:0,
				categoryLevel2:[],
			};
		},
		methods:{
			getcategoryList(){
				uni.$http.get("/api/categories/catedata")
				.then((res)=>{
					if(res.statusCode != 200) return uni.$showMsg("分类数据请求失败");
					this.categoryList = res.data.message;
					this.categoryLevel2 = this.categoryList[0].children;
				})
			},
			clickChange(i){
				this.active = i;
				//点击一级分类的item，取到对应项的children
				this.categoryLevel2 = this.categoryList[i].children;
				//点击切换1级分类时，右侧区域的滚动距离回到顶部0/-1的位置
				this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			},
			goGoodsList(cate_name){
				uni.navigateTo({
					url:"/subPackages/goodsList/goodsList?query="+cate_name
				})
			},
		},
		onLoad() {
			this.windowH = uni.getSystemInfoSync().windowHeight - 50;
			this.getcategoryList()
		}
	}
</script>

<style lang="scss">
	.scroll-view-wrap{
		display:flex;
		.l-scroll-view{
			width: 120px;
			background-color: #ffae73;
			.l-scroll-item{
				line-height: 60px;
				text-align: center;
				font-size: 12px;
				background-color: #f7f7f7;
				
			}
			.l-scroll-item.active{
				background-color: #fff;
				color: #f00;
			}
		}
		.r-scroll-view{
			.level2-nav-title{
				padding: 15px;
				font-size: 12px;
				font-weight: bold;
			}
			.level3-img-list{
				display: flex;
				flex-wrap: wrap;
				.level3-img-item{
					display: flex;
					margin-bottom: 16rpx;
					flex-wrap: wrap;
					flex-direction: column;
					align-items: center;
					width: 33%;
					image{
						width: 60px;
						height: 60px;
					}
					text{
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
