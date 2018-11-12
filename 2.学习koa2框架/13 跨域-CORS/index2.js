const koa = require('koa');
const views = require('koa-views');
const Router = require('koa-router');

const app = new koa();
const router = new Router();
router.get('/',async ctx=>{
    ctx.body = '我是服务器2'
}).get('/get',async ctx=>{
    //就是允许所有的服务器都可以访问这个路径，除了说客户端的用户之外，其他的服务器也可以。。。。
    //ctx.response.set('Access-Control-Allow-Origin','*');
    ctx.body = 'hello world';
})
app.use(router.routes());
app.use(views('./views',{
    extension:'ejs'
}))
app.listen(4000,()=>{
    console.log('node is OK');
})