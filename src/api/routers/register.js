const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
// 插入可以注册的用户名
router.post('/insert', async (ctx, next) => {
    let {
        uImg,
        telNumber,
        password,
        nickname,
        sex,
        birthday
    } = ctx.request.body;
    //	password=md5(password);
    let data = {
        uImg,
        telNumber,
        password,
        nickname,
        sex,
        birthday,
        regtime: Date.now()
    }
    let res = await db.insert('user', data);
    ctx.body = res;
    // 存入数据库

})

// 判断用户名是否存在
router.get('/telNumber', async (ctx, next) => {
    let {
        telNumber
    } = ctx.query;
    let res = await db.find('user', {
        telNumber
    });
    if (res.length > 0) {
        ctx.body = false
    } else {
        ctx.body = true
    }
})

module.exports = router;