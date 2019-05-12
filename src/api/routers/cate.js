const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();

router.get('/store',async (ctx,next)=>{
    let res = await db.find('store_list',{}); 
    ctx.body = res;

})
router.get('/storeHot',async (ctx,next)=>{
    let res = await db.find1('store_list',{},'store_collect',4); 
    ctx.body =res;

})
router.get('/list',async (ctx,next)=>{
	let {gcName}=ctx.request.query;
    let res = await db.find('goods_bigClass',{gc_name:gcName}); 
    ctx.body = res;
})


module.exports = router;