const Router = require('koa-router');
const db = require('../db');
const qs = require('querystring');
// 创建路由
var router = new Router();

router.get('/',async (ctx,next)=>{
    let res = await db.find('zero',{}); 
    ctx.body = res;

})
router.get('/pingtuan',async (ctx,next)=>{
    let res = await db.find('pingtuan',{}); 
    ctx.body =res;

})
router.get('/limit',async (ctx,next)=>{
    let res = await db.find('xianshi',{}); 
    ctx.body =res;

})

module.exports = router;