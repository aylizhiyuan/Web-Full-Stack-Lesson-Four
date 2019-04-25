const koa = require('koa');
const Router = require('koa-router');
const app = new koa();
const router = new Router();

//定义路由对象，将所有的路由规则挂载到路由对象上 .其中你可以指定不同的请求方式.
router.get('/',ctx=>{
    ctx.body = '首页';
}).get('/about',ctx=>{
    ctx.body = '关于我们';
}).get('/product',ctx=>{
    ctx.body = '产品介绍';
}).get('/user/:id',ctx=>{
    ctx.body = '您访问的是第' + ctx.params.id + '个用户'; //动态参数
})

//将路由规则作为处理请求的第一个处理环节
app.use(router.routes());
app.listen(3000,()=>{
    console.log('node is ok');
})