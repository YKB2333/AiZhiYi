import { call, put, takeEvery,select,all } from 'redux-saga/effects';

import {getData} from '../service';

// let delay = (time)=>new Promise(resolve=>setTimeout(resolve,time));

// function* helloSaga(action) {
//     console.log('hello saga');
//     yield 'jingjing'
// }

function* UserLoginInfo({payload}){
    console.log(payload);
    console.log('添加购物车');
    try{
        const data = yield call(getData,'/login/user_info',{telNumber:payload});//getData('/api/cart',{page:1,qty:10})
        yield put({ type: 'USER_LOGIN_INFO',payload:data});//等效小dispatch({type})
        let state = select();//等效于store.getState()
    console.log(state);
    console.log('添加成功')
    }
    catch(err){
        yield put({type:'USER_LOGIN_INFO_FAIL'})
    }
    

    // 获取state
    
}

// 监听action
function* watchAddToCar(){
    yield takeEvery('USER_LOGIN_INFO',UserLoginInfo);
}
export default function* rootSaga(){
    yield all([watchAddToCar()])
}
// import { call, put, takeEvery, takeLatest,select,all } from 'redux-saga/effects';

// import {getData} from '../service';

// // let delay = (time)=>new Promise(resolve=>setTimeout(resolve,time));

// // function* helloSaga(action) {
// //     console.log('hello saga');
// //     yield 'jingjing'
// // }

// function* UserLoginInfo(action){
//     console.log('添加购物车');
//     try{
//         let goods = 6666//getData('/api/cart',{page:1,qty:10})
//         yield put({ type: 'USER_LOGIN_INFO',payload:goods});//等效小dispatch({type})
//     }catch(err){
//         yield put({type:'USER_LOGIN_INFO'})
//     }
    

//     // 获取state
//     let state = select();//等效于store.getState()

//     console.log('添加成功')
// }

// // 监听action
// function* watchAddToCar(){
//     yield takeLatest('USER_LOGIN_INFO',UserLoginInfo);
// }
// // function* watchGetData(){
// //     yield takeLatest('ADD_TO_CART_A',addToCar);
// // }


// export default function* rooSaga(){
//     yield all([watchAddToCar()])
// }