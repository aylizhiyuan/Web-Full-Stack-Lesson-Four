const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
//引用自己模块的时候，因为它不在node_modules文件夹下，所以在引用的时候必须使用相对路径或者是绝对路径.
const render = require('./lib/render');
const app = new koa();
const router = new Router();


router.get('/',async ctx=>{
    ctx.body = await render('./view/index.html');
}).post('/post',async ctx=>{
    //post请求的数据可以通过ctx.request.body获取到
    //get请求的数据可以通过ctx.query获取到
    //模板字符串，可以很方面的把变量和字符串写在一起，使用的符号是``,其中变量用${}包裹即可.
    ctx.body = `你的用户名是${ctx.request.body.username};您的密码是:${ctx.request.body.password}`;
}).post('/mypost',async ctx=>{
   console.log(ctx.request.body.uname);
})
//把处理post请求的bodyparser放在整个路由规则的前面，为了保证请求过来的时候，如果是post请求先经过bodyparser
//处理。
app.use(bodyParser());
app.use(router.allowedMethods());
app.use(router.routes());



app.listen(3000,()=>{
    console.log('node is OK');
})