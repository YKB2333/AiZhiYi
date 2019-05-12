const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();
router.post('/',async (ctx,next)=>{
    
    
    let {name,phone,pass,sex,shenfen} = ctx.request.body;
   
    let res = await db.insert('shangjia',{name,phone,pass,sex,shenfen,time:Date.now()})
    ctx.body = res;


})
router.get('/check',async (ctx,next)=>{
    
    console.log(ctx.query)
    let {name} = ctx.query;
   
    let res = await db.find('shangjia',{name});
    ctx.body=res

})

router.get('/goodlist',async (ctx,next)=>{

    let res = await db.find('Hgoodlist',{});
    ctx.body=res
})
router.post('/changeGood',async (ctx,next)=>{
    console.log(ctx.request.body)
    let {goods_price,goods_name,zhufenlei,zifenlei,key} = ctx.request.body;
     console.log(goods_price,goods_name,zhufenlei,zifenlei,key)
    let res = await db.update('Hgoodlist',{key},{$set:{goods_price,goods_name,zhufenlei,zifenlei}});
    ctx.body=res
})
router.get('/delete',async (ctx,next)=>{
    console.log(ctx.query)
    let {key} = ctx.query;
    let res = await db.delete('Hgoodlist',{key});
    ctx.body=res
})

router.get('/orderlist',async (ctx,next)=>{

    let res = await db.find('orderlist',{});
    ctx.body=res
})
router.post('/changeorder',async (ctx,next)=>{
    console.log(ctx.request.body)
    let {goods_price,goods_name,address,number,status,key} = ctx.request.body;
    //  console.log(goods_price,goods_name,zhufenlei,zifenlei,key)
    let res = await db.update('orderlist',{key},{$set:{goods_price,goods_name,address,number,status}});
    ctx.body=res
})
router.get('/deleteorder',async (ctx,next)=>{
    console.log(ctx.query)
    let {key} = ctx.query;
    let res = await db.delete('orderlist',{key});
    ctx.body=res
})
//添加商品
router.post('/addgood',async (ctx,next)=>{
    console.log(ctx.request.body)
    let res = await db.find('Hgoodlist',{});
    console.log(res)
    let ID = [];
    for(var i=0;i<res.length;i++){
        ID.push(res[i].goods_id)
    }
    let goods_id = Math.max.apply(null, ID)+1;
    let {goods_name,price,zhufenlei,zifenlei} = ctx.request.body;
    let goods_price = price;
    let goods_image = "2018/12/28/106_05993302365259532.jpg";
    let key=String(parseInt(Date.now()));
    let resxx = await db.insert('Hgoodlist',{goods_id,goods_salenum:0,goods_name,goods_price,zhufenlei,zifenlei,key,goods_image})

    ctx.body=resxx
})
module.exports = router;