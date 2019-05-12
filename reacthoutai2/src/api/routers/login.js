const Router = require('koa-router');
const db = require('../db');
const token = require('../utils/token');
// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    // 解构

    let {
        name,
        pass
    } = ctx.request.body;
    let res = await db.find('shangjia', {
        name,
        pass
    });
    res = res[0];
    if (res) {
        let _token = token.create(name, expiresIn = '2h');
        ctx.body = {
            name: res.name,
            code: 200,
            time: res.time,
            token: _token,
            shenfen:res.shenfen,
			uImg:res.uImg

        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }





})

module.exports = router;
