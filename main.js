import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import { $http } from '@escook/request-miniprogram'
import store from './store/index.js'
 
// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
uni.$http = $http

$http.baseUrl = 'http://www.yz520.xyz'

$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

$http.afterRequest = function () {
  uni.hideLoading()
}

uni.$showMsg = function(title='数据请求失败',duration = 1500,icon = 'none'){
	uni.showToast({
		title,
		duration,
		icon
	})
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store, //将store挂载到当前的vue实例
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif