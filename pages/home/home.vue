<template>
	<view>
	<!-- 点击跳转到分包中的搜索页面 -->
		<navigator class="search" url="../../subPackages/search/search" >
			<search></search>
		</navigator>
		<swiper :indicator-dots = "true" :autoplay = "true"  interval="3000" duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key = "index">
				<navigator class="swiper-item" :url="`../../subPackages/goodsDetail/goodsDetail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="grid-wrap">
			<view class="grid-item" v-for="(item,index) in navList" :key = "index">
				<image :src="item.image_src"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="floor-wrap">
			<view class="floor-item" v-for="(item,index) in floordata" :key = "index">
				<image :src="item.floor_title.image_src" mode="widthFix" ></image>
				<view class="img-box">
					<view class="l-box">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</view>
					<view class="r-box">
						<view v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}"  mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import setBadgeMixins from "../../mixins/setTabbarBadge.js"
	export default {
		mixins:[setBadgeMixins],
		data() {
			return {
				swiperList:[],
				navList:[],
				floordata:[]
			};
		},
		methods:{
			getSwiperList(){
				uni.$http.get('/api/home/swiperdata')
				.then((res)=>{
					if(res.statusCode != 200)return uni.$showMsg('数据请求失败');
					this.swiperList = res.data.message
					// console.log(this.swiperList);
				})
			},
			getNavData(){
				uni.$http.get('/api/home/catenav')
				.then((res)=>{
					if(res.statusCode != 200)return uni.$showMsg('数据请求失败');
					this.navList = res.data.message
				})
			},
			getFloorData(){
				uni.$http.get('/api/home/floordata')
				.then((res)=>{
					if(res.statusCode != 200)return uni.$showMsg('数据请求失败');
					this.floordata = res.data.message;
				})	
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavData();
			this.getFloorData()
		}
	}
</script>

<style lang="scss">
	.search{
		//吸顶
		position: sticky;
		top:0;
		z-index: 999;
	}
	swiper{
		height: 330rpx;
		.swiper-item,
		image{
			width: 100%;
			height: 100%;
		}
	}
	.grid-wrap{
			display: flex;
			margin: 15rpx 0;
			flex-wrap: wrap;
		.grid-item{
			display: flex;
			width: 20%;
			height: 150rpx;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		image{
				width: 60rpx;
				height: 60rpx;
			}
			text{
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.floor-item{
		.img-box{
			display: flex;
		}
		.r-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>
