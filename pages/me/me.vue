<template>
	<view>
		<!-- 未登录，显示Login -->
		<login v-if="userInfo.avatarUrl === undefined"></login>
		<!-- 登录了，显示用户信息 -->
		<userinfo v-else></userinfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import setBadgeMixins from "../../mixins/setTabbarBadge.js"
	export default {
		mixins:[setBadgeMixins],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState("moduleUser",["userInfo"])
		}
	}
</script>

<style lang="scss">

</style>
