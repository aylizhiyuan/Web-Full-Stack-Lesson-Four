const koa = require('koa');
const Router = require('koa-router');
//用node原生所带的fs模块来读取文件内容
const fs = require('fs');
const app = new koa();
const router = new Router();
//定义一个render函数，功能是将文件内容读取后返回
function render(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./view/get.html','utf8',(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

//GET请求两种形式：1.输入URL，回车 2.点击页面上的链接
//用户也可以自定义发送GET请求，这种形式叫做ajax.
router.get('/',ctx=>{
    //GET形式如果传参的话，可以通过ctx获取到对应的参数值.
    console.log(ctx.query);//参数以对象格式显示
    console.log(ctx.querystring);//参数以字符串形式显示
    ctx.body = 'hello world';
}).get('/user',ctx=>{
    ctx.body = 'hello user';
}).get('/sendget',async ctx=>{
    let html = await render();
    ctx.body = html;
}).get('/get',async ctx=>{
    ctx.body = 'hello ajax';
})
app.use(router.routes());
app.listen(3000,()=>{
    console.log('node is OK');
})