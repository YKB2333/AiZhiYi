/**
 * Cart Reducer
 * 关于购物车的规则
 */

import {USER_LOGIN_INFO} from '../actions/loginAction'

// 初始状态
let initState = {
    data:{}
}

// state的修改逻辑
let reducer = (state=initState,{type,payload})=>{
    // state: 上一次的状态
    // action: 修改指令
    // 返回值：返回新的state
    switch(type){
        // 添加商品到购物车
        case USER_LOGIN_INFO:
            return {
                ...state,
                data:{...state.data,payload}
            }
        default:
            return state;
    }
}

export default reducer;