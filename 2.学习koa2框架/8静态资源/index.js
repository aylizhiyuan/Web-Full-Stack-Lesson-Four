const koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new koa();
const router = new Router();

app.use(router.routes());
//设置静态资源服务器的访问文件路径
//静态资源实际指的是带有后缀名的地址.
//只有我输入的是带有后缀名的地址，它都会去/static文件下找对应的文件，如果找到就返回，如果没找到就报404错误.
app.use(serve(__dirname + '/static'));
app.listen(3000,()=>{
    console.log('node is OK');
})