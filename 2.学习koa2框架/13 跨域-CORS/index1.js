const koa = require('koa');
const views = require('koa-views');
const Router = require('koa-router');

const app = new koa();
const router = new Router();

router.get('/',async ctx=>{
    await ctx.render('index');
})

app.use(views('./views',{
    extension:'ejs'
}))
app.use(router.routes());
app.listen(3000,()=>{
    console.log('node is OK');
})