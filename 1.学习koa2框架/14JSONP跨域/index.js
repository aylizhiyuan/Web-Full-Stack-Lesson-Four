const koa = require('koa');
const Router = require('koa-router');

const app = new koa();
const router = new Router();

router.get('/jsonp',async ctx=>{
    //GET请求的参数
    let cb = ctx.request.query.cb;
    //console.log(cb);
    let now = new Date().getTime();
    ctx.body = `${cb}(${now})`;
})
app.use(router.routes());
app.listen(3000,()=>{
    console.log('node is OK');
})
