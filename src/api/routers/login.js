/* eslint-disable no-undef */
const Router = require('koa-router');
//const md5=require('md5');
const db = require('../db');
const token = require('../utils/token');
// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/', async (ctx, next) => {


    let {
        telNumber,
        password
    } = ctx.request.body;
    let res = await db.find('user', {
        telNumber,
        password
    });
    ctx.body = res;
    res = res[0];
    if (res) {
        let _token = token.create(telNumber, expiresIn = '2h');
        ctx.body = {
            telNumber: res.telNumber,
            code: true,
            regtime: res.regtime,
            token: _token,

        }
    } else {
        ctx.body = {
            code: false,
            msg: 'fail'
        }
    }

})
router.get('/user_info',async(ctx,next)=>{
    let {
        telNumber
    } = ctx.query;
    let res = await db.find('user', {
        telNumber,
    });
    ctx.body = res;
})
module.exports = router;
