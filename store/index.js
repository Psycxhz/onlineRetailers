import Vue from "vue"
import Vuex from "vuex"
import moduleCart from "./cart.js"
import moduleUser from "./user.js"

//将vuex挂载到Vue上
Vue.use(Vuex);
//创建store实例对象，并将其挂载到store上
const store = new Vuex.Store({
	//写入模块,
	modules:{
		moduleCart,
		moduleUser
	}
})
export default store;