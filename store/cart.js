export default {
	namespaced:true,//为当前模块开启命名空间
	state:{
		//初始时先进到本地取数据，有就赋值，没有就赋值空数组
		cart: JSON.parse(uni.getStorageSync("cart") || "[]") //购物车数组
	},
	mutations:{
		addGoodsToCart(state,goods){
			let findGoods = state.cart.find(item=>item.goods_id === goods.goods_id)
			if(findGoods){
				//购物车中存在这件商品，只增加数量
				findGoods.goods_count ++ 
			}else{
				//购物车中不存在这件商品，整体push到数组中
				state.cart.push(goods);
			}
			// 将购物车数据存到本地
			uni.setStorageSync("cart",JSON.stringify(state.cart));	
		},
		deleteGoods(state, goods_id){
			//过滤相同id的商品对象，返回新数组
			state.cart = state.cart.filter(item => { //true返回   false过滤
				return item.goods_id !== goods_id
			})
			// 将购物车数据同步存到本地
			uni.setStorageSync("cart", JSON.stringify(state.cart));
		},
		//通过商品id修改指定商品的数量
		undatagoodscount(state,goodsInfo){
			let findgoods = state.cart.find(v=>v.goods_id == goodsInfo.goods_id)
			if(findgoods){
				findgoods.goods_count = goodsInfo.goods_count;
				uni.setStorageSync('cart',JSON.stringify(state.cart));
			}
		},
		//通过商品id修改指定的选中状态
		undatagoodschecked(state,goodsInfo){
			let findgoods = state.cart.find(v=>v.goods_id == goodsInfo.goods_id);
			if(findgoods){
				findgoods.goods_checked = goodsInfo.goods_checked;
				uni.setStorageSync("cart",JSON.stringify(state.cart))
			}
		},
		//修改全部商品的勾选状态
		updateAllGoodsChecked(state,newstate){
			state.cart.forEach(v=>v.goods_checked = newstate);
			uni.setStorageSync("cart", JSON.stringify(state.cart)); //同步到本地
		}
	},
	getters:{ //计算属性，依赖state来做运算并返回结果。 （要有返回值）
		//统计购物车中商品的总数量
		totalGoods(state){
			let n = 0;
			state.cart.forEach((item)=>{
				n += item.goods_count; //累加商品的数量
			})
			return n;
		},
		// 统计所有勾选的商品数量
		checkedgoodssum(state){
			let findgoods = state.cart.filter(v=>v.goods_checked)
			return findgoods.reduce((s,item)=> s += item.goods_count,0);
		},
		checkedGoodsTotal(state){
			let findGoods = state.cart.filter(item => item.goods_checked) //提取出所有选中的商品
			return  findGoods.reduce((t, item) => t += item.goods_count * item.goods_price, 0).toFixed(2);			
		}
	}
}