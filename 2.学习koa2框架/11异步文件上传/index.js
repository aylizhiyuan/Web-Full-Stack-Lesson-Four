const koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const koaBody = require('koa-body');
const serve = require('koa-static');
const fs = require('fs');
const rename = require('./lib/rename');
const app = new koa();
const router = new Router();

//路由规则
router.get('/',async ctx=>{
    await ctx.render('index');
}).post('/',async ctx=>{
    //console.log('fields',ctx.request.fields);
    //console.log('files',ctx.request.files); //获取文件
    //console.log(ctx.request.body);//获取键值对参数
    let files = ctx.request.files.uploads;
    //判断一下当前/uploads文件夹是否存在
    //如果不存在则创建一个，如果存在则执行下面的代码
    fs.readdir('./uploads',(err,files)=>{
        if(err){
            //创建
            fs.mkdir('./uploads',(err)=>{
                console.log(err);
            })
        }
    })
    if(files instanceof Array){
       for(let file of files){
           let reader = fs.createReadStream(file.path);
           let filename = rename(file);
           let newPath = __dirname + '/uploads/' + filename;
           let writer = fs.createWriteStream(newPath);
           reader.pipe(writer);
           ctx.body = '文件上传成功';
       }
    }else{
        //单个文件的情况
        //console.log(files);
        let reader = fs.createReadStream(files.path);
        let filename = rename(files);
        let newPath = __dirname + '\\uploads\\' + filename;
        let writer = fs.createWriteStream(newPath);
        reader.pipe(writer);
        let data = {
            message:'文件上传成功',
            imgSrc:filename
        }
        ctx.body = data;//直接传递一个对象给前端浏览器
    }
})

app.use(koaBody({
    multipart:true //如果上传的是文件的话，必须设置这个参数
}));
app.use(views(__dirname + '/views',{
    extension:'ejs'
}));
app.use(router.routes());
app.use(serve(__dirname + '/uploads'));
app.listen(3000,()=>{
    console.log('node is OK');
})