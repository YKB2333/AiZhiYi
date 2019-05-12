//引入模块
const Router = require("koa-router");
const db = require("../db");
// 路由
var router = new Router();
router.get("/", async (ctx, next) => {
  let { a } = ctx.query;
  console.log(a);
  ctx.body = a;
});
module.exports = router;
