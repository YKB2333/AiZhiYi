/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-04-10 17:21:33
 * @LastEditTime: 2019-04-11 23:34:40
 * @ 首页api
 */
//引入模块
const Router = require("koa-router");
const db = require("../db");
var ObjectId = require("mongoose").Types.ObjectId;
// 路由
var router = new Router();
// post
router.post("/", async (ctx, next) => {
  let { a } = ctx.request.body;
  let res = {};
  // 热销推荐
  if (a === "saleNum") {
    let { num } = ctx.request.body;
    res = await db.find("goods", { goods_fic_salenum: { $gt: num } });
  }
  // 加入购物车
  if (a === "addCart") {
    let {
      goods_id,
      gShop,
      gImg,
      gTitle,
      gDescribe,
      gPrice,
      gNumber = 1
    } = ctx.request.body;
    res = await db.insert("cart", {
      goods_id,
      gShop,
      gImg,
      gTitle,
      gDescribe,
      gPrice,
      gNumber
    });
  }
  ctx.body = res;
});

// get

router.get("/", async (ctx, next) => {
  let { a } = ctx.query;
  let res = {};
  // 获取分类商品
  if (a === "classify") {
    let { gc_id_1 } = ctx.query;
    console.log(parseInt(gc_id_1));
    res = await db.find("goods", {
      gc_id_1: parseInt(gc_id_1)
    });
  }
  //获取商品信息
  if (a === "goods") {
    let { id } = ctx.query;
    res = await db.find("goods", {
      goods_id: parseInt(id)
    });
  }
  ctx.body = res;
});
module.exports = router;
