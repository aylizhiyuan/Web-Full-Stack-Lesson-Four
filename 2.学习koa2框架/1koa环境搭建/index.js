//使用require关键字，将koa模块引入到启动文件中来.并且赋值给koa常量.
//对于通过npm install安装的插件，可以直接在引用的时候使用插件名称，系统会自动去node_modules文件夹找.
//在node环境中，require的含义是引用一个模块，那么我们在服务器端，把一个文件当成一个模块来看待，那么这句话的含义就是引用koa文件.
const koa = require('koa');
//koa实际是node_modules/koa/lib/applicaiton.js文件,它引用的是module.exports的application类.
//使用框架的好处就是不需要了解细节的问题就可以实例化将服务器创建出来
//app应该是服务器的实例对象 .

//const关键字是声明一个常量：值一旦确定不可改变的量叫常量，值可以多次赋值的量叫变量.
const app = new koa();

//async关键字说明这个函数是一个异步函数.
//app.use()是我们处理请求的主要函数.
app.use(async ctx=>{
    //箭头函数如果只有一个参数的话，可以将()省略掉.
    //在处理请求的回调函数中，有一个特殊的对象，叫ctx对象，这个对象就是我们拿到请求和返回响应的接口.
    //ctx.body将对应的hello world值返回给浏览器.
    ctx.body = 'hello world';
})
//监听3000端口，启动服务器.不同的端口对应着不同的服务器服务类型，我们这里，开启的是web服务.默认的端口号是80
//我们创建的服务器是本地的服务器，它的IP地址 localhost / 127.0.0.1
app.listen(3000,()=>{
    console.log('node is OK');//()=>{}这叫箭头函数，ES6的新的回调函数的写法.
})









