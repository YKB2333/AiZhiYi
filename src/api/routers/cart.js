/* eslint-disable no-undef */
const Router = require("koa-router");
//const md5=require('md5');
const db = require("../db");
// 创建路由
var router = new Router();
router.post("/", async (ctx, next) => {
  let { a } = ctx.request.body;
  console.log(a);
  cxt.body = a;
});
router.get("/", async (ctx, next) => {
  // let {
  //     telNumber
  // } = ctx.query;
  let res = await db.find("cart", {});
  ctx.body = res;
});

module.exports = router;
