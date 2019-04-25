const koa = require('koa');
const app = new koa();

//中间件的概念：可以理解为我们处理请求的不同的过程，在这里，首先打印发送方式，最后再发送hello world返回.
//每一步都可以看做是请求在处理过程中的中间件.
app.use(async (ctx,next)=>{
    //ctx.method请求发送的方式
    console.log(ctx.method); //打印请求发送的方式
    console.log(ctx.url);//打印请求的地址
    console.log(ctx.host);//打印请求的主机名称
    //在每一个中间件处理过程中，都需要调用 next()，为了进行下一个环节的处理.
    next();
})
app.use(async ctx=>{
    //ctx.body将结果返回，整个处理过程就结束了。不需要调用next()
    console.log('这时候就该返回结果了');
    ctx.body = 'hello world';
})
app.listen(3000,()=>{
    console.log('node is OK');
})