const koa = require('koa');
const Router = require('koa-router');
//在单独的文件中引用对数据库的创建.
const query = require('./model/db');
const app = new koa();
const router = new Router();
//使用sql语句查询数据库的内容，并且将结果返回
router.get('/',async ctx=>{
    let result = await query('select * from student');
    ctx.body = result;
})
app.use(router.routes());
app.listen(3000,()=>{
    console.log('node is OK');
})