/*function getTime(){
    //获取当前时间的毫秒数
    var startTime = new Date().getTime();
    var endTime = null;
    setTimeout(function(){
        endTime = new Date().getTime() - startTime;
    },1000)
    console.log(endTime);
}
getTime();*/

//这段代码存在的问题是：同步的代码依赖于异步代码的结果，我们希望能够让异步先执行，执行成功之后，再执行同步代码。说白了，就是我们希望能够有一种东西.
//能够帮助我们管理异步的代码.

//这就是我们学习promise的目的，就是用来管理异步任务的.

//添加 async关键字，将这个函数作为异步函数.
function getTime(){
    return new Promise((resolve,reject)=>{
        try{
            var startTime = new Date().getTime();
            var endTime = null;
            setTimeout(function(){
                endTime = new Date().getTime() - startTime;
                resolve(endTime);
            },1000)
        }catch(err){
            reject(err);
        }
    })
}


/*getTime().then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})*/




//await是等待这个异步任务执行成功后，再执行下面的代码.
//await必须用在async函数中，他们是成对出现的.
async function printTime(){
    var endTime = await getTime();
    console.log(endTime);
}
printTime();









