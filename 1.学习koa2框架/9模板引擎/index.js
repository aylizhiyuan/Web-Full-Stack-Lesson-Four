const koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');

const app = new koa();
const router = new Router();

router.get('/',async ctx=>{
    await ctx.render('index',{
        //传递给index.ejs模板的变量
        title:"我是首页"
    })
})
//加载使用模板引擎
app.use(views(__dirname + '/views',{
    extension:'ejs'
}));
app.use(router.routes());
app.use(serve(__dirname + '/static'));

app.listen(3000,()=>{
    console.log('node is OK');
})