const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();

router.post('/init',async (ctx,next)=>{
    let res = await db.find('shangjia',{}); 
    ctx.body = res;

})
router.post('/upDate',async (ctx,next)=>{
	let {name,newdata}=ctx.request.body;
	console.log(newdata)
    let res = await db.update('shangjia',{name}, {
        $set:newdata
      }); 
    ctx.body = res;

})
router.post('/name',async (ctx,next)=>{
	let {name}=ctx.request.query;
    let res = await db.find('shangjia',{name}); 
    ctx.body = res;

})
router.get('/delete',async (ctx,next)=>{
	let {name}=ctx.request.query;
    let res = await db.delete('shangjia',{name}); 
    ctx.body = res;

})
// router.get('/storeHot',async (ctx,next)=>{
//     let res = await db.find1('store_list',{},'store_collect',4); 
//     ctx.body =res;
// 
// })
// router.get('/list',async (ctx,next)=>{
// 	let {gcName}=ctx.request.query;
//     let res = await db.find('goods_bigClass',{gc_name:gcName}); 
//     ctx.body = res;
// })


module.exports = router;