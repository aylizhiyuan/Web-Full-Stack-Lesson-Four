const koa = require('koa');
const app = new koa();
//它是node原生的一个模块，所以无需安装就可以直接使用。它的主要作用就是读取文件
const fs = require('fs');

//KOA原生路由判断：根据用户的请求的地址的不同，给用户返回不同的页面，这是服务器的最基本的功能.

//修改意见：render中通过fs.readFile读取文件的时候，读取的文件内容无法作为render函数的返回内容，因为他们的
//作用域不一样，所以，必须使用promise封装，可以解决问题.
function render(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf8',(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
//通过async将这个函数定义为一个异步的函数
async function route(url){
    let view = null;
    switch(url){
        case '/':
            view = './view/index.html';
            break
        case '/about':
            view = './view/about.html';
            break
        case '/product':
            view = './view/product.html';
            break
        default:
            view = './view/404.html';
            break
    }
    //选择读取文件，将文件的内容读取出来，再将内容返回.
    //这个render完成后才执行return html.
    let html = await render(view);
    return html
}
app.use(async ctx=>{
    //ctx包含了请求和响应的所有的信息.
    //let 关键字用于声明一个变量.以后不要再使用var了.
    //1.获取用户请求的地址
    let url = ctx.url;
    //2.通过route函数判断用户的地址，返回不同的内容.
    let html = await route(url);
    //3.将得到的内容返回.
    ctx.body = html;
})
app.listen(3000,function(){
    console.log('node is OK');
})