export default {
	namespaced:true,
	state:{
		userInfo:JSON.parse(uni.getStorageSync("userinfo") || "{}"),
		token:"" //登录成功后的加密字符串（验证登录状态/权限）
	},
	mutations:{
		//设置用户的基本信息
		undateUserInfo(state,userInfo){
			state.userInfo = userInfo;//赋值给vuex里的userInfo
			uni.setStorageSync("userInfo",JSON.stringify(state.userInfo))//存本地
		},
		undateToken(state,token){
			state.token = token;
			uni.setStorageSync('token',JSON.stringify(state.token))
		},
	},
	getters:{ //计算属性，依赖state来做运算并返回结果。 （要有返回值）
		
	}	
}